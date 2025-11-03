import useAdminProfilePasswordHook from "./admin.profile.password.hook";

export default function AdminProfilePasswordView() {
     const {
          pwdErrors,
          pwdHandleSubmit,
          pwdRegister,
          pwdSubmitting,
          renderError,
          validateConfirm,
          showSuccess,
     } = useAdminProfilePasswordHook();
     return (
          <form onSubmit={pwdHandleSubmit} className="space-y-3">
               {showSuccess && (
                    <div className="alert alert-success text-white">
                         <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="stroke-current shrink-0 h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                         >
                              <path
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                                   strokeWidth="2"
                                   d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                         </svg>
                         <span>Password changed successfully!</span>
                    </div>
               )}

               <div>
                    <label htmlFor="current_password" className="label">
                         <span className="label-text">Current password</span>
                    </label>
                    <input
                         id="current_password"
                         type="password"
                         placeholder="Enter your current password"
                         {...pwdRegister("current_password", {
                              required: "Current password is required",
                         })}
                         className="input input-bordered w-full"
                    />
                    {pwdErrors?.current_password && (
                         <p className="text-sm text-red-600">
                              {renderError(pwdErrors.current_password)}
                         </p>
                    )}
               </div>

               <div>
                    <label htmlFor="new_password" className="label">
                         <span className="label-text">New password</span>
                    </label>
                    <input
                         id="new_password"
                         type="password"
                         placeholder="Enter new password (min. 8 characters)"
                         {...pwdRegister("new_password", {
                              required: "New password is required",
                              minLength: { value: 8, message: "Minimum 8 characters" },
                         })}
                         className="input input-bordered w-full"
                    />
                    {pwdErrors?.new_password && (
                         <p className="text-sm text-red-600">
                              {renderError(pwdErrors.new_password)}
                         </p>
                    )}
               </div>

               <div>
                    <label htmlFor="confirm_password" className="label">
                         <span className="label-text">Confirm new password</span>
                    </label>
                    <input
                         id="confirm_password"
                         type="password"
                         placeholder="Re-enter your new password"
                         {...pwdRegister("confirm_password", {
                              required: "Confirm your new password",
                              validate: validateConfirm,
                         })}
                         className="input input-bordered w-full"
                    />
                    {pwdErrors?.confirm_password && (
                         <p className="text-sm text-red-600">
                              {renderError(pwdErrors.confirm_password)}
                         </p>
                    )}
               </div>

               <div className="flex justify-end">
                    <button type="submit" className="btn btn-secondary" disabled={pwdSubmitting}>
                         {pwdSubmitting ? "Saving..." : "Change Password"}
                    </button>
               </div>
          </form>
     );
}
