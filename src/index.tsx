import React, {StrictMode} from "react";
import { createRoot } from "react-dom/client";
import {ThemeProvider} from '@gravity-ui/uikit';
import { RouterProvider } from 'react-router-dom'
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
// import 'highlight.js/styles/atom-one-dark.min.css';
import 'highlight.js/styles/github-dark-dimmed.min.css';
import 'katex/dist/katex.min.css'

import { router} from "./app/ui/Router.tsx";

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)