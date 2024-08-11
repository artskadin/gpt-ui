import { Outlet } from 'react-router-dom'
import {Text, Button} from '@gravity-ui/uikit';

import styles from './Main.module.css'

export const Main = () => {
  // const res = testOpenAI()

  return (
    <main className={styles.main}>
      <div className={styles['main_content']}>
        <Outlet />
      </div>
    </main>
  )
}