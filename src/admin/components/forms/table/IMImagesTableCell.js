import React from 'react'
import { IMPhoto } from '../fields'
import styles from '../../../themes/admin.module.css'
import { unescapeString } from '../../../../utils'

function IMImagesTableCell(props) {
  const { singleImageURL, imageURLs } = props
  if (!singleImageURL && !imageURLs) {
    return <div></div>
  }
  if (singleImageURL) {
    return (
      <div className={`${styles.imageCellContainer} imageCellContainer`}>
        <IMPhoto
          openable
          className={`${styles.imageCell} imageCell`}
          src={unescapeString(singleImageURL)}
        />
      </div>
    )
  }

  const imageItems = imageURLs.map(url => (
    <IMPhoto
      className={`${styles.multiImageCell} multiImageCell`}
      key={url}
      src={unescapeString(url)}
      openable
    />
  ))
  return (
    <div className={`${styles.imageCellContainer} imageCellContainer`}>
      {imageItems}
    </div>
  )
}

export default IMImagesTableCell
