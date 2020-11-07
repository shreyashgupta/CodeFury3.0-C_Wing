import React,{Component} from'react';
import Cardlist from'./Cardlist';
import './app.css';
import { LocalStorage } from "node-localstorage";
import './tagstyle.css'
import ReactTags from 'react-tag-autocomplete'

class Job extends Component 
{constructor() {
     super()
	this.state={
		robots:[{name:"shreyash",age: 20,college:"rvce",tags:["shrey","gupta","ra"]},
		{name:"vishal",age: 30,college:"rvc",tags:["vish","all"]},
		{name:"kirti",age: 40,college:"rce",tags:["kirti","nand","vish"]},
		{name:"akshara",age: 50,college:"cve",tags:["aksh","ra","all"]}],
		serachfield:'',
		route:0,
		tags:[],
		name:"",
		suggestions: [
		{ id: 1, name: "shrey" },
		{ id: 2, name: "gupta" },
		{ id: 3, name: "vish" },
		{ id: 4, name: "all" },
		{ id: 5, name: "kirti" },
		{ id: 6, name: "nand" },
		{ id: 7, name: "aksh" },
		{ id: 8, name: "ra" }],
		loggedIn:false
	}
	    this.reactTags = React.createRef()
		const token=localStorage.getItem("token")
		if(token==null)
		{
			this.state.loggedIn=false;
		}
		else
		{
			this.state.loggedIn=true;
			this.state.name=token;
		}
}
  onDelete (i) {
    const tags = this.state.tags.slice(0)
    tags.splice(i, 1)
    this.setState({ tags })
  }

  onAddition (tag) {
    const tags = [].concat(this.state.tags, tag)
    this.setState({ tags })
  }


// onSearchChange=(event)=>{
// 	this.setState(Object.assign(this.state.serachfield,{serachfield:event.target.value}))
// }
render(){

           const filter=this.state.robots.filter(robot=>
           {
           	if(this.state.tags.length==0)
           		return true;
           	for(let i=0;i<robot.tags.length;i++)
			{
				for(let j=0;j<this.state.tags.length;j++)
					if(this.state.tags[j].name==robot.tags[i])
						return true;
				
			}
			// console.log(this.state.tags)
			// console.log(robot.tags)
			return false
	       }
	       // /console.log(filter) 
	    )
	       return (
	       	this.state.loggedIn==false?<h1>Logged in</h1>:
	       		   <div>  
	     			<h1>{this.state.name}</h1>
	       		    <header id="fixed">
		        <h1 className>Job Search</h1>
		        	</header>
				<div className='search'>
				<h3>Search By Tags</h3>
				<ReactTags
					ref={this.reactTags}
					tags={this.state.tags}
					suggestions={this.state.suggestions}
					onDelete={this.onDelete.bind(this)}
					onAddition={this.onAddition.bind(this)} 
				/>
				</div>
		        <Cardlist robots={filter}
		        			onRouteChange={this.onRouteChange}/>
 		        </div>
 		        )
       ;}
} 

export default Job;