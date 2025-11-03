import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Wrapper for the entire page content
    wrapper: ({ children, ...props }) => (
      <div className="p-4 max-w-4xl mx-auto" {...props}>
        {children}
      </div>
    ),
    // Headings
    h1: ({ children, ...props }) => (
      <h1
        className="text-4xl font-bold text-gray-900 dark:text-white mb-6 mt-8 border-b border-gray-200 dark:border-gray-700 pb-2"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4 mt-6" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-2xl font-medium text-gray-800 dark:text-gray-100 mb-3 mt-5" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-2 mt-4" {...props}>
        {children}
      </h4>
    ),
    h5: ({ children, ...props }) => (
      <h5 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2 mt-3" {...props}>
        {children}
      </h5>
    ),
    h6: ({ children, ...props }) => (
      <h6 className="text-base font-medium text-gray-800 dark:text-gray-100 mb-2 mt-3" {...props}>
        {children}
      </h6>
    ),

    // Paragraphs
    p: ({ children, ...props }) => (
      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" {...props}>
        {children}
      </p>
    ),

    // Lists
    ul: ({ children, ...props }) => (
      <ul
        className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="ml-4" {...props}>
        {children}
      </li>
    ),

    // Links
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors duration-200"
        {...props}
      >
        {children}
      </a>
    ),

    // Strong/Bold text
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-gray-900 dark:text-white" {...props}>
        {children}
      </strong>
    ),

    // Emphasis/Italic text
    em: ({ children, ...props }) => (
      <em className="italic text-gray-800 dark:text-gray-200" {...props}>
        {children}
      </em>
    ),

    // Code blocks
    code: ({ children, ...props }) => (
      <code
        className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    ),

    // Preformatted text
    pre: ({ children, ...props }) => (
      <pre
        className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-200 dark:border-gray-700"
        {...props}
      >
        {children}
      </pre>
    ),

    // Blockquotes
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 dark:bg-blue-900/20 text-gray-700 dark:text-gray-300 italic"
        {...props}
      >
        {children}
      </blockquote>
    ),

    // Horizontal rule
    hr: ({ ...props }) => <hr className="my-8 border-gray-300 dark:border-gray-600" {...props} />,

    // Tables
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto mb-4">
        <table
          className="min-w-full border-collapse border border-gray-300 dark:border-gray-600"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th
        className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left font-semibold text-gray-900 dark:text-white"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300"
        {...props}
      >
        {children}
      </td>
    ),
  };
}
