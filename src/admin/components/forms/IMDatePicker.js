import React, { memo } from 'react'
import DatePicker from 'react-datepicker'
import styles from '../../themes/admin.module.css'
import 'react-datepicker/dist/react-datepicker.css'

const IMDatePicker = memo(props => {
  const { selected, onChange } = props

  const onSelect = date => {
    const timestamp = Math.floor(date.getTime() / 1000).toString()
    onChange && onChange(timestamp)
  }

  const selectedNo =
    typeof selected === 'number' ? selected : parseInt(selected)
  const temp = new Date(selectedNo * 1000)
  const date = temp.getTime() === temp.getTime() ? temp : new Date()

  return (
    <div className={`${styles.Card} card-calendar-input Card`}>
      <div className={`${styles.CardBody} CardBody`}>
        <DatePicker
          selected={date}
          onChange={onSelect}
          showTimeSelect
          dateFormat="Pp"
        />
      </div>
    </div>
  )
})

export default IMDatePicker
