import React, { useEffect, useState } from 'react'
import { pluginsAPIURL } from '../../../../../config/config'
const baseAPIURL = pluginsAPIURL

function IMForeignKeysIdComponent(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(null)
  const { apiRouteName, viewRoute, ids, titleKey } = props

  async function getData(urls) {
    try {
      if (!ids) {
        throw 'No data to be rendered'
      }
      let data = await Promise.all(urls.map(e => fetch(e)))
      let dataJson = await Promise.all(data.map(e => e.json()))
      setData(dataJson)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (ids) {
      urls = ids.map(id => baseAPIURL + apiRouteName + '/view?id=' + id)
    }
    getData(urls)
  }, [props.ids])

  if (isLoading) {
    return null
  }

  if (!ids) {
    return null
  }

  var urls =
    ids &&
    ids.length &&
    ids.map(id => baseAPIURL + apiRouteName + '/view?id=' + id)
  const viewPath =
    ids && ids.length && ids.map(id => viewRoute + '/view?id=' + id)

  return (
    <div className="ForeignKeysComponent">
      {viewPath &&
        viewPath.length > 0 &&
        viewPath.map((el, index) => {
          return (
            <li>
              <a href={el}>{data[index][titleKey]}</a>
            </li>
          )
        })}
    </div>
  )
}

export default IMForeignKeysIdComponent
