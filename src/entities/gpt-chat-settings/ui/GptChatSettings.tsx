import React, { memo, useMemo } from 'react'
import { Select, Text } from '@gravity-ui/uikit'
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../shared/store";
import {onSelectGptModelId} from "../../../pages/gpt-page/model/gptPageSlice.ts";

import styles from './GptChatSettings.module.css'

interface GPTChatSettingsProps {
  value: string;
  onChange: (value: string) => void;
}

export const GPTChatSettingsNotMemo: React.FC = () => {
  const dispatch = useDispatch();

  const gptModels = useSelector((state: RootState) => state.gpt.models)
  const selectedGptModelId = useSelector((state: RootState) => state.gpt.selectedGptModelId)
  const selectedGptModelCreatedDate = useSelector((state: RootState) => state.gpt.selectedGptModelCreatedDate)

  const releaseDate = useMemo(() => {
    return new Date(selectedGptModelCreatedDate * 1000).toLocaleDateString('ru-RU')
  }, [selectedGptModelCreatedDate])

  const options = useMemo(() => {
    return gptModels.values.map((model) => ({
      value: model.id,
      content: model.id,
    }))
  }, [gptModels.values])

  return (
    <div className={styles['gpt-chat-settings']}>
      <Text variant={'body-3'}>
        Chat settings
      </Text>

      <div className={styles['gpt-chat-settings_items']}>
        <div className={styles['gpt-chat-settings_item']}>
          <Text variant='body-1' color='secondary'>GPT version</Text>
          <Select
            disabled={gptModels.status !== 'success'}
            value={[selectedGptModelId]}
            options={options}
            onUpdate={(values) => dispatch(onSelectGptModelId(values[0]))}
          />
        </div>

        <div className={styles['gpt-chat-settings_item']}>
          <Text variant='body-1' color='secondary'>Release date</Text>
          <Text variant='body-1'>{releaseDate}</Text>
        </div>
      </div>
    </div>
  )
}

export const GPTChatSettings = memo(GPTChatSettingsNotMemo)