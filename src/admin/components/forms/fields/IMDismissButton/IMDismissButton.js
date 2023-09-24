import React from 'react'

function IMDismissButton(props) {
  const { className, onPress } = props

  const allClasses = className + ' DismissButton'

  return (
    <div className={allClasses} onClick={onPress}>
      <i className="DismissIcon fa fa-times" />
    </div>
  )
}

export default IMDismissButton
