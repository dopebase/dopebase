import React from 'react'
import { IMMultimediaComponent } from '../fields'

function IMMultimediaTableCell(props) {
  const { singleMultimediaURL, multimediaURLs } = props
  if (!singleMultimediaURL && !multimediaURLs) {
    return <div></div>
  }
  if (singleMultimediaURL) {
    return (
      <div className="multimediaCellContainer">
        <IMMultimediaComponent
          openable
          className="multimediaCell"
          src={singleMultimediaURL}
        />
      </div>
    )
  }

  const mediaItems = multimediaURLs.map(data => (
    <IMMultimediaComponent
      className="multiMultimediaCell"
      key={data.url}
      src={data.url}
      type={data.mime}
      openable
    />
  ))
  return <div className="multimediaCellContainer">{mediaItems}</div>
}

export default IMMultimediaTableCell
