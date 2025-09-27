import * as React from "react";

type Option = {
     label: string;
     value: string;
     disabled?: boolean;
};

type SubjectSelectProps = {
     label?: string;
     options: Option[];
     value: string;
     onChange?: (val: string) => void;
     className?: string;
};

export default function SubjectSelect({
     label = "Select Subject?",
     options,
     value,
     onChange,
     className = "",
}: SubjectSelectProps) {
     const name = React.useId();

     return (
          <fieldset className={`w-full ${className}`}>
               <legend className="text-sm font-medium text-[#B39999] mb-2">{label}</legend>

               <div className="mt-2 flex flex-wrap items-center justify-between gap-x-10 gap-y-3">
                    {options.map((opt, i) => {
                         const id = `${name}-${i}`;
                         const isSelected = value === opt.value;

                         return (
                              <label
                                   key={opt.value}
                                   htmlFor={id}
                                   className={[
                                        "group inline-flex items-center gap-2 select-none cursor-pointer",
                                        opt.disabled
                                             ? "opacity-50 cursor-not-allowed"
                                             : isSelected
                                             ? "text-[#E0E0E0]"
                                             : "text-[#B39999]",
                                        "focus-within:outline-none",
                                   ].join(" ")}
                              >
                                   {/* bullet/dot */}
                                   <span
                                        className={[
                                             "h-2.5 w-2.5 rounded-full transition-colors",
                                             isSelected ? "bg-[#E0E0E0]" : "bg-[#B39999]",
                                             "ring-2 ring-transparent group-focus-visible:ring-[#B39999]",
                                        ].join(" ")}
                                   />
                                   <span className="text-sm">{opt.label}</span>

                                   <input
                                        id={id}
                                        type="radio"
                                        name={name}
                                        value={opt.value}
                                        className="sr-only"
                                        checked={isSelected}
                                        onChange={() => !opt.disabled && onChange?.(opt.value)}
                                        disabled={opt.disabled}
                                   />
                              </label>
                         );
                    })}
               </div>
          </fieldset>
     );
}
