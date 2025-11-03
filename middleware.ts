import { NextRequest, NextResponse } from "next/server";

// Define protected routes
const ADMIN_ROUTES = ["/admin"];
const AUTH_ROUTES = ["/auth/login"];

// Helper function to clear authentication cookies
function clearAuthCookies(response: NextResponse): NextResponse {
     response.cookies.delete("accessToken");
     response.cookies.delete("refreshToken");
     return response;
}

// Helper function to check if user has admin privileges
function hasAdminRole(role: string): boolean {
     return role === "ADMIN" || role === "SUPERADMIN";
}

// Helper function to validate token with backend
async function validateToken(accessToken: string): Promise<{ success: boolean; role?: string }> {
     try {
          // In middleware, environment variables might not be available, so we use hardcoded URL
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4444";
          console.log("🔍 Middleware validating token with URL:", `${apiUrl}/auth/validate`);

          const response = await fetch(`${apiUrl}/auth/validate`, {
               method: "GET",
               headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
               },
          });

          console.log("📡 Token validation response status:", response.status);

          if (response.ok) {
               const userData = await response.json();
               console.log("✅ Token validation success:", userData);
               return {
                    success: userData.success && userData.data?.role,
                    role: userData.data?.role,
               };
          }

          console.log("❌ Token validation failed with status:", response.status);
          return { success: false };
     } catch (error) {
          console.error("🚨 Token validation error:", error);
          return { success: false };
     }
}

// Handle admin route access
function handleAdminRoute(
     request: NextRequest,
     accessToken: string | undefined
): NextResponse | null {
     const { pathname } = request.nextUrl;
     const isAdminRoute = ADMIN_ROUTES.some(
          route => pathname.startsWith(route) && pathname !== "/auth/login"
     );

     if (isAdminRoute && !accessToken) {
          const loginUrl = new URL("/auth/login", request.url);
          loginUrl.searchParams.set("redirect", pathname);
          return NextResponse.redirect(loginUrl);
     }

     return null;
}

// Handle auth route access
async function handleAuthRoute(
     request: NextRequest,
     accessToken: string | undefined
): Promise<NextResponse | null> {
     const { pathname } = request.nextUrl;
     const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

     console.log("🔍 handleAuthRoute debug:", {
          pathname,
          isAuthRoute,
          hasAccessToken: !!accessToken,
          accessToken: accessToken ? `${accessToken.substring(0, 10)}...` : "NONE",
     });

     if (isAuthRoute && accessToken) {
          console.log("✅ Auth route with token detected, calling validateToken...");
          const validation = await validateToken(accessToken);

          if (validation.success && validation.role) {
               // Redirect based on user role
               if (hasAdminRole(validation.role)) {
                    // Admin/SuperAdmin -> /admin
                    const redirectUrl = request.nextUrl.searchParams.get("redirect") || "/admin";
                    console.log("🔄 Redirecting authenticated admin to:", redirectUrl);
                    return NextResponse.redirect(new URL(redirectUrl, request.url));
               } else if (validation.role === "MEMBER") {
                    // Member -> home page
                    const redirectUrl = request.nextUrl.searchParams.get("redirect") || "/";
                    console.log("🔄 Redirecting authenticated member to:", redirectUrl);
                    return NextResponse.redirect(new URL(redirectUrl, request.url));
               }
          } else {
               // Token invalid - clear cookies and allow access to login
               console.log("❌ Token invalid, clearing cookies");
               return clearAuthCookies(NextResponse.next());
          }
     }

     return null;
}

export async function middleware(request: NextRequest) {
     const { pathname } = request.nextUrl;
     const accessToken = request.cookies.get("accessToken")?.value;

     console.log("🛡️ Middleware running for:", pathname);
     console.log(
          "🍪 Access token:",
          accessToken ? `EXISTS (${accessToken.substring(0, 10)}...)` : "NOT_FOUND"
     );
     console.log("🍪 All cookies:", request.cookies.getAll());

     // Handle admin route protection
     const adminRouteResponse = handleAdminRoute(request, accessToken);
     if (adminRouteResponse) {
          console.log("🔒 Admin route protection triggered");
          return adminRouteResponse;
     }

     // Handle auth route redirection
     const authRouteResponse = await handleAuthRoute(request, accessToken);
     if (authRouteResponse) {
          console.log("🔄 Auth route redirection triggered");
          return authRouteResponse;
     }

     console.log("✅ Middleware passed, continuing...");
     return NextResponse.next();
}

export const config = {
     matcher: [
          // Match all paths except API, static files, and assets
          String.raw`/((?!api|_next/static|_next/image|favicon.ico|public|.*\.).*)`,
     ],
};
