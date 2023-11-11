// @ts-nocheck
'use client'
import React, { useMemo, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/navigation'
import { useGlobalFilter, useTable, usePagination } from 'react-table'
import { IMDateTableCell } from '../../components/forms/table/IMDateTableCell'
import useCurrentUser from '../../../modules/auth/hooks/useCurrentUser'
import { authFetch, authPost } from '../../../modules/auth/utils/authFetch'
import styles from '../../themes/admin.module.css'
import { websiteURL } from '../../../config/config'

export const getStaticProps: GetStaticProps = async () => {
  return { props: { isAdminRoute: true } }
}

const SettingsColumns = [
  {
    Header: 'Settings Name',
    accessor: 'name',
  },
  {
    Header: 'Settings Value',
    accessor: 'value',
  },
  {
    Header: 'Created Date',
    accessor: 'created_at',
    Cell: data => <IMDateTableCell timestamp={data.value} />,
  },
  {
    Header: 'Updated Date',
    accessor: 'updated_at',
    Cell: data => <IMDateTableCell timestamp={data.value} />,
  },
  ,
  {
    Header: 'Actions',
    accessor: 'actions',
    Cell: data => <ActionsItemView data={data} />,
  },
]

function ActionsItemView(props) {
  const { data } = props
  const router = useRouter()

  const handleView = item => {
    const viewPath = './settings/view?id=' + item.id
    router.push(viewPath)
  }

  const handleEdit = item => {
    const editPath = './settings/update?id=' + item.id
    router.push(editPath)
  }

  const handleDelete = async item => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const path = websiteURL + 'api/system/settings/delete'
      const response = await authPost(path, { id: item.id })
      window.location.reload(false)
    }
  }

  return (
    <div className={`${styles.inlineActionsContainer} inlineActionsContainer`}>
      <button
        onClick={() => handleView(data.row.original)}
        type="button"
        id="tooltip264453216"
        className={`${styles.btnSm} btn-icon btn btn-info btn-sm`}>
        <i className="fa fa-eye"></i>
      </button>
      <button
        onClick={() => handleEdit(data.row.original)}
        type="button"
        id="tooltip366246651"
        className={`${styles.btnSm} btn-icon btn btn-success btn-sm`}>
        <i className="fa fa-edit"></i>
      </button>
      <button
        onClick={() => handleDelete(data.row.original)}
        type="button"
        id="tooltip476609793"
        className={`${styles.btnSm} btn-icon btn btn-danger btn-sm`}>
        <i className="fa fa-times"></i>
      </button>
    </div>
  )
}

function SettingsListView(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [Settings, setSettings] = useState([])
  const [data, setData] = useState([])

  const [user, token, loading] = useCurrentUser()

  const columns = useMemo(() => SettingsColumns, [])

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
      data: Settings,
    },
    useGlobalFilter,
    usePagination,
  )

  useEffect(() => {
    const fetchData = async () => {
      const response = await authFetch(`${websiteURL}api/system/settings/list`)
      const data = response?.data
      if (data) {
        setData(data)
      } else {
        alert('Error fetching data - try refreshing the page')
      }
      setIsLoading(false)
    }
    if (user && !loading) {
      fetchData()
    }
  }, [user, loading])

  useEffect(() => {
    setSettings(data)
  }, [pageIndex, pageSize, data])

  return (
    <>
      <div className={`${styles.adminContent} adminContent`}>
        <div className="row">
          <div className="col col-md-12">
            <div className="Card">
              <div className="CardHeader">
                <a
                  className={`${styles.Link} ${styles.AddLink} Link AddLink`}
                  href="./settings/add">
                  Add New
                </a>
                <h1>Settings</h1>
              </div>
              <div className={`${styles.CardBody} CardBody`}>
                <div className={`${styles.TableContainer} TableContainer`}>
                  <input
                    className={`${styles.SearchInput} SearchInput`}
                    type="text"
                    placeholder="Search..."
                    value={globalFilter || ''}
                    onChange={e => setGlobalFilter(e.target.value)}
                  />
                  <table
                    className={`${styles.Table} Table`}
                    {...getTableProps()}>
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
                          <td colSpan={SettingsColumns.length - 1}>
                            <p>Loading...</p>
                          </td>
                        ) : (
                          <td colSpan={SettingsColumns.length - 1}>
                            <p
                              className={`${styles.PaginationDetails} PaginationDetails`}>
                              Showing {page.length} of {data.length} results
                            </p>
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                  <div className={`${styles.Pagination} Pagination`}>
                    <div
                      className={`${styles.LeftPaginationButtons} LeftPaginationButtons`}>
                      <button
                        onClick={() => gotoPage(0)}
                        className={`${styles.PaginationButton}`}
                        disabled={!canPreviousPage}>
                        <i className="fa fa-angle-double-left"></i>
                      </button>{' '}
                      <button
                        onClick={() => previousPage()}
                        className={`${styles.PaginationButton}`}
                        disabled={!canPreviousPage}>
                        <i className="fa fa-angle-left"></i>
                      </button>
                    </div>
                    <div className={`${styles.CenterPaginationButtons}`}>
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
                    <div className={`${styles.RightPaginationButtons}`}>
                      <button
                        onClick={() => nextPage()}
                        className={`${styles.PaginationButton}`}
                        disabled={!canNextPage}>
                        <i className="fa fa-angle-right"></i>
                      </button>{' '}
                      <button
                        onClick={() => gotoPage(pageCount - 1)}
                        className={`${styles.PaginationButton}`}
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

export default SettingsListView
