import React from 'react';
import 'tachyons';
//import'./card.css';

const Card=({name, age, college,onRouteChange,tags})=>{

return(
<div className="bg-light-green  ma2 pa4 br3 dib  tc" id="card">
      <div>
          <p>Name: <b>{name}</b></p>
          <p> Age: {age}</p>
          <p>College : {college}</p>
          <p>Tags:</p>
          {
          	tags.map((x,i)=>
          		{
                return <b> {tags[i]} </b>
              }
          		)
          }
      </div>
 </div>      
	);
}

export default Card;