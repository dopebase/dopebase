'use client'

import React, { useEffect, useState } from 'react'
import { IMColorBoxComponent } from '../../../../../admin/components/forms/fields'
import {
  IMLocationTableCell,
  IMImagesTableCell,
  IMDateTableCell,
  IMAddressTableCell,
  IMColorsTableCell,
  IMForeignKeyTableCell,
} from '../../../../../admin/components/forms/table'

import { pluginsAPIURL } from '../../../../../config/config'

const baseAPIURL = pluginsAPIURL

function IMArticleTagsArrayIdTableCell(props) {
  const { tagsArray } = props
  const [isLoading, setIsLoading] = useState(true)
  const [myData, setData] = useState(null)

  async function getData(urls) {
    try {
      if (!tagsArray) {
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
    if (tagsArray && tagsArray.length) {
      setIsLoading(false)
      urls = tagsArray.map(
        id => baseAPIURL + 'article_tag' + '/' + id,
      )
      getData(urls)
    }
  }, [props.tagsArray])

  if (!tagsArray || tagsArray.length <= 0) {
    return null
  }

  if (isLoading) {
    return null
  }

  var urls =
    tagsArray &&
    tagsArray.length &&
    tagsArray.map(id => baseAPIURL + 'article_tag' + '/' + id)
  const viewPath =
    tagsArray &&
    tagsArray.length &&
    tagsArray.map(
      id => '/admin/' + 'article_tag' + '/' + id + '/view',
    )

  return (
    <div className="ArrayTableCell tagsArrayTableCell">
      {myData &&
        myData.length > 0 &&
        myData.map((data, index) => {
            const path = viewPath && viewPath[index]
            return (
                <li>
                    <span>
                        <a href={data.canonical_url}>
                            {data.name}
                        </a>
                    </span>
                </li>
            )
        })}
    </div>
  )
}

export default IMArticleTagsArrayIdTableCell
