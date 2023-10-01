import React, { useEffect, useState } from 'react'
import { IMColorBoxComponent } from '../../../common'
import {
  IMLocationTableCell,
  IMImagesTableCell,
  IMDateTableCell,
  IMAddressTableCell,
  IMColorsTableCell,
  IMForeignKeyTableCell,
} from '../../ui/IMTable'

const baseAPIURL = require('../../../admin/config').baseAPIURL

function IM$capitalcase$ArrayIdTableCell(props) {
  const { $lowercase$Array } = props
  const [isLoading, setIsLoading] = useState(true)
  const [myData, setData] = useState(null)

  async function getData(urls) {
    try {
      if (!$lowercase$Array) {
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
    if ($lowercase$Array && $lowercase$Array.length) {
      setIsLoading(false)
      urls = $lowercase$Array.map(
        id => baseAPIURL + '$apiRouteName$' + '/' + id,
      )
      getData(urls)
    }
  }, [props.$lowercase$Array])

  if (!$lowercase$Array || $lowercase$Array.length <= 0) {
    return null
  }

  if (isLoading) {
    return null
  }

  var urls =
    $lowercase$Array &&
    $lowercase$Array.length &&
    $lowercase$Array.map(id => baseAPIURL + '$apiRouteName$' + '/' + id)
  const viewPath =
    $lowercase$Array &&
    $lowercase$Array.length &&
    $lowercase$Array.map(
      id => '/admin/' + '$apiRouteName$' + '/' + id + '/view',
    )

  return (
    <div className="ArrayTableCell $lowercase$ArrayTableCell">
      {myData &&
        myData.length > 0 &&
        myData.map((data, index) => $dataItemRenderer$)}
    </div>
  )
}

export default IM$capitalcase$ArrayIdTableCell
