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
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import { checkRequire } from "../Checks";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Checkbox from "@material-ui/core/Checkbox";

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
  root: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    display: "none",
  },
  paperstyle: {
    width: 600,
    margin: 30,
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
    minWidth: 380,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  button: {
    width: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  root2: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
}));

function DisplayAllShifts(props) {
  const [state, setState] = useState({
    columns: [
      { title: "Shift Id", field: "shiftid", editable: "never" },
      { title: "Vendor Id", field: "vendorid", editable: "never" },
      {
        title: "Shift Start Time",
        field: "shiftstarttime",
        render: (rowData) => <div>{displayTime(rowData.shiftstarttime)}</div>,
      },
      {
        title: "Shift End Time",
        field: "shiftendtime",
        render: (rowData) => <div>{displayTime(rowData.shiftendtime)}</div>,
      },
      { title: "Day Off", field: "dayoff", editable: "never" },
      { title: "Shift Name", field: "shiftname", editable: "never" },
    ],
  });

  const [getList, setList] = useState([]);
  const [getOpen, setOpen] = useState(false);
  const [getShiftId, setShiftId] = useState("");
  const [getShiftName, setShiftName] = useState("");
  const [getVendorId, setVendorId] = useState("");
  const [selectedShiftStartTime, setSelectedShiftStartTime] = React.useState(
    new Date()
  );
  const [selectedShiftEndTime, setSelectedShiftEndTime] = React.useState(
    new Date()
  );
  const [getMsg, setMsg] = useState("");
  const [getErrVendorId, setErrVendorId] = useState("");
  const [getErrDayOff, setErrDayOff] = useState("");
  const [
    ErrselectedShiftStartTime,
    setErrSelectedShiftStartTime,
  ] = React.useState(new Date());
  const [ErrselectedShiftEndTime, setErrSelectedShiftEndTime] = React.useState(
    new Date()
  );

  const fetchData = async () => {
    let list = await getData("shifts/displayall");
    setList(list.data);
  };

  useEffect(function () {
    fetchData();
  }, []);

  const handleDelete = async (oldData) => {
    let body = { shiftid: oldData.shiftid };
    await postData("shifts/deleteRecord", body);
  };

  const handleClickOpen = async (rowData) => {
    setOpen(true);
    splitString(rowData.dayoff);

    setShiftId(rowData.shiftid);
    setShiftName(rowData.shiftname);
    setVendorId(rowData.vendorid);
    setSelectedShiftStartTime(rowData.shiftstarttime);
    setSelectedShiftEndTime(rowData.shiftendtime);
  };

  const splitString = (dayoff) => {
    var res = dayoff.split(", ");
    var length = res.length;
    // console.log(length)
    var i;
    for (i = 0; i < length - 1; i++) {
      if (res[i] == "Monday") {
        setCheckedMonday(true);
        setCheckedMondayValue("Monday");
      } else if (res[i] == "Tuesday") {
        setCheckedTuesday(true);
        setCheckedTuesdayValue("Tuesday");
      } else if (res[i] == "Wednesday") {
        setCheckedWednesday(true);
        setCheckedWednesdayValue("Wednesday");
      } else if (res[i] == "Thursday") {
        setCheckedThursday(true);
        setCheckedThursdayValue("Thursday");
      } else if (res[i] == "Friday") {
        setCheckedFriday(true);
        setCheckedFridayValue("Friday");
      } else if (res[i] == "Saturday") {
        setCheckedSaturday(true);
        setCheckedSaturdayValue("Saturday");
      } else if (res[i] == "Sunday") {
        setCheckedSunday(true);
        setCheckedSundayValue("Sunday");
      }
    }
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
    setCheckedMonday(false);
    setCheckedTuesday(false);
    setCheckedWednesday(false);
    setCheckedThursday(false);
    setCheckedFriday(false);
    setCheckedSaturday(false);
    setCheckedSunday(false);
    setErrSelectedShiftEndTime("");
    setErrSelectedShiftStartTime("");
    setErrDayOff("");
    setMsg("");
    fetchData();
  };

  const handleShiftStartTimeChange = (time) => {
    setSelectedShiftStartTime(time);
  };
  const handleShiftEndTimeChange = (time) => {
    setSelectedShiftEndTime(time);
  };

  const [checkedMonday, setCheckedMonday] = React.useState(false);
  const [checkedTuesday, setCheckedTuesday] = React.useState(false);
  const [checkedWednesday, setCheckedWednesday] = React.useState(false);
  const [checkedThursday, setCheckedThursday] = React.useState(false);
  const [checkedFriday, setCheckedFriday] = React.useState(false);
  const [checkedSaturday, setCheckedSaturday] = React.useState(false);
  const [checkedSunday, setCheckedSunday] = React.useState(false);
  const [checkedMondayValue, setCheckedMondayValue] = React.useState("");
  const [checkedTuesdayValue, setCheckedTuesdayValue] = React.useState("");
  const [checkedWednesdayValue, setCheckedWednesdayValue] = React.useState("");
  const [checkedThursdayValue, setCheckedThursdayValue] = React.useState("");
  const [checkedFridayValue, setCheckedFridayValue] = React.useState("");
  const [checkedSaturdayValue, setCheckedSaturdayValue] = React.useState("");
  const [checkedSundayValue, setCheckedSundayValue] = React.useState("");

  const handleChangeMonday = (event) => {
    setCheckedMonday(event.target.checked);
    if (event.target.checked) {
      setCheckedMondayValue("Monday");
    } else {
      setCheckedMondayValue("");
    }
  };

  const handleChangeTuesday = (event) => {
    setCheckedTuesday(event.target.checked);
    if (event.target.checked) {
      setCheckedTuesdayValue("Tuesday");
    } else {
      setCheckedTuesdayValue("");
    }
  };

  const handleChangeWednesday = (event) => {
    setCheckedWednesday(event.target.checked);
    if (event.target.checked) {
      setCheckedWednesdayValue("Wednesday");
    } else {
      setCheckedWednesdayValue("");
    }
  };

  const handleChangeThursday = (event) => {
    setCheckedThursday(event.target.checked);
    if (event.target.checked) {
      setCheckedThursdayValue("Thursday");
    } else {
      setCheckedThursdayValue("");
    }
  };

  const handleChangeFriday = (event) => {
    setCheckedFriday(event.target.checked);
    if (event.target.checked) {
      setCheckedFridayValue("Friday");
    } else {
      setCheckedFridayValue("");
    }
  };

  const handleChangeSaturday = (event) => {
    setCheckedSaturday(event.target.checked);
    if (event.target.checked) {
      setCheckedSaturdayValue("Saturday");
    } else {
      setCheckedSaturdayValue("");
    }
  };

  const handleChangeSunday = (event) => {
    setCheckedSunday(event.target.checked);
    if (event.target.checked) {
      setCheckedSundayValue("Sunday");
    } else {
      setCheckedSundayValue("");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    var err = false;

    if (!checkRequire(getVendorId)) {
      err = true;
      setErrVendorId("/images/cross.png");
    }
    if (checkRequire(getVendorId)) {
      setErrVendorId("/images/tick.png");
    }

    if (!checkRequire(selectedShiftStartTime)) {
      err = true;
      setErrSelectedShiftStartTime("/images/cross.png");
    }
    if (checkRequire(selectedShiftStartTime)) {
      setErrSelectedShiftStartTime("/images/tick.png");
    }

    if (!checkRequire(selectedShiftEndTime)) {
      err = true;
      setErrSelectedShiftEndTime("/images/cross.png");
    }
    if (checkRequire(selectedShiftEndTime)) {
      setErrSelectedShiftEndTime("/images/tick.png");
    }

    if (
      checkedMondayValue == "" &&
      checkedTuesdayValue == "" &&
      checkedWednesdayValue == "" &&
      checkedThursdayValue == "" &&
      checkedFridayValue == "" &&
      checkedSaturdayValue == "" &&
      checkedSundayValue == ""
    ) {
      err = true;
      setErrDayOff("/images/cross.png");
    } else {
      setErrDayOff("/images/tick.png");
    }

    if (!err) {
      var days = "";

      if (checkedMondayValue != "") {
        days += checkedMondayValue + ", ";
      }
      if (checkedTuesdayValue != "") {
        days += checkedTuesdayValue + ", ";
      }
      if (checkedWednesdayValue != "") {
        days += checkedWednesdayValue + ", ";
      }
      if (checkedThursdayValue != "") {
        days += checkedThursdayValue + ", ";
      }
      if (checkedFridayValue != "") {
        days += checkedFridayValue + ", ";
      }
      if (checkedSaturdayValue != "") {
        days += checkedSaturdayValue + ", ";
      }
      if (checkedSundayValue != "") {
        days += checkedSundayValue + ", ";
      }

      let body = {
        shiftid: getShiftId,
        vendorid: getVendorId,
        shiftstarttime: selectedShiftStartTime,
        shiftendtime: selectedShiftEndTime,
        dayoff: days,
        shiftname: getShiftName,
      };
      console.log(body);
      var result = await postData("shifts/editRecord", body);

      if (result) {
        setMsg("Record Edited ...");
      } else {
        setMsg("Fail to Edit Record ..");
      }
    } else {
      setMsg("Error in Input");
    }
  };

  const editDialog = () => {
    return (
      <div>
        <Dialog
          open={getOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xl"
        >
          {/* <DialogTitle id="alert-dialog-title">Edit Shifts</DialogTitle> */}

          <div>
            <div class="panel panel-default no-bd" style={{ width: "100%" }}>
              <div class="panel-header bg-dark">
                <h3 class="panel-title" style={{ padding: 10 }}>
                  <strong>Edit </strong> Shifts
                </h3>
              </div>
              <div class="panel-body bg-white">
                <div class="row">
                  <div class="col-md-12 ">
                    <form
                      role="form"
                      class="form-validation"
                      novalidate="novalidate"
                      onSubmit={handleEdit}
                    >
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label class="control-label">Shift Id</label>
                            <i
                              class="fa fa-check"
                              style={{ marginLeft: 5 }}
                            ></i>
                            <div class="append-icon">
                              <input
                                type="text"
                                class="form-control"
                                minlength="3"
                                placeholder="Shift Id"
                                required=""
                                aria-required="true"
                                value={getShiftId}
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label class="control-label">Vendor Id</label>
                            <img src={getErrVendorId} width="10" height="10" />
                            <div class="append-icon">
                              <input
                                type="text"
                                class="form-control"
                                minlength="3"
                                placeholder="Vendor Id"
                                required=""
                                aria-required="true"
                                value={getVendorId}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label class="control-label">Shift Name</label>
                            {/* <img src={getErrVendorId} width="10" height="10" /> */}
                            <div class="append-icon">
                              <input
                                type="text"
                                class="form-control"
                                minlength="3"
                                placeholder="Shift Name"
                                required=""
                                aria-required="true"
                                value={getShiftName}
                                onChange={(event) => {
                                  setShiftName(event.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label class="control-label">
                              Shift Start Time
                            </label>
                            <img
                              src={ErrselectedShiftStartTime}
                              width="10"
                              height="10"
                            />
                            <div class="append-icon">
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                  fullWidth
                                  margin="normal"
                                  id="time-picker"
                                  label="Shift Start Time"
                                  value={selectedShiftStartTime}
                                  onChange={handleShiftStartTimeChange}
                                  KeyboardButtonProps={{
                                    "aria-label": "change time",
                                  }}
                                />
                              </MuiPickersUtilsProvider>
                            </div>
                          </div>
                        </div>

                        <div class="col-sm-6">
                          <div class="form-group">
                            <label class="control-label">Shift End Time</label>
                            <img
                              src={ErrselectedShiftEndTime}
                              width="10"
                              height="10"
                            />
                            <div class="append-icon">
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                  fullWidth
                                  margin="normal"
                                  id="time-picker"
                                  label="Shift End Time"
                                  value={selectedShiftEndTime}
                                  onChange={handleShiftEndTimeChange}
                                  KeyboardButtonProps={{
                                    "aria-label": "change time",
                                  }}
                                />
                              </MuiPickersUtilsProvider>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="">
                        <div class="col-sm-12">
                          <h3>
                            <b>Days Off</b>{" "}
                            <img src={getErrDayOff} width="10" height="10" />
                          </h3>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-2">
                          <div class="form-group">
                            <label class="control-label">Monday</label>

                            {/* <div class="append-icon"> */}
                            <Checkbox
                              checked={checkedMonday}
                              onChange={handleChangeMonday}
                              className={classes.root2}
                              disableRipple
                              color="default"
                              checkedIcon={
                                <span
                                  className={clsx(
                                    classes.icon,
                                    classes.checkedIcon
                                  )}
                                />
                              }
                              icon={<span className={classes.icon} />}
                              inputProps={{
                                "aria-label": "decorative checkbox",
                              }}
                              {...props}
                            />
                            {/* </div> */}
                          </div>
                        </div>

                        <div class="col-sm-2">
                          <div class="form-group">
                            <label class="control-label">Tuesday</label>

                            {/* <div class="append-icon"> */}
                            <Checkbox
                              checked={checkedTuesday}
                              onChange={handleChangeTuesday}
                              className={classes.root2}
                              disableRipple
                              color="default"
                              checkedIcon={
                                <span
                                  className={clsx(
                                    classes.icon,
                                    classes.checkedIcon
                                  )}
                                />
                              }
                              icon={<span className={classes.icon} />}
                              inputProps={{
                                "aria-label": "decorative checkbox",
                              }}
                              {...props}
                            />
                            {/* </div> */}
                          </div>
                        </div>

                        <div class="col-sm-2">
                          <div class="form-group">
                            <label class="control-label">Wednesday</label>
                            {/* <div class="append-icon"> */}
                            <Checkbox
                              checked={checkedWednesday}
                              onChange={handleChangeWednesday}
                              className={classes.root2}
                              disableRipple
                              color="default"
                              checkedIcon={
                                <span
                                  className={clsx(
                                    classes.icon,
                                    classes.checkedIcon
                                  )}
                                />
                              }
                              icon={<span className={classes.icon} />}
                              inputProps={{
                                "aria-label": "decorative checkbox",
                              }}
                              {...props}
                            />
                            {/* </div> */}
                          </div>
                        </div>
                        <div class="col-sm-2">
                          <div class="form-group">
                            <label class="control-label">Thursday</label>
                            {/* <div class="append-icon"> */}
                            <Checkbox
                              checked={checkedThursday}
                              onChange={handleChangeThursday}
                              className={classes.root2}
                              disableRipple
                              color="default"
                              checkedIcon={
                                <span
                                  className={clsx(
                                    classes.icon,
                                    classes.checkedIcon
                                  )}
                                />
                              }
                              icon={<span className={classes.icon} />}
                              inputProps={{
                                "aria-label": "decorative checkbox",
                              }}
                              {...props}
                            />
                            {/* </div> */}
                          </div>
                        </div>

                        <div class="col-sm-2">
                          <div class="form-group">
                            <label class="control-label">Friday</label>
                            {/* <div class="append-icon"> */}
                            <Checkbox
                              checked={checkedFriday}
                              onChange={handleChangeFriday}
                              className={classes.root2}
                              disableRipple
                              color="default"
                              checkedIcon={
                                <span
                                  className={clsx(
                                    classes.icon,
                                    classes.checkedIcon
                                  )}
                                />
                              }
                              icon={<span className={classes.icon} />}
                              inputProps={{
                                "aria-label": "decorative checkbox",
                              }}
                              {...props}
                            />
                            {/* </div> */}
                          </div>
                        </div>
                        <div class="col-sm-2">
                          <div class="form-group">
                            <label class="control-label">Saturday</label>
                            {/* <div class="append-icon"> */}
                            <Checkbox
                              checked={checkedSaturday}
                              onChange={handleChangeSaturday}
                              className={classes.root2}
                              disableRipple
                              color="default"
                              checkedIcon={
                                <span
                                  className={clsx(
                                    classes.icon,
                                    classes.checkedIcon
                                  )}
                                />
                              }
                              icon={<span className={classes.icon} />}
                              inputProps={{
                                "aria-label": "decorative checkbox",
                              }}
                              {...props}
                            />
                            {/* </div> */}
                          </div>
                        </div>
                        <div class="col-sm-2">
                          <div class="form-group">
                            <label class="control-label">Sunday</label>
                            {/* <div class="append-icon"> */}
                            <Checkbox
                              checked={checkedSunday}
                              onChange={handleChangeSunday}
                              className={classes.root2}
                              disableRipple
                              color="default"
                              checkedIcon={
                                <span
                                  className={clsx(
                                    classes.icon,
                                    classes.checkedIcon
                                  )}
                                />
                              }
                              icon={<span className={classes.icon} />}
                              inputProps={{
                                "aria-label": "decorative checkbox",
                              }}
                              {...props}
                            />
                            {/* </div> */}
                          </div>
                        </div>
                      </div>

                      <div class="text-center  m-t-20">
                        <button
                          className="btn btn-success btn-transparent"
                          type="submit"
                          // class="btn btn-embossed btn-primary"
                          // onClick={()=>handleEdit()}
                        >
                          Save Record
                        </button>
                      </div>
                      {getMsg}
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* <Paper className={classes.paperstyle}>    

    <Grid container spacing={1} >

       <Grid item xs={12} className={classes.gridStyle} > 
       <img src={'/images/tick.png'} width='10' height='10' />
       <TextField fullWidth label='Shift Id' value={getShiftId} variant='standard' />
        </Grid>

        <Grid item xs={12} className={classes.gridStyle}>
        <img src={'/images/tick.png'} width='10' height='10' />            
        <TextField id="standard-basic" label="Vendor Id"  fullWidth variant="standard" value={getVendorId}  />
        </Grid> 

        <Grid item xs={6} className={classes.gridStyle}>
        <img src={ErrselectedShiftStartTime} width='10' height='10' />            
        <MuiPickersUtilsProvider utils={DateFnsUtils}>    
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Shift Start Time"
          value={selectedShiftStartTime}
          onChange={handleShiftStartTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </MuiPickersUtilsProvider> 
        </Grid> 

        <Grid item xs={6} className={classes.gridStyle}>
        <img src={ErrselectedShiftEndTime} width='10' height='10' />            
        <MuiPickersUtilsProvider utils={DateFnsUtils}>    
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Shift End Time"
          value={selectedShiftEndTime}
          onChange={handleShiftEndTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </MuiPickersUtilsProvider> 
        </Grid> 

       <Grid item xs={12}>
        <h3 style={{paddingLeft:'8px'}}>
        <img src={getErrDayOff} width='10' height='10' />&nbsp;                
        Days Off</h3>
       </Grid>

      <Grid item xs={4} style={{marginLeft:10}}>
      Monday
       <div>
       <Checkbox
       checked={checkedMonday}
       onChange={handleChangeMonday}
       color="primary"
       inputProps={{ 'aria-label': 'secondary checkbox' }}
       />
      </div>
      </Grid> 


      <Grid item xs={4} style={{marginLeft:110}}>
      Tuesday
       <div>
       <Checkbox
       checked={checkedTuesday}
       onChange={handleChangeTuesday}
       color="primary"
       inputProps={{ 'aria-label': 'secondary checkbox' }}
       />
      </div>
      </Grid> 

      <Grid item xs={4} style={{marginLeft:10}}>
       Wednesday
       <div>
       <Checkbox
       checked={checkedWednesday}
       onChange={handleChangeWednesday}
       color="primary"
       inputProps={{ 'aria-label': 'secondary checkbox' }}
       />
      </div>
      </Grid> 

      <Grid item xs={4} style={{marginLeft:110}}>
       Thursday
       <div>
       <Checkbox
       checked={checkedThursday}
       onChange={handleChangeThursday}
       color="primary"
       inputProps={{ 'aria-label': 'secondary checkbox' }}
       />
      </div>
      </Grid> 

      <Grid item xs={4} style={{marginLeft:10}}>
       Friday
       <div>
       <Checkbox
       checked={checkedFriday}
       onChange={handleChangeFriday}
       color="primary"
       inputProps={{ 'aria-label': 'secondary checkbox' }}
       />
      </div>
      </Grid> 

      <Grid item xs={4} style={{marginLeft:110}}>
       Saturday
       <div>
       <Checkbox
       checked={checkedSaturday}
       onChange={handleChangeSaturday}
       color="primary"
       inputProps={{ 'aria-label': 'secondary checkbox' }}
       />
      </div>
      </Grid> 

      <Grid item xs={4} style={{marginLeft:10}}>
       Sunday
       <div>
       <Checkbox
       checked={checkedSunday}
       onChange={handleChangeSunday}
       color="primary"
       inputProps={{ 'aria-label': 'secondary checkbox' }}
       />
      </div>
      </Grid> 

      <Grid item xs={6} className={classes.container}>
       
      </Grid> 
        
        <Grid item xs={6} className={classes.container}>
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleEdit()} >
         Save Record
        </Button>
        </Grid>


        <Grid item xs={12} >
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
            <strong>Shifts List</strong>
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

export default DisplayAllShifts;
