import { Suspense } from "react";
import AuthLoginView from "./auth.login.view";

export default function AuthLogin() {
     return (
          <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-100">
               <Suspense fallback={<div className="loading loading-spinner loading-lg"></div>}>
                    <AuthLoginView />
               </Suspense>
          </div>
     );
}
