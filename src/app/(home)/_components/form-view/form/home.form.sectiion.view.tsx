"use client";
import CustomInput from "@/components/input/custom.input";
import { useState } from "react";

export default function HomeFormSectionView() {
     const subjects = [
          { label: "General Inquiry", value: "general" },
          { label: "Brand Identity", value: "brand" },
          { label: "UI/UX", value: "uiux" },
          { label: "Packaging Design", value: "packaging", disabled: false },
     ];

     const [subject, setSubject] = useState("general");
     return (
          <div className="home-form-input">
               <div className="home-form-input-title">Submit Your Free Trial</div>
               <div className="home-form-input-subtitle">
                    We’re getting a high volume of requests. Submit your sample today to secure your
                    spot, trials are limited and handled first come, first served!
               </div>
               <div className="grid lg:md:grid-cols-2 gap-4 mt-10">
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
                    {/* <SubjectSelect
                                   className="lg:md:col-span-2"
                                   options={subjects}
                                   value={subject}
                                   onChange={setSubject}
                              /> */}
                    <CustomInput
                         className="lg:md:col-span-2"
                         label="Message"
                         placeholder=""
                         required
                    />
                    <div className="w-full lg:md:col-span-2 flex justify-end mt-10">
                         <button className="primary">
                              <div className="text-xl text-white">Send Message</div>
                         </button>
                    </div>
               </div>
          </div>
     );
}
