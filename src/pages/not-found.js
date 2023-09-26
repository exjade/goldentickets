import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/modules/notfound.module.css';
import * as ROUTES from '../constants/routes'

const NotFound = () => {

  let history = useHistory()

  useEffect(() => {
    document.title = ' 404 - Not Found'
    setTimeout(() => {
      history.push(ROUTES.DASHBOARD)
    }, 500);
  }, []); //eslint-disable-line

  return (

    <AnimatePresence>
      <motion.div
        className={`${styles.container} `}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      ></motion.div>
      <div>NotFound</div>
    </AnimatePresence>
  )
}

export default NotFound