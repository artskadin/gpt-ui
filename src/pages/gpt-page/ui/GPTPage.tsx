import {useEffect} from "react";
import {MessageHistory} from "../../../widgets";
import {GPTChatSettings, MessageInput} from "../../../entities";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../shared/store";
import {getGptModels} from "../model/gptPageSlice";

import styles from './GPTPage.module.css'

export const GPTPage = () => {
  const state = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-ignore
    dispatch(getGptModels())
  }, [])

  return (
    <div className={styles['gpt-page']}>
      <div>
        <GPTChatSettings />
      </div>

      <div className={styles['gpt-page_messages']}>
        <MessageHistory />
      </div>

      <MessageInput />
    </div>
  )
}