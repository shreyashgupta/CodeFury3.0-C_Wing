import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Box, Grid, IconButton} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {Instagram, LinkedIn, EmailOutlined} from '@material-ui/icons';


// Makes new style for footer
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#111111",
        padding: theme.spacing(6),
        borderTop: localStorage.getItem('darkMode')?'1px solid #eee':'none'
    },
    typography: {
        color: '#eeeeee',
    },
    link: theme.link,
    body: {
        color: '#bbbbbb',
    },
    icon: {
        color: '#eeeeee',
    },
    iconbutton: {
        padding: 0,
    }
}))

export default function Footer(props) {
    const classes = useStyles()

    // Make a box holding the footer. Container filling the page. Add grid layout to make a responsive footer which looks good on phones too!
    return (
        <Box sm={12} className={classes.root}>
            <Container maxWidth='xl'>
                <Grid container spacing={1} justify='space-evenly'>
                    <Grid item xs={12} md={6} lg={2} key={1}>
                        <Typography className={classes.typography} variant='h5'>
                            Government Jobs
                        </Typography><br/>
                        <Typography className={classes.typography} variant='h6'>Clerk</Typography>
                        <Typography className={classes.typography} variant='h6'>Pion</Typography>
                        <Typography className={classes.typography} variant='h6'>Events</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={2} key={2}>
                        <Typography className={classes.typography} variant='h5'>
                            Jobs on contract
                        </Typography>
                        <br/>
                        <Typography className={classes.typography} variant='h6'>Construction Work</Typography>
                        <Typography className={classes.typography} variant='h6'>Electric Work</Typography>
                        <Typography className={classes.typography} variant='h6'>Production</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={2} key={3}>
                        <Typography className={classes.typography} variant='h5'>
                            Domestic Services
                        </Typography><br/>
                        <Typography className={classes.typography} variant='h6'>Helper</Typography>
                        <Typography className={classes.typography} variant='h6'>Cook</Typography>
                        <Typography className={classes.typography} variant='h6'>Cleaner</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} key={4} style={{paddingRight: 60}}>
                        <Typography className={classes.typography} variant='h6'>
                            Address:<br/>
                        </Typography>
                        <Typography className={classes.body} variant='body1'>
                        Virtual existence, Always ready to help<br/>
                        </Typography>
                        <br/>
                        <Grid container justify='space-between' style={{paddingRight: 60}}>
                            <IconButton href='#' target='_blank' rel='noopener norefferer' className={classes.iconbutton}>
                                <Instagram className={classes.icon} fontSize='large'/>
                            </IconButton>
                            <IconButton href='#' target='_blank' rel='noopener norefferer' className={classes.iconbutton}>
                                <LinkedIn className={classes.icon} fontSize='large'/>
                            </IconButton>
                            <IconButton href='#' target='_blank' rel='noopener norefferer' className={classes.iconbutton}>
                                <EmailOutlined className={classes.icon} fontSize='large'/>
                            </IconButton>
                        </Grid>
                        <br/>
                        <Typography className={classes.body} variant='body1'>
                            &copy; C Wing Jobs. All Rights Reserved.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}