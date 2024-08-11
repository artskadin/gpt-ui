import {Provider} from "react-redux"
import styles from './App.module.css'
import {Header} from "../../widgets"
import { store } from '../../shared/store'
import {Main} from "./main";

export function App() {
  return (
    <Provider store={store}>
      <div className={styles.root}>
        <Header />
        <Main />
      </div>
    </Provider>
  )
}