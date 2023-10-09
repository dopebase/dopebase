import React, { useEffect, useState } from 'react'
import adminStyles from '../../../../themes/admin.module.css'
import styles from './IMObjectInputComponent.module.css'

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
              <li className={`${styles.FieldStyling} FieldStyling`}>
                {key}:
                <div className={`${styles.ObjectInputs} ObjectInputs`}>
                  <input
                    type="text"
                    className={`${styles.ObjectInputStyling} ObjectInputStyling`}
                    value={myData[key]}
                    onChange={event => {
                      handleClick(key, event.target.value)
                      changeObjectElement(key, event.target.value)
                    }}
                  />
                  <button
                    onClick={() => handleDelete(key)}
                    type="button"
                    className={`${styles.ObjectDeleteButton}`}>
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
      <span className={`${styles.FieldsHolder} FieldsHolder`}>{dataItems}</span>
      {(!nonModifiable || !dataItems) && (
        <div className={`${styles.InputContainer} InputContainer`}>
          <input
            className={`${styles.InputStyling} ${styles.KeyStyling} InputStyling KeyStyling`}
            type="text"
            placeholder={keyPlaceholder ? keyPlaceholder : 'key'}
            value={keyInput}
            onChange={event => setKeyInput(event.target.value)}
          />
          <input
            className={`${styles.InputStyling} ${styles.ValueStyling} InputStyling ValueStyling`}
            type="text"
            placeholder={valuePlaceholder ? valuePlaceholder : 'value'}
            value={valueInput}
            onChange={event => setValueInput(event.target.value)}
          />
          <button
            onClick={onClick}
            type="button"
            className={`${adminStyles.btSm} ${styles.ButtonStyling} btn-icon btn btn-secondary btnSm ButtonStyling`}>
            <i className="fa fa-plus"></i>
          </button>
        </div>
      )}
    </div>
  )
}

export default IMObjectInputComponent
