import React from 'react'
import { formatDate } from '../../../../utils'

export const IMDateTableCell = props => {
  console.log('xxxx')
  console.log(props)
  const { date, timestamp } = props
  const renderedDate = date ? date : new Date(timestamp * 1000)
  if (!renderedDate) {
    return <div></div>
  }
  return <div>{formatDate(renderedDate)}</div>
}
