// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { ClipLoader } from 'react-spinners'
import { formatDate } from '../../../utils'
import {
  IMForeignKeyComponent,
  IMForeignKeysComponent,
  IMMultimediaComponent,
  IMForeignKeysIdComponent,
  IMPhoto,
  IMToggleSwitchComponent,
  IMColorBoxComponent,
} from '../../../components/dashboard/IMComponents'
import dynamic from 'next/dynamic'
import Editor from 'rich-markdown-editor'
const CodeMirror = dynamic(
  () => {
    import('codemirror/mode/xml/xml')
    import('codemirror/mode/javascript/javascript')
    import('codemirror/mode/css/css')
    import('codemirror/mode/htmlmixed/htmlmixed')
    import('codemirror/mode/markdown/markdown')
    return import('react-codemirror2').then(mod => mod.Controlled)
  },
  { ssr: false },
)

const beautify_html = require('js-beautify').html
import { pluginsAPIURL } from '../../../../../config/config'
const baseAPIURL = pluginsAPIURL

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return { props: { isAdminRoute: true, userId: params?.id } }
}

const DetailedUserView = props => {
  let { userId } = props

  const [isLoading, setIsLoading] = useState(true)
  const [originalData, setOriginalData] = useState(null)

  useEffect(() => {
    fetch(baseAPIURL + 'users/' + userId)
      .then(response => response.json())
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
      .then(data => {
        setOriginalData(data)
        setIsLoading(false)
      })
  }, [userId])

  if (isLoading || !originalData) {
    return (
      <div className="sweet-loading card">
        <div className="spinner-container">
          <ClipLoader
            className="spinner"
            sizeUnit={'px'}
            size={50}
            color={'#123abc'}
            loading={isLoading}
          />
        </div>
      </div>
    )
  }

  const editPath = '/admin/users/update/' + userId

  return (
    <div className="Card FormCard">
      <div className="CardBody">
        <h1>
          {originalData && originalData.titleFieldKey}
          <a className="Link EditLink" href={editPath}>
            Edit
          </a>
        </h1>

        {/* Insert all view form fields here */}
      </div>
    </div>
  )
}

export default DetailedUserView
