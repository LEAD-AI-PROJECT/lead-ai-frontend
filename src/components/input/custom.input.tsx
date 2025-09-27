import * as React from "react";

type CustomInputProps = {
     label: string;
     id?: string;
     name?: string;
     type?: React.HTMLInputTypeAttribute;
     value?: string;
     onChange?: React.ChangeEventHandler<HTMLInputElement>;
     placeholder?: string;
     required?: boolean;
     disabled?: boolean;
     error?: string;
     helperText?: string;
     className?: string; // wrapper luar
     inputClassName?: string; // tambahan class utk <input>
     startAdornment?: React.ReactNode; // konten di depan (icon/teks/button)
     endAdornment?: React.ReactNode; // konten di belakang (icon/teks/button)
};

export default function CustomInput({
     label,
     id: idProp,
     name,
     type = "text",
     value,
     onChange,
     placeholder,
     required,
     disabled,
     error,
     helperText,
     className = "",
     inputClassName = "",
     startAdornment,
     endAdornment,
}: CustomInputProps) {
     const autoId = React.useId();
     const id = idProp ?? autoId;
     const describedBy = error ? `${id}-error` : helperText ? `${id}-help` : undefined;

     const underlineBase = "border-b px-0 py-2 flex items-center gap-2 transition-colors";
     const underlineColor = disabled
          ? "border-gray-200"
          : error
          ? "border-red-500 focus-within:border-red-600"
          : "border-gray-300 focus-within:border-gray-900";

     return (
          <div className={`w-full ${className}`}>
               <label htmlFor={id} className="block text-sm text-gray-600 mb-1">
                    {label} {required ? <span className="text-red-500">*</span> : null}
               </label>

               {/* Field wrapper dengan underline full-width */}
               <div className={`${underlineBase} ${underlineColor}`}>
                    {startAdornment ? (
                         <div className="shrink-0 text-gray-500">{startAdornment}</div>
                    ) : null}

                    <input
                         id={id}
                         name={name}
                         type={type}
                         value={value}
                         onChange={onChange}
                         placeholder={placeholder}
                         required={required}
                         disabled={disabled}
                         aria-invalid={!!error}
                         aria-describedby={describedBy}
                         className={[
                              "flex-1 bg-transparent outline-none border-0 focus:ring-0",
                              disabled ? "text-gray-400 placeholder:text-gray-300" : "",
                              inputClassName,
                         ].join(" ")}
                    />

                    {endAdornment ? (
                         <div className="shrink-0 text-gray-500">{endAdornment}</div>
                    ) : null}
               </div>

               {error ? (
                    <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
                         {error}
                    </p>
               ) : helperText ? (
                    <p id={`${id}-help`} className="mt-1 text-xs text-gray-500">
                         {helperText}
                    </p>
               ) : null}
          </div>
     );
}
