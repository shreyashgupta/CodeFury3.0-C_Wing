import React,{Component} from'react';
import './profile.css';
import { auth, firestore } from '../../backend/server';
class Profile extends Component 
{
	constructor() {
     super()
	this.state={
		isLoggedIn:false,
		isEmployer:false,
		name:"",
		data: null

	}
        const token=localStorage.getItem('token');
        const name=localStorage.getItem('name');
        if(token==null)        
        {
          this.state.isLoggedIn=false;
        }
        else
        {
          this.state.isLoggedIn=true;
          if(token=="employer")
            this.state.isEmployer=true;
          this.state.name=name;


        }
}
async f1() {
    let snapShot;
    if(this.state.isEmployer)
        snapShot =await firestore.collection('employers').doc(this.state.name);
     else
        snapShot =await firestore.collection('workers').doc(this.state.name);


      let obj;
      await snapShot.get().then(function(doc) {
          if (doc.exists) {
                obj=doc.data();
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      return obj;
}

// async functionFirebase() {
//     const user = await this.f1();
//     // const loggedIn= auth.currentUser;
//     // this.setState({user: loggedIn});
//     this.setState(Object.assign(this.state.data, { data:user}))
//     //this.setState(Object.assign(this.state.filteredJobs, { filteredJobs: array }))
// }
async componentWillMount() {
  if(this.state.isLoggedIn)
  {
  const obj = await this.f1();
  this.setState({data:obj});
  console.log(this.state.data);
}
}
render(){

	return(
    this.state.isLoggedIn?
    this.state.data==null?<h1>Loading</h1>:
    <div className='profile'>
    <h1>Profile Page</h1>
    {
      this.state.isEmployer?<h2>You are an Employer</h2>:<h2>You are a Worker</h2>
    }
    <h3>Name : {this.state.data.name}</h3>
    <h3>Location : {this.state.data.location}</h3>
    <h3>Phone No: {this.state.data.phNo}</h3>
    <div className="pic"><h3 className='name'> Profile Pic</h3><img src={this.state.data.pic}/></div>
    <div className="pic"><h3 className='name'> Identity Proof</h3><img src={this.state.data.aadhar}/></div>
    <h3>DoB : {this.state.data.date}</h3>

    </div>:<h1>Login First</h1>

		);
} 

}
export default Profile;