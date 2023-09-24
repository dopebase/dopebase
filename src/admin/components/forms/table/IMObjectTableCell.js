import React from 'react'

///To be updated
function IMObjectTableCell(props) {
  const { data } = props

  if (!data || data.length <= 0) {
    return <div></div>
  }

  const listItems =
    data && Object.keys(data).length
      ? Object.keys(data).map(key => (
          <li>
            {key}: {data[key]}
          </li>
        ))
      : null

  return <ul className="ObjectCellContainer">{listItems}</ul>
}

export default IMObjectTableCell
