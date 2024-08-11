import {Text} from "@gravity-ui/uikit";
import {Link} from "react-router-dom";

import styles from './ErrorPage.module.css'

export const ErrorPage = () => {
  return (
    <div className={styles['error-page']}>
      <Text variant='header-2'>Page not found</Text>
      <Link to={'/'}>
        <Text variant={'body-2'} className={styles['error-page_link']}>Go to main page</Text>
      </Link>
    </div>
  )
}