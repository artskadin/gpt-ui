import {Text} from '@gravity-ui/uikit';
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import styles from './Header.module.css'

export const Header = () => {
  const items = ['ChatGPT', 'DALL·E', 'TTS']

  return (
    <header className={styles.header}>
      <nav className={styles['header_content']}>
          <div className={styles['header_left-side']}>
            <NavLink to={'chat-gpt'} className={({ isActive }) => [
              styles['header_item'],
              isActive ? styles['header_item__active'] : ''
            ].join(" ")}
            >
              <Text variant='body-3'>ChatGPT</Text>
            </NavLink>
            <NavLink to={'dall-e'} className={({ isActive }) => [
              styles['header_item'],
              isActive ? styles['header_item__active'] : ''
            ].join(" ")}
            >
              <Text variant='body-3'>DALL·E</Text>
            </NavLink>
            <NavLink to={'tts'} className={({ isActive }) => [
              styles['header_item'],
              isActive ? styles['header_item__active'] : ''
            ].join(" ")}
            >
              <Text variant='body-3'>TTS</Text>
            </NavLink>
          </div>

          <div className={styles['header_right-side']}>
            <NavLink to={'login'} className={({ isActive }) => [
              styles['header_item'],
              isActive ? styles['header_item__active'] : ''
            ].join(" ")}
            >
              <Text variant='body-3'>Log in</Text>
            </NavLink>
            <NavLink to={'profile'} className={({ isActive }) => [
              styles['header_item'],
              isActive ? styles['header_item__active'] : ''
            ].join(" ")}
            >
              <Text variant='body-3'>Profile</Text>
            </NavLink>
          </div>
      </nav>
    </header>
  )
}