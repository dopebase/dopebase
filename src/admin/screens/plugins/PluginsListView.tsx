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

const pluginsColumns = [
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
    Header: 'Created At',
    accessor: 'createdAt',
    Cell: data => <IMDateTableCell timestamp={data.value} />,
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    Cell: data => <ActionsItemView data={data} />,
  },
]

function ActionsItemView(props) {
  const { data } = props
  const item = data.row.original
  const router = useRouter()

  const handleInstall = async item => {
    const response = await authPost(
      `${websiteURL}api/system/plugins/install?id=${item.id}`,
    )
    console.log(response)
    window.location.reload(false)
  }

  const handleUninstall = async item => {
    if (window.confirm('Are you sure you want to uninstall this plugin?')) {
      const response = await authPost(
        `${websiteURL}api/system/plugins/uninstall?id=${item.id}`,
      )
      window.location.reload(false)
    }
  }

  console.log(data)

  return (
    <div className={styles.inlineActionsContainer}>
      {item.installed === true && (
        <button
          onClick={() => handleUninstall(data.row.original)}
          type="button"
          id="tooltip264453216"
          className="btn-icon btn btn-info btn-sm">
          <i className="fa fa-setuo"></i>Uninstall
        </button>
      )}
      {item.installed === false && (
        <button
          onClick={() => handleInstall(data.row.original)}
          type="button"
          id="tooltip366246651"
          className="btn-icon btn btn-success btn-sm">
          <i className="fa fa-edit">Install</i>
        </button>
      )}
    </div>
  )
}

export const PluginsListView = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [plugins, setPlugins] = useState([])
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  const [user, token, loading] = useCurrentUser()

  const columns = useMemo(() => pluginsColumns, [])

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
      data: plugins,
    },
    useGlobalFilter,
    usePagination,
  )

  useEffect(() => {
    const fetchData = async () => {
      const response = await authFetch(`${websiteURL}api/system/plugins`)
      const plugins = response?.data.plugins
      if (plugins) {
        console.log(plugins)
        setData(plugins)
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
    setPlugins(data)
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
                <h4>Plugins</h4>
              </div>
              <div className={styles.CardBody}>
                <div className={styles.TableContainer}>
                  <input
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
