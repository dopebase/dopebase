// @ts-nocheck
'use client'
import React, { useState } from 'react'
import { Formik } from 'formik'
import styles from '../../../../admin/themes/admin.module.css'
import { authPost } from '../../../../modules/auth/utils/authFetch'
import { pluginsAPIURL } from '../../../../config/config'

const GenerateIdeasForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [originalData, setOriginalData] = useState({
    prompt: 'Generate 10 title ideas for a blog post about X topic',
    category: 'Uncategorized',
  })

  const generateIdeas = async (modifiedData, setSubmitting) => {
    console.log(modifiedData)
    setIsLoading(true)
    const res = await authPost(`${pluginsAPIURL}admin/blog/ai/generate-ideas`, {
      ...modifiedData,
    })
    console.log(res)
    setSubmitting(false)
    // setIsLoading(false)
    // reload
    window.location.reload()
  }

  if (isLoading) {
    return <>Generating ideas...</>
  }

  return (
    <div className={`${styles.Card} ${styles.FormCard} Card FormCard`}>
      <div className={`${styles.CardBody} CardBody`}>
        <h3>Generate article ideas</h3>
        <Formik
          initialValues={originalData}
          validate={values => {
            values = { ...values }
            const errors = {}
            {
              if (!values.prompt) {
                errors.prompt = 'Field Required!'
              }
            }

            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            generateIdeas(values, setSubmitting)
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              {/* Insert all edit form fields here */}
              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>
                  AI Prompt
                </label>
                <input
                  className={`${styles.FormTextField} FormTextField`}
                  type="prompt"
                  name="prompt"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.prompt}
                />
                <p className={`${styles.ErrorMessage} ErrorMessage`}>
                  {errors.prompt && touched.prompt && errors.prompt}
                </p>
              </div>
              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>
                  Category
                </label>
                <input
                  className={`${styles.FormTextField} FormTextField`}
                  type="category"
                  name="category"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.category}
                />
                <p className={`${styles.ErrorMessage} ErrorMessage`}>
                  {errors.category && touched.category && errors.category}
                </p>
              </div>
              <div
                className={`${styles.FormActionContainer} FormActionContainer`}>
                <button
                  className={`${styles.PrimaryButton} PrimaryButton`}
                  type="submit"
                  disabled={isSubmitting}>
                  Generate ideas with AI
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default GenerateIdeasForm
