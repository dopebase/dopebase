'use client'
import React from 'react'
import { IMColorBoxComponent } from '../../../../../admin/components/forms/fields'

function IM$capitalcase$ArrayTableCell(props) {
  const { $lowercase$Array } = props

  if (!$lowercase$Array || $lowercase$Array.length <= 0) {
    return <div></div>
  }

  const listItems =
    $lowercase$Array &&
    $lowercase$Array.length > 0 &&
    $lowercase$Array.map(data => $dataItemRenderer$)

  return (
    <ul className="ArrayTableCell $lowercase$ArrayTableCell">{listItems}</ul>
  )
}

export default IM$capitalcase$ArrayTableCell
