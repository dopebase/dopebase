import React from 'react'

function IMStaticMultiSelectComponent(props) {
  const { options, selectedOptions, onChange, name } = props

  const renderItems = options
    ? options.map(option => {
        const selected =
          selectedOptions && selectedOptions.indexOf(option) !== -1
        return (
          <option className="SelectOption" value={option} selected={selected}>
            {option}
          </option>
        )
      })
    : null

  const selectedValues = select => {
    var result = []
    var options = select && select.options
    var opt

    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i]

      if (opt.selected) {
        result.push(opt.value || opt.text)
      }
    }
    return result
  }

  const handleChange = event => {
    const values = selectedValues(event.target)
    onChange && onChange(values, name)
  }

  return (
    <select
      className="SelectComponent FormTextField"
      name={name}
      onChange={handleChange}
      multiple>
      {renderItems}
    </select>
  )
}

export default IMStaticMultiSelectComponent
