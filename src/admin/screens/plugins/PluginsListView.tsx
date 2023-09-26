// @ts-nocheck
'use client'
import React, { useMemo, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IMDateTableCell } from '../../components/forms/table/IMDateTableCell'
import { useTable, usePagination, useGlobalFilter } from 'react-table'
import useCurrentUser from '../../../modules/auth/hooks/useCurrentUser'
import { authFetch } from '../../../modules/auth/utils/authFetch'
import { websiteURL } from '../../../config/config'
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
  const router = useRouter()

  const handleView = item => {
    const viewPath = websiteURL + item.slug
    const win = window.open(viewPath, '_blank')
    if (win != null) {
      win.focus()
    }
  }

  const handleEdit = item => {
    const editPath = './plugins/update/' + item.id
    router.push(editPath)
  }

  const handleDelete = async item => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const response = await fetch(
        `${websiteURL}system/plugins/delete?id=${item.id}`,
        {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        },
      )
      window.location.reload(false)
    }
  }

  return (
    <div className="inline-actions-container">
      <button
        onClick={() => handleView(data.row.original)}
        type="button"
        id="tooltip264453216"
        className="btn-icon btn btn-info btn-sm">
        <i className="fa fa-eye"></i>
      </button>
      <button
        onClick={() => handleEdit(data.row.original)}
        type="button"
        id="tooltip366246651"
        className="btn-icon btn btn-success btn-sm">
        <i className="fa fa-edit"></i>
      </button>
      <button
        onClick={() => handleDelete(data.row.original)}
        type="button"
        id="tooltip476609793"
        className="btn-icon btn btn-danger btn-sm">
        <i className="fa fa-times"></i>
      </button>
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
      <div className="content">
        <div className="row">
          <div className="col col-md-12">
            <div className="Card">
              <div className="CardHeader">
                <a className="Link AddLink" href="./plugins/add">
                  Add New
                </a>
                <h4>Plugins</h4>
              </div>
              <div className="CardBody">
                <div className="TableContainer">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={globalFilter || ''}
                    onChange={e => setGlobalFilter(e.target.value)}
                  />
                  <table className="Table" {...getTableProps()}>
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
                            <p className="PaginationDetails">
                              Showing {page.length} of {data.length} results
                            </p>
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                  <div className="Pagination">
                    <div className="LeftPaginationButtons">
                      <button
                        onClick={() => gotoPage(0)}
                        className="PaginationButton"
                        disabled={!canPreviousPage}>
                        <i className="fa fa-angle-double-left"></i>
                      </button>{' '}
                      <button
                        onClick={() => previousPage()}
                        className="PaginationButton"
                        disabled={!canPreviousPage}>
                        <i className="fa fa-angle-left"></i>
                      </button>
                    </div>
                    <div className="CenterPaginationButtons">
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
                    <div className="RightPaginationButtons">
                      <button
                        onClick={() => nextPage()}
                        className="PaginationButton"
                        disabled={!canNextPage}>
                        <i className="fa fa-angle-right"></i>
                      </button>{' '}
                      <button
                        onClick={() => gotoPage(pageCount - 1)}
                        className="PaginationButton"
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
