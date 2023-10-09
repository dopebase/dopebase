import React, { memo, useState } from 'react'
import IMModal from '../IMModal/IMModal'
import IMDismissButton from '../IMDismissButton/IMDismissButton'
import styles from '../../../../themes/admin.module.css'
import './styles.css'
import { unescapeString } from '../../../../../utils'

function IMPhoto(props) {
  const { src, onDelete, className, openable, dismissable } = props
  const unescapedSrc = unescapeString(src)

  const [isOpen, setIsOpen] = useState(false)

  const allClasses =
    styles.Photo + ' ' + styles.photo + ' ' + className + ' Photo'
  const allContainerClasses =
    styles.PhotoContainer +
    ' PhotoContainer' +
    (openable ? ' Openable' : '') +
    (openable ? styles.Openable : '')

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
      <img className={allClasses} src={unescapedSrc} />
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

export default memo(IMPhoto)
