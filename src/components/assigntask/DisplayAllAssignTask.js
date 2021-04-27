import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import {
  postData,
  getData,
  postDataAndImage,
  ServerURL,
} from "../FetchNodeServices";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { checkRequire } from "../Checks";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import swal from "sweetalert";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  rootx: {
    display: "flex",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  tablediv: {
    width: window.innerWidth * 0.8,
    height: "auto",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    fullWidth: "true",
  },
  root: {
    marginTop: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
  },
  mainpaper: {
    width: 500,
    margin: 7,
    padding: 15,
    backgroundColor: "#f1f2f6",
  },
  button: {
    width: 120,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  headingstyle: {
    margin: 10,
    padding: 10,
    display: "flex",
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dfe4ea",
    marginBottom: 15,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10",
  },
}));

function DisplayAllAssignTask() {
  const [state, setState] = useState({
    columns: [
      { title: "Assign Task Id", field: "assigntaskid", editable: "never" },
      { title: "Task Id ", field: "taskid", editable: "never" },
      { title: "Employee Id", field: "employeeid", editable: "never" },
      {
        title: "Assign Date",
        field: "assigndate",
        render: (rowData) => <div>{displayDate(rowData.assigndate)}</div>,
      },
      {
        title: "Assign Time",
        field: "assigntime",
        render: (rowData) => <div>{displayTime(rowData.assigntime)}</div>,
      },
      { title: "Task Status", field: "taskstatus", editable: "never" },
    ],
  });

  const [getList, setList] = useState([]);
  const [getTaskList, setTaskList] = useState([]);
  const [getOpen, setOpen] = useState(false);
  const [getAssignTaskId, setAssignTaskId] = useState("");
  const [getTaskId, setTaskId] = useState("");
  const [getEmployeeId, setEmployeeId] = useState("");
  const [getMsg, setMsg] = useState("");
  const [selectedAssignDate, setSelectedAssignDate] = React.useState(
    new Date()
  );
  const [selectedAssignTime, setSelectedAssignTime] = React.useState(
    new Date()
  );
  const [getTaskStatus, setTaskStatus] = React.useState("");
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

  const fetchData = async (V_id) => {
    let body = {
      vendorid: V_id,
    };
    let list = await postData("assigntask/displayById", body);
    setList(list.data);
  };

  useEffect(function () {
    var vendor = JSON.parse(localStorage.getItem("vendor"));
    fetchData(vendor.vendorid);
    fetchAllTask(vendor.vendorid);
    fetchEmployees(vendor.vendorid);
    // fetchAllTask();
    // fetchEmployees();
  }, []);

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

  const handleDelete = async (oldData) => {
    let body = { assigntaskid: oldData.assigntaskid };
    await postData("assigntask/deleteRecord", body);
  };

  const handleClickOpen = async (rowData) => {
    setOpen(true);
    fetchTaskInEditform(rowData.assigntaskid);
    setAssignTaskId(rowData.assigntaskid);
    setTaskId(rowData.taskid);
    setEmployeeId(rowData.employeeid);
    setTaskStatus(rowData.taskstatus);
    setSelectedAssignTime(rowData.assigntime);
    setSelectedAssignDate(rowData.assigndate);
  };

  const displayDate = (date) => {
    let d = new Date(date);
    let cd = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    return cd;
  };

  const displayTime = (time) => {
    let tm = new Date(time);
    var h = tm.getHours();
    var m = tm.getMinutes();
    var t = h > 12 ? h - 12 + ":" + m + " PM" : h + ":" + m + " AM";
    return t;
  };

  const handleClose = () => {
    setOpen(false);
    fetchData();
    setMsg("");
    setErrTaskId("");
    setErrEmployeeId("");
    setErrSelectedAssignDate("");
    setErrSelectedAssignTime("");
    setErrTaskStatus("");
  };

  const handleEdit = async () => {
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
        assigntaskid: getAssignTaskId,
        taskid: getTaskId,
        employeeid: getEmployeeId,
        assigndate: selectedAssignDate,
        assigntime: selectedAssignTime,
        taskstatus: getTaskStatus,
      };
      console.log(body);
      var result = await postData("assigntask/editRecord", body);

      if (result) {
        //   setMsg("Record Edited ...");
        swal("Assign Task Successfully", " ", "success", {
          buttons: false,
        });
      } else {
        setMsg("Fail to Edit Record ..");
      }
    } else {
      setMsg("Error in Input");
    }
  };

  const handleAssignDateChange = (date) => {
    setSelectedAssignDate(date);
  };

  const handleAssignTimeChange = (time) => {
    setSelectedAssignTime(time);
  };

  const fetchTaskInEditform = async (assigntaskid) => {
    var body = { assigntaskid: assigntaskid };
    //console.log(brandid)
    var list = await postData("assigntask/displayTaskInEditform", body);
    //console.log('nidhi',list[0].packageid)
    setTaskId(list[0].taskid);
  };

  // const fetchAllTask = async () => {
  //   var list = await getData("task/displayall");
  //   setTaskList(list.data);
  // };
  const fetchAllTask = async (V_id) => {
    // alert(V_id);
    let body = {
      vendorid: V_id,
    };
    var list = await postData("task/displayall", body);
    setList(list.data);
  };

  const handleTaskChange = (event) => {
    setTaskId(event.target.value);
  };

  const fillTaskItem = () => {
    return getTaskList.map((item, key) => {
      return <MenuItem value={item.taskid}>{item.taskname}</MenuItem>;
    });
  };

  const editDialog = () => {
    return (
      <div>
        <Dialog
          open={getOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle id="alert-dialog-title">
            {"Feature Packages Edit"}
          </DialogTitle> */}

          <div>
            <div class="panel-header bg-dark">
              <h3 class="panel-title" style={{ padding: 10 }}>
                <strong>Assign Task </strong> Edit
              </h3>
            </div>
            <div class="panel-body bg-white">
              <div class="row">
                <div class="col-md-12 ">
                  <form
                    role="form"
                    class="form-validation"
                    novalidate="novalidate"
                  >
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <label class="control-label">Assign Task Id</label>
                          <i class="fa fa-check" style={{ marginLeft: 5 }}></i>
                          <div class="append-icon">
                            <input
                              type="text"
                              class="form-control"
                              minlength="3"
                              placeholder="Assign Task Id"
                              required=""
                              aria-required="true"
                              value={getTaskId}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
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

                    <div class="text-center  m-t-20">
                      <button
                        className="btn btn-success btn-transparent"
                        type="submit"
                        // class="btn btn-embossed btn-primary"
                        onClick={(event) => {
                          handleEdit();
                        }}
                      >
                        Save Record
                      </button>
                    </div>
                    {getMsg}
                  </form>
                </div>
              </div>
            </div>

            {/* <Paper className={classes.mainpaper}>
              <Grid container spacing={1}>
                <Grid item xs={12} className={classes.gridStyle}>
                  <img src={"/images/tick.png"} width="10" height="10" />
                  <TextField
                    id="standard-basic"
                    label="Assign Task Id"
                    fullWidth
                    value={getAssignTaskId}
                  />
                </Grid>

                <Grid item xs={6} className={classes.gridStyle}>
                  <img src={getErrTaskId} width="10" height="10" />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Task</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={getTaskId}
                      fullWidth="true"
                      onChange={(event) => handleTaskChange(event)}
                    >
                      {fillTaskItem()}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6} className={classes.gridStyle}>
                  <img src={getErrEmployeeId} width="10" height="10" />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Employee
                    </InputLabel>
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

                <Grid item xs={12} className={classes.gridStyle}>
                  <img src={getErrTaskStatus} width="10" height="10" />
                  <TextField
                    id="standard-basic"
                    label="Task Status"
                    fullWidth
                    variant="standard"
                    value={getTaskStatus}
                    onChange={(event) => {
                      setTaskStatus(event.target.value);
                    }}
                  />
                </Grid>

                <Grid item xs={6} className={classes.container}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={(event) => {
                      handleEdit();
                    }}
                  >
                    Save Record
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <b>Message:&nbsp;&nbsp;{getMsg}</b>
                </Grid>
              </Grid>
            </Paper> */}
          </div>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const classes = useStyles();
  return (
    <div className={classes.rootx}>
      <div className={classes.tablediv}>
        <div class="panel-header bg-dark">
          <h3 class="panel-title" style={{ color: "#FFF", padding: 17 }}>
            <strong>Assign Task List</strong>
          </h3>
        </div>
        <MaterialTable
          style={{ backgroundColor: "#FFF" }}
          title=" "
          columns={state.columns}
          data={getList}
          options={{
            headerStyle: {
              backgroundColor: "azure",
              color: "#309c87",
              fontWeight: "bold",
              fontFamily: "Calibri",
              lineHeight: "none",
            },
            rowStyle: {
              fontWeight: "bold",
              fontFamily: "Calibri",
              lineHeight: "none",
              fontSize: 12,
            },
          }}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit",
              onClick: (event, rowData) => handleClickOpen(rowData),
            },
          ]}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();

                  const data = [...getList];
                  data.splice(data.indexOf(oldData), 1);
                  setList(data);
                  handleDelete(oldData);
                }, 600);
              }),
          }}
        />
      </div>
      {editDialog()}
    </div>
  );
}

export default DisplayAllAssignTask;
