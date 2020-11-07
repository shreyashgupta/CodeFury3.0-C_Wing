import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
//import MuiAlert from "@material-ui/lab/Alert";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import { auth,firestore } from '../../backend/server';

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 305,
    maxHeight: 390,
    '&:hover': {
      boxShadow: "10px 10px 10px 0px rgba(0, 0, 0, 0.64)",
      marginLeft: "-3px",
      marginTop: "-2px",
      transitionDuration: 200
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  dialog: {
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
    flexDirection: 'column',
    display: 'flex',
  },
  poster: {
    [theme.breakpoints.up('md')]: {
      maxWidth: "40%",
    },
    width: "100%",
  },
  content: {
    [theme.breakpoints.up('md')]: {
      width: "60%",
    },
    width: "100%",
    padding: '1%',
  },
}));

// const event = {
//   name: "Construction work at vijaynagar",
//   description: "By the end of this faculty development workshop the audience will \n 1.	Understand the distributed architectures for handling big data processing. \n2.	Install HPCC distributed systems platform and learn ECL programming language constructs \n 3.	Perform data analysis , and carryout machine learning tasks on publicly available datasets using HPCC Systems platform.",
//   date: "27 JULY, 2020 TO 31 JULY,2020",
//   time: "5PM-7PM",
//   fee: "1180 Rs.",
//   keywords: "Masonry, Carpentry, Electricals, Metal works",
// };

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const prefersDarkMode = localStorage.getItem('darkMode') === 'true';
  let loggedIn = localStorage.getItem('token') !== null;
  let useremail = localStorage.getItem('email');
  let userType = localStorage.getItem('token');
  console.log(loggedIn)
  let mobile = window.matchMedia('(max-width: 300px)').matches === 'true';
  const [open, setOpen] = React.useState(false);
  const [eventDialog, setEventDialog] = React.useState(false);
  let user = localStorage.getItem('token');

  //Shows snackbar with message and copies link in '' for user
  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText("Copy this text to clipboard");
  };

  const applyForJob = () => {
    let job=firestore.collection("jobs").doc(`${props.event.name}`+"-"+`${props.event.title}`);
    if(job === null) return;
    job.get().then((doc) => {
      console.log(doc.data().desc)
      let applicants = doc.data().applicants;
      applicants[applicants.length]=useremail;
      console.log(applicants);
      job.update({
      applicants:applicants
    })
  }
    )
    
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Card className={classes.root} onDoubleClick={() => setEventDialog(true)} style={{ display: "flex", flexDirection: "column", backgroundColor: (prefersDarkMode) ? "#717171" : "azure", cursor: "pointer" }}>
        <CardHeader
          title={props.event.title}
          subheader={props.event.date}
        />
        <CardMedia
          className={classes.media}
          image="/images/Logo.jpg"
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Keywords: {props.event.skillName.map(element => {
            return element + ",";
          })}
          </Typography>
        </CardContent>
        <CardActions disableSpacing style={{ marginTop: "auto" }}>
          {/* <Button size="small" onClick={handleClick}>
            Share
          </Button> */}
          {/* <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Link Copied!
            </Alert>
          </Snackbar> */}
          <Button size="small" onClick={() => setEventDialog(true)}>Read More</Button>
        </CardActions>
      </Card>

      {/* Dialog for each event*/}
      <Dialog
        open={Boolean(eventDialog)}
        onClose={() => setEventDialog(false)}
        scroll="body"
        variant="fade"
      >
        <DialogTitle>
          {props.event.title}
          {loggedIn && (useremail===props.event.email) &&(<div style={{ float: "right", display: "flex", flexDirection: "row" }}>
            <Button size="small">Remove</Button>
          </div>)}
        </DialogTitle>
        <DialogContent>
          <div className={classes.dialog}>
            <div className={classes.content}>
              <span style={{ fontSize: "1em" }}>
                <b>Employer:</b> {props.event.name}
              </span><br /><br />
              <span style={{ fontSize: "1em"}}>
                <b>Description:</b> {props.event.desc}
              </span><br /><br />
              <span style={{ fontSize: "1em", margin: "2px" }}>
                <b>Date and Time:</b> {props.event.date},{props.event.time}
              </span><br /><br />
              <span style={{ fontSize: "1em", margin: "2px" }}>
                <b>Payment:</b> {props.event.payment}
              </span><br /><br />
              <span style={{ fontSize: "1em", margin: "2px" }}>
                <b>Employer Email:</b> {props.event.email}
              </span><br /><br />
              <span style={{ fontSize: "1em", margin: "2px" }}>
                <b>Contact No:</b> {props.event.phNo}
              </span><br /><br />
              <span style={{ fontSize: "1em", margin: "2px" }}>
                <b>Location:</b> {props.event.location}
              </span><br /><br />
              <span style={{ fontSize: "1em", margin: "2px" }}>
                <b>Keywords:</b> {props.event.skillName.map(element => {
                  return element + ",";
                })}
              </span>
            </div>
            <div className={classes.poster}>
              <img src="/images/Logo.jpg" style={{ backgroundSize: "contain", width: "inherit", }} />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          {loggedIn && userType==="employer" &&(<Button onClick={applyForJob}>Apply</Button>)}
          <Button onClick={() => setEventDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
