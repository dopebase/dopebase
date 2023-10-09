import React from 'react'
import styles from '../../../../themes/admin.module.css'

function IMStaticSelectComponent(props) {
  const { options, selectedOption, onChange, name } = props

  const renderItems = options
    ? options.map(option => {
        const selected = option == selectedOption
        return (
          <option value={option} selected={selected}>
            {option}
          </option>
        )
      })
    : null

  const selectedValues = select => {
    var result = null
    var options = select && select.options
    var opt

    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i]

      if (opt.selected) {
        result = opt.value || opt.text
      }
    }
    return result
  }

  const handleChange = event => {
    const value = selectedValues(event.target)
    onChange && onChange(value, name)
  }

  return (
    <select
      className={`${styles.SingleSelectComponent} ${styles.FormTextField} SingleSelectComponent FormTextField`}
      name={name}
      onChange={handleChange}>
      {renderItems}
    </select>
  )
}

export default IMStaticSelectComponent
