"use client";
import { useAdminLoginForm } from "./admin.login.form.hook";

export default function AdminLoginFormView() {
     const { email, error, handleSubmit, password, setEmail, setPassword } = useAdminLoginForm();

     return (
          <div className="min-h-[60vh] flex items-center justify-center p-4 lg:w-1/2 md:w-3/4 sm:w-full">
               <div className="w-full bg-white rounded-lg shadow-md overflow-hidden md:flex">
                    <div
                         className="hidden md:block md:w-1/2 bg-cover bg-center"
                         style={{
                              backgroundImage:
                                   "url('https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp')",
                         }}
                    />
                    <div className="w-full md:w-1/2 p-8">
                         <h2 className="text-2xl md:text-3xl font-semibold mb-4">Admin Login</h2>
                         <p className="text-sm text-gray-600 mb-6">
                              Sign in to access the admin dashboard.
                         </p>

                         <form onSubmit={handleSubmit} className="space-y-4">
                              <div>
                                   <label
                                        htmlFor="admin-email"
                                        className="block text-sm font-medium mb-1"
                                   >
                                        Email
                                   </label>
                                   <input
                                        id="admin-email"
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="input border-1 border-gray-300 bg-white"
                                        placeholder="you@company.com"
                                   />
                              </div>

                              <div>
                                   <label
                                        htmlFor="admin-password"
                                        className="block text-sm font-medium mb-1"
                                   >
                                        Password
                                   </label>
                                   <input
                                        id="admin-password"
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="input border-1 border-gray-300 bg-white"
                                        placeholder="Your password"
                                   />
                              </div>

                              {error && <div className="text-sm text-red-600">{error}</div>}

                              <div className="flex items-center justify-between">
                                   <label className="flex items-center gap-2">
                                        <input
                                             type="checkbox"
                                             className="checkbox checked:bg-primary"
                                        />
                                        <span className="text-sm">Remember me</span>
                                   </label>
                                   <button type="button" className="text-sm text-primary btn-ghost">
                                        Forgot password?
                                   </button>
                              </div>

                              <div className="pt-4">
                                   <button type="submit" className="btn btn-primary w-full">
                                        Sign in
                                   </button>
                              </div>
                         </form>
                    </div>
               </div>
          </div>
     );
}
