import OpenAI from "openai";
import {ChatCompletionMessageParam} from "openai/src/resources/chat/completions.ts";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import {openAIApi, SendMessageArgs} from "../../../open-ai-api";
import {RootState} from "../../../shared/store";

type Status = 'idle' | 'loading' | 'success' | 'failed'

export interface GPTPageState {
  inputPrompt: string;
  selectedGptModelId: string;
  selectedGptModelCreatedDate: number;
  models: {
    status: Status;
    values: OpenAI.Model[];
    error?: unknown;
  };
  messageHistory: {
    status: Status;
    values: ChatCompletionMessageParam[];
    error?: unknown;
  }
}

const getMessageHistoryFromLocalStorage = () => {
  const res = window.localStorage.getItem('messageHistory') || '[]'

  return JSON.parse(res) as ChatCompletionMessageParam[]
}

const saveMessageHistoryToLocalStorage = (messageHistory: ChatCompletionMessageParam[]) => {
  window.localStorage.setItem('messageHistory', JSON.stringify(messageHistory))
}

const clearMessageHistoryFromLocalStorage = () => {
  window.localStorage.setItem('messageHistory', JSON.stringify([]))
}

const initialState: GPTPageState = {
  inputPrompt: '',
  selectedGptModelId: 'gpt-4o-mini',
  selectedGptModelCreatedDate: 1721172741,
  // selectedGptModelCreatedDate: 1706048358,
  models: {
    values: [],
    status: 'idle'
  },
  messageHistory: {
    values: getMessageHistoryFromLocalStorage(),
    status: 'idle'
  }
}

export const getGptModels = createAsyncThunk(
  'gpt/getGPTVersion',
  async (_, thunkAPI) => {
    try {
      return await openAIApi.getGptModels()
    } catch (err) {
      const { message } = err as Error
      return thunkAPI.rejectWithValue({ error: message })
    }
  }
)

export const sendMessageToGpt = createAsyncThunk(
  'gpt/sendGptMessage',
  async (_, thunkAPI) => {
    const defaultMessage: ChatCompletionMessageParam = {role: 'system', content: 'You are a helpful assistant.'}

    const state = thunkAPI.getState() as RootState
    const { selectedGptModelId, messageHistory } = state.gpt
    let messages = []

    if (
      messageHistory.values[0].role === 'system' &&
      messageHistory.values[0].content?.includes('helpful assistant')
    ) {
      messages = messageHistory.values
    } else {
      messages = [defaultMessage, ...messageHistory.values]
    }

    try {
      return await openAIApi.sendMessageToGpt({ model: selectedGptModelId, messages })
    } catch (err) {
      const { message } = err as Error
      return thunkAPI.rejectWithValue({ error: message })
    }
  }
)

export const gptPageSlice = createSlice({
  name: 'gptPage',
  initialState,
  reducers: {
    onPromptChange: (state, action: PayloadAction<string>) => {
      state.inputPrompt = action.payload
    },

    onSelectGptModelId: (state, action: PayloadAction<string>) => {
      state.selectedGptModelId = action.payload

      const { created } = state.models.values
        .find((model) => model.id === action.payload ) as OpenAI.Model

      state.selectedGptModelCreatedDate = created
    },

    onSendMessage: (state) => {
      state.messageHistory.values.push({ role: 'user', content: state.inputPrompt })
      saveMessageHistoryToLocalStorage(state.messageHistory.values)
      state.inputPrompt = ''
    },

    onClearChat: (state) => {
      clearMessageHistoryFromLocalStorage();
      state.messageHistory.values = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      getGptModels.pending,
      (state, action) => {
        state.models.status = 'loading'
      }
    )
    builder.addCase(
      getGptModels.fulfilled,
      (state, action) => {
        state.models.status = 'success'
        // @ts-ignore
        state.models.values = action.payload
      }
    )
    builder.addCase(
      getGptModels.rejected,
      (state, action) => {
        state.models.status = 'failed'
      }
    )

    builder.addCase(
      sendMessageToGpt.pending,
      (state, action) => {
        state.messageHistory.status = 'loading'
      }
    )
    builder.addCase(
      sendMessageToGpt.fulfilled,
      (state, action) => {
        state.messageHistory.status = 'success'

        const { choices } = action.payload

        state.messageHistory.values.push(choices[0].message)
        saveMessageHistoryToLocalStorage(state.messageHistory.values)
      }
    )
    builder.addCase(
      sendMessageToGpt.rejected,
      (state, action) => {
        state.messageHistory.status = 'failed'
      }
    )
  }
})

export const {
  onPromptChange,
  onSelectGptModelId,
  onSendMessage,
  onClearChat,
} = gptPageSlice.actions
export const gptPageSliceReducer = gptPageSlice.reducer