import React, { useState, useEffect, useCallback } from "react";

function createData( name, intelligence, temperament, image) {
  return { name, intelligence, temperament, image};
}

export default function SimpleCat() {
  const [rowList, setRowList] = useState([]);
  const [isUpDirection, setIsUpDirection] = useState(true);
 
  const [searchTerm, setSearchTerm] = useState("");

  const handleSortByField = useCallback(
    (field) => {
      const sortedRowList = rowList.sort((a, b) => {
        if (a[field] > b[field]) {
          return isUpDirection ? 1 : -1;
        } else if (a[field] < b[field]) {
          return isUpDirection ? -1 : 1;
        } else {
          return 0;
        }
      });

      setRowList(
        sortedRowList.map((item) =>
          createData(
            
            item.name,
            item.intelligence,
            item.temperament,
            item.image
          )
        )
      );

      setIsUpDirection(!isUpDirection);
    },
    [rowList, setRowList, setIsUpDirection, isUpDirection]
  );


  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  


  useEffect(() => {
    fetch(
        "https://api.thecatapi.com/v1/breeds"

        )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRowList(
          data.map((item) =>
            createData(
              
              item.name,
              item.intelligence,
              item.temperament,
              item.image?.url
            )
          )
        );
      });
  }, [setRowList, createData]);

  const filteredRowList = rowList.filter((item) =>
  item.name.toLowerCase().includes(searchTerm)
  
);

  if (!filteredRowList) {
    return <div>Still Loading</div>;
  }

  return (

    <div style={{ paddingTop: "50px", marginTop:'50px' }}>
      <h1 style={{ color: "#ab0075" }}>The Table of CATS for filter/sort</h1>
      <br />
      <div className="App">
        <input
          type="text"
          placeholder="Filter name"
          value={searchTerm}
          onChange={handleChange}
        />
        <div />
       
        <div>
    <div style={{ paddingTop: "50px" }}>
      
        <button
        className="btn btn-info"
        style={{ padding: "10px", margin:'10px', minwidth: "100px", color:'white'}}
          onClick={() => {
            

            handleSortByField("name");
          }}
        >
          Sort by Name 
        </button>
        <button
        className="btn btn-info"
        style={{ padding: "10px", margin:'10px', minwidth: "100px", color:'white'}}
          onClick={() => {
            

            handleSortByField("intelligence");
          }}
        >
          Sort by Intelligence 
        </button>

        

        <table className="table" style={{ color: "inherit" }}>
          <thead>
            <tr>
              <th scope="col" 
              align="center"
              onClick={() => handleSortByField("name")}>
                Name
              </th>
              <th
                scope="col"
                align="center"
                onClick={() => handleSortByField("intelligence")}
              >
                Intelligence
              </th>
              <th
                scope="col"
                align="center"
                onClick={() => handleSortByField("temperament")}
              >
                Temperament
              </th>
              <th
                scope="col"
                align="center"
          
              >
                Image
              </th>
              
            </tr>
          </thead>

          <tbody>
            {filteredRowList.map((row) => (
              <tr key={row.name}>
                <th scope="row">{row.name}</th>

                <td align="center">{row.intelligence}</td>
               
                <td align="center">{row.temperament}</td>
                <td align="center"><img style={{width:'250px'}} src={row.image} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
    
  
  );
}
