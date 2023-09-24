import React, { useEffect, useState } from 'react'

function IMObjectInputComponent(props) {
  const [keyInput, setKeyInput] = useState('')
  const [valueInput, setValueInput] = useState('')
  const [inputPadding, setInputPadding] = useState('0px')
  const [myData, setData] = useState({})
  const {
    handleClick,
    handleDelete,
    initialData,
    data,
    nonModifiable,
    valuePlaceholder,
    keyPlaceholder,
  } = props

  useEffect(() => {
    if (!nonModifiable) {
      setInputPadding('40px')
    }
    if (data) {
      setData({ ...initialData, ...data })
    } else {
      setData(initialData)
    }
    if (initialData) {
      for (const [key, value] of Object.entries(initialData)) {
        if (myData[key] === value) {
          handleClick(key, value)
        }
      }
    }
  }, [data && Object.keys(data).length])

  const onClick = () => {
    if (keyInput !== '' && valueInput !== '') {
      handleClick(keyInput, valueInput)
    }
    setKeyInput('')
    setValueInput('')
  }

  const changeObjectElement = (key, value) => {
    var newData = { ...myData }
    newData[key] = value
    setData(newData)
  }

  const dataItems =
    myData && Object.keys(myData).length
      ? Object.keys(myData).map(key => {
          if (
            typeof myData[key] === 'string' ||
            typeof myData[key] === 'number'
          ) {
            return (
              <li className="FieldStyling">
                {key}:
                <div className="ObjectInputs">
                  <input
                    type="text"
                    className="ObjectInputStyling"
                    value={myData[key]}
                    onChange={event => {
                      handleClick(key, event.target.value)
                      changeObjectElement(key, event.target.value)
                    }}
                  />
                  <button
                    onClick={() => handleDelete(key)}
                    type="button"
                    className="ObjectDeleteButton">
                    x
                  </button>
                </div>
              </li>
            )
          }
        })
      : null

  return (
    <div style={{ paddingBottom: dataItems ? inputPadding : '40px' }}>
      <span className="FieldsHolder">{dataItems}</span>
      {(!nonModifiable || !dataItems) && (
        <div className="InputContainer">
          <input
            className="InputStyling KeyStyling"
            type="text"
            placeholder={keyPlaceholder ? keyPlaceholder : 'key'}
            value={keyInput}
            onChange={event => setKeyInput(event.target.value)}
          />
          <input
            className="InputStyling"
            type="text"
            placeholder={valuePlaceholder ? valuePlaceholder : 'value'}
            value={valueInput}
            onChange={event => setValueInput(event.target.value)}
          />
          <button
            onClick={onClick}
            type="button"
            className="btn-icon btn btn-secondary btn-sm ButtonStyling">
            <i className="fa fa-plus"></i>
          </button>
        </div>
      )}
    </div>
  )
}

export default IMObjectInputComponent
