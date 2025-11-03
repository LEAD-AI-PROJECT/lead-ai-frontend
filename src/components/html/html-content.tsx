"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface HtmlContentProps {
     children: string;
}

// Render markdown + raw HTML content (e.g. <span> tags, <strong>, etc).
// Unescape backslashes and parse markdown while allowing raw HTML via rehype-raw
export const HtmlContent = ({ children }: HtmlContentProps) => {
     // Unescape common escape sequences from MDX editor
     let unescaped = (children || "")
          .replaceAll('\\"', '"') // Unescape quotes first
          .replaceAll("\\'", "'") // Unescape single quotes
          .replaceAll("\\\\", "\\") // Unescape double backslashes
          .replaceAll("\\n", "\n") // Unescape newlines
          .replaceAll("\\t", "\t") // Unescape tabs
          .replaceAll("\\", ""); // Remove any remaining lone backslashes

     // If content contains HTML tags, render as raw HTML
     if (/<[^>]+>/.test(unescaped)) {
          return (
               <div
                    className="prose prose-sm max-w-none [&_p]:mb-4 [&_p]:leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: unescaped }}
               />
          );
     }

     // Otherwise use markdown rendering
     return (
          <div className="prose prose-sm max-w-none [&_p]:mb-4 [&_p]:leading-relaxed">
               <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {unescaped}
               </ReactMarkdown>
          </div>
     );
};

export default HtmlContent;
