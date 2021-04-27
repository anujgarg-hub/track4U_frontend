import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import {
  postDataAndImage,
  getData,
  postData,
  GKey,
} from "../FetchNodeServices";
import Typography from "@material-ui/core/Typography";
import GoogleMapReact from "google-map-react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Geocode from "react-geocode";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { checkRequire } from "../Checks";
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
}));

const AnyReactComponent = () => (
  <div
    style={{
      flexDirection: "column",
      // display: "flex",
      marginTop: 20,
    }}
  >
    <img src="/pin1.gif" width="32" height="32" />
    {/* <div
      style={{
        padding: 2,
        backgroundColor: "#FFF",
        color: "#2980b9",
        border: "solid 3px #2980b9",
        borderRadius: "20%",
        width: "auto",
        alignItem: "center",
        justifyContent: "center",
        display: "flex",
        width: 25,
        fontWeight: "bold",
        fontSize: 6,
      }}
    >
    {text}
    </div> */}
  </div>
);

function Task(props) {
  const classes = useStyles();
  const ldata = {
    latitude: 26.215,
    longitude: 78.2074,
    date: "1/1/1",
    time: "0:0:0",
    battery: "1",
    employee_id: 1,
    vendor_id: 100,
  };
  const [getTaskName, setTaskName] = useState("");
  const [getDescription, setDescription] = useState("");
  const [getStatus, setStatus] = useState("");
  const [getLat, setLat] = useState("");
  const [getLng, setLng] = useState("");
  const [getClientId, setClientId] = useState("");
  const [getMsg, setMsg] = useState("");
  const [selectedDateFrom, setSelectedDateFrom] = React.useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = React.useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = React.useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = React.useState(new Date());
  const [getAssignTaskId, setAssignTaskId] = useState("");
  const [getEmployeeId, setEmployeeId] = useState("");
  const [getEmployeesList, setEmployeesList] = useState([]);
  const [getList, setList] = useState([]);
  const [getErrTaskName, setErrTaskName] = useState("");
  const [getErrDescription, setErrDescription] = useState("");
  const [getErrStatus, setErrStatus] = useState("");
  const [getErrLat, setErrLat] = useState("");
  const [getAddress, setAddress] = useState("");

  const [getErrLng, setErrLng] = useState("");
  const [getErrClientId, setErrClientId] = useState("");
  const [ErrselectedDateFrom, setErrSelectedDateFrom] = React.useState("");
  const [ErrselectedDateTo, setErrSelectedDateTo] = React.useState("");
  const [ErrselectedStartTime, setErrSelectedStartTime] = React.useState("");
  const [ErrselectedEndTime, setErrSelectedEndTime] = React.useState("");
  const [getClientsList, setClientsList] = useState([]);
  const [getVendorId, setVendorId] = useState("");

  useEffect(function () {
    var vendor = JSON.parse(localStorage.getItem("vendor"));
    setVendorId(vendor.vendorid);
    fetchClients(vendor.vendorid);
    fetchAllTask(vendor.vendorid);
    fetchEmployees(vendor.vendorid);
  }, []);

  const fetchClients = async (V_id) => {
    Geocode.setApiKey(GKey);
    let body = {
      vendorid: V_id,
    };
    var list = await postData("client/displayall", body);
    // console.log(list.data);
    setClientsList(list.data);
  };

  const handleAdrress = async (id) => {
    Geocode.setApiKey(GKey);
    var body = {
      clientid: id,
    };
    let result = await postData("client/searchById", body);
    if (result.status) {
      // console.log(result.data)
      // alert(result.data.clientaddress)
      Geocode.fromAddress(
        result.data.clientaddress +
          "," +
          result.data.city +
          "," +
          result.data.state
      ).then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        // alert({ lat, lng })
        setLat(lat);
        setLng(lng);
      });
    }
  };

  const handleCliendId = (e) => {
    setClientId(e.target.value);
    handleAdrress(e.target.value);
  };

  const fillClients = () => {
    return getClientsList.map(function (item, key) {
      return (
        <MenuItem value={item.clientid}>
          {item.clientname}&nbsp;&nbsp;{item.mobileno}
        </MenuItem>
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var err = false;
    if (!checkRequire(getClientId)) {
      err = true;
      setErrClientId("/images/cross.png");
    }
    if (checkRequire(getClientId)) {
      setErrClientId("/images/tick.png");
    }

    if (!checkRequire(getTaskName)) {
      err = true;
      setErrTaskName("/images/cross.png");
    }
    if (checkRequire(getTaskName)) {
      setErrTaskName("/images/tick.png");
    }

    if (!checkRequire(getDescription)) {
      err = true;
      setErrDescription("/images/cross.png");
    }
    if (checkRequire(getDescription)) {
      setErrDescription("/images/tick.png");
    }

    if (!checkRequire(selectedStartTime)) {
      err = true;
      setErrSelectedStartTime("/images/cross.png");
    }
    if (checkRequire(selectedStartTime)) {
      setErrSelectedStartTime("/images/tick.png");
    }

    if (!checkRequire(selectedEndTime)) {
      err = true;
      setErrSelectedEndTime("/images/cross.png");
    }
    if (checkRequire(selectedEndTime)) {
      setErrSelectedEndTime("/images/tick.png");
    }

    if (!checkRequire(selectedDateFrom)) {
      err = true;
      setErrSelectedDateFrom("/images/cross.png");
    }
    if (checkRequire(selectedDateFrom)) {
      setErrSelectedDateFrom("/images/tick.png");
    }

    if (!checkRequire(selectedDateTo)) {
      err = true;
      setErrSelectedDateTo("/images/cross.png");
    }
    if (checkRequire(selectedDateTo)) {
      setErrSelectedDateTo("/images/tick.png");
    }

    // if (!checkRequire(getStatus)) {
    //   err = true;
    //   setErrStatus("/images/cross.png");
    // }
    // if (checkRequire(getStatus)) {
    //   setErrStatus("/images/tick.png");
    // }

    if (!checkRequire(getLat)) {
      err = true;
      setErrLat("/images/cross.png");
    }
    if (checkRequire(getLat)) {
      setErrLat("/images/tick.png");
    }

    if (!checkRequire(getLng)) {
      err = true;
      setErrLng("/images/cross.png");
    }
    if (checkRequire(getLng)) {
      setErrLng("/images/tick.png");
    }

    if (!err) {
      let body = {
        taskname: getTaskName,
        description: getDescription,
        starttime: selectedStartTime,
        endtime: selectedEndTime,
        datefrom: selectedDateFrom,
        dateto: selectedDateTo,
        // status: getStatus,
        status: "Not Completed",
        lat: getLat,
        lng: getLng,
        clientid: getClientId,
        // assigntaskid: getAssignTaskId,
        // employeeid: getEmployeeId,
      };
      // console.log("xxxxxxxxxxxxxxxxxxxx", body);
      var result = await postData("task/addnewrecord", body);
      if (result.status) {
        setMsg("Add Task Sucessfully");
        // alert(result.data.insertId);
        setTTaskId(result.data.insertId);

        // var vendor = JSON.parse(localStorage.getItem("vendor"));
        fetchAllTask(getVendorId);
      } else {
        setMsg("Fail to submit Record ..");
      }
    } else {
      setMsg("Error in Input");
    }
  };

  const [getTTaskId, setTTaskId] = useState("");

  const handleAssigningTask = async (e) => {
    e.preventDefault();

    let body = {
      taskid: getAssignTaskId,
      employeeid: getEmployeeId,
      assigndate: selectedDateFrom,
      assigntime: selectedStartTime,
      taskstatus: "Not Completed",
    };
    let result = await postData("assigntask/addnewrecord", body);
    if (result.status) {
      setMsg("Assign Task Sucessfully");
      let body = {
        taskid: getTTaskId,
        assigntaskid: result.data.insertId,
        employeeid: getEmployeeId,
      };
      console.log("xxxxxxxxxxxxxxxxx", body);
      let rslt = await postData("task/updateTask", body);
      if (rslt) {
        setMsg("Update Task Sucessfully");
      }
    }
  };

  const ClearData = () => {
    setAssignTaskId("");
    setEmployeeId("");
    setTaskName("");
    setDescription("");
    setSelectedStartTime(new Date());
    setSelectedEndTime(new Date());
    setSelectedDateFrom(new Date());
    setSelectedDateTo(new Date());
    setStatus("");
    setLat("");
    setLng("");
    setClientId("");
    setMsg("");
    setErrTaskName("");
    setErrDescription("");
    setErrSelectedStartTime("");
    setErrSelectedEndTime("");
    setErrSelectedDateFrom("");
    setErrSelectedDateTo("");
    setErrStatus("");
    setErrLat("");
    setErrLng("");
    setErrClientId("");
  };

  const handleDateFromChange = (date) => {
    setSelectedDateFrom(date);
  };

  const handleTaskChange = (event) => {
    setAssignTaskId(event.target.value);
  };

  const handleDateToChange = (date) => {
    setSelectedDateTo(date);
  };

  const handleStartTimeChange = (time) => {
    setSelectedStartTime(time);
  };
  const handleEndTimeChange = (time) => {
    setSelectedEndTime(time);
  };

  const fillTaskItem = () => {
    return getList.map((item, key) => {
      return <MenuItem value={item.taskid}>{item.taskname}</MenuItem>;
    });
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
  const handleClickLoc = (event) => {
    setLat(event.lat);
    setLng(event.lng);
  };

  const fetchEmployees = async (V_id) => {
    let body = {
      vendorid: V_id,
    };
    var list = await postData("employees/displayall", body);
    setEmployeesList(list.data);
  };

  const fetchAllTask = async (V_id) => {
    // alert(V_id);
    let body = {
      vendorid: V_id,
    };
    var list = await postData("task/displayall", body);
    setList(list.data);
  };

  return (
    <div className={classes.root}>
      <div class="panel panel-default no-bd" style={{ width: "100%" }}>
        <div class="panel-header bg-dark">
          <h3 class="panel-title">
            <strong>Add Task</strong>
          </h3>
        </div>
        <div class="panel-body bg-white">
          <div class="row">
            <div class="col-md-12 ">
              <form
                role="form"
                class="form-validation"
                novalidate="novalidate"
                onSubmit={handleSubmit}
              >
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label class="control-label">Client</label>
                      <img src={getErrClientId} width="10" height="10" />
                      <div class="append-icon">
                        <Select
                          fullWidth
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={getClientId}
                          onChange={(event) => handleCliendId(event)}
                        >
                          {fillClients()}
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Task Name</label>
                      <img src={getErrTaskName} width="10" height="10" />
                      <div class="append-icon">
                        <input
                          type="text"
                          class="form-control"
                          minlength="3"
                          placeholder="Task Name"
                          required=""
                          aria-required="true"
                          value={getTaskName}
                          onChange={(event) => {
                            setTaskName(event.target.value);
                          }}
                        />
                        <i class="fa fa-clock "></i>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Description</label>
                      <img src={getErrDescription} width="10" height="10" />
                      <div class="append-icon">
                        <input
                          type="text"
                          class="form-control"
                          minlength="4"
                          placeholder="Description"
                          required=""
                          aria-required="true"
                          value={getDescription}
                          onChange={(event) => {
                            setDescription(event.target.value);
                          }}
                        />
                        <i class="fa fa-map"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Start Time</label>
                      <img src={ErrselectedStartTime} width="10" height="10" />
                      <div class="append-icon">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardTimePicker
                            margin="normal"
                            fullWidth
                            id="time-picker"
                            label="Start Time"
                            value={selectedStartTime}
                            onChange={handleStartTimeChange}
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
                      <label class="control-label">End Time</label>
                      <img src={ErrselectedEndTime} width="10" height="10" />
                      <div class="append-icon">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardTimePicker
                            fullWidth
                            margin="normal"
                            id="time-picker"
                            label="End Time"
                            value={selectedEndTime}
                            onChange={handleEndTimeChange}
                            KeyboardButtonProps={{
                              "aria-label": "change time",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Date From</label>
                      <img src={ErrselectedDateFrom} width="10" height="10" />
                      <div class="append-icon">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            fullWidth
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date From"
                            format="MM/dd/yyyy"
                            value={selectedDateFrom}
                            onChange={handleDateFromChange}
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
                      <label class="control-label">Date To</label>
                      <img src={ErrselectedDateTo} width="10" height="10" />
                      <div class="append-icon">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            fullWidth
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date To"
                            format="MM/dd/yyyy"
                            value={selectedDateTo}
                            onChange={handleDateToChange}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Longitude</label>
                      <img src={getErrLng} width="10" height="10" />
                      <div class="append-icon">
                        <input
                          type="text"
                          class="form-control"
                          minlength="3"
                          placeholder="Longitude"
                          required=""
                          aria-required="true"
                          value={getLng}
                          onChange={(event) => {
                            setLng(event.target.value);
                          }}
                        />
                        <i class="fa fa-edit "></i>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Latitude</label>
                      <img src={getErrLat} width="10" height="10" />
                      <div class="append-icon">
                        <input
                          type="text"
                          class="form-control"
                          minlength="4"
                          placeholder="Latitude"
                          required=""
                          aria-required="true"
                          value={getLat}
                          onChange={(event) => {
                            setLat(event.target.value);
                          }}
                        />
                        <i class="fa fa-edit"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    height: window.screen.height * 0.4,
                    width: window.screen.width * 0.7,
                    alignSelf: "center",
                  }}
                >
                  <GoogleMapReact
                    apiKey={GKey}
                    center={[getLat, getLng]}
                    zoom={18}
                    onClick={(event) => handleClickLoc(event)}
                  >
                    <AnyReactComponent
                      lat={getLat}
                      lng={getLng}
                      //text={getEmployeeid.name}
                    />
                  </GoogleMapReact>
                </div>
                <div>
                  <div class="text-center  m-t-20">
                    <button
                      className="btn btn-success btn-transparent"
                      type="submit"
                      // onSubmit={() => handleSubmit()}
                    >
                      Submit
                    </button>
                    <button
                      className="btn btn-danger btn-transparent"
                      type="reset"
                      onClick={(event) => {
                        ClearData();
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label class="control-label">Status</label>
                      <img src={getErrStatus} width="10" height="10" />
                      <div class="append-icon">
                        <input
                          type="text"
                          class="form-control"
                          minlength="3"
                          placeholder="Status"
                          required=""
                          aria-required="true"
                          value={getStatus}
                          onChange={(event) => {
                            setStatus(event.target.value);
                          }}
                        />
                        <i class="fa fa-clock "></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Tasks</label>
                      {/* <img src={getErrTaskId} width="10" height="10" /> */}
                      <div class="append-icon">
                        <Select
                          fullWidth
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={getAssignTaskId}
                          onChange={(event) => handleTaskChange(event)}
                        >
                          {fillTaskItem()}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Employee</label>
                      {/* <img src={getErrEmployeeId} width="10" height="10" /> */}
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
                    // type="submit"
                    onClick={(e) => handleAssigningTask(e)}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-danger btn-transparent"
                    type="reset"
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

    <Grid container spacing={2} >

      
        <Grid item xs={6} className={classes.gridStyle}>
        <img src={getErrClientId} width='10' height='10' />            
        <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Client</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getClientId}
          onChange={(event)=>setClientId(event.target.value)}
        >  
         {fillClients()}
        </Select>
      </FormControl> </Grid> 

        <Grid item xs={6} className={classes.gridStyle}>
        <img src={getErrTaskName} width='10' height='10' />              
        <TextField id="standard-basic" label="Task Name" variant="standard" fullWidth value={getTaskName} onChange={(event)=>{setTaskName(event.target.value)}}  /> 
        </Grid>

        <Grid item xs={12} className={classes.gridStyle}>
        <img src={getErrDescription} width='10' height='10' />          
        <TextField id="standard-basic" label="Description" variant="standard" fullWidth value={getDescription} onChange={(event)=>{setDescription(event.target.value)}} /> 
         </Grid>
      

        <Grid item xs={6} className={classes.gridStyle}>
        <img src={ErrselectedStartTime} width='10' height='10' />            
        <MuiPickersUtilsProvider utils={DateFnsUtils}>    
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Start Time"
          value={selectedStartTime}
          onChange={handleStartTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </MuiPickersUtilsProvider> 
        </Grid> 

        <Grid item xs={6} className={classes.gridStyle}>
        <img src={ErrselectedEndTime} width='10' height='10' />            
        <MuiPickersUtilsProvider utils={DateFnsUtils}>    
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="End Time"
          value={selectedEndTime}
          onChange={handleEndTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </MuiPickersUtilsProvider> 
        </Grid> 

        <Grid item xs={6} className={classes.gridStyle}>
        <img src={ErrselectedDateFrom} width='10' height='10' />                
        <MuiPickersUtilsProvider utils={DateFnsUtils}>    
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date From"
          format="MM/dd/yyyy"
          value={selectedDateFrom}
          onChange={handleDateFromChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider> 
        </Grid> 
 

        <Grid item xs={6} className={classes.gridStyle}>
        <img src={ErrselectedDateTo} width='10' height='10' />            
        <MuiPickersUtilsProvider utils={DateFnsUtils}>    
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date To"
          format="MM/dd/yyyy"
          value={selectedDateTo}
          onChange={handleDateToChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider> 
        </Grid> 

        <Grid item xs={12} className={classes.gridStyle}>
        <img src={getErrStatus} width='10' height='10' />           
        <TextField id="standard-basic" label="Status"  fullWidth variant="standard" value={getStatus} onChange={(event)=>{setStatus(event.target.value)}} /> 
        </Grid> 

        <Grid item xs={6} className={classes.gridStyle}>
        <img src={getErrLat} width='10' height='10' />           
        <TextField id="standard-basic" label="Latitude"  fullWidth variant="standard" value={getLat} onChange={(event)=>{setLat(event.target.value)}} /> 
        </Grid> 

        <Grid item xs={6} className={classes.gridStyle}>
        <img src={getErrLng} width='10' height='10' />            
        <TextField id="standard-basic" label="Longitude"  fullWidth variant="standard" value={getLng} onChange={(event)=>{setLng(event.target.value)}} /> 
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

export default Task;
