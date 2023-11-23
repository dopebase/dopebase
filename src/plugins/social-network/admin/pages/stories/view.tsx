// @ts-nocheck
'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import { formatTimestamp } from '../../../../../utils'
import {
  IMForeignKeyComponent,
  IMForeignKeysComponent,
  IMMultimediaComponent,
  IMForeignKeysIdComponent,
  IMPhoto,
  IMToggleSwitchComponent,
  IMColorBoxComponent,
} from '../../../../../admin/components/forms/fields'
import Editor from 'rich-markdown-editor'
import dynamic from 'next/dynamic'
const CodeMirror = dynamic(
  () => {
    import('codemirror')
    import('codemirror/mode/javascript/javascript')
    import('codemirror/mode/css/css')
    import('codemirror/mode/htmlmixed/htmlmixed')
    import('codemirror/mode/markdown/markdown')
    return import('react-codemirror2').then(mod => mod.Controlled)
  },
  { ssr: false },
)
import styles from '../../../../../admin/themes/admin.module.css'

const beautify_html = require('js-beautify').html
import { pluginsAPIURL } from '../../../../../config/config'
import { authFetch } from '../../../../../modules/auth/utils/authFetch'
const baseAPIURL = `${pluginsAPIURL}admin/social-network/`

const DetailedStoriesView = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [originalData, setOriginalData] = useState(null)

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authFetch(
          baseAPIURL + 'stories/view?id=' + id,
        )
        if (response?.data) {
          setOriginalData(response.data)
        } else {
          alert('Error fetching data - try refreshing the page')
        }
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [id])

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

  const editPath = './update?id=' + id

  return (
    <div className={`${styles.FormCard} ${styles.Card} Card FormCard`}>
      <div className={`${styles.CardBody} CardBody`}>
        <h1>
          {originalData && originalData.name}
          <a
            className={`${styles.Link} ${styles.EditLink} Link EditLink`}
            href={editPath}>
            Edit
          </a>
        </h1>

        {/* Insert all view form fields here */}
            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Story ID</label>
                <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData && originalData.id}</span>
            </div>


             <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Author</label>
                <IMForeignKeyComponent id={originalData.authorID} apiRouteName="admin/social-network/users" viewRoute="../users" titleKey="email" />
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Date</label>
                <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.createdAt && formatTimestamp(originalData.createdAt)}</span>
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Media</label>
                {originalData.storyMediaURL && (
                    <IMPhoto openable className="photo" src={originalData.storyMediaURL} />
                )}
            </div>
    

              <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                  <label className={`${styles.FormLabel} FormLabel`}>Type</label>
                  <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData && originalData.storyType}</span>
              </div>
          

      </div>
    </div>
  )
}

export default DetailedStoriesView
