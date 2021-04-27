import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import {
  getData,
  ServerURL,
  postData,
  postDataAndImage,
} from "../FetchNodeServices";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { checkRequire } from "../Checks";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  tableDiv: {
    width: window.innerWidth * 0.8,
  },
  avatortheme: {
    width: 50,
    height: 50,
  },
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperStyle: {
    // width:520,
    padding: 20,
    // margin:20,
    // backgroundColor:'#f1f2f6'
  },
  paperHeading: {
    margin: 10,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dfe4ea",
  },
  subclass: {
    marginTop: 3,
    marginBottom: 4,
    display: "flex",
    flexDirection: "row",
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
    width: 160,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
}));

export default function DisplayAllPackages() {
  const classes = useStyles();
  const [getList, setList] = useState([]);
  const [getOpen, setOpen] = useState(false);
  const [getAttendenceId, setAttendenceId] = useState("");
  const [getVendorId, setVendorId] = useState("");
  const [getEmployeeId, setEmployeeId] = useState("");
  const [getAttendenceDate, setAttendenceDate] = useState(new Date());
  const [getAttendenceTime, setAttendenceTime] = useState(new Date());
  const [getShiftId, setShiftId] = useState("");
  const [getLeaveId, setLeaveId] = useState("");
  const [getStatus, setStatus] = useState("");
  const [getMsg, setMsg] = useState("");
  const [getErrVendorId, setErrVendorId] = useState("");
  const [getErrEmployeeId, setErrEmployeeId] = useState("");
  const [getErrAttendenceDate, setErrAttendenceDate] = useState("");
  const [getErrAttendenceTime, setErrAttendenceTime] = useState("");
  const [getErrShiftId, setErrShiftId] = useState("");
  const [getErrLeaveId, setErrLeaveId] = useState("");
  const [getErrStatus, setErrStatus] = useState("");
  const [getEmployeesList, setEmployeesList] = useState([]);
  const [getShiftList, setShiftList] = useState([]);
  const [getLeaveList, setLeaveList] = useState([]);

  const [state, setState] = useState({
    columns: [
      { title: "Id", field: "attendenceid" },
      { title: "Vendor Id", field: "vendorid" },
      { title: "Employee Id", field: "employeeid" },
      {
        title: "Attendence Date",
        field: "attendencedate",
        render: (rowData) => <div>{displayDate(rowData.attendencedate)}</div>,
      },
      {
        title: "Attendence Time",
        field: "attendencetime",
        render: (rowData) => <div>{displayTime(rowData.attendencetime)}</div>,
      },
      { title: "Shift Id", field: "shiftid" },
      { title: "Leave Id", field: "leaveid" },
      { title: "Status", field: "status" },
    ],
  });

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

  const fetchData = async (v_id) => {
    let body = {
      vendorid: v_id,
    };
    var list = await postData("attendence/displayByVid", body);
    setList(list.data);
  };

  useEffect(function () {
    var vendor = JSON.parse(localStorage.getItem("vendor"));

    fetchData(vendor.vendorid);
    fetchEmployees(vendor.vendorid);
    fetchShifts();
    fetchLeaves();
  }, []);

  const fetchEmployees = async (V_id) => {
    let body = {
      vendorid: V_id,
    };
    var list = await postData("employees/displayall");
    setEmployeesList(list.data);
  };

  const fillEmployees = () => {
    return getEmployeesList.map(function (item, key) {
      return (
        <MenuItem value={item.employeeid}>
          {item.employeename}&nbsp;&nbsp;{item.mobileno}
        </MenuItem>
      );
    });
  };

  const fetchShifts = async () => {
    var list = await getData("shifts/displayall");
    setShiftList(list.data);
  };

  const fillShifts = () => {
    return getShiftList.map(function (item, key) {
      let st = new Date(item.shiftstarttime);
      var hs = st.getHours();
      var ms = st.getMinutes();
      var start = hs > 12 ? hs - 12 + ":" + ms + " PM" : hs + ":" + ms + " AM";
      let et = new Date(item.shiftendtime);
      var he = et.getHours();
      var me = et.getMinutes();
      var end = he > 12 ? he - 12 + ":" + me + " PM" : he + ":" + me + " AM";
      return (
        <MenuItem value={item.shiftid}>
          {start}&nbsp;to&nbsp;{end}
        </MenuItem>
      );
    });
  };

  const fetchLeaves = async () => {
    var list = await getData("leaves/displayall");
    setLeaveList(list.data);
  };

  const fillLeaves = () => {
    return getLeaveList.map(function (item, key) {
      return <MenuItem value={item.leaveid}>{item.leavetype}</MenuItem>;
    });
  };

  const handleDelete = async (oldData) => {
    var body = { attendenceid: oldData.attendenceid };
    var result = await postData("attendence/deleteRecord", body);
  };

  const handleEdit = async () => {
    var err = false;
    if (!checkRequire(getAttendenceDate)) {
      err = true;
      setErrAttendenceDate("/images/cross.png");
    }
    if (checkRequire(getAttendenceDate)) {
      setErrAttendenceDate("/images/tick.png");
    }

    if (!checkRequire(getAttendenceTime)) {
      err = true;
      setErrAttendenceTime("/images/cross.png");
    }
    if (checkRequire(getAttendenceTime)) {
      setErrAttendenceTime("/images/tick.png");
    }

    if (!checkRequire(getEmployeeId)) {
      err = true;
      setErrEmployeeId("/images/cross.png");
    }
    if (checkRequire(getEmployeeId)) {
      setErrEmployeeId("/images/tick.png");
    }

    if (!checkRequire(getShiftId)) {
      err = true;
      setErrShiftId("/images/cross.png");
    }
    if (checkRequire(getShiftId)) {
      setErrShiftId("/images/tick.png");
    }

    if (!checkRequire(getLeaveId)) {
      err = true;
      setErrLeaveId("/images/cross.png");
    }
    if (checkRequire(getLeaveId)) {
      setErrLeaveId("/images/tick.png");
    }

    if (!checkRequire(getStatus)) {
      err = true;
      setErrStatus("/images/cross.png");
    }
    if (checkRequire(getStatus)) {
      setErrStatus("/images/tick.png");
    }

    if (!err) {
      var body = {
        attendenceid: getAttendenceId,
        attendencedate: getAttendenceDate,
        attendencetime: getAttendenceTime,
        vendorid: getVendorId,
        shiftid: getShiftId,
        leaveid: getLeaveId,
        status: getStatus,
        employeeid: getEmployeeId,
      };
      var result = await postData("attendence/updateRecord", body);

      if (result.RESULT) {
        setMsg("Record Edited..");
      } else {
        setMsg("Fail To Edit Record...");
      }
    } else {
      setMsg("Error in Input");
    }
  };

  const handleClickOpen = async (rowData) => {
    setOpen(true);
    setAttendenceId(rowData.attendenceid);
    setAttendenceDate(rowData.attendencedate);
    setAttendenceTime(rowData.attendencetime);
    setVendorId(rowData.vendorid);
    setEmployeeId(rowData.employeeid);
    setLeaveId(rowData.leaveid);
    setShiftId(rowData.shiftid);
    setStatus(rowData.status);
  };

  const handleClose = () => {
    setOpen(false);
    setMsg("");
    setErrAttendenceDate("");
    setErrAttendenceTime("");
    setErrEmployeeId("");
    setErrShiftId("");
    setErrLeaveId("");
    setErrStatus("");
    fetchData();
  };

  const handleDateChange = (date) => {
    setAttendenceDate(date);
  };

  const handleTimeChange = (time) => {
    setAttendenceTime(time);
  };

  const handleDialog = () => {
    return (
      <div>
        <Dialog
          open={getOpen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <div class="panel panel-default no-bd" style={{ width: "100%" }}>
            <div class="panel-header bg-dark">
              <h3 class="panel-title" style={{ padding: 15 }}>
                <strong>Attendence </strong> Edit
              </h3>
            </div>
          </div>
          {/* <DialogTitle id="form-dialog-title">Attendence Edit </DialogTitle> */}
          <DialogContent>
            <DialogContentText>
              <div className={classes.center}>
                <Paper className={classes.paperStyle}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} className={classes.subclass}>
                      <img src={"/images/tick.png"} width="10" height="10" />
                      <TextField
                        fullWidth
                        label="Attendence Id"
                        value={getAttendenceId}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.subclass}>
                      <img src={"/images/tick.png"} width="10" height="10" />
                      <TextField
                        fullWidth
                        label="Vendor "
                        value={getVendorId}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.subclass}>
                      <img src={getErrEmployeeId} width="10" height="10" />
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Employee
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={getEmployeeId}
                          onChange={(event) =>
                            setEmployeeId(event.target.value)
                          }
                        >
                          {fillEmployees()}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} className={classes.subclass}>
                      <img src={getErrShiftId} width="10" height="10" />
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Shifts
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={getShiftId}
                          onChange={(event) => setShiftId(event.target.value)}
                        >
                          {fillShifts()}
                        </Select>
                      </FormControl>{" "}
                    </Grid>
                    <Grid item xs={6} className={classes.subclass}>
                      <img src={getErrLeaveId} width="10" height="10" />
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Leave Type
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={getLeaveId}
                          onChange={(event) => setLeaveId(event.target.value)}
                        >
                          {fillLeaves()}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} className={classes.subclass}>
                      <img src={getErrAttendenceDate} width="10" height="10" />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          fullWidth
                          label="Date"
                          format="MM/dd/yyyy"
                          value={getAttendenceDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>{" "}
                    </Grid>
                    <Grid item xs={6} className={classes.subclass}>
                      <img src={getErrAttendenceTime} width="10" height="10" />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                          fullWidth
                          id="time-picker"
                          label="Time"
                          value={getAttendenceTime}
                          onChange={handleTimeChange}
                          KeyboardButtonProps={{
                            "aria-label": "change time",
                          }}
                        />
                      </MuiPickersUtilsProvider>{" "}
                    </Grid>
                    <Grid item xs={12} className={classes.subclass}>
                      <img src={getErrStatus} width="10" height="10" />
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          {" "}
                          Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={getStatus}
                          onChange={(event) => setStatus(event.target.value)}
                        >
                          <MenuItem value="Present">Present</MenuItem>
                          <MenuItem value="Absent">Absent</MenuItem>
                          <MenuItem value="Leave">Leave</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => handleEdit()}
                      >
                        Save Record
                      </Button>
                    </Grid>
                    <Grid item xs={12} className={classes.subclass}>
                      <div>
                        <b>Message : {getMsg}</b>
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  return (
    <div className={classes.root}>
      <div className={classes.tableDiv}>
        <div class="panel-header bg-dark">
          <h3 class="panel-title" style={{ color: "#FFF", padding: 17 }}>
            <strong>Attendence List</strong>
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
          // actions={[
          //   {
          //     icon: "edit",
          //     tooltip: "Edit",
          //     onClick: (event, rowData) => handleClickOpen(rowData),
          //   },
          // ]}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const data = [...getList];
                  data.splice(data.indexOf(oldData), 1);
                  setList(data);
                  handleDelete(oldData);
                }, 200);
              }),
          }}
        />
        {handleDialog()}
      </div>
    </div>
  );
}
