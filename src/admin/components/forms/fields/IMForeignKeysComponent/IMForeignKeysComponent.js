import React, { useEffect, useState } from 'react'
import { pluginsAPIURL } from '../../../../../config/config'
const baseAPIURL = pluginsAPIURL

function IMForeignKeysComponent(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [myData, setData] = useState(null)
  const { apiRouteName, data, titleKey } = props

  useEffect(() => {
    if (data) {
      setData(data)
    }
    setIsLoading(false)
  }, [data && data.length])

  if (isLoading) {
    return null
  }

  if (!data) {
    return null
  }

  var urls =
    myData &&
    myData.legnth &&
    myData.map(elem => baseAPIURL + apiRouteName + '/view?id=' + elem.id)
  const viewPath =
    myData &&
    myData.legnth &&
    myData.map(elem => '/admin/' + apiRouteName + '/view?id=' + elem.id)

  return (
    <div className="ForeignKeysComponent">
      {viewPath &&
        viewPath.length > 0 &&
        viewPath.map((el, index) => {
          return (
            <li>
              <a href={el}>{myData[index][titleKey]}</a>
            </li>
          )
        })}
    </div>
  )
}

export default IMForeignKeysComponent
