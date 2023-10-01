// @ts-nocheck
'use client'
import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { ClipLoader } from 'react-spinners'
import { formatDate } from '../../../../utils'
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
    // import('codemirror/mode/javascript/javascript')
    // import('codemirror/mode/css/css')
    // import('codemirror/mode/htmlmixed/htmlmixed')
    // import('codemirror/mode/markdown/markdown')
    return import('react-codemirror2').then(mod => mod.Controlled)
  },
  { ssr: false },
)

const beautify_html = require('js-beautify').html
import { pluginsAPIURL } from '../../../../../config/config'
const baseAPIURL = pluginsAPIURL

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return { props: { isAdminRoute: true, categoryId: params?.id } }
}

const DetailedCategoryView = props => {
  let { categoryId } = props

  const [isLoading, setIsLoading] = useState(true)
  const [originalData, setOriginalData] = useState(null)

  useEffect(() => {
    fetch(baseAPIURL + 'categories/' + categoryId)
      .then(response => response.json())
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
      .then(data => {
        setOriginalData(data)
        setIsLoading(false)
      })
  }, [categoryId])

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

  const editPath = '/admin/articles/categories/update/' + categoryId

  return (
    <div className="Card FormCard">
      <div className="CardBody">
        <h1>
          {originalData && originalData.name}
          <a className="Link EditLink" href={editPath}>
            Edit
          </a>
        </h1>

        {/* Insert all view form fields here */}
        <div className="FormFieldContainer">
          <label className="FormLabel">Name</label>
          <span className="LockedFieldValue">{originalData.name}</span>
        </div>

        <div className="FormFieldContainer">
          <label className="FormLabel">Description</label>
          <div className="markdownEditorReadOnly FormTextField">
            <Editor defaultValue={originalData.description} readOnly={true} />
          </div>
        </div>

        <div className="FormFieldContainer">
          <label className="FormLabel">Slug</label>
          <span className="LockedFieldValue">{originalData.slug}</span>
        </div>

        <div className="FormFieldContainer">
          <label className="FormLabel">Logo</label>
          {originalData.logo_url && (
            <IMPhoto openable className="photo" src={originalData.logo_url} />
          )}
        </div>

        <div className="FormFieldContainer">
          <label className="FormLabel">SEO Title</label>
          <span className="LockedFieldValue">{originalData.seo_title}</span>
        </div>

        <div className="FormFieldContainer">
          <label className="FormLabel">SEO Description</label>
          <span className="LockedFieldValue">
            {originalData.seo_description}
          </span>
        </div>

        <div className="FormFieldContainer">
          <label className="FormLabel">Canonical URL</label>
          <span className="LockedFieldValue">{originalData.canonical_url}</span>
        </div>

        <div className="FormFieldContainer">
          <label className="FormLabel">SEO Cover Image</label>
          {originalData.seo_image_url && (
            <IMPhoto
              openable
              className="photo"
              src={originalData.seo_image_url}
            />
          )}
        </div>

        <div className="FormFieldContainer">
          <label className="FormLabel">Published</label>
          <IMToggleSwitchComponent
            isChecked={originalData.published}
            disabled
          />
        </div>

        <div className="FormFieldContainer">
          <label className="FormLabel">Parent Category</label>
          <IMForeignKeyComponent
            id={originalData.parent_id}
            apiRouteName="category"
            titleKey="name"
          />
        </div>
      </div>
    </div>
  )
}

export default DetailedCategoryView
