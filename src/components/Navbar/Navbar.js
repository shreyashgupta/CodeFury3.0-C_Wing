import React from 'react';
import { AppBar, Toolbar, Button, useScrollTrigger, IconButton, List, ListItem, ListItemText, SwipeableDrawer, Typography, Tooltip, Divider, Drawer, Menu, MenuItem } from '@material-ui/core';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import { isMobile, isMobileOnly } from 'react-device-detect';
import { Link, NavLink, withRouter } from 'react-router-dom';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { auth } from '../../backend/server';
import './nav.css'
//import Link from 'react-dom';
export default function Navbar() {
    const [drawer, setDrawer] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleHover = (event) => {
        setAnchorEl(event.currentTarget);
    };
  var handleSignOut = (event) => {
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
    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar style={{ height: "60px", display: "flex", flexDirection: "row" }}>
                    <div>
                        {/* <Link to='/'> */}
                        <img src={'/images/Logo.jpg'} height="70px" style={{ float: "left", borderRadius: "70px" }} alt="App logo" />
                        {/* </Link> */}
                    </div>
                    <Typography
                        variant="h4"
                        className="title"
                        component="span"
                        //align="center"
                        style={{ width: "90%", textAlign: "-webkit-right" }}
                    >C WING Jobs</Typography>
                    <span style={{ justifyContent: "center", width: (isMobile) ? "50%" : "80%" }}>
                        {!isMobile && (<span style={{ float: "right" }}>
                            <Tooltip title="Home">
                                <Button
                                    color="inherit"
                                    variant="outlined"
                                    style={{ fontSize: "1.3em", marginRight: "5px" }}
                                    onClick={() => (window.location.href = "/")}
                                >
                                    <HomeOutlinedIcon /> Home
                                </Button>
                            </Tooltip>
                            <Tooltip title="Explore">
                                <Button
                                    color="inherit"
                                    variant="outlined"
                                    style={{ fontSize: "1.3em", marginRight: "5px" }}
                                    onClick={() => (window.location.href = "/jobportal")}
                                >
                                    <PublicOutlinedIcon /> Explore
                                </Button>
                            </Tooltip>
                            <Tooltip title="SignIn">
                                {auth.currentUser ? (<Button
                                    color="inherit"
                                    variant="outlined"
                                    style={{ fontSize: "1.3em", marginRight: "5px" }}
                                    onMouseOver={handleHover}
                                    onClick={handleHover}
                                //onMouseOut={() => setAnchorEl(null)}
                                >
                                    <PersonOutlineOutlinedIcon/> More
                            </Button>) :
                             (<Button
                                    color="inherit"
                                    variant="outlined"
                                    style={{ fontSize: "1.3em", marginRight: "5px" }}
                                    onMouseOver={handleHover}
                                    onClick={handleHover}
                                //onMouseOut={() => setAnchorEl(null)}
                                >
                                    Login
                            </Button>)}
                            </Tooltip>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: '90px',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: '90px',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                                //onMouseLeave={()=>setAnchorEl(null)}
                                // onMouseOut={()=>setAnchorEl(null)}
                                //onMouseOutCapture={()=>setAnchorEl(null)}
                                onMouseDown={() => setAnchorEl(null)}
                            >
                                {auth.currentUser ?
                                    (<div>
                                        <MenuItem onClick={() => setAnchorEl(null)}>My Profile</MenuItem>
                                        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                                    </div>)
                                    : (<div>
                                        <MenuItem onClick={() => window.location.assign(`http://${window.location.hostname}:${window.location.port}/worksignin`)}>Worker Login</MenuItem>
                                        <MenuItem onClick={() => window.location.assign(`http://${window.location.hostname}:${window.location.port}/empsignin`)}>Employer Login</MenuItem>
                                        <MenuItem onClick={() => window.location.assign(`http://${window.location.hostname}:${window.location.port}/worksignup`)}>Worker Sign Up</MenuItem>
                                        <MenuItem onClick={() => window.location.assign(`http://${window.location.hostname}:${window.location.port}/empsignup`)}>Employer Sign Up</MenuItem>
                                    </div>)}
                            </Menu>
                        </span>
                        )}
                        {isMobile && (
                            <div>
                                <Button><MenuOutlinedIcon style={{ float: "right" }} onClick={() => setDrawer(true)} /></Button>
                                <Drawer anchor="right" open={drawer === true} onClose={() => setDrawer(false)} style={{ color: "#424242" }}>
                                    <div
                                        style={{ width: "250px" }}
                                        role="presentation"
                                        //onClick={setDrawer(false)}
                                        onKeyDown={() => setDrawer(false)}
                                    >
                                        <List>
                                            {auth.currentUser ? (<div>
                                                    <ListItem button key="My Profile" onClick={() => window.location.assign("/")}>
                                                        {/* <ListItemIcon>{index % 2 === 0 ? "My Profile" : 'My Jobs'}</ListItemIcon>  */}
                                                        <ListItemText primary="My Profile" />
                                                    </ListItem>
                                                    <ListItem button key="My Jobs" onClick={() => window.location.assign("/")}>
                                                        {/* <ListItemIcon>{index % 2 === 0 ? "My Profile" : 'My Jobs'}</ListItemIcon>  */}
                                                        <ListItemText primary="My Jobs" />
                                                    </ListItem>
                                                    <ListItem button key="Notifications" onClick={() => window.location.assign("/")}>
                                                        {/* <ListItemIcon>{index % 2 === 0 ? "My Profile" : 'My Jobs'}</ListItemIcon>  */}
                                                        <ListItemText primary="Notifications" />
                                                    </ListItem>
                                                    <ListItem button key="Logout" onClick={() => {auth.signOut();window.location.assign("/")}}>
                                                        {/* <ListItemIcon>{index % 2 === 0 ? "My Profile" : 'My Jobs'}</ListItemIcon>  */}
                                                        <ListItemText primary="Logout" />
                                                    </ListItem>
                                                </div>
                                            ) :
                                                (<div>
                                                    <ListItem button key="Worker Login" onClick={() => window.location.assign("/labsignin")}>
                                                        {/* <ListItemIcon>{index % 2 === 0 ? "My Profile" : 'My Jobs'}</ListItemIcon>  */}
                                                        <ListItemText primary="Worker Login" />
                                                    </ListItem>
                                                    <ListItem button key="Employer Login" onClick={() => window.location.assign("/empsignin")}>
                                                        {/* <ListItemIcon>{index % 2 === 0 ? "My Profile" : 'My Jobs'}</ListItemIcon>  */}
                                                        <ListItemText primary="Employer Login" />
                                                    </ListItem>
                                                    <ListItem button key="Labourer Sign Up" onClick={() => window.location.assign("/labsignup")}>
                                                        {/* <ListItemIcon>{index % 2 === 0 ? "My Profile" : 'My Jobs'}</ListItemIcon>  */}
                                                        <ListItemText primary="Labourer Sign Up" />
                                                    </ListItem>
                                                    <ListItem button key="Employer Sign Up" onClick={() => window.location.assign("/empsignup")}>
                                                        {/* <ListItemIcon>{index % 2 === 0 ? "My Profile" : 'My Jobs'}</ListItemIcon>  */}
                                                        <ListItemText primary="Employer Sign Up" />
                                                    </ListItem>
                                                </div>
                                                )}
                                        </List>
                                        <Divider />
                                        <List>
                                            {['About Us', 'Contact Us'].map((text, index) => (
                                                <ListItem button key={text}>
                                                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                                                    <ListItemText primary={text} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </div>
                                </Drawer>
                            </div>
                        )}
                    </span>
                </Toolbar>
            </AppBar>
        </React.Fragment >
    )
}