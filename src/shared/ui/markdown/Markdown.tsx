import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Text, Link } from '@gravity-ui/uikit';

import styles from './Markdown.module.css';

interface MarkdownProps {
  content: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  let markdown = content
  // Support multiple linebreaks
  markdown = markdown.replace(/```[\s\S]*?```/g, (m) =>
    m.replace(/\n/g, "\n")
  );
  markdown = markdown.replace(/(?<=\n\n)(?![*-])\n/g, "&nbsp;\n");

// Support single linebreak
  markdown = markdown.replace(/(\n)/gm, " \n");

  return (
    <ReactMarkdown
      className={styles['markdown']}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeHighlight, rehypeKatex]}
      components={{
        p(props) {
          const { children, className, node, ...rest } = props;

          return <Text as={'p'} className={className} variant='body-1'>{children}</Text>;
        },

        li(props) {
          const { className, children, node, ...rest } = props;

          return (
            <li className={className}>
              <span>{children}</span>
            </li>
          )
        },

        a(props) {
          const { children, href, node, ...rest } = props;

          return <Link target='_blank' href={href || '#'} {...rest}>{children}</Link>;
        },

      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}