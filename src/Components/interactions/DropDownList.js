import {useState} from 'react'


const DropDownList = ({list}) => {
  const [activeItem, setActiveItem] = useState(null)

  return (
    <div style = {{paddingTop:"60px"}}>
      {list && list.map((item, key) => <div key={key}>
          <div className = "countryname" onClick={() => setActiveItem(activeItem === key ? null : key)}>{item.name}</div>
          {key === activeItem && <span className = "countrydrop">
            <br/> capital - {item.capital},
            <br/> currency - {item.currency},
            <br/> language - {item.language}
            <img style={{maxWidth:'600px'}} src={item.img} alt={item.capital} />
          </span>}
        </div>
      )}
    </div>
  )
}

export default DropDownList