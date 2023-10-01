import React, { useState } from 'react'
import IMModal from '../IMModal/IMModal'
import IMDismissButton from '../IMDismissButton/IMDismissButton'

function IMPhoto(props) {
  const { src, onDelete, className, openable, dismissable } = props

  const [isOpen, setIsOpen] = useState(false)

  const allClasses = className + ' Photo'
  const allContainerClasses = 'PhotoContainer' + (openable ? ' Openable' : '')

  const onDismiss = event => {
    event.stopPropagation()
    onDelete && onDelete(src)
  }

  const onModalDismiss = event => {
    event.stopPropagation()
    setIsOpen(false)
  }

  const onClick = event => {
    setIsOpen(true)
  }

  return (
    <div className={allContainerClasses} onClick={onClick}>
      <img className={allClasses} src={src} />
      {dismissable && (
        <IMDismissButton
          className="PhotoDismissContainer"
          onPress={onDismiss}
        />
      )}
      {openable && (
        <IMModal
          className="PhotoModal"
          visible={isOpen}
          onDismiss={onModalDismiss}>
          <div className="PhotoModalImgContainer">
            <img className="PhotoFullscreen" src={src} />
          </div>
        </IMModal>
      )}
    </div>
  )
}

export default IMPhoto
