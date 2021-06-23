import React, { useState, useEffect, useCallback } from "react";

function createData(name, capital, language, currency) {
  return { name, capital, language, currency };
}

export default function DataTable() {
  const [rowList, setRowList] = useState([]);
  const initialForm = { name: "", capital: "", language: "", currency: "" };
  const [formData, setFormData] = useState(initialForm);

  const handleAddCountry = useCallback(() => {
    setRowList((prevList) => [...prevList, formData]);
    setFormData(initialForm);
  }, [setRowList, setFormData, formData]);

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/mariarogina/1bf4e1947ec2fc1e8ded4882e57f4d69/raw/8b935c5ca14f52d9802ccbd1ed07c362830c6a89/countriesdata.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRowList(
          data.map((item) =>
            createData(item.name, item.capital, item.language, item.currency)
          )
        );
      });
  }, []);

  if (!rowList) {
    return <div>Still Loading</div>;
  }

  console.log(rowList);

  return (
    <div style={{ paddingTop: "50px" }}>
      <h1 style={{ color: "white" }}>The table of Three Countries</h1>
      <br />

      <div>
        <div>
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
            language
            <input
              type="text"
              placeholder="language"
              value={formData.language}
              onChange={(event) =>
                setFormData((prevState) => ({
                  ...prevState,
                  language: event.target.value,
                }))
              }
            />
          </label>
          <label>
            currency
            <input
              type="text"
              placeholder="currency"
              value={formData.currency}
              onChange={(event) =>
                setFormData((prevState) => ({
                  ...prevState,
                  currency: event.target.value,
                }))
              }
            />
          </label>
          <br/>
          <br/>
          <button type="button" className="btn btn-primary" style={{padding:'10px', minWidth:"100px"}} onClick={handleAddCountry}>Add a country</button>
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
                Language
              </th>
              <th scope="col" align="center">
                Currency
              </th>
            </tr>
          </thead>

          <tbody>
            {rowList.map((row, index) => (
              <tr key={row.name}>
                <th scope="row">{index +1}</th>

                <td align="center">{row.name}</td>
                <td align="center">{row.capital}</td>
                <td align="center">{row.language}</td>
                <td align="center">{row.currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
