// @ts-nocheck
'use client'
import React, { useMemo, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IMDateTableCell } from '../../components/forms/table/IMDateTableCell'
import { useTable, usePagination, useGlobalFilter } from 'react-table'
import useCurrentUser from '../../../modules/auth/hooks/useCurrentUser'
import { authFetch, authPost } from '../../../modules/auth/utils/authFetch'
import { websiteURL } from '../../../config/config'
import styles from '../../themes/admin.module.css'
/* Insert extra imports for table cells here */

const themesColumns = [
  {
    Header: 'Identifier',
    accessor: 'id',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
  {
    Header: 'Version',
    accessor: 'version',
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    Cell: data => <ActionsItemView data={data} />,
  },
]

function ActionsItemView(props) {
  const { data, isSelected } = props
  const item = data.row.original
  const router = useRouter()

  const handleInstall = async item => {
    if (
      window.confirm(
        'Are you sure you want to activate this theme? Changes will apply to your website immediately',
      )
    ) {
      const response = await authPost(
        `${websiteURL}api/system/themes/use?theme=${item.id}`,
      )
      window.location.reload(false)
    }
  }

  return (
    <div className={styles.inlineActionsContainer}>
      {!item.selected && (
        <button
          onClick={() => handleInstall(item)}
          type="button"
          id="tooltip366246651"
          className="btn-icon btn btn-success btn-sm">
          <i className="fa fa-edit">Activate</i>
        </button>
      )}
    </div>
  )
}

export const ThemesListView = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [themes, setThemes] = useState([])
  const [data, setData] = useState([])
  const [selectedTheme, setSelectedTheme] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [error, setError] = useState(null)

  const [user, token, loading] = useCurrentUser()

  const columns = useMemo(() => themesColumns, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    //pagination
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: themes,
    },
    useGlobalFilter,
    usePagination,
  )

  useEffect(() => {
    const fetchData = async () => {
      const response = await authFetch(`${websiteURL}api/system/themes`)
      const themes = response?.data.themes
      if (themes) {
        const selectedTheme = response?.data.selectedTheme
        setSelectedTheme(selectedTheme)
        // Compute selected index
        const selectedIndex = themes.findIndex(
          theme => theme.id === selectedTheme?.id,
        )
        setSelectedIndex(selectedIndex)
        // Add selected field to themes
        const richThemes = themes.map(theme => {
          return {
            ...theme,
            selected: theme.id === selectedTheme,
          }
        })
        setData(richThemes)
      } else {
        setError('Access denied')
      }
      setIsLoading(false)
    }
    if (user && !loading) {
      fetchData()
    }
  }, [user, loading])

  useEffect(() => {
    setThemes(data)
  }, [pageIndex, pageSize, data])

  if (error) {
    return <>{error}</>
  }

  return (
    <>
      <div className={`content ${styles.content}`}>
        <div className="row">
          <div className="col col-md-12">
            <div className="Card">
              <div className="CardHeader">
                <h4>Themes</h4>
              </div>
              <div className={styles.CardBody}>
                <div className={styles.TableContainer}>
                  <input
                    className={`${styles.SearchInput} SearchInput`}
                    type="text"
                    placeholder="Search..."
                    value={globalFilter || ''}
                    onChange={e => setGlobalFilter(e.target.value)}
                  />
                  <table className={styles.Table} {...getTableProps()}>
                    <thead>
                      {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                              {column.render('Header')}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {page.map((row, i) => {
                        prepareRow(row)
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                              return (
                                <td {...cell.getCellProps()}>
                                  {cell.render('Cell')}
                                </td>
                              )
                            })}
                          </tr>
                        )
                      })}
                      <tr>
                        {isLoading ? (
                          <td colSpan={columns.length - 1}>
                            <p>Loading...</p>
                          </td>
                        ) : (
                          <td colSpan={columns.length - 1}>
                            <p className={styles.PaginationDetails}>
                              Showing {page.length} of {data.length} results
                            </p>
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                  <div className={styles.Pagination}>
                    <div className={styles.LeftPaginationButtons}>
                      <button
                        onClick={() => gotoPage(0)}
                        className={styles.PaginationButton}
                        disabled={!canPreviousPage}>
                        <i className="fa fa-angle-double-left"></i>
                      </button>{' '}
                      <button
                        onClick={() => previousPage()}
                        className={styles.PaginationButton}
                        disabled={!canPreviousPage}>
                        <i className="fa fa-angle-left"></i>
                      </button>
                    </div>
                    <div className={styles.CenterPaginationButtons}>
                      <span>
                        Page{' '}
                        <strong>
                          {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                      </span>
                      <span>
                        | Go to page:{' '}
                        <input
                          type="number"
                          defaultValue={pageIndex + 1}
                          onChange={e => {
                            const page = e.target.value
                              ? Number(e.target.value) - 1
                              : 0
                            gotoPage(page)
                          }}
                          style={{ width: '100px' }}
                        />
                      </span>{' '}
                      <select
                        value={pageSize}
                        onChange={e => {
                          setPageSize(Number(e.target.value))
                        }}>
                        {[10, 20, 30, 40, 50].map(pageSize => (
                          <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.RightPaginationButtons}>
                      <button
                        onClick={() => nextPage()}
                        className={styles.PaginationButton}
                        disabled={!canNextPage}>
                        <i className="fa fa-angle-right"></i>
                      </button>{' '}
                      <button
                        onClick={() => gotoPage(pageCount - 1)}
                        className={styles.PaginationButton}
                        disabled={!canNextPage}>
                        <i className="fa fa-angle-double-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
