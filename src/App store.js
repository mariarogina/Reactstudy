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
  //tables 
  
  const changeColor = () => {
    setTextColor(color === "black" ? "#aadae7" : "black");
    setBgColor(bgColor === "#6C8B93" ? "black" : "#6C8B93");
  };


  //Skin. popup steps
  const [popUpList, setPopUpList] = useState([]);
  const [color, setTextColor] = useState("black");
  const [bgColor, setBgColor] = useState("#6C8B93");

  let styles = { backgroundColor: "#6C8B93", color: "black" };

  //popup

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/mariarogina/8ec0844c46fc655d6ca96a098c987e28/raw/9e9a7669a73c9319b92cee6cf02ed5a7e080c77f/myCountries.json"
    )
      .then((data) => data.json())
      .then((dataJson) => {
        setPopUpList(dataJson);
      });
  }, [setPopUpList]);


  