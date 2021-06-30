import React from 'react'
import { NavLink} from  'react-router-dom'


const Navbar = () => {
    return ( <div >
        <ul id="navbar" class=" navbar navbar-expand-lg 
        navbar-light  fixed-top py-lg-0 " >
        <li  class="nav-link">
          <NavLink style={{color:"white", margin:"15px", fontSize:'1.4rem', width:'200px'}} to='/' activeClassName="active" exact>Home</NavLink>
        </li>
        <li  class="nav-link">
          <NavLink style={{color:"white",  margin:"15px", fontSize:'1.4rem', width:'200px'}} to='/countries' activeClassName="active" >Countries</NavLink>
        </li>
        <li  class="nav-link">
          <NavLink style={{color:"white",  margin:"15px", fontSize:'1.4rem', width:'200px'}} to='/simplecat' activeClassName="active">Cats table</NavLink>
        </li>
        <li  class="nav-link">
          <NavLink style={{color:"white",  margin:"15px", fontSize:'1.4rem', width:'200px'}} to='/catmock' activeClassName="active">Cat editable</NavLink>
        </li>
        <li  class="nav-link">
          <NavLink style={{color:"white",  margin:"15px", fontSize:'1.4rem', width:'200px'}} to='/cated' activeClassName="active">Cats reserve</NavLink>
        </li>
      </ul>
      </div>
    )
}

export default Navbar