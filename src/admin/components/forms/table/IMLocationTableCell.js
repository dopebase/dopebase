import React from 'react'

function IMLocationTableCell(props) {
  const { data } = props

  if (!data) {
    return <div></div>
  }
  if (data.address) {
    return <div>{data.address}</div>
  }
  return (
    <div>
      <ul>
        <li>Latitude: {data.latitude}</li>
        <li>Longitude: {data.longitude}</li>
      </ul>
    </div>
  )
}

export default IMLocationTableCell
