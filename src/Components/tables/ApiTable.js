
import React, { useEffect, useState } from "react";
import { PaginationTable } from "./PaginationTable";

export function ApiTable() {
  const [cells, setCells] = useState([]);
 

  const getData = async () => {
    const resp = await fetch("https://api.thecatapi.com/v1/breeds");
    const data = await resp.json();
    setCells(data);
   
  };
  
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name" // accessor is the "key" in the data
      },
      {
        Header: "Description",
        accessor: "description"
      },
      {
        Header: "Temperament",
        accessor: "temperament"
      }
,
      {
        Header: "Image",
        accessor: "image.url",  
        Cell: (row) => {
          
          return <div><img height={200} src={row.row.original.image?.url}/></div>
        },
      }
    ],
    []
  );

  useEffect(() => {
    getData();
  }, []);

  return <>
  <h1>THE CAT TABLE (paginated)</h1>
  
  {cells && <PaginationTable columns={columns} data={cells} />}</>;
}