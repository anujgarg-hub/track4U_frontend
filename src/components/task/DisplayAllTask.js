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
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
}));

function DisplayAllTask() {
  const [state, setState] = useState({
    columns: [
      { title: "Task Id", field: "taskid", editable: "never" },
      { title: "Task Name", field: "taskname", editable: "never" },
      {
        title: "Start Time",
        field: "starttime",
        render: (rowData) => <div>{displayTime(rowData.starttime)}</div>,
      },
      {
        title: "End Time",
        field: "endtime",
        render: (rowData) => <div>{displayTime(rowData.endtime)}</div>,
      },
      {
        title: "Date From",
        field: "datefrom",
        render: (rowData) => <div>{displayDate(rowData.datefrom)}</div>,
      },
      {
        title: "Date To",
        field: "dateto",
        render: (rowData) => <div>{displayDate(rowData.dateto)}</div>,
      },
      { title: "Status", field: "status", editable: "never" },
      { title: "Client Id", field: "clientid", editable: "never" },
    ],
  });

  const [getList, setList] = useState([]);
  const [getOpen, setOpen] = useState(false);

  const [getTaskId, setTaskId] = useState("");
  const [getTaskName, setTaskName] = useState("");
  const [getDescription, setDescription] = useState("");
  const [getStatus, setStatus] = useState("");
  const [getLat, setLat] = useState("");
  const [getLng, setLng] = useState("");
  const [getClientId, setClientId] = useState("");
  const [getMsg, setMsg] = useState("");
  const [getErrTaskName, setErrTaskName] = useState("");
  const [getErrDescription, setErrDescription] = useState("");
  const [getErrStatus, setErrStatus] = useState("");
  const [getErrLat, setErrLat] = useState("");
  const [getErrLng, setErrLng] = useState("");
  const [getErrClientId, setErrClientId] = useState("");
  const [ErrselectedDateFrom, setErrSelectedDateFrom] = React.useState("");
  const [ErrselectedDateTo, setErrSelectedDateTo] = React.useState("");
  const [ErrselectedStartTime, setErrSelectedStartTime] = React.useState("");
  const [ErrselectedEndTime, setErrSelectedEndTime] = React.useState("");
  const [getClientsList, setClientsList] = useState([]);
  const [getVendorId, setVendorId] = useState("");

  const fetchData = async (V_id) => {
    let body = {
      vendorid: V_id,
    };
    let list = await postData("task/displayall", body);
    setList(list.data);
  };

  useEffect(function () {
    var vendor = JSON.parse(localStorage.getItem("vendor"));
    setVendorId(vendor.vendorid);
    fetchData(vendor.vendorid);
    // fetchData();
    fetchClients();
  }, []);

  const fetchClients = async (V_id) => {
    let body = {
      vendorid: V_id,
    };
    var list = await postData("client/displayall", body);
    setClientsList(list.data);
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

  const handleDelete = async (oldData) => {
    let body = { taskid: oldData.taskid };
    await postData("task/deleteRecord", body);
  };

  const handleClickOpen = async (rowData) => {
    setOpen(true);
    setTaskId(rowData.taskid);
    setTaskName(rowData.taskname);
    setDescription(rowData.description);
    setSelectedStartTime(rowData.starttime);
    setSelectedEndTime(rowData.endtime);
    setSelectedDateFrom(rowData.datefrom);
    setSelectedDateTo(rowData.dateto);
    setStatus(rowData.status);
    setLat(rowData.lat);
    setLng(rowData.lng);
    setClientId(rowData.clientid);
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
    setMsg("");
    fetchData(getVendorId);
  };

  const [selectedDateFrom, setSelectedDateFrom] = React.useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = React.useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = React.useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = React.useState(new Date());

  const handleDateFromChange = (date) => {
    setSelectedDateFrom(date);
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

  const handleEdit = async () => {
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

    if (!checkRequire(getStatus)) {
      err = true;
      setErrStatus("/images/cross.png");
    }
    if (checkRequire(getStatus)) {
      setErrStatus("/images/tick.png");
    }

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
        taskid: getTaskId,
        taskname: getTaskName,
        description: getDescription,
        starttime: selectedStartTime,
        endtime: selectedEndTime,
        datefrom: selectedDateFrom,
        dateto: selectedDateTo,
        status: getStatus,
        lat: getLat,
        lng: getLng,
        clientid: getClientId,
      };
      console.log(body);
      var result = await postData("task/editRecord", body);

      if (result) {
        setMsg("Record Edit ...");
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
          {/* <DialogTitle id="alert-dialog-title">{"Task Edit"}</DialogTitle> */}

          <div>
            <div class="panel panel-default no-bd" style={{ width: "100%" }}>
              <div class="panel-header bg-dark">
                <h3 class="panel-title" style={{ padding: 10 }}>
                  <strong>Edit </strong> Task
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
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label class="control-label">Task Id</label>
                            <i
                              class="fa fa-check"
                              style={{ marginLeft: 5 }}
                            ></i>
                            <div class="append-icon">
                              <input
                                type="text"
                                class="form-control"
                                minlength="3"
                                placeholder="Task Id"
                                required=""
                                aria-required="true"
                                value={getTaskId}
                              />
                              <i class="fa fa-edit "></i>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label class="control-label">Client</label>
                            <img src={getErrClientId} width="10" height="10" />
                            <div class="append-icon">
                              <Select
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={getClientId}
                                onChange={(event) =>
                                  setClientId(event.target.value)
                                }
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
                              <i class="fa fa-edit "></i>
                            </div>
                          </div>
                        </div>

                        <div class="col-sm-6">
                          <div class="form-group">
                            <label class="control-label">Description</label>
                            <img
                              src={getErrDescription}
                              width="10"
                              height="10"
                            />
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
                              <i class="fa fa-edit "></i>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label class="control-label">Start Time</label>
                            <img
                              src={ErrselectedStartTime}
                              width="10"
                              height="10"
                            />
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
                            <img
                              src={ErrselectedEndTime}
                              width="10"
                              height="10"
                            />
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
                            <img
                              src={ErrselectedDateFrom}
                              width="10"
                              height="10"
                            />
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
                            <img
                              src={ErrselectedDateTo}
                              width="10"
                              height="10"
                            />
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

                      <div class="text-center  m-t-20">
                        <button
                          className="btn btn-success btn-transparent"
                          type="submit"
                          // class="btn btn-embossed btn-primary"
                          onClick={() => handleEdit()}
                        >
                          Submit
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
       <TextField fullWidth label='Task Id' value={getTaskId} variant='standard' />
        </Grid>

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
      </FormControl></Grid> 

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
            <strong>Tasks List</strong>
          </h3>
        </div>
        <MaterialTable
          style={{ backgroundColor: "#FFF" }}
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

export default DisplayAllTask;
