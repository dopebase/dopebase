import React from 'react'
import { IMColorBoxComponent } from '../IMComponents'

function IMColorsTableCell(props) {
  const { data } = props

  var colorItems
  if (data) {
    colorItems = data.map(color => <IMColorBoxComponent color={color} />)
  }

  return <div className="colorCellContainer">{colorItems}</div>
}

export default IMColorsTableCell
