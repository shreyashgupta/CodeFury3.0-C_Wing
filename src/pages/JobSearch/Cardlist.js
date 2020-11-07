import React from 'react';
import Card  from './Card';

const Cardlist=({robots,onRouteChange,tags})=>
{
  return(
        <div>
              {

           robots.map((user,index)=>
                 {
                 return(   
                     <Card
                       key = {index} 
                       name={robots[index].name} 
                       age={robots[index].age}
                       college={robots[index].college}
                       onRouteChange={onRouteChange}
                       tags={robots[index].tags}
                     />
                 	   );
                  }                
	                 )
               }    
         </div> 
         )          
}
export default Cardlist;






















