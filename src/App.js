import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PackageInterface from "./components/packages/PackageInterface";
import DisplayAllPackages from "./components/packages/DisplayAllPackages";
import DisplayAllVendors from "./components/vendor/DisplayAllVendors";
import DisplayAllFeaturesPackages from "./components/feature packages/DisplayAllFeaturesPackages";
import Vendors from "./components/vendor/Vendors";
import FeaturesPackages from "./components/feature packages/FeaturesPackages";
import DisplayAllAttendence from "./components/attendence/DisplayAllAttendence";
import EmployeeInterface from "./components/employees/EmployeeInterface";
import DisplayAllEmployees from "./components/employees/DisplayAllEmployees";
import DisplayAllExpenses from "./components/expenses/DisplayAllExpenses";
import Task from "./components/task/Task";
import DisplayAllTask from "./components/task/DisplayAllTask";
import Client from "./components/client/Client";
import DisplayAllClient from "./components/client/DisplayAllClient";
import SignIn from "./components/superadmin/Signin";
import Dashboard from "./components/superadmin/Dashboard";
import DashOne from "./components/superadmin/DashOne";
import VendorLogin from "./components/vendorlogin/Login";
import VendorDashboard from "./components/vendorlogin/VendorDashboard";
import Shifts from "./components/shift/Shifts";
import DisplayAllShifts from "./components/shift/DisplayAllShifts";
import AssignTask from "./components/assigntask/AssignTask";
import DisplayAllAssignTask from "./components/assigntask/DisplayAllAssignTask";
import DisplayAllAssignShift from "./components/assignshift/DisplayAllAssignShift";
import AssignShift from "./components/assignshift/AssignShift";
import DisplayAllLeaveApproval from "./components/leaveaproval/DisplayAllLeaveApproval";
import Leaves from "./components/leaves/Leaves";
import DisplayAllLeaves from "./components/leaves/DisplayAllLeaves";
import CardView from "./components/CardView/CardView";

function App(props) {
  return (
    <div>
      <Router>
        <Route
          exactly
          strict
          component={PackageInterface}
          path="/PackageInterface"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={DisplayAllPackages}
          path="/DisplayAllPackages"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={DisplayAllVendors}
          path="/DisplayAllVendors"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={DisplayAllFeaturesPackages}
          path="/DisplayAllFeaturesPackages"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={Vendors}
          path="/Vendors"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={FeaturesPackages}
          path="/FeaturesPackages"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={DisplayAllAttendence}
          path="/DisplayAllAttendence"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={EmployeeInterface}
          path="/EmployeeInterface"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={DisplayAllExpenses}
          path="/DisplayAllExpenses"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={DisplayAllEmployees}
          path="/DisplayAllEmployees"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={DisplayAllTask}
          path="/DisplayAllTask"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={DisplayAllClient}
          path="/DisplayAllClient"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={Task}
          path="/Task"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={Client}
          path="/Client"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={SignIn}
          path="/AdminSignIn"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={Dashboard}
          path="/Dashboard"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={DashOne}
          path="/DashOne"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={VendorLogin}
          path="/VendorLogin"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={VendorDashboard}
          path="/VendorDashboard"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={Shifts}
          path="/Shifts"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={DisplayAllShifts}
          path="/DisplayAllShifts"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={AssignTask}
          path="/AssignTask"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={DisplayAllAssignTask}
          path="/DisplayAllAssignTask"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={AssignShift}
          path="/AssignShift"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={DisplayAllAssignShift}
          path="/DisplayAllAssignShift"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={DisplayAllLeaveApproval}
          path="/DisplayAllLeaveApproval"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={Leaves}
          path="/Leaves"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={DisplayAllLeaves}
          path="/DisplayAllLeaves"
          history={props.history}
        />
        <Route
          exactly
          strict
          component={CardView}
          path="/cardview"
          history={props.history}
        />
      </Router>
    </div>
  );
}

export default App;
