import React from 'react'
import LinkButton from '../../../components/common/buttons/LinkButton'

function IMProductDownloadButtonCell(props) {
  const { variant } = props
  if (!variant) {
    return null
  }
  const { fastspringSlug } = variant
  return (
    <LinkButton
      cta={'Download'}
      url={`./common/download?id=${fastspringSlug}`}
    />
  )
}

export default IMProductDownloadButtonCell
