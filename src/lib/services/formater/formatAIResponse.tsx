import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface MarkdownComponentsProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

const markdownComponents = {
  p: ({ children }: MarkdownComponentsProps) => (
    <p className="mb-4 text-gray-100 leading-relaxed">{children}</p>
  ),
  ul: ({ children }: MarkdownComponentsProps) => (
    <ul className="mb-4 space-y-2 list-disc list-inside">{children}</ul>
  ),
  ol: ({ children }: MarkdownComponentsProps) => (
    <ol className="mb-4 space-y-2 list-decimal list-inside">{children}</ol>
  ),
  li: ({ children }: MarkdownComponentsProps) => (
    <li className="text-gray-100 ml-4">{children}</li>
  ),
  code: ({
    node,
    inline,
    className,
    children,
    ...props
  }: MarkdownComponentsProps) => (
    <code
      className={`${className} ${
        inline ? "bg-teal-800/30 rounded px-1" : "block p-4 rounded-lg"
      }`}
      {...props}
    >
      {children}
    </code>
  ),
  blockquote: ({ children }: MarkdownComponentsProps) => (
    <blockquote className="border-l-4 border-teal-400 pl-4 italic">
      {children}
    </blockquote>
  ),
  // Add more custom components as needed
};

export const formatAIResponse = (content: string) => {
  return (
    <ReactMarkdown
      className="prose prose-invert max-w-none"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={markdownComponents}
    >
      {content}
    </ReactMarkdown>
  );
};
