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
const baseAPIURL = `${pluginsAPIURL}admin/subscriptions/`

const DetailedSubscriptionsView = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [originalData, setOriginalData] = useState(null)

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authFetch(
          baseAPIURL + 'subscriptions/view?id=' + id,
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
                <label className={`${styles.FormLabel} FormLabel`}>User ID</label>
                <IMForeignKeyComponent id={originalData.user_id} apiRouteName="admin/subscriptions/users" viewRoute="../users" titleKey="email" />
            </div>
    

             <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Plan ID</label>
                <IMForeignKeyComponent id={originalData.plan_id} apiRouteName="admin/subscriptions/subscription_plans" viewRoute="../subscription_plans" titleKey="name" />
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Start Date</label>
                <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.start_date && formatTimestamp(originalData.start_date)}</span>
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>End Date</label>
                <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.end_date && formatTimestamp(originalData.end_date)}</span>
            </div>
    

              <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                  <label className={`${styles.FormLabel} FormLabel`}>Status</label>
                  <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData && originalData.status}</span>
              </div>
          

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Last Payment Date</label>
                <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.last_payment_date && formatTimestamp(originalData.last_payment_date)}</span>
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Next Billing Date</label>
                <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.next_billing_date && formatTimestamp(originalData.next_billing_date)}</span>
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

export default DetailedSubscriptionsView
