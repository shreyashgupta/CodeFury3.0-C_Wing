import React from 'react';
import { Card, Typography, Paper, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { auth, firestore } from '../../backend/server';
import JobCard from '../../components/EventCard';

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
                    .search(__self.state.jobSearchText.toLowerCase()) !== -1
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
                <Paper>
                    <Card style={{ height: "40px" }}>
                        <Typography variant="h4">Find New Jobs</Typography>
                    </Card>
                </Paper>
                <TextField label="Search Jobs" value={this.state.jobSearchText} onChange={this.handleSearch} margin="normal"/>
                <Grid container spacing={1} style={{ margin: "1%" }}>
                    {this.state.filteredJobs.map(element => {
                        return (
                            <Grid item lg={3} md={4} xs={12}>
                                <JobCard event={element} />
                            </Grid>
                        )
                    })}
                    {this.state.filteredJobs.map(element => {
                        return (
                            <Grid item lg={3} md={4} xs={12}>
                                <JobCard event={element} />
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        )
    }
}