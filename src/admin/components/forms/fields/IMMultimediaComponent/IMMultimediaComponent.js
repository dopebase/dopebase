import React, { useState, useEffect } from 'react'
import { IMModal, IMDismissButton } from '../..'

function parseType(text) {
  if (text.includes('.mp4') || text.includes('.mov')) {
    return 'video'
  } else if (text.includes('.jpeg') || text.includes('.jpg')) {
    return 'image'
  } else if (text.includes('video')) {
    return 'video'
  } else {
    return 'image'
  }
}

function IMMultimediaComponent(props) {
  const { src, onDelete, className, openable, dismissable, type } = props

  const [isOpen, setIsOpen] = useState(false)
  const [mediaType, setMediaType] = useState('')

  useEffect(() => {
    setMediaType('photo')
    if (type) {
      if (parseType(type) === 'video') {
        setMediaType('video')
      } else if (parseType(type) === 'image') {
        setMediaType('image')
      }
    } else if (src) {
      if (parseType(src) === 'video') {
        setMediaType('video')
      } else if (parseType(src) === 'image') {
        setMediaType('image')
      }
    }
  }, [src, type])

  const allClasses = className + ' Media'
  const allContainerClasses = 'MediaContainer' + (openable ? ' Openable' : '')

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
      {mediaType === 'video' ? (
        <video className={allClasses} controls>
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <img className={allClasses} src={src} />
      )}
      {dismissable && (
        <IMDismissButton
          className="MediaDismissContainer"
          onPress={onDismiss}
        />
      )}
      {openable && mediaType === 'image' && (
        <IMModal
          className="MediaModal"
          visible={isOpen}
          onDismiss={onModalDismiss}>
          <div className="MediaModalImgContainer">
            <img className="MediaFullscreen" src={src} />
          </div>
        </IMModal>
      )}
    </div>
  )
}

export default IMMultimediaComponent
