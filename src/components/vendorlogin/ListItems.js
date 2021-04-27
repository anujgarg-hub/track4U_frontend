/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TableChartIcon from "@material-ui/icons/TableChart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Add, AddCircleSharp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "14px",
    color: "#ffffff",
    font: "Calibri",
  },
  subRoot: {
    fontSize: "12px",
    color: "#ffffff",
    font: "Calibri",
  },
}));

export default function ListItems(props) {
  const classes = useStyles();

  const handleClick = (opt) => {
    props.handleComponentsReference(opt);
  };

  return (
    <div>
      <ul class="nav nav-sidebar">
        <li>
          <a onClick={() => handleClick(19)}>
            <i class="icon-home"></i>
            <span className={classes.root}>
              <b>Dashboard</b>
            </span>
          </a>
        </li>
        <li class="nav-parent">
          <a href="">
            <i class="icon-puzzle"></i>
            <span className={classes.root}>
              <b>Employee</b>
            </span>{" "}
            <span class="fa arrow"></span>
          </a>
          <ul class="children collapse">
            <li>
              <a onClick={() => handleClick(1)}>
                <b>Add Employee</b>
              </a>
            </li>
            <li>
              <a onClick={() => handleClick(2)}>
                <b>Display Employee</b>
              </a>
            </li>
          </ul>
        </li>
        <li class="nav-parent">
          <a href="#">
            <i class="icon-puzzle"></i>
            <span className={classes.root}>
              <b>Client</b>
            </span>{" "}
            <span class="fa arrow"></span>
          </a>
          <ul class="children collapse">
            <li>
              <a onClick={() => handleClick(3)}>
                <b>Add Client</b>
              </a>
            </li>
            <li>
              <a onClick={() => handleClick(4)}>
                <b>Display Client</b>
              </a>
            </li>
          </ul>
        </li>
        <li class="nav-parent">
          <a href="#">
            <i class="icon-puzzle"></i>
            <span className={classes.root}>
              <b>Task</b>
            </span>{" "}
            <span class="fa arrow"></span>
          </a>
          <ul class="children collapse">
            <li>
              <a onClick={() => handleClick(5)}>
                <b>Add Task</b>
              </a>
            </li>
            <li>
              <a onClick={() => handleClick(6)}>
                <b>Display All Task</b>
              </a>
            </li>
          </ul>
        </li>

        <li class="nav-parent">
          <a href="#">
            <i class="icon-puzzle"></i>
            <span className={classes.root}>
              <b>Shifts</b>
            </span>{" "}
            <span class="fa arrow"></span>
          </a>
          <ul class="children collapse">
            <li>
              <a onClick={() => handleClick(7)}>
                <b>Add Shifts</b>
              </a>
            </li>
            <li>
              <a onClick={() => handleClick(8)}>
                <b>Display All Shifts</b>
              </a>
            </li>
          </ul>
        </li>

        <li class="nav-parent">
          <a href="#">
            <i class="icon-puzzle"></i>
            <span className={classes.root}>
              <b>Assign Task</b>
            </span>{" "}
            <span class="fa arrow"></span>
          </a>
          <ul class="children collapse">
            <li>
              <a onClick={() => handleClick(11)}>
                <b>Add Assign Task</b>
              </a>
            </li>
            <li>
              <a onClick={() => handleClick(12)}>
                <b>Display All Assign Task</b>
              </a>
            </li>
          </ul>
        </li>

        <li class="nav-parent">
          <a href="#">
            <i class="icon-puzzle"></i>
            <span className={classes.root}>
              <b>Assign Shifts</b>
            </span>{" "}
            <span class="fa arrow"></span>
          </a>
          <ul class="children collapse">
            <li>
              <a onClick={() => handleClick(13)}>
                <b>Add Assign Shifts</b>
              </a>
            </li>
            <li>
              <a onClick={() => handleClick(14)}>
                <b>Display All Assign Shifts</b>
              </a>
            </li>
          </ul>
        </li>

        <li class="nav-parent">
          <a href="">
            <i class="icon-puzzle"></i>
            <span className={classes.root}>
              <b>Profile</b>
            </span>{" "}
            <span class="fa arrow"></span>
          </a>
          <ul class="children collapse">
            <li>
              <a onClick={() => handleClick(23)}>
                <b>Add Profile</b>
              </a>
            </li>
            <li>
              <a onClick={() => handleClick(24)}>
                <b>Display Profile</b>
              </a>
            </li>
          </ul>
        </li>
        <li class="nav-parent">
          <a href="">
            <i class="icon-puzzle"></i>
            <span className={classes.root}>
              <b>Tracking</b>
            </span>{" "}
            <span class="fa arrow"></span>
          </a>
          <ul class="children collapse">
            <li class="nav-parent">
              <a onClick={() => handleClick(27)}>
                <b>Road Map</b>
              </a>
            </li>
            <li class="nav-parent">
              <a onClick={() => handleClick(22)}>
                <b>Display Tracking</b>
              </a>
            </li>
            <li>
              <a onClick={() => handleClick(25)}>
                <b>Track Employee</b>
              </a>
            </li>
            <li>
              <a onClick={() => handleClick(26)}>
                <b>Track All Employee</b>
              </a>
            </li>
          </ul>
        </li>
        <li class="nav-parent">
          <a onClick={() => handleClick(9)}>
            <i class="icon-screen-desktop"></i>
            <span className={classes.root}>
              <b>Display Expenses</b>
            </span>{" "}
            <span class="fa arrow"></span>
          </a>
        </li>
        <li class="nav-parent">
          <a onClick={() => handleClick(10)}>
            <i class="icon-screen-desktop"></i>
            <span className={classes.root}>
              <b>Display Attendence</b>
            </span>{" "}
            <span class="fa arrow"></span>
          </a>
        </li>
        <li class="nav-parent">
          <a onClick={() => handleClick(20)}>
            <i class="icon-screen-desktop"></i>
            <span className={classes.root}>
              <b>Display Screenshot</b>
            </span>{" "}
            <span class="fa arrow"></span>
          </a>
        </li>
        <li class="nav-parent">
          <a onClick={() => handleClick(21)}>
            <i class="icon-screen-desktop"></i>
            <span className={classes.root}>
              <b>Display Phone Call</b>
            </span>{" "}
            <span class="fa arrow"></span>
          </a>
        </li>
        <li class="nav-parent">
          <a onClick={() => handleClick(28)}>
            <i class="icon-screen-desktop"></i>
            <span className={classes.root}>
              <b>Display All Order</b>
            </span>{" "}
            <span class="fa arrow"></span>
          </a>
        </li>
        {/* <li class="nav-parent">
          <a onClick={() => handleClick(22)}>
            <i class="icon-screen-desktop"></i>
            <span className={classes.root}><b>Display Tracking</b></span> <span class="fa arrow"></span>
          </a>
        </li> */}
      </ul>
      {/* <ListItem button onClick={() => handleClick(19)}>
        <ListItemIcon>
          <DashboardIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem> */}
      {/* <ListItem button onClick={() => handleClick(1)}>
        <ListItemIcon>
          <AddCircleIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Employees" />
      </ListItem>
      <ListItem button onClick={() => handleClick(2)}>
        <ListItemIcon>
          <TableChartIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Display Employees" />
      </ListItem> */}
      {/* <ListItem button onClick={() => handleClick(3)}>
        <ListItemIcon>
          <AddCircleIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Client" />
      </ListItem>
      <ListItem button onClick={() => handleClick(4)}>
        <ListItemIcon>
          <TableChartIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Display Client" />
      </ListItem> */}
      {/* <ListItem button onClick={() => handleClick(5)}>
        <ListItemIcon>
          <AddCircleSharp style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Add Task" />
      </ListItem>
      <ListItem button onClick={() => handleClick(6)}>
        <ListItemIcon>
          <TableChartIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Display Tasks" />
      </ListItem> */}
      {/* <ListItem button onClick={() => handleClick(7)}>
        <ListItemIcon>
          <AddCircleSharp style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Add Shifts" />
      </ListItem>
      <ListItem button onClick={() => handleClick(8)}>
        <ListItemIcon>
          <TableChartIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Display Shifts" />
      </ListItem> */}
      {/* <ListItem button onClick={() => handleClick(9)}>
        <ListItemIcon>
          <TableChartIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Display  Expenses" />
      </ListItem>
      <ListItem button onClick={() => handleClick(10)}>
        <ListItemIcon>
          <TableChartIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Display  Attendence" />
      </ListItem> */}
      {/* <ListItem button onClick={() => handleClick(11)}>
        <ListItemIcon>
          <AddCircleSharp style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Assign Task" />
      </ListItem>
      <ListItem button onClick={() => handleClick(12)}>
        <ListItemIcon>
          <TableChartIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Display AssignTask" />
      </ListItem> 
      <ListItem button onClick={() => handleClick(13)}>
        <ListItemIcon>
          <TableChartIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Assign Shift" />
      </ListItem>
      <ListItem button onClick={() => handleClick(14)}>
        <ListItemIcon>
          <TableChartIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Display AssignShift" />
      </ListItem> 

      <ListItem button onClick={() => handleClick(20)}>
        <ListItemIcon>
          <TableChartIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Display Screenshot" />
      </ListItem>
      <ListItem button onClick={() => handleClick(21)}>
        <ListItemIcon>
          <TableChartIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Display Phone Call" />
      </ListItem>
      <ListItem button onClick={() => handleClick(22)}>
        <ListItemIcon>
          <TableChartIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Display Tracking" />
      </ListItem> 
     <ListItem button onClick={()=>handleClick(15)}>
      <ListItemIcon>
      <AddCircleSharp/>
      </ListItemIcon>
      <ListItemText primary="Leaves" />
    </ListItem><ListItem button onClick={()=>handleClick(16)}>
      <ListItemIcon>
      <TableChartIcon />
      </ListItemIcon>
      <ListItemText primary="Display Leaves" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(17)}>
      <ListItemIcon>
      <TableChartIcon />
      </ListItemIcon>
      <ListItemText primary="Display LeaveApproval" />
    </ListItem> 
      <ListItem button onClick={() => handleClick(18)}>
        <ListItemIcon>
          <ExitToAppIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem> */}
    </div>
  );
}
