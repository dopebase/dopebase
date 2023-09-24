import React from 'react'
import { formatDate } from '../../../utils'

function IMDateTableCell(props) {
  const { date, timestamp } = props
  const renderedDate = date ? date : new Date(timestamp * 1000)

  if (!renderedDate) {
    return <div></div>
  }
  return <div>{formatDate(renderedDate)}</div>
}

export default IMDateTableCell
