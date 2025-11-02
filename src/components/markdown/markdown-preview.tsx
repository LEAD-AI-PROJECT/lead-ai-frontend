"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownPreviewProps {
     content: string;
     className?: string;
     textColor?: string; // e.g., "text-red-600"
     headingColor?: string; // e.g., "text-blue-900"
     linkColor?: string; // e.g., "text-green-600"
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
     content,
     className = "",
     textColor = "text-gray-800",
     headingColor = "text-gray-900",
     linkColor = "text-blue-600",
}) => {
     return (
          <div className={`prose prose-sm max-w-none ${className}`}>
               <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                         ol: ({ node, ...props }: any) => (
                              <ol className="list-decimal list-inside pl-4 space-y-1" {...props} />
                         ),
                         ul: ({ node, ...props }: any) => (
                              <ul className="list-disc list-inside pl-4 space-y-1" {...props} />
                         ),
                         li: ({ node, ...props }: any) => <li className={textColor} {...props} />,
                         p: ({ node, ...props }: any) => (
                              <p className={`mb-3 ${textColor} leading-relaxed`} {...props} />
                         ),
                         br: () => <br className="my-2" />,
                         h1: ({ node, ...props }: any) => (
                              <h1
                                   className={`text-2xl font-bold mb-3 mt-4 ${headingColor}`}
                                   {...props}
                              />
                         ),
                         h2: ({ node, ...props }: any) => (
                              <h2
                                   className={`text-xl font-bold mb-2 mt-3 ${headingColor}`}
                                   {...props}
                              />
                         ),
                         h3: ({ node, ...props }: any) => (
                              <h3
                                   className={`text-lg font-bold mb-2 mt-2 ${headingColor}`}
                                   {...props}
                              />
                         ),
                         strong: ({ node, ...props }: any) => (
                              <strong className={`font-bold ${textColor}`} {...props} />
                         ),
                         em: ({ node, ...props }: any) => (
                              <em className={`italic ${textColor}`} {...props} />
                         ),
                         del: ({ node, ...props }: any) => (
                              <del className="line-through text-gray-600" {...props} />
                         ),
                         a: ({ node, ...props }: any) => (
                              <a
                                   className={`${linkColor} hover:underline`}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   {...props}
                              />
                         ),
                         code: ({ node, ...props }: any) => (
                              <code
                                   className="bg-gray-100 px-2 py-1 rounded font-mono text-sm text-gray-800"
                                   {...props}
                              />
                         ),
                         pre: ({ node, ...props }: any) => (
                              <pre
                                   className="bg-gray-100 p-3 rounded overflow-auto mb-2"
                                   {...props}
                              />
                         ),
                    }}
               >
                    {content}
               </ReactMarkdown>
          </div>
     );
};

export default MarkdownPreview;
