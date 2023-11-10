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
const baseAPIURL = `${pluginsAPIURL}admin/blog/`

const DetailedArticlesView = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [originalData, setOriginalData] = useState(null)

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authFetch(
          baseAPIURL + 'articles/view?id=' + id,
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
                <label className={`${styles.FormLabel} FormLabel`}>Title</label>
                <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.title}</span>
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Content</label>
                <div className={`${styles.FormTextField} ${styles.markdownEditorReadOnly} markdownEditorReadOnly FormTextField`}>
                  <Editor
                    defaultValue={originalData?.content ?? ''}
                    readOnly={true}
                  />
                </div>
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Cover Photo</label>
                {originalData.cover_photo && (
                    <IMPhoto openable className="photo" src={originalData.cover_photo} />
                )}
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Photos</label>
                {originalData.photo_urls && originalData.photo_urls.map((url) =>
                    <IMPhoto openable className="photo" src={url} />
                )}
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Github URL</label>
                <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.source_code_url}</span>
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Canonical URL</label>
                <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.canonical_url}</span>
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Published</label>
                <IMToggleSwitchComponent isChecked={originalData.published} disabled />
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Outdated</label>
                <IMToggleSwitchComponent isChecked={originalData.outdated} disabled />
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Slug</label>
                <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.slug}</span>
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>SEO Title</label>
                <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.seo_title}</span>
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>SEO Description</label>
                <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.seo_description}</span>
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>SEO Keyword</label>
                <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.seo_keyword}</span>
            </div>
    

             <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Author</label>
                <IMForeignKeyComponent id={originalData.author_id} apiRouteName="admin/blog/users" viewRoute="../users" titleKey="title" />
            </div>
    

             <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Category</label>
                <IMForeignKeyComponent id={originalData.category_id} apiRouteName="admin/blog/article_categories" viewRoute="../article_categories" titleKey="name" />
            </div>
    

             <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>ArticleTags</label>
                <IMForeignKeysIdComponent ids={originalData.tags} apiRouteName="admin/blog/article_tags" viewRoute="../article_tags" titleKey="title" />
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Created At</label>
                <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.created_at && formatTimestamp(originalData.created_at)}</span>
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Updated At</label>
                <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.updated_at && formatTimestamp(originalData.updated_at)}</span>
            </div>
    

      </div>
    </div>
  )
}

export default DetailedArticlesView
