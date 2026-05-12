import React from 'react'
import styles from './Button.module.css'

function Button() {
  return (
    <div>
        <button type='button' className={styles.button}>Увійти</button>
    </div>
  )
}

export default Button