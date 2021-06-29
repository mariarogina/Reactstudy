return (
    <div style={styles} className="App">
      <header className="App-header">
        <DropDownList list={countriesList} />
        {popUpList.map((item, key) => (
          <Popup data={item} key={key + item.title} />
        ))}
        <CatMock />

        <DataTable />
        <br />
        <CountryTable />

        <SortedTable columns={columns} data={data} />
        <br />
        <br />
        <ApiTable columns={columns} data={data} />
        
        
      </header>
    </div>
  );

  