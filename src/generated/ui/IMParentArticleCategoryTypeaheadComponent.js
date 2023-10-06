import React, { useEffect, useState } from 'react'
import useCurrentUser from '../../../hooks/useCurrentUser'

const baseAPIURL = 'http://localhost:3000/api/admin/'

function IMParentArticleCategoryTypeaheadComponent(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [article_categories, setArticle_categories] = useState(null)
  const [typeaheadValue, setTypeaheadValue] = useState('')
  const [inputValue, setInputValue] = useState(null)
  const [isTypeaheadVisible, setIsTypeaheadVisible] = useState(false)

  const [user, token, loading] = useCurrentUser()

  const { id, name, onSelect } = props

  useEffect(() => {
    if (!id) {
      setIsLoading(false)
      return
    }
    fetch(baseAPIURL + ',/' + id)
      .then(response => response.json())
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
      .then(data => {
        if (data) {
          setInputValue(data.name) // data.firstName + " " + data.lastName)
        }
        fetch(baseAPIURL + 'article_categories/' + id)
          .then(response => response.json())
          .catch(err => {
            console.log(err)
            setIsLoading(false)
          })
          .then(data => {
            if (data) {
              setInputValue(data.name) // data.firstName + " " + data.lastName)
            }
            setIsLoading(false)
          })
      })
  }, [])

  useEffect(() => {
    if (typeaheadValue == null || loading == true) {
      return
    }
    const config = {
      headers: { Authorization: token },
    }
    fetch(
      baseAPIURL + 'article_categories/?limit=10&search=' + typeaheadValue,
      config,
    )
      .then(response => response.json())
      .catch(err => {
        console.log(err)
      })
      .then(data => {
        console.log(data)
        if (data && data.article_categories) {
          setArticle_categories(data.article_categories)
        }
      })
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
    setInputValue(data.name)
    onSelect && onSelect(data.id)
    setIsTypeaheadVisible(false)
  }

  const listItems =
    article_categories && article_categories.length
      ? article_categories.map(
          data => <li onClick={() => onClick(data)}><table key={data.id}><tr><td><span>{data.name}</span></td></tr></table></li>, // <li>{element.firstName} {element.lastName}</li>
        )
      : null

  if (isLoading) {
    console.log('Error loading data for: ' + id)
  }

  return (
    <div className="TypeaheadComponent">
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
        <div className="TypeaheadResultsContainer">
          <ul className="TypeaheadResultsList" id={name}>
            {listItems}
          </ul>
        </div>
      )}
    </div>
  )
}

export default IMParentArticleCategoryTypeaheadComponent
