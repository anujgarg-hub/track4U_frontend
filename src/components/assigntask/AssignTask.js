import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import { postDataAndImage, getData, postData } from "../FetchNodeServices";
import Typography from "@material-ui/core/Typography";
import GoogleMapReact from "google-map-react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { checkRequire } from "../Checks";
import { SettingsBackupRestoreOutlined } from "@material-ui/icons";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    display: "none",
  },

  paperstyle: {
    width: 600,
    margin: 5,
    padding: 30,
    backgroundColor: "#f1f2f6",
  },
  headingstyle: {
    margin: 5,
    padding: 13,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dfe4ea",
    marginBottom: 17,
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    width: 160,
  },
  uploadbutton: {
    width: 250,
  },

  gridStyle: {
    display: "flex",
    flexDirection: "row",
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

function AssignTask() {
  const classes = useStyles();

  const [getList, setList] = useState([]);
  const [getTaskId, setTaskId] = useState("");
  const [getEmployeeId, setEmployeeId] = useState("");
  const [getMsg, setMsg] = useState("");
  const [selectedAssignDate, setSelectedAssignDate] = React.useState(
    new Date()
  );
  const [selectedAssignTime, setSelectedAssignTime] = React.useState(
    new Date()
  );
  const [getTaskStatus, setTaskStatus] = React.useState("Not Completed");
  const [getErrTaskId, setErrTaskId] = useState("");
  const [getErrEmployeeId, setErrEmployeeId] = useState("");
  const [ErrselectedAssignDate, setErrSelectedAssignDate] = React.useState(
    new Date()
  );
  const [ErrselectedAssignTime, setErrSelectedAssignTime] = React.useState(
    new Date()
  );
  const [getErrTaskStatus, setErrTaskStatus] = useState("");
  const [getEmployeesList, setEmployeesList] = useState([]);

  const handleSubmit = async () => {
    var err = false;
    if (!checkRequire(getTaskId)) {
      err = true;
      setErrTaskId("/images/cross.png");
    }
    if (checkRequire(getTaskId)) {
      setErrTaskId("/images/tick.png");
    }

    if (!checkRequire(getEmployeeId)) {
      err = true;
      setErrEmployeeId("/images/cross.png");
    }
    if (checkRequire(getEmployeeId)) {
      setErrEmployeeId("/images/tick.png");
    }

    if (!checkRequire(selectedAssignDate)) {
      err = true;
      setErrSelectedAssignDate("/images/cross.png");
    }
    if (checkRequire(selectedAssignDate)) {
      setErrSelectedAssignDate("/images/tick.png");
    }

    if (!checkRequire(selectedAssignTime)) {
      err = true;
      setErrSelectedAssignTime("/images/cross.png");
    }
    if (checkRequire(selectedAssignTime)) {
      setErrSelectedAssignTime("/images/tick.png");
    }

    if (!checkRequire(getTaskStatus)) {
      err = true;
      setErrTaskStatus("/images/cross.png");
    }
    if (checkRequire(getTaskStatus)) {
      setErrTaskStatus("/images/tick.png");
    }

    if (!err) {
      let body = {
        taskid: getTaskId,
        employeeid: getEmployeeId,
        assigndate: selectedAssignDate,
        assigntime: selectedAssignTime,
        taskstatus: getTaskStatus,
      };
      console.log(body);
      var result = await postData("assigntask/addnewrecord", body);

      if (result) {
        setMsg("Record Submitted ...");
      } else {
        setMsg("Fail to submit Record ..");
      }
    } else {
      setMsg("Error in Input");
    }
  };

  const ClearData = () => {
    setTaskId("");
    setEmployeeId("");
    setSelectedAssignTime(new Date());
    setSelectedAssignDate(new Date());
    setTaskStatus("");
    setMsg("");
    setErrTaskId("");
    setErrEmployeeId("");
    setErrSelectedAssignDate("");
    setErrSelectedAssignTime("");
    setErrTaskStatus("");
  };

  const handleAssignDateChange = (date) => {
    setSelectedAssignDate(date);
  };

  const handleAssignTimeChange = (time) => {
    setSelectedAssignTime(time);
  };

  const fetchAllTask = async (V_id) => {
    // alert(V_id);
    let body = {
      vendorid: V_id,
    };
    var list = await postData("task/displayall", body);
    setList(list.data);
  };

  useEffect(function () {
    var vendor = JSON.parse(localStorage.getItem("vendor"));
    fetchAllTask(vendor.vendorid);
    fetchEmployees(vendor.vendorid);
  }, []);

  const handleTaskChange = (event) => {
    setTaskId(event.target.value);
  };

  const fillTaskItem = () => {
    return getList.map((item, key) => {
      return <MenuItem value={item.taskid}>{item.taskname}</MenuItem>;
    });
  };

  const fetchEmployees = async (V_id) => {
    let body = {
      vendorid: V_id,
    };
    var list = await postData("employees/displayall", body);
    setEmployeesList(list.data);
  };

  // const fetchEmployees = async () => {
  //   var list = await getData("employees/displayall");
  //   setEmployeesList(list.data);
  // };

  const fillEmployees = () => {
    return getEmployeesList.map(function (item, key) {
      return (
        <MenuItem value={item.employeeid}>
          {item.employeename}&nbsp;&nbsp;{item.mobileno}
        </MenuItem>
      );
    });
  };

  return (
    <div className={classes.root}>
      <div class="panel panel-default no-bd" style={{ width: "100%" }}>
        <div class="panel-header bg-dark">
          <h3 class="panel-title">
            <strong>Assign Task</strong>
          </h3>
        </div>
        <div class="panel-body bg-white">
          <div class="row">
            <div class="col-md-12 ">
              <form role="form" class="form-validation" novalidate="novalidate">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label class="control-label">Tasks</label>
                      <img src={getErrTaskId} width="10" height="10" />
                      <div class="append-icon">
                        <Select
                          fullWidth
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={getTaskId}
                          onChange={(event) => handleTaskChange(event)}
                        >
                          {fillTaskItem()}
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label class="control-label">Employee</label>
                      <img src={getErrEmployeeId} width="10" height="10" />
                      <div class="append-icon">
                        <Select
                          fullWidth
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={getEmployeeId}
                          onChange={(event) =>
                            setEmployeeId(event.target.value)
                          }
                        >
                          {fillEmployees()}
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Assign Date</label>
                      <img src={ErrselectedAssignDate} width="10" height="10" />
                      <div class="append-icon">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Assign Date"
                            format="MM/dd/yyyy"
                            fullWidth="true"
                            value={selectedAssignDate}
                            onChange={handleAssignDateChange}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Assign Time</label>
                      <img src={ErrselectedAssignTime} width="10" height="10" />
                      <div class="append-icon">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Assign Time"
                            fullWidth="true"
                            value={selectedAssignTime}
                            onChange={handleAssignTimeChange}
                            KeyboardButtonProps={{
                              "aria-label": "change time",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div class="text-center  m-t-20">
                  <button
                    className="btn btn-success btn-transparent"
                    type="submit"
                    // class="btn btn-embossed btn-primary"
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-danger btn-transparent"
                    type="reset"
                    // class="cancel btn btn-embossed btn-default m-b-10 m-r-0"
                    onClick={(event) => {
                      ClearData();
                    }}
                  >
                    Reset
                  </button>
                </div>
                {getMsg}
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <Paper className={classes.paperstyle}>
        <Paper elevation={1} className={classes.headingstyle}>
          <Typography variant="h6" gutterBottom>
            <b>&nbsp;&nbsp;&nbsp;&nbsp;Add Task </b>
          </Typography>
        </Paper>

        <Grid container spacing={1}>
          <Grid item xs={6} className={classes.gridStyle}>
            <img src={getErrTaskId} width="10" height="10" />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tasks</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={getTaskId}
                onChange={(event) => handleTaskChange(event)}
              >
                {fillTaskItem()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} className={classes.gridStyle}>
            <img src={getErrEmployeeId} width="10" height="10" />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Employee</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={getEmployeeId}
                onChange={(event) => setEmployeeId(event.target.value)}
              >
                {fillEmployees()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} className={classes.gridStyle}>
            <img src={ErrselectedAssignDate} width="10" height="10" />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Assign Date"
                format="MM/dd/yyyy"
                fullWidth="true"
                value={selectedAssignDate}
                onChange={handleAssignDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={6} className={classes.gridStyle}>
            <img src={ErrselectedAssignTime} width="10" height="10" />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Assign Time"
                fullWidth="true"
                value={selectedAssignTime}
                onChange={handleAssignTimeChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={6} className={classes.container}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </Grid>

          <Grid item xs={6} className={classes.container}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => ClearData()}
            >
              Reset
            </Button>
          </Grid>

          <Grid item xs={12}>
            <b>Message:&nbsp;&nbsp;{getMsg}</b>
          </Grid>
        </Grid>
      </Paper> */}
    </div>
  );
}

export default AssignTask;
