import React from 'react'

function ObjectTableCell(props) {
  const { data } = props

  if (!data || data.length <= 0) {
    return <div></div>
  }

  const render = data => {
    return $dataItemRenderer$
  }

  return <ul className="ObjectCellContainer">{render(data)}</ul>
}

export default ObjectTableCell
