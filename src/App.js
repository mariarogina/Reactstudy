import "./App.css";

import React from "react";
import DataTable from "./Components/tables/DataTable copy";
import CountryTable from "./Components/tables/CountryTable";
import SimpleCat from "./Components/tables/SimpleCat";
import CatMock from "./Components/tables/CatMock";
import CatEd from "./Components/tables/Cat Editable";
import NavBar from "./Components/nav/NavBar";
import {BrowserRouter, Route, Switch} from 'react-router-dom'


function App() {
  let styles = { backgroundColor: "#6C8B93", color: "black" };

  return (
    <div style={styles} className="App">
      <header  className="App-header">
      
      <BrowserRouter>
      <NavBar  />
    <Switch>
      
    <Route exact path = '/' component = {DataTable} />
    <Route exact path = '/countries' component = {CountryTable} />
    <Route exact path = '/simplecat' component = {SimpleCat} />
    <Route  path = '/catmock' component = {CatMock} />
    <Route  path = '/cated' component = {CatEd} />
    <Route component = {() => <h2>Not found</h2>} />
      
    </Switch>

  </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
