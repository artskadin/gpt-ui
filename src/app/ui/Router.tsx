import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App } from "./App.tsx";
import {ErrorPage} from "../../pages/error-page";
import {GPTPage} from "../../pages/gpt-page";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {index: true, element: <div>MAIN</div>},
      {
        path: 'chat-gpt',
        element: <GPTPage />
      },
      {
        path: 'dall-e',
        element: <div>DALL·E</div>
      },
      {
        path: 'tts',
        element: <div>TTS</div>
      },
      {
        path: 'login',
        element: <div>LOGIN</div>
      },
      {
        path: 'profile',
        element: <div>PROFILE</div>
      },
    ],
    errorElement: <ErrorPage />
  },
])