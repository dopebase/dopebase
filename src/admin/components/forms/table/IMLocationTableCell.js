import React from 'react'

function IMLocationTableCell(props) {
  const { data } = props
  if (!data) {
    return <div></div>
  }
  return <div>{data.address}</div>
}

export default IMLocationTableCell
