import React, { useState, useEffect } from "react";

function createData(name, description, temperament, image) {
  return { name, description, temperament, image };
}

export default function FetchCat() {
  const [rowList, setRowList] = useState(null);

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRowList(
          data.map((item) =>
            createData(item.name, item.description, item.temperament, item.image)
          )
        );
      });
  }, []);

  if (!rowList) {
    return <div>Still Loading</div>;
  }

  console.log(rowList);

  return <RandomSelector list={rowList} />;
}

function CatComponent(props) {
  const flagstyle = {
    width: "100px",
  };

  var style = {
    border: "2px solid #B0B0B0",
    width: "650px",
    borderRadius: "20px",
    textAlign: "center",
    margin: "auto",
    padding: "10px",
    backgroundColor: "#E8E8E8",
  };

  var picStyle = {
    maxWidth:'300px'
  };

  return (
    <div style={style} className="col">
      <h1>{props.item.name}</h1>
      <h2>Description: {props.item.description}</h2>

      <h3>Temperament {props.item.temperament}</h3>
      <br />
      <img style={picStyle} src={props.item.image.url} />
    </div>
  );
}

function RandomSelector(props) {
  const rowList = props.list;
    
   const [randItem, setRandItem] = useState(rowList[1]);

  const returnCat = () => {
    var i = parseInt(Math.random() * (rowList.length - 1));
    setRandItem(rowList[i]);
  };

  return (
    <div className="back">
      <div className="centered">
        <h1>Cats</h1>
        <h1>All cat breeds: {rowList.length}</h1>
        <br />

        <button className="btn btn-success" onClick={returnCat}>
          Choose the Cat
        </button>
        <br />
        <br />
        <div className="centered">
          {randItem === "" ? null : (
            <CatComponent item={randItem} />
          )}
        </div>
      </div>
    </div>
  );
}
