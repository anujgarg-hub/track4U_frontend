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
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { checkRequire } from "../Checks";
import Checkbox from "@material-ui/core/Checkbox";
import clsx from "clsx";

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
    minWidth: 380,
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

function Shifts(props) {
  const classes = useStyles();

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
  const [getErrDayOff, setErrDayOff] = useState("");
  const [getErrVendorId, setErrVendorId] = useState("");
  const [
    ErrselectedShiftStartTime,
    setErrSelectedShiftStartTime,
  ] = React.useState(new Date());
  const [ErrselectedShiftEndTime, setErrSelectedShiftEndTime] = React.useState(
    new Date()
  );

  const handleVendorId = () => {
    var vendor = JSON.parse(localStorage.getItem("vendor"));
    setVendorId(vendor.vendorid);
  };
  useEffect(function () {
    handleVendorId();
  });
  const handleSubmit = async () => {
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
        vendorid: getVendorId,
        shiftstarttime: selectedShiftStartTime,
        shiftendtime: selectedShiftEndTime,
        dayoff: days,
        shiftname: getShiftName,
      };
      console.log(body);
      var result = await postData("shifts/addnewrecord", body);

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
    setShiftName("");
    setSelectedShiftStartTime(new Date());
    setSelectedShiftEndTime(new Date());
    setMsg("");
    setErrVendorId("");
    setErrDayOff("");
    setErrSelectedShiftStartTime("");
    setErrSelectedShiftEndTime("");
    setCheckedMonday(false);
    setCheckedMondayValue("");
    setCheckedTuesday(false);
    setCheckedTuesdayValue("");
    setCheckedWednesday(false);
    setCheckedWednesdayValue("");
    setCheckedThursday(false);
    setCheckedThursdayValue("");
    setCheckedFriday(false);
    setCheckedFridayValue("");
    setCheckedSaturday(false);
    setCheckedSaturdayValue("");
    setCheckedSunday(false);
    setCheckedSundayValue("");
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

  return (
    <div className={classes.root}>
      <div class="panel panel-default no-bd" style={{ width: "100%" }}>
        <div class="panel-header bg-dark">
          <h3 class="panel-title">
            <strong>Add Shifts</strong>
          </h3>
        </div>
        <div class="panel-body bg-white">
          <div class="row">
            <div class="col-md-12 ">
              <form role="form" class="form-validation" novalidate="novalidate">
                <div class="row">
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

                  <div class="col-sm-6">
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
                      <label class="control-label">Shift Start Time</label>
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
                            // label="Shift Start Time"
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
                            // label="Shift End Time"
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
                            className={clsx(classes.icon, classes.checkedIcon)}
                          />
                        }
                        icon={<span className={classes.icon} />}
                        inputProps={{ "aria-label": "decorative checkbox" }}
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
                            className={clsx(classes.icon, classes.checkedIcon)}
                          />
                        }
                        icon={<span className={classes.icon} />}
                        inputProps={{ "aria-label": "decorative checkbox" }}
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
                            className={clsx(classes.icon, classes.checkedIcon)}
                          />
                        }
                        icon={<span className={classes.icon} />}
                        inputProps={{ "aria-label": "decorative checkbox" }}
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
                            className={clsx(classes.icon, classes.checkedIcon)}
                          />
                        }
                        icon={<span className={classes.icon} />}
                        inputProps={{ "aria-label": "decorative checkbox" }}
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
                            className={clsx(classes.icon, classes.checkedIcon)}
                          />
                        }
                        icon={<span className={classes.icon} />}
                        inputProps={{ "aria-label": "decorative checkbox" }}
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
                            className={clsx(classes.icon, classes.checkedIcon)}
                          />
                        }
                        icon={<span className={classes.icon} />}
                        inputProps={{ "aria-label": "decorative checkbox" }}
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
                            className={clsx(classes.icon, classes.checkedIcon)}
                          />
                        }
                        icon={<span className={classes.icon} />}
                        inputProps={{ "aria-label": "decorative checkbox" }}
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
       <b>&nbsp;&nbsp;&nbsp;&nbsp;Add Shifts </b>     
       </Typography>
    </Paper>

    <Grid container spacing={2} >
      
        <Grid item xs={12} className={classes.gridStyle}>
        <img src={getErrVendorId} width='10' height='10' />            
        <TextField id="standard-basic" label="Vendor Id"  fullWidth variant="standard" value={getVendorId} />
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
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleSubmit()} >
         Submit
        </Button>
        </Grid>

        <Grid item xs={6} className={classes.container}>
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>ClearData()} >
         Reset
        </Button>
        </Grid>

        <Grid item xs={12} >
       <b>Message:&nbsp;&nbsp;{getMsg}</b>
        </Grid>

  </Grid>
</Paper> */}
    </div>
  );
}

export default Shifts;
