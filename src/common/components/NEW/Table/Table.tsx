import { useTable } from 'react-table'
import { Table } from 'react-bootstrap'

import styles from './Table.module.scss'
const ReactTable = ({ columns, data }: { columns: any; data: any }): JSX.Element => {
  const tableInstance = useTable({ columns, data })
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

  return (
    <Table {...getTableProps()} striped bordered hover size="sm" className={styles.table}>
      <thead className={styles.head}>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup, index) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column, index) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()} key={index}>
                    {
                      // Render the header
                      column.render('Header')
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()} className={styles.body}>
        {
          // Loop over the table rows
          rows.map((row, index) => {
            // Prepare the row for display
            prepareRow(row)
            return (
              // Apply the row props
              <tr {...row.getRowProps()} key={index}>
                {
                  row.cells.map((cell, index) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()} key={index}>
                        {
                          // Render the cell contents
                          cell.render('Cell')
                        }
                      </td>
                    )
                  })

                  // Loop over the rows cells
                }
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}

export default ReactTable
