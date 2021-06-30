import React, { useState, useEffect, useCallback } from "react";

function createData(id, name, capital, language, currency) {
  return { id, name, capital, language, currency };
}

export default function DataTable() {
  const [rowList, setRowList] = useState([]);
  const [isUpDirection, setIsUpDirection] = useState(true);
  const initialForm = { name: "", capital: "", language: "", currency: "" };
  const [formData, setFormData] = useState(initialForm);

  const handleAddCountry = useCallback(() => {
    setRowList((prevList) => [...prevList, formData]);
    setFormData(initialForm);
  }, [setRowList, setFormData, formData]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermCity, setSearchTermCity] = useState("");

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
            item.id,
            item.name,
            item.capital,
            item.language,
            item.currency
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
  const handleChangeCity = (event) => {
    setSearchTermCity(event.target.value);
  };


  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/mariarogina/1bf4e1947ec2fc1e8ded4882e57f4d69/raw/89eb2570fcfd69f31c4dfd21f5f49733fe0bb4d0/countriesdata.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        
        setRowList(
          data.map((item) =>
            createData(
              item.id,
              item.name,
              item.capital,
              item.language,
              item.currency
            )
          )
        );
      });
  }, [setRowList, createData]);

  const filteredRowList = rowList.filter((item) =>
  item.name.toLowerCase().includes(searchTerm)  &&
  item.capital.toLowerCase().includes(searchTermCity) 
);

  if (!filteredRowList) {
    return <div>Still Loading</div>;
  }

  return (

    <div style={{ paddingTop: "50px", marginTop:'60px' }}>
      <h1 style={{ color: "#ab0075" }}>The Short Table of Countries</h1>
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
    <div style={{ paddingTop: "50px" }}>
      <h1 style={{ color: "white" }}>The table of Three Countries</h1>
      <br />

      <div>
        <div>
        <label>
            Id
            <input
            className = "inpField"
              type="number"
              placeholder="id"
              value={formData.id}
              onChange={(event) =>
                setFormData((prevState) => ({
                  ...prevState,
                  id: event.target.value,
                }))
              }
            />
          </label>
          <label>
            name
            <input
            className = "inpField"
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
            className = "inpField"
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
            className = "inpField"
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
            className = "inpField"
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
          <br />
          <br />
          <button
            type="button"
            className="btn btn-primary"
            style={{ padding: "10px", minWidth: "100px" }}
            onClick={handleAddCountry}
          >
            Add a country
          </button>
        </div>
        <br />
        <button
        className="btn btn-info"
        style={{ padding: "10px", margin:'10px', minwidth: "100px", color:'white'}}
          onClick={() => {
            

            handleSortByField("id");
          }}
        >
          Sort by Id 
        </button>
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
            

            handleSortByField("capital");
          }}
        >
          Sort by Capital 
        </button>
        <button
        className="btn btn-info"
        style={{ padding: "10px", margin:'10px', minwidth: "100px", color:'white'}}
          onClick={() => {
            

            handleSortByField("language");
          }}
        >
          Sort by Language 
        </button>
        <button
        className="btn btn-info"
        style={{ padding: "10px", margin:'10px', minwidth: "100px", color:'white'}}
          onClick={() => {
            

            handleSortByField("currency");
          }}
        >
          Sort by Currency 
        </button>

        <table className="table" style={{ color: "inherit" }}>
          <thead>
            <tr>
              <th scope="col" 
              align="center"
              onClick={() => handleSortByField("id")}>
                No.
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
                onClick={() => handleSortByField("language")}
              >
                Language
              </th>
              <th
                scope="col"
                align="center"
                onClick={() => handleSortByField("currency")}
              >
                Currency
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredRowList.map((row) => (
              <tr key={row.name}>
                <th scope="row">{row.id}</th>

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
    </div>
    </div>
    </div>
    </div>
  );
}
