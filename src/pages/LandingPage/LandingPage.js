import React from 'react';
import { Container, Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Ticker from '../../components/ticker/Ticker'

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
                    <Grid container spacing={4} justify='center'>
                        <Grid item xs={12} md={6}><br/>
                            <Typography variant='h4'>
                                <strong>Vision</strong>
                            </Typography>
                            <Typography variant='body1'>
                                <p style={{ textAlign: "justify", textJustify: "inter-word" }}>Establishment of an efficient system for improving and uplifting the unorganized labor especially in these times caused by pandemic COVID-19 which has forced masses of people to lose their means of living. 
A Medium to aware the unprivileged class with the provisions of Govt. and improve their financial stability.</p>
                            </Typography><br/>

                            <Typography variant='h4'>
                                <strong>Mission</strong>
                            </Typography>
                            <Typography variant='body1' style={{textAlign:"justify"}}>
                            <ul>
                            <li>To ensure availability of ample job opportunities on equitable, accessible and affordable basis across regions and communities with special focus on under-served population and marginalized groups.</li>
                                <li>To establish comprehensive system to mediate and manage the needs of the Workers and Employers.</li>
                                <li>To utilize the great Human Resource of our country, thereby serving the society and uplifting miseries.</li>
            
                                <li>To progressively step forward towards developing the nation and build it strong in crisis times.</li>
                            </ul>
                                
                            </Typography>

                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Ticker />
                        </Grid>
                    </Grid>
                </div>
                <br /><br />
            </Container>
        </React.Fragment>
    )
}
