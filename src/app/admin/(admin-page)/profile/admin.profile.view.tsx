"use client";
import AdminProfilePasswordView from "./_components/admin.profile.password.view";
import useAdminProfile from "./admin.profile.hook";

export default function AdminProfileView() {
     const {
          register,
          handleSubmit,
          errors,
          isSubmitting,
          previewUrl,
          onFileChange,
          isUploadingAvatar,
          showSuccess,
          showAvatarSuccess,
     } = useAdminProfile();

     return (
          <div className="">
               <div className="text-3xl font-medium mb-4">Profile</div>

               {/* Success Messages */}
               {showSuccess && (
                    <div className="alert alert-success mb-6 text-white">
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
                         <span>Profile updated successfully!</span>
                    </div>
               )}

               {showAvatarSuccess && (
                    <div className="alert alert-success text-white mb-6">
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
                         <span>Avatar uploaded successfully!</span>
                    </div>
               )}

               <div className="w-full flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-2/3">
                         <form
                              onSubmit={handleSubmit}
                              className="bg-white p-6 rounded-lg shadow-sm"
                         >
                              <div className="grid grid-cols-1 gap-4">
                                   {/* Avatar Preview & Upload */}
                                   <div className="flex items-center gap-4">
                                        <div className="avatar">
                                             <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 relative">
                                                  {previewUrl ? (
                                                       <img src={previewUrl} alt="Profile avatar" />
                                                  ) : (
                                                       <div className="bg-neutral text-neutral-content flex items-center justify-center text-3xl font-bold">
                                                            {register("name")
                                                                 .name?.charAt(0)
                                                                 ?.toUpperCase() || "U"}
                                                       </div>
                                                  )}
                                                  {isUploadingAvatar && (
                                                       <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                                            <span className="loading loading-spinner loading-md text-white"></span>
                                                       </div>
                                                  )}
                                             </div>
                                        </div>
                                        <div className="flex-1">
                                             <label htmlFor="avatar" className="label">
                                                  <span className="label-text">Avatar</span>
                                             </label>
                                             <input
                                                  id="avatar"
                                                  type="file"
                                                  accept="image/*"
                                                  onChange={onFileChange}
                                                  disabled={isUploadingAvatar}
                                                  className="file-input bg-white file-input-bordered w-full border-gray-300"
                                             />
                                             <p className="text-xs text-gray-500 mt-1">
                                                  {isUploadingAvatar
                                                       ? "Uploading avatar..."
                                                       : "Recommended: Square image, at least 200x200px"}
                                             </p>
                                        </div>
                                   </div>

                                   <div>
                                        <label htmlFor="name" className="label">
                                             <span className="label-text">Name</span>
                                        </label>
                                        <input
                                             id="name"
                                             {...register("name")}
                                             className="input input-bordered w-full bg-white border-gray-300"
                                             placeholder="Name"
                                        />
                                        {errors?.name && (
                                             <p className="text-sm text-red-600">
                                                  {errors.name.message}
                                             </p>
                                        )}
                                   </div>

                                   <div>
                                        <label htmlFor="email" className="label">
                                             <span className="label-text">Email</span>
                                        </label>
                                        <input
                                             id="email"
                                             {...register("email")}
                                             className="input input-bordered w-full bg-white border-gray-300"
                                             disabled
                                             placeholder="Email"
                                        />
                                        {errors?.email && (
                                             <p className="text-sm text-red-600">
                                                  {errors.email.message}
                                             </p>
                                        )}
                                   </div>

                                   <div>
                                        <label htmlFor="phone" className="label">
                                             <span className="label-text">Phone</span>
                                        </label>
                                        <input
                                             id="phone"
                                             type="tel"
                                             {...register("phone")}
                                             className="input input-bordered w-full bg-white border-gray-300"
                                             placeholder="Phone"
                                        />
                                        {errors?.phone && (
                                             <p className="text-sm text-red-600">
                                                  {errors.phone.message}
                                             </p>
                                        )}
                                   </div>

                                   <div>
                                        <label htmlFor="address" className="label">
                                             <span className="label-text">Address</span>
                                        </label>
                                        <input
                                             id="address"
                                             {...register("address")}
                                             className="input input-bordered w-full bg-white border-gray-300"
                                             placeholder="Address"
                                        />
                                        {errors?.address && (
                                             <p className="text-sm text-red-600">
                                                  {errors.address.message}
                                             </p>
                                        )}
                                   </div>

                                   <div>
                                        <label htmlFor="bio" className="label">
                                             <span className="label-text">Bio</span>
                                        </label>
                                        <textarea
                                             id="bio"
                                             {...register("bio")}
                                             className="textarea textarea-bordered w-full bg-white border-gray-300"
                                             placeholder="Bio"
                                             rows={4}
                                        />
                                        {errors?.bio && (
                                             <p className="text-sm text-red-600">
                                                  {errors.bio.message}
                                             </p>
                                        )}
                                   </div>
                              </div>

                              <div className="flex justify-end mt-6">
                                   <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isSubmitting}
                                   >
                                        {isSubmitting ? "Saving..." : "Save"}
                                   </button>
                              </div>
                         </form>
                    </div>
                    {/* change password panel */}
                    <div className="lg:w-1/3">
                         <div className="bg-white p-6 rounded-lg shadow-sm">
                              <div className="text-xl font-medium mb-3">Change password</div>
                              <AdminProfilePasswordView />
                         </div>
                    </div>
               </div>
          </div>
     );
}
