'use client'

import React, { useEffect, useState } from 'react'
import useCurrentUser from '../../../../modules/auth/hooks/useCurrentUser'
import styles from '../../../../admin/themes/admin.module.css'
import { pluginsAPIURL } from '../../../../config/config'

const baseAPIURL = `${pluginsAPIURL}admin/blog/`

function IMArticleTagsMultipleTypeaheadIdComponent(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [article_tags, setArticle_tags] = useState(null)
  const [typeaheadValue, setTypeaheadValue] = useState('')
  const [myData, setData] = useState([])
  const [isTypeaheadVisible, setIsTypeaheadVisible] = useState(false)

  const [user, token, loading] = useCurrentUser()

  const { ids, name, onSelect, onDelete } = props

  async function getData(urls) {
    try {
      if (!ids) {
        throw 'No data to be rendered'
      }
      let data = await Promise.all(urls.map(e => fetch(e)))
      let dataJson = await Promise.all(data.map(e => e.json()))
      setData(dataJson.map(data => data.name))
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (!ids) {
      setIsLoading(false)
      return
    }
    let urls = ids.map(id => baseAPIURL + 'article_tags/view?id=' + id)
    getData(urls)
  }, [ids && ids.length])

  useEffect(() => {
    if (typeaheadValue == null || loading === true) {
      return
    }
    const config = {
      headers: { Authorization: token },
    }
    fetch(
      baseAPIURL + 'article_tags/list?limit=10&search=' + typeaheadValue,
      config,
    )
      .then(response => response.json())
      .catch(err => {
        console.log(err)
      })
      .then(data => {
        console.log(data)
        if (data) {
          setArticle_tags(data)
        }
      })
  }, [typeaheadValue, loading])

  const handleChange = event => {
    const text = event.target.value
    setTypeaheadValue(text)
  }

  const onFocus = () => {
    setIsTypeaheadVisible(true)
  }

  const onBlur = () => {
    //setIsTypeaheadVisible(false)
  }

  const onClick = data => {
    setTypeaheadValue('')
    onSelect && onSelect(data.id)
    setIsTypeaheadVisible(false)
  }

  const viewPath =
    ids && ids.map(id => '/admin/' + 'article_tags/view?id=' + id)

  const listItems =
    article_tags && article_tags.length
      ? article_tags.map(
          data => <li onClick={() => onClick(data)}><table key={data.id}><tr><td><span>{data.name}</span></td></tr></table></li>, // <li>{element.firstName} {element.lastName}</li>
        )
      : null

  const dataItems =
    myData && myData.length
      ? myData.map((data, index) => (
          <li>
            <a href={viewPath[index]}>{data}</a>
            <button
              onClick={() => onDelete(index)}
              type="button"
              style={{
                float: 'right',
                padding: 0,
                border: 'none',
                background: 'none',
              }}>
              x
            </button>
          </li>
        ))
      : null

  if (isLoading) {
    console.log('Error loading data')
  }

  return (
    <div
      className={`${styles.TypeaheadComponent} TypeaheadComponent`}
      style={{ verticalAlign: 'top' }}>
      <div className={`${styles.FormSelectionField} FormSelectionField`}>
        {dataItems}
      </div>
      <input
        className={`${styles.FormTextField} FormTextField`}
        autocomplete="off"
        onFocus={onFocus}
        onBlur={onBlur}
        type="text"
        name={name}
        value={typeaheadValue}
        onChange={handleChange}
      />
      {isTypeaheadVisible && (
        <div
          className={`${styles.TypeaheadResultsContainer} TypeaheadResultsContainer `}>
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

export default IMArticleTagsMultipleTypeaheadIdComponent
