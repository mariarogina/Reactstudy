import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import CountryForm from '../CountryForm'

function createData(numericCode, name, capital, population) {
  return { numericCode, name, capital, population };
}

export default function CountryTable() {
  const [rowList, setRowList] = useState(null);
  const [isUpDirection, setIsUpDirection] = useState(true);
  const initialForm = {
    numericCode: "",
    name: "Country",
    capital: "",
    population: 0,
  };

  const handleAddCountry = useCallback((values) => {
    setRowList((prevList) => [...prevList, values]);
  }, [setRowList]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermCity, setSearchTermCity] = useState("");

  // const [searchResults, setSearchResults] = useState([]);

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
        sortedRowList.map((item) => {
          return createData(item.numericCode, item.name, item.capital, item.population)
        })
      );

      setIsUpDirection(!isUpDirection);
    },
    [rowList, setRowList, setIsUpDirection, isUpDirection]
  );

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleChangeCity = (event) => {
    setSearchTermCity(event.target.value);
  };

  /*
  useEffect(() => {
    if(!rowList){
      return
    }
    const results = rowList.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);
*/

  // console.log(searchResults)
  /*
  setRowList(
    searchResults.map((item) =>
      createData(item.numericCode, item.name, item.capital, item.population)
    )
  );
  */

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRowList(
          data
            .slice(20, 35)
            .map((item) =>
              createData(
                item.numericCode,
                item.name,
                item.capital,
                item.population
              )
            )
        );
      });
  }, []);

  if (!rowList) {
    return <div>Still Loading</div>;
  }

  const filteredRowList = rowList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)  &&
    item.capital.toLowerCase().includes(searchTermCity) 
  );

  /*
  const filteredRowList = rowList.filter((item) =>
     item.capital.toLowerCase().includes(searchTermCity) 
  );
  */

  

  return (
    <div style={{ paddingTop: "50px", marginTop:'60px'}}>
      <h1 style={{ color: "#ab0075" }}>The Table of Countries RESTful API</h1>
      <br />
      <div className="App">
        <input
          type="text"
          placeholder="Filter country"
          value={searchTerm}
          onChange={handleChange}
        />
        <div />
        <div className="App">
        <input
          type="text"
          placeholder="Filter city"
          value={searchTermCity}
          onChange={handleChangeCity}
        />
        <div />
        <div>
          <br />
          <h1> ADD A COUNTRY </h1>
          <CountryForm handleSubmit={handleAddCountry} initialData={{name: '', numericCode: 0, population: 0, capital: ''}}/>
          <button
            className="btn btn-success"
            style={{
              padding: "10px",
              margin: "10px",
              minwidth: "100px",
              color: "white",
            }}
            onClick={() => {
              handleSortByField("numericCode");
            }}
          >
            Sort by Code{" "}
          </button>
          <button
            className="btn btn-success"
            style={{
              padding: "10px",
              margin: "10px",
              minwidth: "100px",
              color: "white",
            }}
            onClick={() => {
              handleSortByField("name");
            }}
          >
            Sort by Name{" "}
          </button>
          <button
            className="btn btn-success"
            style={{
              padding: "10px",
              margin: "10px",
              minwidth: "100px",
              color: "white",
            }}
            onClick={() => {
              handleSortByField("capital");
            }}
          >
            Sort by Capital{" "}
          </button>
          <button
            className="btn btn-success"
            style={{
              padding: "10px",
              margin: "10px",
              minwidth: "100px",
              color: "white",
            }}
            onClick={() => {
              handleSortByField("population");
            }}
          >
            Sort by Population{" "}
          </button>
        </div>
        <br />
        <table className="table" style={{ color: "inherit" }}>
          <thead>
            <tr>
              <th
                scope="col"
                align="center"
                onClick={() => handleSortByField("numericCode")}
              >
                Code
              </th>
              <th
                scope="col"
                align="center"
                onClick={() => handleSortByField("name")}
              >
                Name
              </th>
              <th
                scope="col"
                align="center"
                onClick={() => handleSortByField("capital")}
              >
                Capital
              </th>
              <th
                scope="col"
                align="center"
                onClick={() => handleSortByField("population")}
              >
                Population
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredRowList.map((row) => (
              <tr key={row.numericCode}>
                <th scope="row">{row.numericCode}</th>

                <td align="center">{row.name}</td>
                <td align="center">{row.capital}</td>
                <td align="center">{row.population}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
