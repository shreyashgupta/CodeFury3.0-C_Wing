import React from 'react';

const Searchbox=({searchfield,onSearchChange})=>{

	return(
		<div className='pa2'>
             <input 
                className="pa3 b--orange bg-white tc"
                type="search"
                placeholder="Search By Name"
                onChange={onSearchChange}
              />
        </div>       
		  );
}

export default Searchbox;