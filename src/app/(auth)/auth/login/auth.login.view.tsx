"use client";
import { useAuthLogin } from "./auth.login.hook";
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { demoAccounts } from "./config";

export default function AuthLoginView() {
     const {
          register,
          handleSubmit,
          errors,
          isLoading,
          error,
          clearSavedCredentials,
          hasSavedCredentials,
          watchedRememberMe,
          handleRememberMeChange,
          setValue,
     } = useAuthLogin();

     const [showPassword, setShowPassword] = useState(false);

     // Quick fill demo account
     const fillDemoAccount = (email: string, password: string) => {
          setValue("email", email);
          setValue("password", password);
     };

     return (
          <div className="min-h-[60vh] flex items-center justify-center p-4 lg:w-1/3 md:w-1/2 sm:w-full relative">
               <div className="w-full bg-white rounded-lg shadow-md overflow-hidden md:flex">
                    <div className="w-full p-8">
                         <h2 className="text-2xl md:text-3xl font-semibold mb-4">Authentication</h2>
                         <p className="text-sm text-gray-600 mb-6">
                              Sign in to access the Lead AI dashboard.
                         </p>

                         {/* Server Error Display */}
                         {error && (
                              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3 mb-4">
                                   <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                   <div>
                                        <div className="text-red-800 font-medium text-sm">
                                             Login Failed
                                        </div>
                                        <div className="text-red-700 text-sm mt-1">{error}</div>
                                   </div>
                              </div>
                         )}

                         <form onSubmit={handleSubmit} className="space-y-4">
                              {/* Email Field */}
                              <div>
                                   <label
                                        htmlFor="email"
                                        className="block text-sm font-medium mb-1"
                                   >
                                        Email
                                   </label>
                                   <input
                                        id="email"
                                        type="email"
                                        {...register("email")}
                                        className={`input w-full border-1 bg-white ${
                                             errors.email
                                                  ? "border-red-300 focus:border-red-500"
                                                  : "border-gray-300 focus:border-primary"
                                        }`}
                                        placeholder="you@company.com"
                                        disabled={isLoading}
                                   />
                                   {errors.email && (
                                        <p className="text-sm text-red-600 mt-1">
                                             {errors.email.message}
                                        </p>
                                   )}
                              </div>

                              {/* Password Field */}
                              <div>
                                   <label
                                        htmlFor="password"
                                        className="block text-sm font-medium mb-1"
                                   >
                                        Password
                                   </label>
                                   <div className="relative">
                                        <input
                                             id="password"
                                             type={showPassword ? "text" : "password"}
                                             {...register("password")}
                                             className={`input w-full border-1 bg-white pr-12 ${
                                                  errors.password
                                                       ? "border-red-300 focus:border-red-500"
                                                       : "border-gray-300 focus:border-primary"
                                             }`}
                                             placeholder="Your password"
                                             disabled={isLoading}
                                        />
                                        <button
                                             type="button"
                                             onClick={() => setShowPassword(!showPassword)}
                                             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                             {showPassword ? (
                                                  <EyeOff className="w-5 h-5" />
                                             ) : (
                                                  <Eye className="w-5 h-5" />
                                             )}
                                        </button>
                                   </div>
                                   {errors.password && (
                                        <p className="text-sm text-red-600 mt-1">
                                             {errors.password.message}
                                        </p>
                                   )}
                              </div>

                              {/* Remember Me & Forgot Password */}
                              <div className="space-y-3">
                                   <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2">
                                             <input
                                                  type="checkbox"
                                                  checked={watchedRememberMe}
                                                  onChange={e =>
                                                       handleRememberMeChange(e.target.checked)
                                                  }
                                                  className="checkbox checkbox-primary checkbox-sm"
                                             />
                                             <span className="text-sm">Remember me</span>
                                        </label>
                                        <button
                                             type="button"
                                             className="text-sm text-primary hover:text-primary-focus"
                                        >
                                             Forgot password?
                                        </button>
                                   </div>

                                   {/* Saved Credentials Info */}
                                   {hasSavedCredentials && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
                                             <div className="flex items-center gap-2 text-blue-700 text-sm">
                                                  <CheckCircle className="w-4 h-4" />
                                                  <span>Email saved from previous login</span>
                                             </div>
                                             <button
                                                  type="button"
                                                  onClick={clearSavedCredentials}
                                                  className="text-blue-600 hover:text-blue-800 text-xs underline"
                                             >
                                                  Clear
                                             </button>
                                        </div>
                                   )}
                              </div>

                              {/* Submit Button */}
                              <div className="pt-4">
                                   <button
                                        type="submit"
                                        className="btn btn-primary w-full"
                                        disabled={isLoading}
                                   >
                                        {isLoading ? (
                                             <>
                                                  <span className="loading loading-spinner loading-sm"></span>{" "}
                                                  Signing in...
                                             </>
                                        ) : (
                                             "Sign in"
                                        )}
                                   </button>
                              </div>
                         </form>

                         {/* Demo Accounts */}
                         <div className="border-t border-gray-200 pt-6 mt-6">
                              <div className="text-center mb-4">
                                   <span className="text-sm font-medium text-gray-500">
                                        Quick Login
                                   </span>
                              </div>
                              <div className="space-y-2">
                                   {demoAccounts.map(account => (
                                        <div
                                             key={account.email}
                                             className="bg-gray-50 rounded-lg p-3 flex items-center justify-between"
                                        >
                                             <div>
                                                  <div className="text-sm font-medium text-gray-800">
                                                       {account.label}
                                                  </div>
                                                  <div className="text-xs text-gray-600">
                                                       {account.email}
                                                  </div>
                                             </div>
                                             <button
                                                  type="button"
                                                  onClick={() =>
                                                       fillDemoAccount(
                                                            account.email,
                                                            account.password
                                                       )
                                                  }
                                                  className="btn btn-xs btn-primary"
                                                  disabled={isLoading}
                                             >
                                                  Use
                                             </button>
                                        </div>
                                   ))}
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
