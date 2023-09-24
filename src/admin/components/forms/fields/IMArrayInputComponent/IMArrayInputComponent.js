import React, { useEffect, useState } from 'react'

function IMArrayInputComponent(props) {
  const [input, setInput] = useState('')
  const { handleClick, handleDelete, data } = props

  const onClick = () => {
    if (input !== '') {
      handleClick(input)
    }
    setInput('')
  }

  const dataItems =
    data && data.length
      ? data.map((elem, index) => (
          <li>
            {elem}
            <button
              onClick={() => handleDelete(index)}
              type="button"
              style={{
                float: 'right',
                padding: 0,
                border: 'none',
                background: 'none',
              }}>
              x
            </button>
          </li>
        ))
      : null

  return (
    <>
      {dataItems}
      <input
        className="InputStyling"
        type="text"
        value={input}
        onChange={event => setInput(event.target.value)}
      />
      <button
        onClick={onClick}
        type="button"
        className="btn-icon btn btn-secondary btn-sm ButtonStyling">
        <i className="fa fa-plus"></i>
      </button>
    </>
  )
}

export default IMArrayInputComponent
