import React from 'react'
import { Text } from '@gravity-ui/uikit'
import {ChatCompletionMessageParam} from "openai/src/resources/chat/completions.ts";

import styles from './ChatMessage.module.css'
import {Markdown} from "../../../shared/ui";

interface ChatMessageProps {
  author: ChatCompletionMessageParam['role'];
  content: ChatCompletionMessageParam['content'];
  self?: boolean;
  date?: string;
}

const nicknames = {
  user: 'Me',
  system: 'GPT',
  function: 'GPT',
  assistant: 'GPT',
  tool: 'GPT',
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  author,
  content,
  date,
  self = false
}) => {
  return (
    <div
      className={[
        styles['chat-message'],
        self ? styles['chat-message__self'] : ''
      ].join(' ')}
    >
      <Text
        className={styles['chat-message_author']}
        variant='body-2'
        color={ self ? 'misc-heavy' : 'utility-heavy'}
      >
        {nicknames[author]}
      </Text>

      <div>
        <Markdown
          content={
            typeof content === 'string'
              ? content
              : `content is not string (${typeof content})`
          }
        />
      </div>
    </div>
  )
}