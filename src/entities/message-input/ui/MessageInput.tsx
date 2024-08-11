import React, {useCallback} from "react";
import {Button, TextArea} from '@gravity-ui/uikit'
import {useDispatch, useSelector} from "react-redux";
import type {RootState, AppDispatch} from "../../../shared/store";
import {onPromptChange, onSendMessage, sendMessageToGpt} from "../../../pages/gpt-page/model/gptPageSlice";

import styles from './MessageInput.module.css'
import {ThunkDispatch} from "@reduxjs/toolkit";

export const MessageInput: React.FC = () => {
  const {
    inputPrompt,
    messageHistory
  } = useSelector((state: RootState) => state.gpt)
  const dispatch = useDispatch<AppDispatch>()

  const sendMessage = () => {
    dispatch(onSendMessage())
    dispatch(sendMessageToGpt())
  }

  return (
    <div className={styles['message-input']}>
      <TextArea
        size='l'
        maxRows={10}
        placeholder={'Input your prompt'}
        hasClear={true}
        onChange={(e) => dispatch(onPromptChange(e.target.value))}
        value={inputPrompt}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && inputPrompt) {
            sendMessage()
          }
        }}
      />
      <Button
        size={'l'}
        view={'outlined-action'}
        onClick={sendMessage}
        disabled={!inputPrompt || messageHistory.status === 'loading'}
      >
        Send
      </Button>
    </div>
  )
}