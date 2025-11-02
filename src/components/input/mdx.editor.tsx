"use client";
import {
     MDXEditor,
     headingsPlugin,
     listsPlugin,
     quotePlugin,
     thematicBreakPlugin,
     markdownShortcutPlugin,
     linkPlugin,
     linkDialogPlugin,
     imagePlugin,
     tablePlugin,
     codeBlockPlugin,
     codeMirrorPlugin,
     toolbarPlugin,
     UndoRedo,
     BoldItalicUnderlineToggles,
     BlockTypeSelect,
     CreateLink,
     InsertImage,
     InsertTable,
     InsertThematicBreak,
     ListsToggle,
     Separator,
     type MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import "./mdx.editor.module.css";
import { forwardRef } from "react";

interface MdxEditorProps {
     value: string;
     onChange: (value: string) => void;
     placeholder?: string;
     readOnly?: boolean;
}

const MdxEditor = forwardRef<MDXEditorMethods, MdxEditorProps>(
     ({ value, onChange, placeholder = "Write your content here...", readOnly = false }, ref) => {
          return (
               <div className="border border-gray-300 rounded-lg overflow-hidden min-h-[300px] mdx-editor-wrapper">
                    <MDXEditor
                         ref={ref}
                         markdown={value}
                         onChange={onChange}
                         placeholder={placeholder}
                         readOnly={readOnly}
                         plugins={[
                              headingsPlugin(),
                              listsPlugin(),
                              quotePlugin(),
                              thematicBreakPlugin(),
                              linkPlugin(),
                              linkDialogPlugin(),
                              imagePlugin(),
                              tablePlugin(),
                              codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
                              codeMirrorPlugin({
                                   codeBlockLanguages: {
                                        js: "JavaScript",
                                        ts: "TypeScript",
                                        jsx: "JSX",
                                        tsx: "TSX",
                                        css: "CSS",
                                        html: "HTML",
                                        json: "JSON",
                                        python: "Python",
                                   },
                              }),
                              toolbarPlugin({
                                   toolbarContents: () => (
                                        <>
                                             <UndoRedo />
                                             <Separator />
                                             <BoldItalicUnderlineToggles />
                                             <Separator />
                                             <BlockTypeSelect />
                                             <Separator />
                                             <CreateLink />
                                             <InsertImage />
                                             <Separator />
                                             <ListsToggle options={["bullet", "number"]} />
                                             <Separator />
                                             <InsertTable />
                                             <InsertThematicBreak />
                                        </>
                                   ),
                              }),
                              markdownShortcutPlugin(),
                         ]}
                    />
               </div>
          );
     }
);

MdxEditor.displayName = "MdxEditor";

export default MdxEditor;
