import CountryTable from "./Components/tables/CountryTable";

return (
    <BrowserRouter>
    
      <Switch>
        
      <Route exact path = '/' component = {DataTable} />
      <Route exact path = '/countries' component = {CountryTable} />
      <Route exact path = '/simplecat' component = {SimpleCat} />
      <Route  path = '/catmock' component = {CatMock} />
      <Route  path = '/cated' component = {CatEd} />
      <Route component = {() => <h2>Not found</h2>} />
        
      </Switch>
 
    </BrowserRouter>
   )