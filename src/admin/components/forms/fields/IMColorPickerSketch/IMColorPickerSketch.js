import React, { useState } from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

//Asign callback onChangeComplete=yourFunction;
//yourFunction(color) will be called with the hex color as param

function IMColorPickerSketch(props) {
  const { onChangeComplete, setColor } = props
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [pickerColor, setPickerColor] = useState(
    props.defaultColor ? props.defaultColor : '#666',
  )
  const styles = reactCSS({
    default: {
      color: {
        width: '24px',
        height: '24px',
        borderRadius: '2px',
        background: `${pickerColor}`,
      },
      swatch: {
        padding: '2px',
        position: 'absolute',
        margin: '4px 2px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
        zIndex: '-1',
      },
    },
  })

  const handleChangeComplete = color => {
    setPickerColor(color.hex)
    if (onChangeComplete) {
      onChangeComplete(color.hex)
    }
  }

  const handleChange = color => {
    setPickerColor(color.hex)
    if (setColor) {
      setColor(color.hex)
    }
  }

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  const handleClose = () => {
    setDisplayColorPicker(false)
  }

  return (
    <>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker && (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker
            color={pickerColor}
            onChange={handleChange}
            onChangeComplete={handleChangeComplete}
          />
        </div>
      )}
    </>
  )
}

export default IMColorPickerSketch
