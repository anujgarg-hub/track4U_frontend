/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export default function ListItems(props) {
  const handleClick = (opt) => {
    props.handleComponents(opt);
  };

  return (
    <div>
      <ul class="nav nav-sidebar">
        <li>
          <a onClick={() => handleClick(8)}>
            <i class="icon-home"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li class="nav-parent">
          <a href="">
            <i class="icon-puzzle"></i>
            <span>Customer</span> <span class="fa arrow"></span>
          </a>
          <ul class="children collapse">
            <li>
              <a onClick={() => handleClick(5)}>Add Customer</a>
            </li>
            <li>
              <a onClick={() => handleClick(6)}>Display Customer</a>
            </li>
          </ul>
        </li>
        <li class="nav-parent">
          <a href="">
            <i class="icon-puzzle"></i>
            <span>Package Customer</span> <span class="fa arrow"></span>
          </a>
          <ul class="children collapse">
            <li>
              <a onClick={() => handleClick(9)}>Add Package Customer</a>
            </li>
            <li>
              <a onClick={() => handleClick(10)}>Display Package Customer</a>
            </li>
          </ul>
        </li>
       
         <li class="nav-parent">
          <a href="">
            <i class="icon-puzzle"></i>
            <span>Packages</span> <span class="fa arrow"></span>
          </a>
          <ul class="children collapse">
            <li>
              <a onClick={() => handleClick(1)}>Add Packages</a>
            </li>
            <li>
              <a onClick={() => handleClick(2)}>Display Packages</a>
            </li>
          </ul>
        </li> 
         {/* <li class="nav-parent">
          <a href="">
            <i class="icon-puzzle"></i>
            <span>Feature Packages</span> <span class="fa arrow"></span>
          </a>
          <ul class="children collapse">
            <li>
              <a onClick={() => handleClick(3)}>Add Feature Packages</a>
            </li>
            <li>
              <a onClick={() => handleClick(4)}>Display Feature Packages</a>
            </li>
          </ul>
        </li>  */}
        {/* <li class="nav-parent">
          <a href="">
            <i class="icon-puzzle"></i>
            <span>Customer</span> <span class="fa arrow"></span>
          </a>
          <ul class="children collapse">
            <li>
              <a onClick={() => handleClick(5)}>Add Customer</a>
            </li>
            <li>
              <a onClick={() => handleClick(6)}>Display Customer</a>
            </li>
          </ul>
        </li> */}
        {/* <li class="nav-parent">
          <a href="">
            <i class="icon-puzzle"></i>
            <span>Package Customer</span> <span class="fa arrow"></span>
          </a>
          <ul class="children collapse">
            <li>
              <a onClick={() => handleClick(9)}>Add Package Customer</a>
            </li>
            <li>
              <a onClick={() => handleClick(10)}>Display Package Customer</a>
            </li>
          </ul>
        </li> */}
      </ul>
      {/* <ListItem button onClick={() => handleClick(8)}>
        <ListItemIcon>
          <DashboardIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => handleClick(1)}>
        <ListItemIcon>
          <AddCircleIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Packages" />
      </ListItem>
      <ListItem button onClick={() => handleClick(2)}>
        <ListItemIcon>
          <TableChartIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Display Packages" />
      </ListItem>
      <ListItem button onClick={() => handleClick(3)}>
        <ListItemIcon>
          <AddCircleIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Feature Packages" />
      </ListItem>
      <ListItem button onClick={() => handleClick(4)}>
        <ListItemIcon>
          <TableChartIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Display FeaturePackages" />
      </ListItem>
      <ListItem button onClick={() => handleClick(5)}>
        <ListItemIcon>
          <AddCircleIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Customer" />
      </ListItem>
      <ListItem button onClick={() => handleClick(6)}>
        <ListItemIcon>
          <TableChartIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Display Customer" />
      </ListItem>

      <ListItem button onClick={() => handleClick(7)}>
        <ListItemIcon>
          <ExitToAppIcon style={{ color: "#FFF" }} />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem> */}
    </div>
  );
}
