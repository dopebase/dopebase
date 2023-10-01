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

function IM$capitalcase$ArrayTableCell(props) {
  const { $lowercase$Array } = props
  const [isLoading, setIsLoading] = useState(true)
  const [myData, setData] = useState(null)

  useEffect(() => {
    if ($lowercase$Array) {
      setData($lowercase$Array)
    }
    setIsLoading(false)
  }, [props.$lowercase$Array])

  if (!$lowercase$Array || $lowercase$Array.length <= 0) {
    return null
  }

  if (isLoading) {
    return null
  }

  const viewPath =
    $lowercase$Array &&
    $lowercase$Array.length &&
    $lowercase$Array.map(
      elem => '/admin/' + '$apiRouteName$' + '/' + elem.id + '/view',
    )

  return (
    <div className="ArrayTableCell $lowercase$ArrayTableCell">
      {myData &&
        myData.length > 0 &&
        myData.map((data, index) => $dataItemRenderer$)}
    </div>
  )
}

export default IM$capitalcase$ArrayTableCell
