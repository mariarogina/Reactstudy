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

  return <CatComponent list={rowList} />;
}

function CatComponent(props) {
  

  var style = {
    border: "2px solid #B0B0B0",
    width: "350px",
    borderRadius: "20px",
    textAlign: "center",
    margin: "auto",
    padding: "10px",
    fontSize:'0.2rem',
    backgroundColor: "#E8E8E8",
    margin:"10px",
    height:"500px"
    
  };

  var picStyle = {
    maxWidth:'100px'
  };

  const displayList = props.list.map(item =>  (
  <div style={style} className="col">
 

  <h3>Temperament {item.temperament}</h3>
  <br />
  <img style={picStyle} src={item.image?.url} />
</div>))

  return (
<div style={{display:"flex",
    flexDirection:"row",
    flexWrap:'wrap'}}><h1>All cat breeds: {props.list.length}</h1>
<h1>Cats</h1>
    
    <br />
{displayList}
</div>
   
  );
}
