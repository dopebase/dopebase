import React from 'react'
import { IMPhoto } from '../fields'

function IMImagesTableCell(props) {
  const { singleImageURL, imageURLs } = props
  if (!singleImageURL && !imageURLs) {
    return <div></div>
  }
  if (singleImageURL) {
    return (
      <div className="imageCellContainer">
        <IMPhoto openable className="imageCell" src={singleImageURL} />
      </div>
    )
  }

  const imageItems = imageURLs.map(url => (
    <IMPhoto className="multiImageCell" key={url} src={url} openable />
  ))
  return <div className="imageCellContainer">{imageItems}</div>
}

export default IMImagesTableCell
