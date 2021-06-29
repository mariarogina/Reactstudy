import "./App.css";
//import DropDownList from "./Components/interactions/DropDownList";
//import Popup from "./Components/interactions/Popup";
import React, { useEffect, useState } from "react";
import DataTable from "./Components/tables/DataTable copy";
import { countriesList } from "./countriesList";

import CountryTable from "./Components/tables/CountryTable";
import { SortedTable } from "./Components//tables/SortedTable";
import { ApiTable } from "./Components/tables/ApiTable";
import SimpleCat from "./Components/tables/SimpleCat";
import CatMock from "./Components/tables/CatMock";
import CatEd from "./Components/tables/Cat Editable";

// const popUpList = [
//   {"btnValue" : "Come and visit Moscow", "paragraph" : "Moscow is the Capital of Russia", "title": "Welcome to Moscow", "imgSrc": "https://gkd.ru/assets/i/ai/4/2/8/i/2884202.jpg"},
//   {"btnValue" : "Come and visit Helsinki", "paragraph" : "Helsinki is the Capital of Finland", "title": "Welcome to HEL", "imgSrc": "https://www.likefinland.com/images/artikkelikuvat/helsinki/allas%20sea%20pool1.jpg"},
//   {"btnValue" : "Come and visit London", "paragraph" : "London is the Capital of Great Britain", "title": "Welcome to London", "imgSrc": "https://www.overseasattractions.com/wp-content/uploads/2018/08/london-at-night.jpg"}
// ]

function App() {
  const [popUpList, setPopUpList] = useState([]);
  const [color, setTextColor] = useState("black");
  const [bgColor, setBgColor] = useState("#6C8B93");

  let styles = { backgroundColor: bgColor, color: color };

  //tables
  const columns = React.useMemo(
    () => [
      {
        Header: "Company",
        accessor: "company", // accessor is the "key" in the data
      },
      {
        Header: "Contact",
        accessor: "contact",
      },
      {
        Header: "Country",
        accessor: "country",
      },
    ],
    []
  );
  const data = React.useMemo(
    () => [
      {
        company: "Alfred",
        contact: "Maria Anders",
        country: "Germany",
      },
      {
        company: "Centro comercial Moctezuma",
        contact: "Francisco Chang",
        country: "Mexico",
      },
      {
        company: "Ernst Handel",
        contact: "Roland Mendel	",
        country: "Austria",
      },
    ],
    []
  );
  //tables end

  const changeColor = () => {
    setTextColor(color === "black" ? "#aadae7" : "black");
    setBgColor(bgColor === "#6C8B93" ? "black" : "#6C8B93");
  };

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/mariarogina/8ec0844c46fc655d6ca96a098c987e28/raw/9e9a7669a73c9319b92cee6cf02ed5a7e080c77f/myCountries.json"
    )
      .then((data) => data.json())
      .then((dataJson) => {
        setPopUpList(dataJson);
      });
  }, [setPopUpList]);

  return (
    <div style={styles} className="App">
      <header className="App-header">
        <DataTable />
        <br />
        <CountryTable />

        <SortedTable columns={columns} data={data} />
        <CatMock />

        <br />
        <br />
        
        <SimpleCat />
        <CatEd />
      </header>
    </div>
  );
}

export default App;
