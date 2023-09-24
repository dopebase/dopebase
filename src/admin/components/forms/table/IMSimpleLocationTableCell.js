import React from 'react'

function IMSimpleLocationCell(props) {
  const { data } = props
  if (!data) {
    return <div></div>
  }
  return (
    <div>
      lat: {data && data.lat}
      <br />
      lng: {data && data.lng}
    </div>
  )
}

export default IMSimpleLocationCell
