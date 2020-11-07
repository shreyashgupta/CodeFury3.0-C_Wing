import React from 'react';
import 'tachyons';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import {Link,Router} from 'react-router-dom';
import { storage ,auth} from '../../backend/server';
import {Redirect } from 'react-router-dom';
import { firestore } from '../../backend/server';
import Checkbox from '@material-ui/core/Checkbox';
import './style.css';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
// const classes = useStyles();

const names = [
    'Plumber',
    'Construction Work',
    'Welding',
    'HouseKeeper',
    'Watchman',
    'Driver',
    'Masonry',
    'Carpentary',
    'Cook',
    'Maids',
];

class AddJob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            date:'',
            time:'',
            skillName: [],
            isEmployer:false,
            name:'',
            date:'',
            email:'',
            location:'',
            phNo:'',
            'desc':'',
            'title':'',
            payment:''
        }

        let name=localStorage.getItem("name");
        let email=localStorage.getItem("email");
        let phNo=localStorage.getItem("phNo");
        console.log(email)
        console.log(phNo)
        let token=localStorage.getItem("token");
        console.log(name,"here");

        if(token=="employer")
        {
          this.state.isEmployer=true;
          this.state.name=name;
          this.state.email=email;
          this.state.phNo=phNo;
        }
        else
          this.state.isEmployer=false;
    }
  handleSignOut = (event) => {
      auth.signOut();
      localStorage.removeItem('token');
      alert("Logged out successfully");
      if(window.location.port){
          window.location.assign(`http://${window.location.hostname}:${window.location.port}/`);
      }
      else{
          window.location.assign(`http://${window.location.hostname}/`);
      }
  }
    onDescChange = (event) => {
        this.setState({ desc: event.target.value })
        //console.log(this.state.desc)
    }

    onTimeChange = (event) => {
        this.setState({ time: event.target.value })
    }

    onLocChange = (event) => {
        this.setState({ location: event.target.value })
    }
    onDateChange = (event) => {
        this.setState({ date: event.target.value })
    }
    onTitleChange = (event) => {
        this.setState({ title: event.target.value })
    }
    onSkillChange = (event) => {
        this.setState({ skillName: event.target.value })
    }
    onPaymentChange = (event) => {
        this.setState({ payment: event.target.value })
    }
  unsubscribeFromAuth=null;

  componentDidMount() {
      // this.unsubscribeFromAuth= auth.onAuthStateChanged(userAuth => {
      //     this.setState({ currentUser: userAuth });
      // })
  }
    handleSubmit = async (event) => {
        //this.functionFirebase();
        // console.log(this.state);
        const { email,name,date, phNo,desc,time,location,skillName,title,payment} = this.state;
        console.log(this.state);
        const userRef = firestore.doc(`jobs/${name}`+`-`+`${title}`);
        //const snapShot = await firestore.collection('Users').get();
        
        const registeredUser = {email,name,date, phNo,desc,time,location,skillName,title,payment};

        try {
            await userRef.set(registeredUser);
            this.setState({
                desc:'',
                time:'',
                location:'',
                date:'',
                title:'',
                payment:''
            })
      alert("Job Post successfull");
      if(window.location.port){
          window.location.assign(`http://${window.location.hostname}:${window.location.port}/`);
      }
      else{
          window.location.assign(`http://${window.location.hostname}/`);
      }

        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    render() {
        return (
            this.state.isEmployer==true?
            <article className="br3 ba b--black-10 mv4 tc w-00 w-50-m w-25-l mw6 shadow-5 center main">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Post Job {this.state.name} </legend>
                            <div className="mt3 center">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Job Title</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="text"
                                    name="location"
                                    id="location"
                                    onChange={this.onTitleChange}
                                />
                            </div>
                            <div className="mt3 center">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Location</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="text"
                                    name="location"
                                    id="location"
                                    onChange={this.onLocChange}
                                />
                            </div>
                            <div className="mt3 center">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Time</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="text"
                                    name="time"
                                    id="time"
                                    onChange={this.onTimeChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="date">Date</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="date"
                                    name="date"
                                    id="data"
                                    onChange={this.onDateChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="date">Wages</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="number"
                                    name="payment"
                                    id="payment"
                                    onChange={this.onPaymentChange}
                                />
                            </div>
                            <div className="mt3 center text">
                            <TextField
                              id="filled-textarea"
                              label="Breif Desctiption"
                              placeholder="Descibe the Job"
                              onChange={this.onDescChange}
                              multiline
                              variant="filled"
                            />
                            </div>
                            <div className="mv3">
                                <FormControl>
                                    <InputLabel id="demo-mutiple-checkbox-label">Skills</InputLabel>
                                    <Select
                                        labelId="demo-mutiple-checkbox-label"
                                        id="demo-mutiple-checkbox"
                                        multiple
                                        value={this.state.skillName}
                                        onChange={this.onSkillChange}
                                        input={<Input />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {names.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={this.state.skillName.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.handleSubmit}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Add Job"
                            />
                        </div>
                    </div>
                </main>
            </article>:
                  <div>
                    <h1>Login first</h1>
                    </div>
        );
    }
}

export default AddJob;