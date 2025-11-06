"use client";
import { forwardRef, useRef, useState, useEffect } from "react";
import MarkdownPreview from "../markdown/markdown-preview";

interface SplitMarkdownEditorProps {
     value: string;
     onChange: (value: string) => void;
     placeholder?: string;
     readOnly?: boolean;
}

const SplitMarkdownEditor = forwardRef<HTMLTextAreaElement, SplitMarkdownEditorProps>(
     ({ value, onChange, placeholder = "Write markdown here...", readOnly = false }, ref) => {
          const textareaRef = useRef<HTMLTextAreaElement>(null);
          const [localValue, setLocalValue] = useState(value);
          const [history, setHistory] = useState<string[]>([value]);
          const [historyIndex, setHistoryIndex] = useState(0);

          // Sync external value changes
          useEffect(() => {
               setLocalValue(value);
          }, [value]);

          const insertMarkdown = (before: string, after: string = "") => {
               const textarea = textareaRef.current;
               if (!textarea) return;

               const start = textarea.selectionStart;
               const end = textarea.selectionEnd;
               const selectedText = localValue.substring(start, end) || "text";

               // For list items, ensure they start on a new line
               let prefix = "";
               if ((before === "1. " || before === "- " || before === "# ") && start > 0) {
                    // Check if we're not already at the start of a line
                    const charBefore = localValue[start - 1];
                    if (charBefore && charBefore !== "\n") {
                         prefix = "\n";
                    }
               }

               const newValue =
                    localValue.substring(0, start) +
                    prefix +
                    before +
                    selectedText +
                    after +
                    localValue.substring(end);

               updateHistory(newValue);

               // Move cursor
               setTimeout(() => {
                    textarea.focus();
                    const newStart = start + prefix.length + before.length;
                    textarea.setSelectionRange(newStart, newStart + selectedText.length);
               }, 0);
          };

          const updateHistory = (newValue: string) => {
               const newHistory = history.slice(0, historyIndex + 1);
               newHistory.push(newValue);
               setHistory(newHistory);
               setHistoryIndex(newHistory.length - 1);
               setLocalValue(newValue);
               onChange(newValue);
          };

          const handleChange = (newValue: string) => {
               setLocalValue(newValue);
               onChange(newValue);
          };

          const undo = () => {
               if (historyIndex > 0) {
                    const newIndex = historyIndex - 1;
                    setHistoryIndex(newIndex);
                    onChange(history[newIndex]);
               }
          };

          const redo = () => {
               if (historyIndex < history.length - 1) {
                    const newIndex = historyIndex + 1;
                    setHistoryIndex(newIndex);
                    onChange(history[newIndex]);
               }
          };

          const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
               // Handle Enter for smart list continuation
               if (e.key === "Enter" && !e.ctrlKey && !e.shiftKey) {
                    const textarea = textareaRef.current;
                    if (!textarea) return;

                    const start = textarea.selectionStart;
                    const lineStart = localValue.lastIndexOf("\n", start - 1) + 1;
                    const currentLine = localValue.substring(lineStart, start);

                    // Check if current line is numbered list (e.g., "1. ", "2. ")
                    const numberedListMatch = currentLine.match(/^(\d+)\.\s+/);
                    if (numberedListMatch) {
                         e.preventDefault();
                         const nextNumber = parseInt(numberedListMatch[1]) + 1;
                         const newValue =
                              localValue.substring(0, start) +
                              "\n" +
                              nextNumber +
                              ". " +
                              localValue.substring(start);
                         updateHistory(newValue);

                         setTimeout(() => {
                              textarea.setSelectionRange(
                                   start + nextNumber.toString().length + 3,
                                   start + nextNumber.toString().length + 3
                              );
                         }, 0);
                         return;
                    }

                    // Check if current line is bullet list (e.g., "- ")
                    if (currentLine.match(/^-\s+/)) {
                         e.preventDefault();
                         const newValue =
                              localValue.substring(0, start) + "\n- " + localValue.substring(start);
                         updateHistory(newValue);

                         setTimeout(() => {
                              textarea.setSelectionRange(start + 3, start + 3);
                         }, 0);
                         return;
                    }
               }

               // Ctrl+Z for Undo
               if (e.ctrlKey && e.key === "z") {
                    e.preventDefault();
                    undo();
               }
               // Ctrl+Shift+Z or Ctrl+Y for Redo
               if ((e.ctrlKey && e.shiftKey && e.key === "Z") || (e.ctrlKey && e.key === "y")) {
                    e.preventDefault();
                    redo();
               }
               // Ctrl+B for Bold
               if (e.ctrlKey && e.key === "b") {
                    e.preventDefault();
                    insertMarkdown("**", "**");
               }
               // Ctrl+I for Italic
               if (e.ctrlKey && e.key === "i") {
                    e.preventDefault();
                    insertMarkdown("*", "*");
               }
               // Ctrl+K for Link
               if (e.ctrlKey && e.key === "k") {
                    e.preventDefault();
                    insertMarkdown("[", "](url)");
               }
               // Ctrl+Shift+X for Strikethrough
               if (e.ctrlKey && e.shiftKey && e.key === "X") {
                    e.preventDefault();
                    insertMarkdown("~~", "~~");
               }
          };

          return (
               <div className="border border-gray-300 rounded-lg overflow-hidden">
                    {/* Toolbar */}
                    <div className="bg-gray-50 border-b border-gray-300 px-4 py-2 flex gap-2 flex-wrap">
                         <button
                              type="button"
                              onClick={undo}
                              disabled={historyIndex === 0}
                              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                              title="Undo (Ctrl+Z)"
                         >
                              ↶ Undo
                         </button>
                         <button
                              type="button"
                              onClick={redo}
                              disabled={historyIndex === history.length - 1}
                              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                              title="Redo (Ctrl+Shift+Z)"
                         >
                              ↷ Redo
                         </button>
                         <div className="border-l border-gray-300"></div>
                         <button
                              type="button"
                              onClick={() => insertMarkdown("**", "**")}
                              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-blue-50 font-bold text-sm"
                              title="Bold"
                         >
                              B
                         </button>
                         <button
                              type="button"
                              onClick={() => insertMarkdown("*", "*")}
                              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-blue-50 italic text-sm"
                              title="Italic"
                         >
                              I
                         </button>
                         <button
                              type="button"
                              onClick={() => insertMarkdown("~~", "~~")}
                              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-blue-50 line-through text-sm"
                              title="Strikethrough"
                         >
                              S
                         </button>
                         <div className="border-l border-gray-300"></div>
                         <button
                              type="button"
                              onClick={() => insertMarkdown("[", "](url)")}
                              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-blue-50 text-sm"
                              title="Link"
                         >
                              🔗
                         </button>
                         <button
                              type="button"
                              onClick={() => insertMarkdown("# ", "")}
                              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-blue-50 font-bold text-sm"
                              title="Heading"
                         >
                              H1
                         </button>
                         <button
                              type="button"
                              onClick={() => insertMarkdown("1. ", "")}
                              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-blue-50 text-sm"
                              title="Numbered List"
                         >
                              1. List
                         </button>
                         <button
                              type="button"
                              onClick={() => insertMarkdown("- ", "")}
                              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-blue-50 text-sm"
                              title="Bullet List"
                         >
                              • List
                         </button>
                         <button
                              type="button"
                              onClick={() => insertMarkdown("\n\n", "")}
                              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-blue-50 text-sm text-xs"
                              title="Line Break"
                         >
                              ↵ Break
                         </button>
                    </div>

                    <div className="flex gap-0 h-96">
                         {/* Left: Editor */}
                         <div className="flex-1 flex flex-col border-r border-gray-300">
                              <div className="bg-gray-50 border-b border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
                                   ✏️ Markdown
                              </div>
                              <textarea
                                   ref={textareaRef}
                                   value={localValue}
                                   onChange={e => handleChange(e.target.value)}
                                   onKeyDown={handleKeyDown}
                                   placeholder={placeholder}
                                   readOnly={readOnly}
                                   className="flex-1 p-4 font-mono text-sm resize-none focus:outline-none border-0"
                              />
                         </div>

                         {/* Right: Preview */}
                         <div className="flex-1 flex flex-col bg-white">
                              <div className="bg-gray-50 border-b border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
                                   👁️ Preview
                              </div>
                              <div className="flex-1 overflow-auto p-4">
                                   <MarkdownPreview content={localValue} />
                              </div>
                         </div>
                    </div>
               </div>
          );
     }
);

SplitMarkdownEditor.displayName = "SplitMarkdownEditor";

export default SplitMarkdownEditor;
