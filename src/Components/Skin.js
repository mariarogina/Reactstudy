
import React from 'react';


function SkinChange(props) {



return (
  <div style={{'textAlign':"left", position:'fixed'}}>
<button

class="btn btn-primary"
style={{backgroundColor:'#2c4e85', borderRadius:'8px', border:'none', margin:"70px 20px"}}
onClick={props.onClick}  id = "change">

  Change Skin
</button>
</div>
)
}

export default SkinChange;