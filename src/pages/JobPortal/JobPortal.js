import React from 'react';
import { Card, Typography, Paper, Grid, TextField, Button, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { auth, firestore } from '../../backend/server';
import JobCard from '../../components/EventCard/EventCard';
import './job.css'
// const useStyles = makeStyles((theme) => ({
//     root: {
//         backgroundColor: "#FFF"
//     },
//     container: theme.page,
//     paper: {
//         ...theme.paper,
//         padding: theme.spacing(4)
//     },
// }))
export default class JobPortal extends React.Component {
    //const classes = useStyles();
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem("employer"),
            selectedJob: null,
            jobs: [],
            filteredJobs:[],
            jobSearchText:"",
        };
    }

    async f1() {
        const snapShot = await firestore.collection('jobs').get();
        const docsArray = snapShot.docs;
        const docsArrayData = docsArray.map(doc => doc.data());
        return docsArrayData;
    }

    async functionFirebase() {
        const array = await this.f1();
        // const loggedIn= auth.currentUser;
        // this.setState({user: loggedIn});
        this.setState(Object.assign(this.state.jobs, { jobs: array,filteredJobs: array }))
        //this.setState(Object.assign(this.state.filteredJobs, { filteredJobs: array }))
    }

    handleSearch = (event) =>{
        this.setState({jobSearchText:event.target.value},() => {
            var __self = this;
            var updatedList = __self.state.jobs;
            updatedList = __self.state.jobs.filter(function (item) {
                return (
                    item.title
                        .toLowerCase()
                        .search(__self.state.jobSearchText.toLowerCase()) !== -1
                        ||
                    item.name.toLowerCase()
                    .search(__self.state.jobSearchText.toLowerCase()) !== -1 ||
                    item.skillName.toString().toLowerCase().search(__self.state.jobSearchText.toLowerCase()) !== -1
                );
            });

            this.setState({
                filteredJobs: updatedList
            });
        })
    }

    componentDidMount() {
        // if (!this.state.user) {
        //     window.location.assign("/");
        // }
        //this.setState({user:auth.currentUser})
        this.functionFirebase()
        console.log(this.state.jobs);
        console.log("user:" + this.state.user)
    }

    render() {
        //console.log(this.state.jobs);
        return (
            <div>
                <h1 className="head">Find New Jobs</h1>
                <FormControl>
                <TextField label="Search Jobs" value={this.state.jobSearchText} onChange={this.handleSearch} style={{marginTop:"1%"}}/>
                </FormControl>
                <Button  className="btn" onClick={() => window.location.assign("/addjob")}>+Add new Job</Button>
                <div className="flex">
                    {this.state.filteredJobs.map(element => {
                        return (
                            <JobCard event={element} />
                        )
                    })}
                </div>
            </div>
        )
    }
}