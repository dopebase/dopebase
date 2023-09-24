import React from 'react'

function IMModal(props) {
  const { visible, children, onDismiss } = props

  const onClick = e => {
    onDismiss && onDismiss(e)
  }

  if (!visible) {
    return null
  }
  return (
    <div className="Modal" onClick={onClick}>
      <div className="ModalMain">
        <div className="ModalMainInner">{children}</div>
      </div>
    </div>
  )
}

export default IMModal
