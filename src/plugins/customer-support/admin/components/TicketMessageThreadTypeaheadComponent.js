'use client'
import React, { useEffect, useState } from 'react'
import useCurrentUser from '../../../../modules/auth/hooks/useCurrentUser'
import { authFetch } from '../../../../modules/auth/utils/authFetch'
import { pluginsAPIURL } from '../../../../config/config'
import { unescapeString } from '../../../../utils'
import styles from '../../../../admin/themes/admin.module.css'

const baseAPIURL = `${pluginsAPIURL}admin/customer-support/`

function TicketMessageThreadTypeaheadComponent(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [ticket_threads, setTicket_threads] = useState(null)
  const [typeaheadValue, setTypeaheadValue] = useState('')
  const [inputValue, setInputValue] = useState(null)
  const [isTypeaheadVisible, setIsTypeaheadVisible] = useState(false)

  const [user, token, loading] = useCurrentUser()

  const { id, name, onSelect } = props

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setIsLoading(false)
        return
      }
      try {
        const response = await authFetch(
          baseAPIURL + 'ticket_threads/view?id=' + id,
        )
        if (response?.data) {
          const data = response.data
          setInputValue(data.subject)
          setIsLoading(false)
        }
      } catch (err) {
        console.log(err)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [id])

  useEffect(() => {
    const fetchData = async () => {
      if (typeaheadValue == null || loading == true) {
        return
      }
      try {
        const response = await authFetch(
          baseAPIURL +
            'ticket_threads/list?limit=10&search=' +
            typeaheadValue,
        )
        if (response?.data) {
          console.log(response.data)
          if (response?.data) {
            setTicket_threads(response.data)
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [typeaheadValue, loading])

  const handleChange = event => {
    const text = event.target.value
    setTypeaheadValue(text)
    setInputValue(text)
  }

  const onFocus = () => {
    setIsTypeaheadVisible(true)
  }

  const onBlur = () => {
    //setIsTypeaheadVisible(false)
  }

  const onClick = data => {
    setInputValue(data.subject)
    onSelect && onSelect(data.id)
    setIsTypeaheadVisible(false)
  }

  const listItems =
    ticket_threads && ticket_threads.length
      ? ticket_threads.map(
          data => <li onClick={() => onClick(data)}><table key={data.id}><tr><td><span>{data.subject}</span></td></tr></table></li>, // <li>{element.firstName} {element.lastName}</li>
        )
      : null

  if (isLoading) {
    console.log('Error loading data for: ' + id)
  }

  return (
    <div className={`${styles.TypeaheadComponent} TypeaheadComponent`}>
      <input
        className={`${styles.FormTextField} FormTextField`}
        autoComplete="off"
        onFocus={onFocus}
        onBlur={onBlur}
        type="text"
        name={name}
        value={inputValue}
        onChange={handleChange}
      />
      {isTypeaheadVisible && (
        <div
          className={`${styles.TypeaheadResultsContainer} TypeaheadResultsContainer`}>
          <ul
            className={`${styles.TypeaheadResultsList} TypeaheadResultsList`}
            id={name}>
            {listItems}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TicketMessageThreadTypeaheadComponent
