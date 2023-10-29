import React from 'react'
import styles from '../../theme.module.css'

const BicameralSection = ({
  title,
  description,
  items,
  interactiveChild,
  reversed = false,
}) => {
  const textContainer = items => {
    if (items) {
      return (
        <div className={styles.textContainer}>
          <ul>
            {items.map((item, index) => {
              return (
                <li key={index}>
                  {item.title} {item.description && <p>{item.description}</p>}
                </li>
              )
            })}
          </ul>
        </div>
      )
    }
    return <div className={styles.textContainer}></div>
  }
  const interactiveContainer = interactiveChild => {
    if (interactiveChild) {
      return (
        <div className={styles.interactiveContainer}>{interactiveChild}</div>
      )
    }
    return <div className={styles.interactiveContainer}></div>
  }
  return (
    <div className={styles.bicameralSection}>
      {title && <h2 className={styles.bicameralTitle}>{title}</h2>}
      {description && (
        <p className={styles.bicameralDescription}>{description}</p>
      )}
      <div className={styles.bicameralContainer}>
        {reversed ? (
          <>
            {interactiveContainer(interactiveChild)}
            {textContainer(items)}
          </>
        ) : (
          <>
            {textContainer(items)}
            {interactiveContainer(interactiveChild)}
          </>
        )}
      </div>
    </div>
  )
}

export default BicameralSection
