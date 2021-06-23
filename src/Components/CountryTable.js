import React, { useCallback } from "react";
import { useState, useEffect } from "react";

function createData(numericCode, name, capital, population) {
  return { numericCode, name, capital, population };
}

export default function CountryTable() {
  const [rowList, setRowList] = useState(null);
  const initialForm = {
    numericCode: "",
    name: "Country",
    capital: "",
    population: 0,
  };
  const [formData, setFormData] = useState(initialForm);

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

  const handleAddCountry = useCallback(() => {
    setRowList((prevList) => [...prevList, formData]);
    setFormData(initialForm);
  }, [setRowList, setFormData, formData]);

  if (!rowList) {
    return <div>Still Loading</div>;
  }

  return (
    <div style={{ paddingTop: "50px" }}>
      <h1 style={{ color: "#ab0075" }}>The Table of Countries</h1>
      <br />
      <div>
        <label>
          numericCode
          <input
            type="text"
            placeholder="numericCode"
            value={formData.numericCode}
            onChange={(event) =>
              setFormData((prevState) => ({
                ...prevState,
                numericCode: event.target.value,
              }))
            }
          />
        </label>
        <label>
          name
          <input
            type="text"
            placeholder="name"
            value={formData.name}
            onChange={(event) =>
              setFormData((prevState) => ({
                ...prevState,
                name: event.target.value,
              }))
            }
          />
        </label>
        <label>
          capital
          <input
            type="text"
            placeholder="capital"
            value={formData.capital}
            onChange={(event) =>
              setFormData((prevState) => ({
                ...prevState,
                capital: event.target.value,
              }))
            }
          />
        </label>
        <label>
          population
          <input
            type="number"
            placeholder="population"
            value={formData.population}
            onChange={(event) =>
              setFormData((prevState) => ({
                ...prevState,
                population: event.target.value,
              }))
            }
          />
        </label> 

        <br/>
        <br/>
        <button type="button" className="btn btn-primary" style={{padding:'10px', minwidth:"100px"}} onClick={handleAddCountry}>Add a country</button>
      </div>
      <br/>
      <table className="table" style={{ color: "inherit" }}>
        <thead>
          <tr>
            <th scope="col" align="center">
              No.
            </th>
            <th scope="col" align="center">
              Name
            </th>
            <th scope="col" align="center">
              Capital
            </th>
            <th scope="col" align="center">
              Population
            </th>
          </tr>
        </thead>

        <tbody>
          {rowList.map((row) => (
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
  );
}
