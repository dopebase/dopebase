'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { Formik } from 'formik'
import { ClipLoader } from 'react-spinners'
import { websiteURL } from '../../../../config/config'
import MetaHeader from '../MetaHeader'
import NavigationMenu from '../NavigationMenu'
import Footer from '../Footer'
import styles from './Contact.module.css'

const contactReasons = [
  'Request details about a product',
  'General question',
  'Join waitlist',
  'Customer Support',
  'Custom Development',
  'Partnership',
  'Job Application',
]

const ContactView = ({ prefilledEmail, prefilledName }) => {
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: prefilledName,
    email: prefilledEmail,
    // reason: contactReasons[0],
    message: '',
    orderID: null,
    existingCustomer: false,
  })
  const [result, setResult] = useState(null)

  const submitContactForm = async (data, setSubmitting) => {
    setFormData(data)
    setIsLoading(true)
    const response = await axios.post(
      `${websiteURL}api/plugins/customer-support/contact`,
      data,
    )
    console.log(response)
    if (response?.data?.success) {
      setResult({ success: true })
      setFormData({
        name: prefilledName,
        email: prefilledEmail,
        // reason: contactReasons[0],
        message: '',
        orderID: null,
      })
    } else {
      setResult(response?.data)
    }

    setSubmitting(false)
    setIsLoading(false)
  }

  if (isLoading) {
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

  return (
    <>
      <MetaHeader
        seoDescription={
          "Contact us for any questions or concerns you may have. We're here to help!"
        }
        seoTitle={'Contact Us | Dopebase'}
        seoKeyword={'contact us, customer support, customer service'}
      />
      <NavigationMenu />

      <h1 className={styles.title}>Contact Us</h1>
      <h2 className={styles.subtitle}>
        Do you have a question? Let us know and we'll answer in no time!
      </h2>
      {result?.success === true && (
        <div className={styles.successMessage}>
          Your message has been sent. Our team will get back to you with a
          response as soon as possible.
        </div>
      )}
      <div className={styles.contactCard}>
        <div>
          <Formik
            initialValues={formData}
            validate={values => {
              const errors = {}
              if (!values.email) {
                errors.email = 'Email field is required.'
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address'
              }
              if (!values.message) {
                errors.message = 'Message field is required.'
              }
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              submitContactForm(values, setSubmitting)
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
                <div className={styles.FormFieldContainer}>
                  <label className={styles.FormLabel}>Your Name</label>
                  <input
                    className={styles.FormTextField}
                    type="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <p className={styles.ErrorMessage}>
                    {errors.name && touched.name && errors.name}
                    {result && result.errors && result.errors.name}
                  </p>
                </div>

                <div className={styles.FormFieldContainer}>
                  <label className={styles.FormLabel}>E-mail</label>
                  <input
                    className={styles.FormTextField}
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <p className={styles.ErrorMessage}>
                    {errors.email && touched.email && errors.email}
                    {result && result.errors && result.errors.email}
                  </p>
                </div>

                {/* <div className={styles.FormFieldContainer}>
                  <label className={styles.FormLabel}>Reason</label>

                  <select
                    className={styles.FormTextField}
                    name="reason"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.reason}>
                    {contactReasons.map(reason => (
                      <option key={escape(reason)} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div> */}

                {/* <div className={styles.FormFieldContainer}>
                  <label className={styles.FormCheckboxLabel}>
                    <input
                      className={styles.checkboxField}
                      type="checkbox"
                      name="existingCustomer"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.existingCustomer}
                    />
                    I am an existing customer
                  </label>

                  <p className={styles.ErrorMessage}>
                    {errors.existingCustomer &&
                      touched.existingCustomer &&
                      errors.existingCustomer}
                    {result && result.errors && result.errors.existingCustomer}
                  </p>
                </div> */}

                <div className={styles.FormFieldContainer}>
                  <label className={styles.FormLabel}>Your Message to Us</label>
                  <p className={styles.formLabelSubtitle}>
                    <i>
                      Please include your Order ID if you are an existing
                      customer.
                    </i>
                  </p>
                  <textarea
                    className={styles.FormTextareaField}
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                  />
                  <p className={styles.ErrorMessage}>
                    {errors.message && touched.message && errors.message}
                    {result && result.errors && result.errors.message}
                  </p>
                </div>

                <div>
                  <button
                    className={styles.PrimaryButton}
                    type="submit"
                    disabled={isSubmitting}>
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ContactView
