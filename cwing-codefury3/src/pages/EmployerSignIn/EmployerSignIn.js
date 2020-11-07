import React from 'react';
import 'tachyons';
import { auth } from '../../backend/server';
class EmployerSignIn extends React.Component {
 constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            currentUser: null,
            history: props.history,
            loggedIn:false
        }
        const token=localStorage.getItem('token');
        if(token==null)
        {
          this.state.loggedIn=false;
        }
        else
          this.state.loggedIn=true;
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
  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onSubmitSignIn = async(event) => {
      event.preventDefault();

      const { email, password } = this.state;

      console.log(this.state)
      try {
          await auth.signInWithEmailAndPassword(email, password);
          alert(`Logged in as user successfully`);
          localStorage.setItem('token',"employer");
          if(window.location.port){   //
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
  unsubscribeFromAuth=null;

  componentDidMount() {
      this.unsubscribeFromAuth= auth.onAuthStateChanged(userAuth => {
          this.setState({ currentUser: userAuth });
      })
  }

  componentWillUnmount(){
      this.unsubscribeFromAuth();
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      this.state.loggedIn==false?
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Employer Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 x"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 x"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="mv3">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib x"
                type="submit"
                value="Sign in"
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

export default EmployerSignIn;