"use client";
import CustomInput from "@/components/input/custom.input";
import "../home.style.scss";
import { useState } from "react";
import SubjectSelect from "@/components/select/custom.select";
export default function HomeFormView() {
     const subjects = [
          { label: "General Inquiry", value: "general" },
          { label: "Brand Identity", value: "brand" },
          { label: "UI/UX", value: "uiux" },
          { label: "Packaging Design", value: "packaging", disabled: false },
     ];

     const [subject, setSubject] = useState("general");

     return (
          <div id="company" className="py-[3rem] px-[8rem] bg-white">
               <div className="home-form">
                    <div className="home-form-content">
                         <div className="home-form-content-title">Free Data Cleaning Trial</div>
                         <div className="home-form-content-subtitle">
                              Curious how Lead AI improves accuracy with clean data? Upload a small
                              sample dataset and our team will process it for free. You’ll get back
                              a cleaned, structured version ready for AI training
                         </div>
                         <div className="home-form-content-info">
                              <div className="">Contact Info</div>
                              <div className="flex items-center text-sm gap-2">
                                   <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                   >
                                        <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                        />
                                   </svg>
                                   Firdaus@aileadyou.com
                              </div>
                              <div className="flex items-center text-sm gap-2">
                                   <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                   >
                                        <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                        />
                                   </svg>
                                   +6583079194
                              </div>
                              <div className="flex items-center text-sm gap-2">
                                   <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                   >
                                        <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                        <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                        />
                                   </svg>
                                   Block S7, located on 2 Science Drive 3, Singapore 117543
                              </div>
                         </div>
                    </div>
                    <div className="home-form-input">
                         <div className="home-form-input-title">Submit Your Free Trial</div>
                         <div className="home-form-input-subtitle">
                              We’re getting a high volume of requests. Submit your sample today to
                              secure your spot, trials are limited and handled first come, first
                              served!
                         </div>
                         <div className="grid grid-cols-2 gap-4 mt-10">
                              <CustomInput label="First Name" placeholder="" required />
                              <CustomInput label="Last Name" placeholder="" required />
                              <CustomInput label="Work Email" placeholder="" required />
                              <CustomInput
                                   label="Phone Number"
                                   type="number"
                                   placeholder=""
                                   required
                                   startAdornment={"+65"}
                              />
                              <SubjectSelect
                                   className="col-span-2"
                                   options={subjects}
                                   value={subject}
                                   onChange={setSubject}
                              />
                              <CustomInput
                                   className="col-span-2"
                                   label="Message"
                                   placeholder=""
                                   required
                              />
                              <div className="w-full col-span-2 flex justify-end mt-10">
                                   <button className="primary">
                                        <div className="text-xl text-white">Send Message</div>
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
