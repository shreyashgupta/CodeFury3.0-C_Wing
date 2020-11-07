import React from 'react';
import 'tachyons';
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
import './style.css'
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



class EmployerSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            date: '',
            phNo:'',
            aadhar: '',
            type:"employer",
            pic: '',
            location: '',
            file1:null,
            file2:null,
            isLoggedIn: false,
            applied:[]
        }
        const token=localStorage.getItem('token');
        if(token==null)
        {
          this.state.isLoggedIn=false;
        }
        else
          this.state.isLoggedIn=true;
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
    onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }

    onDateChange = (event) => {
        this.setState({ date: event.target.value })
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }
    handleFileChange1 = (event) => {
        if (event.target.files[0]) {
            this.setState({ file1: event.target.files[0] });
        }
    }
    handleFileChange2 = (event) => {
    if (event.target.files[0]) {
        this.setState({ file2: event.target.files[0] });
    }
}
    onAadharChange = (event) => {
        this.setState({ aadhar: event.target.value })
    }

    onPicChange = (event) => {
        this.setState({ pic: event.target.value })
    }
    onPhChange = (event) => {
        this.setState({ phNo: event.target.value })
    }
    onLocChange = (event) => {
        this.setState({ location: event.target.value })
    }
  unsubscribeFromAuth=null;

  componentDidMount() {
      this.unsubscribeFromAuth= auth.onAuthStateChanged(userAuth => {
          this.setState({ currentUser: userAuth });
      })
  }

    handleFileUpload1 = (event) => {
        const { file1 } = this.state;
        if (!file1) {
            alert("Upload image and then click on upload button");
        } else {

            const uploadTask = storage.ref(`${file1.name}`).put(file1);

            uploadTask.on('state_changed',
                (snapShot) => { alert("uploading in progress") },
                (error) => { console.log(error) },
                () => {
                    storage
                        .ref('')
                        .child(file1.name)
                        .getDownloadURL()
                        .then(url => {
                            alert("Image_uploaded");
                            console.log("image uploaded");
                            this.setState({pic: url }, () => console.log(this.state));
                        })
                });
        }
    }
    handleFileUpload2 = (event) => {
        const { file2 } = this.state;
        if (!file2) {
            alert("Upload image and then click on upload button");
        } else {

            const uploadTask = storage.ref(`${file2.name}`).put(file2);

            uploadTask.on('state_changed',
                (snapShot) => { alert("uploading in progress") },
                (error) => { console.log(error) },
                () => {
                    storage
                        .ref('')
                        .child(file2.name)
                        .getDownloadURL()
                        .then(url => {
                            alert("Image_uploaded");
                            console.log("image uploaded");
                            this.setState({aadhar: url }, () => console.log(this.state));
                        })
                });
        }
    }
    handleSubmit = async (event) => {
        const { email,password,name,date,aadhar, phNo,pic, file1,file2,location,type,applied} = this.state;
        console.log(this.state);
        if (!file1) {
            alert("Upload image first");
        }
        if (!file1) {
            alert("Upload image first");
        }
        else if (pic.length === 0) {
            alert("You've chose the image but not uploaded it");
        }
        else if (!(name.length > 0 && phNo.length != 0 && email.length > 0)) {
            alert("Enter all the details");
        }
        else {
            const userRef = firestore.doc(`employers/${name}`);
            //const snapShot = await firestore.collection('Users').get();
            
            const registeredUser = {email,password,name,date,aadhar,phNo,pic,location,type,applied};

            try {
                await userRef.set(registeredUser);
                alert("signUp success")
                auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // ...
                });
                this.setState({
                email: '',
                password: '',
                name: '',
                date: '',
                phNo:'',
                aadhar: '',
                pic: '',
                location:'',
                type:"employer",
                applied:'',
                file1:null,
                file2:null
                })
                return <Redirect to='/'/>

            } catch (error) {
                console.log(error);
                alert(error.message);
            }
        }
    }

    render() {
        return (
            this.state.isLoggedIn==false?
            <article className="br3 ba b--black-10 mv4 tc w-00 w-50-m w-25-l mw6 shadow-5 center main">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Employer SignUp</legend>
                            <div className="mt3 center">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="date">Date Of Birth</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="date"
                                    name="date"
                                    id="data"
                                    onChange={this.onDateChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="phoneNo">Phone-number</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="text"
                                    name="phNo"
                                    id="phoneNo"
                                    onChange={this.onPhChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="phoneNo">Location</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="text"
                                    name="phNo"
                                    id="phoneNo"
                                    onChange={this.onLocChange}
                                />
                            </div>

                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Aadhar Card</label>
                                <input type='file' onChange={this.handleFileChange1} />
                                <button type='button' onClick={this.handleFileUpload1}> Upload </button><br /><br />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Display Picture</label>
                                <input type='file' onChange={this.handleFileChange2} />
                                <button type='button' onClick={this.handleFileUpload2}> Upload </button><br /><br />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.handleSubmit}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>
                    </div>
                </main>
            </article>:
                  <div>
                    <input
                    onClick={this.handleSignOut}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="signOut"
                    />
                    </div>
        );
    }
}

export default EmployerSignUp;