import React from 'react'
import { IMMultimediaComponent } from '../fields'
import styles from '../../../themes/admin.module.css'

function IMMultimediaTableCell(props) {
  const { singleMultimediaURL, multimediaURLs } = props
  if (!singleMultimediaURL && !multimediaURLs) {
    return <div></div>
  }
  if (singleMultimediaURL) {
    return (
      <div
        className={`${styles.multimediaCellContainer} multimediaCellContainer`}>
        <IMMultimediaComponent
          openable
          className={`${styles.multimediaCell} multimediaCell`}
          src={singleMultimediaURL}
        />
      </div>
    )
  }

  const mediaItems = multimediaURLs.map(data => (
    <IMMultimediaComponent
      className={`${styles.multiMultimediaCell} multiMultimediaCell`}
      key={data.url}
      src={data.url}
      type={data.mime}
      openable
    />
  ))
  return (
    <div
      className={`${styles.multimediaCellContainer} multimediaCellContainer`}>
      {mediaItems}
    </div>
  )
}

export default IMMultimediaTableCell
