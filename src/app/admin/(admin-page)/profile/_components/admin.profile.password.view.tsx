import useAdminProfilePasswordHook from "./admin.profile.password.hook";

export default function AdminProfilePasswordView() {
     const {
          pwdErrors,
          pwdHandleSubmit,
          pwdRegister,
          pwdSubmitting,
          renderError,
          validateConfirm,
     } = useAdminProfilePasswordHook();
     return (
          <form onSubmit={pwdHandleSubmit} className="space-y-3">
               <div>
                    <label htmlFor="current_password" className="label">
                         <span className="label-text">Current password</span>
                    </label>
                    <input
                         id="current_password"
                         type="password"
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
