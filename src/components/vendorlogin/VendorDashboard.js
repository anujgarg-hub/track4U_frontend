/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable default-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-fallthrough */
/* eslint-disable no-unused-vars */
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
import EmployeeInterface from "../employees/EmployeeInterface";
import DisplayAllAttendence from "../attendence/DisplayAllAttendence";
import DisplayAllEmployees from "../employees/DisplayAllEmployees";
import DisplayAllExpenses from "../expenses/DisplayAllExpenses";
import Task from "../task/Task";
import DisplayAllTask from "../task/DisplayAllTask";
import Client from "../client/Client";
import DisplayAllClient from "../client/DisplayAllClient";
import Shifts from "../shift/Shifts";
import DisplayAllShifts from "../shift/DisplayAllShifts";
import DisplayAllAssignShift from "../assignshift/DisplayAllAssignShift";
import AssignShift from "../assignshift/AssignShift";
import DisplayAllAssignTask from "../assigntask/DisplayAllAssignTask";
import AssignTask from "../assigntask/AssignTask";
import DisplayAllLeaveApproval from "../leaveaproval/DisplayAllLeaveApproval";
import Leaves from "../leaves/Leaves";
import DisplayAllLeaves from "../leaves/DisplayAllLeaves";
import DashOne from "../superadmin/DashOne";
import DisplayScreenshot from "../displayform/DisplayScreenshot";
import DisplayPhoneCall from "../displayform/DisplayPhoneCall";
import Display from "../displayform/Display";
import AddProfile from "../profile/AddProfile";
import TrackEmployee from "./TrackEmployee";
import TrackAllEmployee from "./TrackAllEmployee";
import RoadMap from "./RoadMap";
import DisplayAllOrder from "../orders/DisplayAllOrder";
import VendorEmployeeId from "./VendorEmployeeId";
import DashOneVend from "./DashOneVend";

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
  const [vendor, setVendor] = useState([]);
  const [ShowComponent, setComponent] = useState(<DashOne />);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const CheckSession = async () => {
    //var  result=await getData('vendorlogin/checktoken')
    // console.log(result)
    var vendor = JSON.parse(localStorage.getItem("vendor"));
    //console.log(vendor)
    setVendor(vendor);
    //console.log(props.history.location.vendor)
  };

  useEffect(function () {
    CheckSession();
  }, []);

  const handleComponents = async (opt) => {
    switch (opt) {
      case 1:
        setComponent(<EmployeeInterface />);
        break;
      case 2:
        setComponent(<DisplayAllEmployees />);
        break;
      case 3:
        setComponent(<Client />);
        break;
      case 4:
        setComponent(<DisplayAllClient />);
        break;
      case 5:
        setComponent(<Task />);
        break;
      case 6:
        setComponent(<DisplayAllTask />);
        break;
      case 7:
        setComponent(<Shifts />);
        break;
      case 8:
        setComponent(<DisplayAllShifts />);
        break;
      case 9:
        setComponent(<DisplayAllExpenses />);
        break;
      case 10:
        setComponent(<DisplayAllAttendence />);
        break;
      case 11:
        setComponent(<AssignTask />);
        break;
      case 12:
        setComponent(<DisplayAllAssignTask />);
        break;
      case 13:
        setComponent(<AssignShift />);
        break;
      case 14:
        setComponent(<DisplayAllAssignShift />);
        break;
      case 15:
        setComponent(<Leaves />);
        break;
      case 16:
        setComponent(<DisplayAllLeaves />);
        break;
      case 17:
        setComponent(<DisplayAllLeaveApproval />);
        break;
      case 18:
        // localStorage.removeItem('vendor')
        var result = await getData("vendorlogin/logout");
        if (result) {
          props.history.replace({ pathname: `/VendorLogin` });
        }
      case 19:
        setComponent(<DashOneVend />);
        break;
      case 20:
        setComponent(<DisplayScreenshot />);
        break;
      case 21:
        setComponent(<DisplayPhoneCall />);
        break;
      case 22:
        setComponent(<Display />);
        break;
      case 23:
        setComponent(<AddProfile />);
        break;
      case 24:
        setComponent("#");
        break;
      case 25:
        setComponent(<TrackEmployee />);
        break;
      case 26:
        setComponent(<TrackAllEmployee />);
        break;
      case 27:
        // setComponent(<VendorEmployeeId />);
        setComponent(<RoadMap />);
        break;
      case 28:
        setComponent(<DisplayAllOrder />);
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
              {/* <img
                src={`${ServerURL}/images/${vendor.companylogo}`}
                class="img-responsive img-circle"
                alt="friend 8"
                style={{ width: 124, height: 124 }}
              /> */}
              <img
                src="/images/admin.png"
                class="img-responsive img-circle"
                alt="friend 8"
              />
            </div>
            <h4 style={{ fontFamily: "Calibri" }}>{vendor.companyname}</h4>
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
                <span style={{ fontFamily: "Calibri" }}>Available</span>
              </button>
            </div>
          </div>

          <ul class="nav nav-sidebar">
            <br />
            <List style={{ color: "#fff", fontFamily: "Calibri" }}>
              <ListItems
                style={{ color: "#fff", fontFamily: "Calibri" }}
                handleComponentsReference={handleComponents}
              />
            </List>
          </ul>

          <div class="sidebar-footer clearfix">
            <a
              style={{ width: "100%" }}
              class="pull-left btn-effect"
              href="VendorLogin"
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
              </ul>
            </div>
          </div>

          <div class="d-flex justify-content-around">
            <header class="header-left">
              <nav class="navbar">
                <div class="container-fluid">
                  <div class="navbar-holder d-flex align-items-center justify-content-between">
                    <ul
                      class="nav-menu list-unstyled d-flex flex-md-row align-items-md-center"
                      style={{ display: "flex", padding: 10 }}
                    >
                      {/* <!-- Notifications dropdown--> */}
                      <li class="nav-item dropdown">
                        {/* <a
                          id="notifications"
                          rel="nofollow"
                          data-target="#"
                          href="#"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          class="nav-link"
                        > */}
                        <i class="fa fa-bell"></i>
                        <span
                          class="badge badge-warning"
                          style={{ marginLeft: 5 }}
                        >
                          12
                        </span>
                        {/* </a> */}
                        <ul
                          aria-labelledby="notifications"
                          class="dropdown-menu"
                        >
                          <li>
                            <a rel="nofollow" href="#" class="dropdown-item">
                              <div class="notification d-flex justify-content-between">
                                <div class="notification-content">
                                  <i class="fa fa-envelope"></i>You have 6 new
                                  messages
                                </div>
                                <div class="notification-time">
                                  <small>4 minutes ago</small>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a rel="nofollow" href="#" class="dropdown-item">
                              <div class="notification d-flex justify-content-between">
                                <div class="notification-content">
                                  <i class="fa fa-twitter"></i>You have 2
                                  followers
                                </div>
                                <div class="notification-time">
                                  <small>4 minutes ago</small>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a rel="nofollow" href="#" class="dropdown-item">
                              <div class="notification d-flex justify-content-between">
                                <div class="notification-content">
                                  <i class="fa fa-upload"></i>Server Rebooted
                                </div>
                                <div class="notification-time">
                                  <small>4 minutes ago</small>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a rel="nofollow" href="#" class="dropdown-item">
                              <div class="notification d-flex justify-content-between">
                                <div class="notification-content">
                                  <i class="fa fa-twitter"></i>You have 2
                                  followers
                                </div>
                                <div class="notification-time">
                                  <small>10 minutes ago</small>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a
                              rel="nofollow"
                              href="#"
                              class="dropdown-item all-notifications text-center"
                            >
                              <strong>
                                <i class="fa fa-bell"></i>view all notifications
                              </strong>
                            </a>
                          </li>
                        </ul>
                      </li>
                      {/* <!-- Messages dropdown--> */}
                      <li class="nav-item dropdown" style={{ marginLeft: 10 }}>
                        <a
                          id="messages"
                          rel="nofollow"
                          data-target="#"
                          href="#"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          class="nav-link"
                        >
                          <i class="fa fa-envelope"></i>
                          <span
                            class="badge badge-info"
                            style={{ marginLeft: 5 }}
                          >
                            10
                          </span>
                        </a>
                        <ul
                          aria-labelledby="notifications"
                          class="dropdown-menu"
                        >
                          <li>
                            <a
                              rel="nofollow"
                              href="#"
                              class="dropdown-item d-flex"
                            >
                              <div class="msg-profile">
                                <img
                                  src="img/avatar-1.jpg"
                                  alt="..."
                                  class="img-fluid rounded-circle"
                                />
                              </div>
                              <div class="msg-body">
                                <h3 class="h5">Jason Doe</h3>
                                <span>sent you a direct message</span>
                                <small>
                                  3 days ago at 7:58 pm - 10.06.2014
                                </small>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a
                              rel="nofollow"
                              href="#"
                              class="dropdown-item d-flex"
                            >
                              <div class="msg-profile">
                                <img
                                  src="img/avatar-2.jpg"
                                  alt="..."
                                  class="img-fluid rounded-circle"
                                />
                              </div>
                              <div class="msg-body">
                                <h3 class="h5">Frank Williams</h3>
                                <span>sent you a direct message</span>
                                <small>
                                  3 days ago at 7:58 pm - 10.06.2014
                                </small>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a
                              rel="nofollow"
                              href="#"
                              class="dropdown-item d-flex"
                            >
                              <div class="msg-profile">
                                <img
                                  src="img/avatar-3.jpg"
                                  alt="..."
                                  class="img-fluid rounded-circle"
                                />
                              </div>
                              <div class="msg-body">
                                <h3 class="h5">Ashley Wood</h3>
                                <span>sent you a direct message</span>
                                <small>
                                  3 days ago at 7:58 pm - 10.06.2014
                                </small>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a
                              rel="nofollow"
                              href="#"
                              class="dropdown-item all-notifications text-center"
                            >
                              <strong>
                                <i class="fa fa-envelope"></i>Read all messages
                              </strong>
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </header>
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
                  <img
                    // src={`${ServerURL}/images/${vendor.companylogo}`}
                    src="/images/admin.png"
                    class="img-responsive img-circle"
                    alt="friend 8"
                  />
                  <span class="username">Hi, {vendor.companyname}</span>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a href="VendorLogin">
                      <i class="icon-logout"></i>
                      <span>Logout</span>
                    </a>
                  </li>
                </ul>
              </li>

              {/* END USER DROPDOWN */}
              {/* CHAT BAR ICON */}
            </ul>
          </div>
          {/* header-right */}
        </div>
        {/* END TOPBAR */}
        {/* BEGIN PAGE CONTENT */}

        <div class="page-content">
          <div class="header">
            <div class="col-lg-12">{ShowComponent}</div>
            <div class="row">
              <div class="col-lg-12" style={{ height: "720px" }}>
                {/* HERE COMES YOUR CONTENT  */}
              </div>
            </div>
          </div>
          <div class="footer">
            <div class="copyright">
              <p class="pull-left sm-pull-reset"></p>
              <p class="pull-right sm-pull-reset"></p>
            </div>
          </div>
        </div>
        {/* END PAGE CONTENT */}
      </div>
      {/* END MAIN CONTENT */}
      {/* BEGIN BUILDER */}
      <div class="builder hidden-sm hidden-xs" id="builder">
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
      </div>
      {/* </div> */}
      {/* END BUILDER */}
      {/* </section> */}
      {/* BEGIN QUICKVIEW SIDEBAR */}
      <div id="quickview-sidebar">
        <div class="quickview-header">
          <ul class="nav nav-tabs">
            <li class="active">
              <a href="#chat" data-toggle="tab">
                Chat
              </a>
            </li>
            <li>
              <a href="#notes" data-toggle="tab">
                Notes
              </a>
            </li>
            <li>
              <a href="#settings" data-toggle="tab" class="settings-tab">
                Settings
              </a>
            </li>
          </ul>
        </div>
        <div class="quickview">
          <div class="tab-content">
            <div class="tab-pane fade" id="settings">
              <div class="settings">
                <div class="title">ACCOUNT SETTINGS</div>
                <div class="setting">
                  <span> Show Personal Statut</span>
                  <label class="switch pull-right">
                    <input type="checkbox" class="switch-input" checked />
                    <span
                      class="switch-label"
                      data-on="On"
                      data-off="Off"
                    ></span>
                    <span class="switch-handle"></span>
                  </label>
                  <p class="setting-info">
                    Lorem ipsum dolor sit amet consectetuer.
                  </p>
                </div>
                <div class="setting">
                  <span> Show my Picture</span>
                  <label class="switch pull-right">
                    <input type="checkbox" class="switch-input" checked />
                    <span
                      class="switch-label"
                      data-on="On"
                      data-off="Off"
                    ></span>
                    <span class="switch-handle"></span>
                  </label>
                  <p class="setting-info">
                    Lorem ipsum dolor sit amet consectetuer.
                  </p>
                </div>
                <div class="setting">
                  <span> Show my Location</span>
                  <label class="switch pull-right">
                    <input type="checkbox" class="switch-input" />
                    <span
                      class="switch-label"
                      data-on="On"
                      data-off="Off"
                    ></span>
                    <span class="switch-handle"></span>
                  </label>
                  <p class="setting-info">
                    Lorem ipsum dolor sit amet consectetuer.
                  </p>
                </div>
                <div class="title">CHAT</div>
                <div class="setting">
                  <span> Show User Image</span>
                  <label class="switch pull-right">
                    <input type="checkbox" class="switch-input" checked />
                    <span
                      class="switch-label"
                      data-on="On"
                      data-off="Off"
                    ></span>
                    <span class="switch-handle"></span>
                  </label>
                </div>
                <div class="setting">
                  <span> Show Fullname</span>
                  <label class="switch pull-right">
                    <input type="checkbox" class="switch-input" checked />
                    <span
                      class="switch-label"
                      data-on="On"
                      data-off="Off"
                    ></span>
                    <span class="switch-handle"></span>
                  </label>
                </div>
                <div class="setting">
                  <span> Show Location</span>
                  <label class="switch pull-right">
                    <input type="checkbox" class="switch-input" />
                    <span
                      class="switch-label"
                      data-on="On"
                      data-off="Off"
                    ></span>
                    <span class="switch-handle"></span>
                  </label>
                </div>
                <div class="setting">
                  <span> Show Unread Count</span>
                  <label class="switch pull-right">
                    <input type="checkbox" class="switch-input" checked />
                    <span
                      class="switch-label"
                      data-on="On"
                      data-off="Off"
                    ></span>
                    <span class="switch-handle"></span>
                  </label>
                </div>

                <div class="m-t-30" style={{ width: "100%" }}>
                  <canvas id="setting-chart" height="300"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END QUICKVIEW SIDEBAR */}
      {/* BEGIN SEARCH */}
    </div>
    // <div className={classes.root}>
    //   <CssBaseline />
    //   <AppBar
    //     position="absolute"
    //     className={clsx(classes.appBar, open && classes.appBarShift)}
    //   >
    //     <Toolbar className={classes.toolbar}>
    //       <IconButton
    //         edge="start"
    //         color="inherit"
    //         aria-label="open drawer"
    //         onClick={handleDrawerOpen}
    //         className={clsx(
    //           classes.menuButton,
    //           open && classes.menuButtonHidden
    //         )}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <Typography
    //         component="h1"
    //         variant="h6"
    //         color="inherit"
    //         noWrap
    //         className={classes.title}
    //       >
    //         <div>{vendor.companyname}</div>
    //       </Typography>
    //       <div>
    //         <Avatar
    //           alt="Remy Sharp"
    //           src={`${ServerURL}/images/${vendor.companylogo}`}
    //           variant="rounded"
    //           className={classes.large}
    //         />
    //       </div>
    //     </Toolbar>
    //   </AppBar>
    //   <Drawer
    //     variant="permanent"
    //     classes={{
    //       paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
    //     }}
    //     open={open}
    //   >
    //     <div className={classes.toolbarIcon}>
    //       <img src="/images/logo.png" width="150" />
    //       <IconButton onClick={handleDrawerClose}>
    //         <ChevronLeftIcon />
    //       </IconButton>
    //     </div>
    //     <Divider />
    //     <List>
    //       <ListItems handleComponentsReference={handleComponents} />
    //     </List>
    //     <Divider />
    //   </Drawer>
    //   <main className={classes.content}>
    //     <div className={classes.appBarSpacer} />
    //     <Container maxWidth="lg" className={classes.container}>
    //       {ShowComponent}
    //     </Container>
    //   </main>
    // </div>
  );
}
