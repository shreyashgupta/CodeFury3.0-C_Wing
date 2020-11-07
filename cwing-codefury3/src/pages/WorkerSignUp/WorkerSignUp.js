import React from 'react';
import 'tachyons';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

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
// const classes = useStyles();



class WorkerSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mob: '',
            password: '',
            name: '',
            date: '',
            aadhar: '',
            pic: '',
            skillName: [],
        }
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }

    onDateChange = (event) => {
        this.setState({ date: event.target.value })
    }

    // onEmailChange = (event) => {
    //     this.setState({ email: event.target.value })
    // }
    onContactChange = (event) => {
        this.setState({ mob: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onAadharChange = (event) => {
        this.setState({ aadhar: event.target.value })
    }

    onPicChange = (event) => {
        this.setState({ pic: event.target.value })
    }

    onSkillChange = (event) => {
        this.setState({ skillName: event.target.value })
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mob: this.state.mob,
                password: this.state.password,
                name: this.state.name,
                aadhar: this.state.aadhar,
                date: this.state.date,
                skillSets: this.state.skillName,
                picture: this.state.pic
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home');
                }
            })
    }

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Labourer SignUp</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="date">Date Of Birth</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="date"
                                    name="date"
                                    id="data"
                                    onChange={this.onDateChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="mob">Mobile Number</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="mob"
                                    id="mob"
                                    onChange={this.onContactChange}
                                />
                            </div>
                            {/* <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div> */}

                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Aadhar Card</label>
                                <input
                                    id="adhar"
                                    type="file"
                                    accept="image/*"
                                    onChange={this.onAadharChange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Display Picture</label>
                                <input
                                    id="dp"
                                    type="file"
                                    accept="image"
                                    onChange={this.onPicChange} />
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
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default WorkerSignUp;