import {memo, useCallback, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Button, Icon, Tooltip, Loader, Text} from "@gravity-ui/uikit";
import {BroomMotion} from '@gravity-ui/icons';
import {ChatMessage} from "../../../entities";
import {RootState} from "../../../shared/store";

import styles from './MessageHistory.module.css'
import {onClearChat} from "../../../pages/gpt-page/model/gptPageSlice.ts";

export const MessageHistoryNonMemo = () => {
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const messageHistory = useSelector((state: RootState) => state.gpt.messageHistory)

  const scrollToChatBottom = useCallback(
    () => ref?.current?.scrollIntoView({ behavior: 'instant' }),
    [ref]
  )

  useEffect(() => {
    scrollToChatBottom()
  }, [messageHistory]);

  return (
    <div className={styles['message-history']}>
      <div className={styles['message-history_header']}>
        <Tooltip content={'Clear chat'} placement='top' openDelay={300}>
          <Button
            size='m'
            view='flat-danger'
            className={styles['message-history_clear-icon']}
            onClick={() => dispatch(onClearChat())}
          >
            <Icon data={BroomMotion} />
          </Button>
        </Tooltip>
      </div>

      <div className={styles['message-history_content']}>
        <div className={styles['message_list']}>
          {messageHistory.values
            ? messageHistory.values.map((message, index) => {
                const isUser = message.role === 'user'

                return (
                  <ChatMessage
                    key={index}
                    author={message.role}
                    content={message.content || 'empty'}
                    self={isUser}
                  />
                )
              })
            : 'Empty'}

          {messageHistory.status === 'loading' && (
            <div className={styles['message-history_loader']}>
              <Loader size='m' />
              <Text color='secondary' variant='body-1'>
                Придумываю ответ...
              </Text>
            </div>
          )}

          <div className='elem_to_scroll' ref={ref}/>
        </div>
      </div>
    </div>
  )
}

export const MessageHistory = memo(MessageHistoryNonMemo)