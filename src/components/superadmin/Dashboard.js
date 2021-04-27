import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ListItems from "./ListItems";
import { getData, ServerURL } from "../FetchNodeServices";
import Avatar from "@material-ui/core/Avatar";
import PackageInterface from "../packages/PackageInterface";
import DisplayAllPackages from "../packages/DisplayAllPackages";
import DisplayAllVendors from "../vendor/DisplayAllVendors";
import DisplayAllFeaturesPackages from "../feature packages/DisplayAllFeaturesPackages";
import Vendors from "../vendor/Vendors";
import PackageCustomer from "../Package customer/PackageCustomer";
import DisplayPackageCustomer from "../Package customer/DisplayPackageCustomer";
import FeaturesPackages from "../feature packages/FeaturesPackages";
import DashOne from "../superadmin/DashOne";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [admin, setAdmin] = useState([]);
  const [ShowComponent, setComponent] = useState(<DashOne />);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const CheckSession = async () => {
    if (!localStorage.getItem("admin")) {
      props.history.replace({ pathname: `/AdminSignIn` });
    }

    var admin = JSON.parse(localStorage.getItem("admin"));
    console.log(admin);
    setAdmin(admin);
    //console.log(props.history.location.admin)
  };

  useEffect(function () {
    CheckSession();
  }, []);

  const handleComponents = async (opt) => {
    switch (opt) {
      case 1:
        setComponent(<PackageInterface />);
        break;
      case 2:
        setComponent(<DisplayAllPackages />);
        break;
      case 3:
        setComponent(<FeaturesPackages />);
        break;
      case 4:
        setComponent(<DisplayAllFeaturesPackages />);
        break;
      case 5:
        setComponent(<Vendors />);
        break;
      case 6:
        setComponent(<DisplayAllVendors />);
        break;

      // case 7:
      //   localStorage.removeItem("admin");
      //   var result = await getData("admin/logout");
      //   if (result) {
      //     props.history.replace({ pathname: `/AdminSignin` });
      //   }
      //   break;
      case 8:
        setComponent(<DashOne />);
        break;
      case 9:
        setComponent(<PackageCustomer />);
        break;
      case 10:
        setComponent(<DisplayPackageCustomer />);
        break;
      default:
    }
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div>
      {/*  className={classes.root} */}
      {/* <CssBaseline /> */}
      <div class="sidebar">
        <div class="logopanel">
          <h1>
            <img src="/images/logo.png" style={{ width: "100%" }} />
          </h1>
        </div>
        <div class="sidebar-inner">
          <div class="sidebar-top big-img">
            <div class="user-image">
              <img
                src="/images/admin.png"
                class="img-responsive img-circle"
                alt="friend 8"
              />
            </div>
            <h4>Admin</h4>
            <div class="dropdown user-login">
              <button
                class="btn btn-xs dropdown-toggle btn-rounded"
                type="button"
                data-toggle="dropdown"
                data-hover="dropdown"
                data-close-others="true"
                data-delay="300"
              >
                <i class="online"></i>
                <span>Available</span>
              </button>
            </div>
          </div>
          {/* <div class="menu-title">
            Navigation
            <div class="pull-right menu-settings">
              <a
                href="#"
                class="dropdown-toggle"
                data-toggle="dropdown"
                data-hover="dropdown"
                data-close-others="true"
                data-delay="300"
              >
                <i class="icon-settings"></i>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a href="#" id="reorder-menu" class="reorder-menu">
                    Reorder menu
                  </a>
                </li>
                <li>
                  <a href="#" id="remove-menu" class="remove-menu">
                    Remove elements
                  </a>
                </li>
                <li>
                  <a href="#" id="hide-top-sidebar" class="hide-top-sidebar">
                    Hide / show user image
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
          <ul class="nav nav-sidebar">
            <br />
            <List style={{ color: "#fff" }}>
              <ListItems
                style={{ color: "#fff" }}
                handleComponents={handleComponents}
              />
            </List>
            {/* <li>
              <a href="#">
                <i class="icon-home"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li class="nav-parent">
              <a href="#">
                <i class="icon-puzzle"></i>
                <span>Package</span> <span class="fa arrow"></span>
              </a>
              <ul class="children collapse">
                <li>
                  <a target="_blank" href="#">
                    Package Interface
                  </a>
                </li>
                <li>
                  <a target="_blank" href="#">
                    Display All Packages
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-parent">
              <a href="#">
                <i class="icon-puzzle"></i>
                <span>Features Packages</span> <span class="fa arrow"></span>
              </a>
              <ul class="children collapse">
                <li>
                  <a target="_blank" href="#">
                    Features Packages
                  </a>
                </li>
                <li>
                  <a target="_blank" href="#">
                    Display All Features Packages
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-parent">
              <a href="#">
                <i class="icon-puzzle"></i>
                <span>Vendors</span> <span class="fa arrow"></span>
              </a>
              <ul class="children collapse">
                <li>
                  <a target="_blank" href="#">
                    Vendors
                  </a>
                </li>
                <li>
                  <a target="_blank" href="#">
                    Display All Vendors
                  </a>
                </li>
              </ul>
            </li> */}
          </ul>

          <div class="sidebar-footer clearfix">
            <a
              style={{ width: "100%" }}
              class="pull-left btn-effect"
              href="AdminSignIn"
              data-modal="modal-1"
              data-rel="tooltip"
              data-placement="top"
              data-original-title="Logout"
            >
              <i class="icon-power"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="main-content">
        <div class="topbar">
          <div class="header-left">
            <div class="topnav">
              <a class="menutoggle" href="#" data-toggle="sidebar-collapsed">
                <span class="menu__handle">
                  <span>Menu</span>
                </span>
              </a>
              <ul class="nav nav-icons">
                <li>
                  <a href="#" class="toggle-sidebar-top">
                    <span class="icon-user-following"></span>
                  </a>
                </li>
                {/* <li>
                  <a href="mailbox.html">
                    <span class="octicon octicon-mail-read"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="octicon octicon-flame"></span>
                  </a>
                </li>
                <li>
                  <a href="builder-page.html">
                    <span class="octicon octicon-rocket"></span>
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
          <div class="header-right">
            <ul class="header-menu nav navbar-nav">
              {/* BEGIN USER DROPDOWN */}
              <li class="dropdown" id="user-header">
                <a
                  href="#"
                  data-toggle="dropdown"
                  data-hover="dropdown"
                  data-close-others="true"
                >
                  <img src="/images/admin.png" alt="user image" />
                  <span class="username">Hi, Admin</span>
                </a>
                <ul class="dropdown-menu">
                  {/* <li>
                    <a href="#">
                      <i class="icon-user"></i>
                      <span>My Profile</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="icon-calendar"></i>
                      <span>My Calendar</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="icon-settings"></i>
                      <span>Account Settings</span>
                    </a>
                  </li> */}
                  <li>
                    <a href="AdminSignIn">
                      <i class="icon-logout"></i>
                      <span>Logout</span>
                    </a>
                  </li>
                </ul>
              </li>

              {/* END USER DROPDOWN */}
              {/* CHAT BAR ICON */}
              {/* <li id="quickview-toggle">
                <a href="#">
                  <i class="icon-bubbles"></i>
                </a>
              </li> */}
            </ul>
          </div>
          {/* header-right */}
        </div>
        {/* END TOPBAR */}
        {/* BEGIN PAGE CONTENT */}
        <div class="page-content">
          <div class="header">
            <div class="col-md-12">{ShowComponent}</div>
          </div>
          <div class="row">
            <div class="col-lg-12" style={{ height: "720px" }}>
              {/* HERE COMES YOUR CONTENT */}
            </div>
          </div>
          <div class="footer">
            <div class="copyright">
              <p class="pull-left sm-pull-reset">
                {/* <span>
                  Copyright <span class="copyright">©</span> 2016{" "}
                </span>
                <span>THEMES LAB</span>.<span>All rights reserved. </span> */}
              </p>
              <p class="pull-right sm-pull-reset">
                {/* <span>
                  <a href="#" class="m-r-10">
                    Support
                  </a>{" "}
                  |{" "}
                  <a href="#" class="m-l-10 m-r-10">
                    Terms of use
                  </a>{" "}
                  |{" "}
                  <a href="#" class="m-l-10">
                    Privacy Policy
                  </a>
                </span> */}
              </p>
            </div>
          </div>
        </div>
        {/* END PAGE CONTENT */}
      </div>
      {/* END MAIN CONTENT */}
      {/* BEGIN BUILDER */}
      {/* <div class="builder hidden-sm hidden-xs" id="builder">
        <a class="builder-toggle">
          <i class="icon-wrench"></i>
        </a>
        <div class="inner">
          <div class="builder-container">
            <a href="#" class="btn btn-sm btn-default" id="reset-style">
              reset default style
            </a>
            <h4>Layout options</h4>
            <div class="layout-option">
              <span> Fixed Sidebar</span>
              <label class="switch pull-right">
                <input
                  data-layout="sidebar"
                  id="switch-sidebar"
                  type="checkbox"
                  class="switch-input"
                  checked
                />
                <span class="switch-label" data-on="On" data-off="Off"></span>
                <span class="switch-handle"></span>
              </label>
            </div>
            <div class="layout-option">
              <span> Sidebar on Hover</span>
              <label class="switch pull-right">
                <input
                  data-layout="sidebar-hover"
                  id="switch-sidebar-hover"
                  type="checkbox"
                  class="switch-input"
                />
                <span class="switch-label" data-on="On" data-off="Off"></span>
                <span class="switch-handle"></span>
              </label>
            </div>
            <div class="layout-option">
              <span> Submenu on Hover</span>
              <label class="switch pull-right">
                <input
                  data-layout="submenu-hover"
                  id="switch-submenu-hover"
                  type="checkbox"
                  class="switch-input"
                />
                <span class="switch-label" data-on="On" data-off="Off"></span>
                <span class="switch-handle"></span>
              </label>
            </div>
            <div class="layout-option">
              <span>Fixed Topbar</span>
              <label class="switch pull-right">
                <input
                  data-layout="topbar"
                  id="switch-topbar"
                  type="checkbox"
                  class="switch-input"
                  checked
                />
                <span class="switch-label" data-on="On" data-off="Off"></span>
                <span class="switch-handle"></span>
              </label>
            </div>
            <div class="layout-option">
              <span>Boxed Layout</span>
              <label class="switch pull-right">
                <input
                  data-layout="boxed"
                  id="switch-boxed"
                  type="checkbox"
                  class="switch-input"
                />
                <span class="switch-label" data-on="On" data-off="Off"></span>
                <span class="switch-handle"></span>
              </label>
            </div>
            <h4 class="border-top">Color</h4>
            <div class="row">
              <div class="col-xs-12">
                <div
                  class="theme-color bg-dark"
                  data-main="default"
                  data-color="#2B2E33"
                ></div>
                <div
                  class="theme-color background-primary"
                  data-main="primary"
                  data-color="#319DB5"
                ></div>
                <div
                  class="theme-color bg-red"
                  data-main="red"
                  data-color="#C75757"
                ></div>
                <div
                  class="theme-color bg-green"
                  data-main="green"
                  data-color="#1DA079"
                ></div>
                <div
                  class="theme-color bg-orange"
                  data-main="orange"
                  data-color="#D28857"
                ></div>
                <div
                  class="theme-color bg-purple"
                  data-main="purple"
                  data-color="#B179D7"
                ></div>
                <div
                  class="theme-color bg-blue"
                  data-main="blue"
                  data-color="#4A89DC"
                ></div>
              </div>
            </div>
            <h4 class="border-top">Theme</h4>
            <div class="row row-sm">
              <div class="col-xs-6">
                <div class="theme clearfix sdtl" data-theme="sdtl">
                  <div class="header theme-left"></div>
                  <div class="header theme-right-light"></div>
                  <div class="theme-sidebar-dark"></div>
                  <div class="bg-light"></div>
                </div>
              </div>
              <div class="col-xs-6">
                <div class="theme clearfix sltd" data-theme="sltd">
                  <div class="header theme-left"></div>
                  <div class="header theme-right-dark"></div>
                  <div class="theme-sidebar-light"></div>
                  <div class="bg-light"></div>
                </div>
              </div>
              <div class="col-xs-6">
                <div class="theme clearfix sdtd" data-theme="sdtd">
                  <div class="header theme-left"></div>
                  <div class="header theme-right-dark"></div>
                  <div class="theme-sidebar-dark"></div>
                  <div class="bg-light"></div>
                </div>
              </div>
              <div class="col-xs-6">
                <div class="theme clearfix sltl" data-theme="sltl">
                  <div class="header theme-left"></div>
                  <div class="header theme-right-light"></div>
                  <div class="theme-sidebar-light"></div>
                  <div class="bg-light"></div>
                </div>
              </div>
            </div>
            <h4 class="border-top">Background</h4>
            <div class="row">
              <div class="col-xs-12">
                <div
                  class="bg-color bg-clean"
                  data-bg="clean"
                  data-color="#F8F8F8"
                ></div>
                <div
                  class="bg-color bg-lighter"
                  data-bg="lighter"
                  data-color="#EFEFEF"
                ></div>
                <div
                  class="bg-color bg-light-default"
                  data-bg="light-default"
                  data-color="#E9E9E9"
                ></div>
                <div
                  class="bg-color bg-light-blue"
                  data-bg="light-blue"
                  data-color="#E2EBEF"
                ></div>
                <div
                  class="bg-color bg-light-purple"
                  data-bg="light-purple"
                  data-color="#E9ECF5"
                ></div>
                <div
                  class="bg-color bg-light-dark"
                  data-bg="light-dark"
                  data-color="#DCE1E4"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* </div> */}
      {/* END BUILDER */}
      {/* </section> */}

      {/* BEGIN SEARCH */}
      <div id="morphsearch" class="morphsearch">
        {/* <form class="morphsearch-form">
          <input
            class="morphsearch-input"
            type="search"
            placeholder="Search..."
          />
          <button class="morphsearch-submit" type="submit">
            Search
          </button>
        </form> */}
        <div class="morphsearch-content withScroll">
          {/* <div class="dummy-column user-column">
            <h2>Users</h2>
            <a class="dummy-media-object" href="#">
              <img
                src="../assets/global/images/avatars/avatar1_big.png"
                alt="Avatar 1"
              />
              <h3>John Smith</h3>
            </a>
            <a class="dummy-media-object" href="#">
              <img
                src="../assets/global/images/avatars/avatar2_big.png"
                alt="Avatar 2"
              />
              <h3>Bod Dylan</h3>
            </a>
            <a class="dummy-media-object" href="#">
              <img
                src="../assets/global/images/avatars/avatar3_big.png"
                alt="Avatar 3"
              />
              <h3>Jenny Finlan</h3>
            </a>
            <a class="dummy-media-object" href="#">
              <img
                src="../assets/global/images/avatars/avatar4_big.png"
                alt="Avatar 4"
              />
              <h3>Harold Fox</h3>
            </a>
            <a class="dummy-media-object" href="#">
              <img
                src="../assets/global/images/avatars/avatar5_big.png"
                alt="Avatar 5"
              />
              <h3>Martin Hendrix</h3>
            </a>
            <a class="dummy-media-object" href="#">
              <img
                src="../assets/global/images/avatars/avatar6_big.png"
                alt="Avatar 6"
              />
              <h3>Paul Ferguson</h3>
            </a>
          </div> */}
          {/* <div class="dummy-column">
            <h2>Articles</h2>
            <a class="dummy-media-object" href="#">
              <img src="../assets/global/images/gallery/1.jpg" alt="1" />
              <h3>How to change webdesign?</h3>
            </a>
            <a class="dummy-media-object" href="#">
              <img src="../assets/global/images/gallery/2.jpg" alt="2" />
              <h3>News From the sky</h3>
            </a>
            <a class="dummy-media-object" href="#">
              <img src="../assets/global/images/gallery/3.jpg" alt="3" />
              <h3>Where is the cat?</h3>
            </a>
            <a class="dummy-media-object" href="#">
              <img src="../assets/global/images/gallery/4.jpg" alt="4" />
              <h3>Just another funny story</h3>
            </a>
            <a class="dummy-media-object" href="#">
              <img src="../assets/global/images/gallery/5.jpg" alt="5" />
              <h3>How many water we drink every day?</h3>
            </a>
            <a class="dummy-media-object" href="#">
              <img src="../assets/global/images/gallery/6.jpg" alt="6" />
              <h3>Drag and drop tutorials</h3>
            </a>
          </div>
          <div class="dummy-column">
            <h2>Recent</h2>
            <a class="dummy-media-object" href="#">
              <img src="../assets/global/images/gallery/7.jpg" alt="7" />
              <h3>Design Inspiration</h3>
            </a>
            <a class="dummy-media-object" href="#">
              <img src="../assets/global/images/gallery/8.jpg" alt="8" />
              <h3>Animals drawing</h3>
            </a>
            <a class="dummy-media-object" href="#">
              <img src="../assets/global/images/gallery/9.jpg" alt="9" />
              <h3>Cup of tea please</h3>
            </a>
            <a class="dummy-media-object" href="#">
              <img src="../assets/global/images/gallery/10.jpg" alt="10" />
              <h3>New application arrive</h3>
            </a>
            <a class="dummy-media-object" href="#">
              <img src="../assets/global/images/gallery/11.jpg" alt="11" />
              <h3>Notification prettify</h3>
            </a>
            <a class="dummy-media-object" href="#">
              <img src="../assets/global/images/gallery/12.jpg" alt="12" />
              <h3>My article is the last recent</h3>
            </a>
          </div> */}
        </div>
        {/* /morphsearch-content */}
        <span class="morphsearch-close"></span>
      </div>
      {/* END QUICKVIEW SIDEBAR */}
      {/* BEGIN PRELOADER */}
      {/* <div class="loader-overlay">
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </div> */}
      {/* END PRELOADER */}
      {/* <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <div>Admin Id : {admin.adminid}</div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
        <img src="/images/logo.png" width='150'/>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><ListItems handleComponents={handleComponents} /></List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {ShowComponent}
                 </Container>
      </main> */}
    </div>
  );
}
