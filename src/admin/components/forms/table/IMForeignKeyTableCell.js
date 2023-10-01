import React, { useEffect, useState } from 'react'
import { pluginsAPIURL } from '../../../../config/config'

const baseAPIURL = pluginsAPIURL

function IMForeignKeyTableCell(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState(null)
  const { apiRouteName, id, titleKey } = props

  useEffect(() => {
    console.log(baseAPIURL + apiRouteName + '?id=' + id)
    fetch(baseAPIURL + apiRouteName + '?id=' + id)
      .then(response => response.json())
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
      .then(data => {
        if (data) {
          setName(data[titleKey])
        }
        setIsLoading(false)
      })
  }, [props.id])

  if (isLoading) {
    return null
  }

  const viewPath = '/admin/' + apiRouteName + '/' + id
  return (
    <div className="foreign-key-container">
      <a href={viewPath}>{name}</a>
    </div>
  )
}

export default IMForeignKeyTableCell
