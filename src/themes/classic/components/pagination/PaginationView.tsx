import React from 'react'
import styles from './PaginationView.module.css'

const PaginationView: React.FC<{
  baseURL: string
  totalPages: number
  currentPage: number
}> = ({ baseURL, totalPages, currentPage }) => {
  if (totalPages <= 1) {
    return null
  }
  const pageLinks = [
    <a
      key={1}
      href={`${baseURL}`}
      className={1 == currentPage ? styles.currentPage : styles.page}>
      {1}
    </a>,
  ]

  for (let i = 2; i <= totalPages; i++) {
    pageLinks.push(
      <a
        key={i}
        href={`${baseURL}?page=${i}`}
        className={i == currentPage ? styles.currentPage : styles.page}>
        {i}
      </a>,
    )
  }
  return <div className={styles.pagination}>{pageLinks}</div>
}

export default PaginationView
