import React from "react";
import { useSortBy, useTable, useGlobalFilter } from "react-table";
import GlobalFilter from "./GlobalFilter"

export  function SortedTable({ columns, data }) {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    state, //table state
    setGlobalFilter //applies global filtering to the table.

} = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
    useSortBy
    
  );
  const { globalFilter } = state;
  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  const styles = {
    thead: {
      backgroundColor: "#2c4e85"
    },
    td: {
      padding: "10px",
      border: "dotted 1px black"
    }
  };

  return ( <>
  <h1>RANDOM SORTED FILTERED TABLE</h1>
  <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
    <table style={{textAlign:"center",margin:'0px auto'}} {...getTableProps()}>
      <thead style={styles.thead}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td style={styles.td} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    </>
  );
}