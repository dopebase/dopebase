import React, { useEffect, useState } from 'react'
import { pluginsAPIURL } from '../../../../../config/config'
import { authFetch } from '../../../../../modules/auth/utils/authFetch'

const baseAPIURL = `${pluginsAPIURL}`

function IMForeignKeyComponent(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState(null)
  const { apiRouteName, id, titleKey } = props

  useEffect(() => {
    const fetchData = async () => {
      console.log('xxxx')
      console.log(baseAPIURL + apiRouteName + '/view?id=' + id)
      try {
        const response = await authFetch(
          baseAPIURL + apiRouteName + '/view?id=' + id,
        )
        if (response?.data) {
          setName(response.data[titleKey])
          setIsLoading(false)
        }
      } catch (err) {
        console.log(err)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [props.id])

  if (isLoading) {
    return null
  }

  const viewPath = '/admin/' + apiRouteName + '/' + id
  return (
    <div className="ForeignKeyComponent">
      <a href={viewPath}>{name}</a>
    </div>
  )
}

export default IMForeignKeyComponent
