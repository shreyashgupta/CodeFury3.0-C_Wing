import React from 'react';
import { AppBar, Toolbar, Button, useScrollTrigger, IconButton, List, ListItem, ListItemText, SwipeableDrawer, Typography, Tooltip, Divider, Drawer, Menu, MenuItem } from '@material-ui/core';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import { isMobile, isMobileOnly } from 'react-device-detect';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import './nav.css'
//import Link from 'react-dom';
export default function Navbar() {
    const [drawer, setDrawer] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleHover = (event) => {
        setAnchorEl(event.currentTarget);
    };

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
                                    onClick={() => (window.location.href = "/")}
                                >
                                    <PublicOutlinedIcon /> Explore
                                </Button>
                            </Tooltip>
                            <Tooltip title="SignIn">
                                <Button
                                    color="inherit"
                                    variant="outlined"
                                    style={{ fontSize: "1.3em", marginRight: "5px" }}
                                    onMouseOver={handleHover}
                                    onClick={handleHover}
                                    //onMouseOut={() => setAnchorEl(null)}
                                >
                                    Login
                            </Button>
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
                                onClose={()=>setAnchorEl(null)}
                                //onMouseLeave={()=>setAnchorEl(null)}
                                // onMouseOut={()=>setAnchorEl(null)}
                                //onMouseOutCapture={()=>setAnchorEl(null)}
                                onMouseDown={()=>setAnchorEl(null)}
                            >
                                <MenuItem onClick={()=>setAnchorEl(null)}>Worker Login</MenuItem>
                                <MenuItem onClick={()=>setAnchorEl(null)}>Employer Login</MenuItem>
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
                                            {['My Profile', 'My Jobs', 'Notifications'].map((text, index) => (
                                                <ListItem button key={text}>
                                                    {/* <ListItemIcon>{index % 2 === 0 ? "My Profile" : 'My Jobs'}</ListItemIcon>  */}
                                                    <ListItemText primary={text} />
                                                </ListItem>
                                            ))}
                                        </List>
                                        <Divider />
                                        <List>
                                            {['About Us', 'Contact Us', 'Logout'].map((text, index) => (
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