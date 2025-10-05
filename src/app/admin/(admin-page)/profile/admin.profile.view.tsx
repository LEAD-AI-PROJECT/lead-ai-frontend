"use client";
import AdminProfilePasswordView from "./_components/admin.profile.password.view";
import useAdminProfile from "./admin.profile.hook";

export default function AdminProfileView() {
     const { register, handleSubmit, errors, isSubmitting, previewUrl, onFileChange } =
          useAdminProfile();

     return (
          <div className="">
               <div className="text-3xl font-medium mb-4">Profile</div>
               <div className="w-full flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-2/3">
                         <form
                              onSubmit={handleSubmit}
                              className="bg-white p-6 rounded-lg shadow-sm"
                         >
                              <div className="grid grid-cols-1 gap-4">
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
                                             className="input input-bordered w-full bg-white border-gray-300 "
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
                                             {...register("phone")}
                                             className="input input-bordered w-full bg-white border-gray-300 "
                                             disabled
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

                                   <div>
                                        <label htmlFor="photo" className="label">
                                             <span className="label-text">Photo</span>
                                        </label>
                                        <input
                                             id="photo"
                                             type="file"
                                             accept="image/*"
                                             onChange={onFileChange}
                                             className="file-input bg-white file-input-bordered w-full border-gray-300"
                                        />
                                        {previewUrl && (
                                             <img
                                                  src={previewUrl}
                                                  alt="Profile preview"
                                                  className="w-32 h-auto mt-2 rounded"
                                             />
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
