import React from 'react'

function IMAddressTableCell(props) {
  const { data } = props

  if (!data) {
    return <div></div>
  }
  return (
    <div className="AddressCellContainer">
      {data.address} {data.street} {data.city} {data.zipCode}
    </div>
  )
}

export default IMAddressTableCell
