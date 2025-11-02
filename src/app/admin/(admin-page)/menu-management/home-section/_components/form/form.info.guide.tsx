"use client";
import { useState } from "react";

export const FormInfoGuide = () => {
     const [isOpen, setIsOpen] = useState(false);

     return (
          <div className="mb-6">
               <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="btn btn-sm btn-outline gap-2"
               >
                    <svg
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         className="h-5 w-5 stroke-current"
                    >
                         <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                         ></path>
                    </svg>
                    How to use MDX Editor
                    <svg
                         className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor"
                    >
                         <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"
                         />
                    </svg>
               </button>

               {isOpen && (
                    <div className="alert alert-info mt-3 text-white">
                         <div>
                              <h4 className="font-bold mb-3">MDX Editor Guide</h4>
                              <ul className="text-sm space-y-2">
                                   <li>
                                        <strong>Bold:</strong>{" "}
                                        <code className="bg-black bg-opacity-30 px-2 py-1 rounded">
                                             **text**
                                        </code>{" "}
                                        or use toolbar
                                   </li>
                                   <li>
                                        <strong>Italic:</strong>{" "}
                                        <code className="bg-black bg-opacity-30 px-2 py-1 rounded">
                                             *text*
                                        </code>{" "}
                                        or use toolbar
                                   </li>
                                   <li>
                                        <strong>Line Breaks:</strong> Press{" "}
                                        <kbd className="bg-black bg-opacity-30 px-2 py-1 rounded">
                                             Enter
                                        </kbd>{" "}
                                        to create paragraphs
                                   </li>
                                   <li>
                                        <strong>Lists:</strong> Type{" "}
                                        <code className="bg-black bg-opacity-30 px-2 py-1 rounded">
                                             -{" "}
                                        </code>{" "}
                                        for bullets or{" "}
                                        <code className="bg-black bg-opacity-30 px-2 py-1 rounded">
                                             1.{" "}
                                        </code>{" "}
                                        for numbers
                                   </li>
                                   <li>
                                        <strong>Links:</strong>{" "}
                                        <code className="bg-black bg-opacity-30 px-2 py-1 rounded">
                                             [text](url)
                                        </code>
                                   </li>
                              </ul>
                         </div>
                    </div>
               )}
          </div>
     );
};
