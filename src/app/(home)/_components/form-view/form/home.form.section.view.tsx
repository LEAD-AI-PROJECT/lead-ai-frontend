"use client";
import CustomInput from "@/components/input/custom.input";
import useHomeFormSectionHook from "./home.form.section.hook";

export default function HomeFormSectionView() {
     const { register, handleSubmit, errors, isSubmitting, showSuccess } = useHomeFormSectionHook();

     return (
          <form onSubmit={handleSubmit} className="home-form-input">
               <div className="home-form-input-title">Submit Your Free Trial</div>
               <div className="home-form-input-subtitle">
                    We're getting a high volume of requests. Submit your sample today to secure your
                    spot, trials are limited and handled first come, first served!
               </div>

               {showSuccess && (
                    <div className="alert bg-white border border-green-500 mt-6">
                         <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="stroke-current shrink-0 h-6 w-6 text-green-600"
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
                         <span className="text-green-700">
                              Your message has been sent successfully! We'll get back to you soon.
                         </span>
                    </div>
               )}

               <div className="grid lg:md:grid-cols-2 gap-4 mt-10">
                    <div>
                         <CustomInput
                              label="First Name"
                              placeholder=""
                              required
                              {...register("firstName")}
                         />
                         {errors?.firstName && (
                              <p className="text-sm text-red-600 mt-1">
                                   {errors.firstName.message}
                              </p>
                         )}
                    </div>

                    <div>
                         <CustomInput
                              label="Last Name"
                              placeholder=""
                              required
                              {...register("lastName")}
                         />
                         {errors?.lastName && (
                              <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
                         )}
                    </div>

                    <div>
                         <CustomInput
                              label="Work Email"
                              placeholder=""
                              required
                              {...register("email")}
                         />
                         {errors?.email && (
                              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                         )}
                    </div>

                    <div>
                         <CustomInput
                              label="Phone Number"
                              type="tel"
                              placeholder=""
                              required
                              maxLength={15}
                              pattern="[0-9]*"
                              startAdornment={"+65"}
                              {...register("phone")}
                         />
                         {errors?.phone && (
                              <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                         )}
                    </div>

                    <div className="lg:md:col-span-2">
                         <CustomInput
                              label="Company (Optional)"
                              placeholder=""
                              {...register("company")}
                         />
                    </div>

                    <div className="lg:md:col-span-2">
                         <CustomInput
                              label="Message"
                              placeholder=""
                              required
                              {...register("message")}
                         />
                         {errors?.message && (
                              <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
                         )}
                    </div>

                    <div className="w-full lg:md:col-span-2 flex justify-end mt-10">
                         <button type="submit" className="primary" disabled={isSubmitting}>
                              <div className="text-xl text-white">
                                   {isSubmitting ? "Sending..." : "Send Message"}
                              </div>
                         </button>
                    </div>
               </div>
          </form>
     );
}
