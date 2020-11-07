import React from 'react';
import { Container, Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeCaraousel from '../../components/HomeCaraousel';

// import { isMobile } from 'react-device-detect';

const useStyles = makeStyles((theme) => ({
    root: theme.root,
    container: theme.page,
    paper: {
        ...theme.paper,
        padding: theme.spacing(4)
    },
    carousel: {
        margin: "auto",
        paddingTop: theme.spacing(4),
    }
}))

const carouselImages = [
    {
        src: "images/LandingPage.png",
    },
    {
        src: "images/LandingPage.png",
    },
    {
        src: "images/LandingPage.png",
    }
];


export default function LandingPage() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <img src="images/LandingPage.png" style={{ maxHeight: "90vh", width: "100%" }} />
            <Container maxWidth='xl' className={classes.root}><br />
                <div>
                    <Typography variant='h4'>
                        <strong>Vision</strong>
                    </Typography>
                    <Typography variant='body1'>
                        <p style={{ textAlign: "justify", textJustify: "inter-word" }}>To get the students community interested in Communication and networking together and help in developing the society by conducting research, education, invitation, projects and implementation of new ideas provided by the members of this Society.</p>
                    </Typography>
                </div>
                <br /><br />
            </Container>
        </React.Fragment>
    )
}
