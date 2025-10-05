import { useEffect } from "react";

interface AlertConfirmationProps {
     onOk?: () => void;
     onCancel?: () => void;
     message?: string;
     open?: boolean;
}
export default function AlertConfirmation({
     onOk,
     onCancel,
     message,
     open = false,
}: Readonly<AlertConfirmationProps>) {
     useEffect(() => {
          if (typeof document === "undefined") return;
          const originalOverflow = document.body.style.overflow;
          if (open) {
               document.body.style.overflow = "hidden";
          } else {
               document.body.style.overflow = originalOverflow;
          }
          return () => {
               document.body.style.overflow = originalOverflow;
          };
     }, [open]);

     if (!open) return null;
     return (
          <div className="bg-[#00000080] fixed inset-0 h-screen w-full flex items-center justify-center z-50 overflow-hidden ">
               <div
                    role="alert"
                    className="alert alert-vertical sm:alert-horizontal bg-white text-black fixed right-10 top-10 z-50 "
               >
                    <svg
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         className="stroke-info h-6 w-6 shrink-0"
                    >
                         <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                         ></path>
                    </svg>
                    <span>{message}</span>
                    <div className="flex gap-2">
                         <button onClick={onCancel} className="btn btn-sm">
                              Deny
                         </button>
                         <button onClick={onOk} className="btn btn-sm btn-primary">
                              Accept
                         </button>
                    </div>
               </div>
          </div>
     );
}
