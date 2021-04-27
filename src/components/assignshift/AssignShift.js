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
  Icon: {
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

function AssignShift() {
  const classes = useStyles();

  const [getList, setList] = useState([]);
  const [getVendorId, setVendorId] = useState("");
  const [getEmployeeId, setEmployeeId] = useState("");
  const [getShiftId, setShiftId] = useState("");
  const [selectedAssignDate, setSelectedAssignDate] = React.useState(
    new Date()
  );
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
  const [getNoOfDays, setNoOfDays] = useState("");
  const [getStatus, setStatus] = useState("");
  const [getMsg, setMsg] = useState("");
  const [getErrVendorId, setErrVendorId] = useState("");
  const [getErrEmployeeId, setErrEmployeeId] = useState("");
  const [getErrShiftId, setErrShiftId] = useState("");
  const [ErrselectedAssignDate, setErrSelectedAssignDate] = React.useState(
    new Date()
  );
  const [ErrselectedEndDate, setErrSelectedEndDate] = React.useState(
    new Date()
  );
  const [getErrNoOfDays, setErrNoOfDays] = useState("");
  const [getErrStatus, setErrStatus] = useState("");
  const [getEmployeesList, setEmployeesList] = useState([]);

  const handleVendorId = () => {
    var vendor = JSON.parse(localStorage.getItem("vendor"));
    setVendorId(vendor.vendorid);
  };

  useEffect(function () {
    handleVendorId();
  });

  const handleSubmit = async () => {
    var err = false;

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

    if (!checkRequire(selectedAssignDate)) {
      err = true;
      setErrSelectedAssignDate("/images/cross.png");
    }
    if (checkRequire(selectedAssignDate)) {
      setErrSelectedAssignDate("/images/tick.png");
    }

    if (!checkRequire(selectedEndDate)) {
      err = true;
      setErrSelectedEndDate("/images/cross.png");
    }
    if (checkRequire(selectedEndDate)) {
      setErrSelectedEndDate("/images/tick.png");
    }

    if (!checkRequire(getNoOfDays)) {
      err = true;
      setErrNoOfDays("/images/cross.png");
    }
    if (checkRequire(getNoOfDays)) {
      setErrNoOfDays("/images/tick.png");
    }

    if (!checkRequire(getStatus)) {
      err = true;
      setErrStatus("/images/cross.png");
    }
    if (checkRequire(getStatus)) {
      setErrStatus("/images/tick.png");
    }

    if (!err) {
      let body = {
        vendorid: getVendorId,
        employeeid: getEmployeeId,
        shiftid: getShiftId,
        assigndate: selectedAssignDate,
        enddate: selectedEndDate,
        noofdays: getNoOfDays,
        status: getStatus,
      };
      console.log(body);
      var result = await postData("assignshift/addnewrecord", body);

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
    setVendorId("");
    setEmployeeId("");
    setShiftId("");
    setSelectedEndDate(new Date());
    setSelectedAssignDate(new Date());
    setNoOfDays("");
    setStatus("");
    setErrVendorId("");
    setErrEmployeeId("");
    setErrShiftId("");
    setErrSelectedAssignDate(new Date());
    setErrSelectedEndDate(new Date());
    setErrNoOfDays("");
    setErrStatus("");
    setMsg("");
  };

  const handleAssignDateChange = (date) => {
    setSelectedAssignDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const fetchAllShift = async () => {
    var list = await getData("shifts/displayall");
    setList(list.data);
  };

  useEffect(function () {
    fetchAllShift();
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    var list = await getData("employees/displayall");
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

  const handleShiftChange = (event) => {
    setShiftId(event.target.value);
  };

  const fillShiftItem = () => {
    return getList.map(function (item, key) {
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

  return (
    <div className={classes.root}>
      <div class="panel panel-default no-bd" style={{ width: "100%" }}>
        <div class="panel-header bg-dark">
          <h3 class="panel-title">
            <strong>Add Assign Shift</strong>
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
                        <i class="fa fa-edit "></i>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">No of Days</label>
                      <img src={getErrNoOfDays} width="10" height="10" />
                      <div class="append-icon">
                        <input
                          type="text"
                          class="form-control"
                          minlength="3"
                          placeholder="No of Days"
                          required=""
                          aria-required="true"
                          value={getNoOfDays}
                          onChange={(event) => setNoOfDays(event.target.value)}
                        />
                        <i class="fa fa-edit "></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
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

                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Shifts</label>
                      <img src={getErrShiftId} width="10" height="10" />
                      <div class="append-icon">
                        <Select
                          fullWidth
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={getShiftId}
                          fullWidth="true"
                          onChange={(event) => handleShiftChange(event)}
                        >
                          {fillShiftItem()}
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Assign Date</label>
                      <img src={ErrselectedAssignDate} width="10" height="10" />
                      <div class="append-icon">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            // label="Assign Date"
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
                      <label class="control-label">End Date</label>
                      <img src={ErrselectedEndDate} width="10" height="10" />
                      <div class="append-icon">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            // label="End Date"
                            format="MM/dd/yyyy"
                            fullWidth="true"
                            value={selectedEndDate}
                            onChange={handleEndDateChange}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-12">
                    <div class="form-group">
                      <label class="control-label">Status</label>
                      <img src={getErrStatus} width="10" height="10" />
                      <div class="append-icon">
                        <Select
                          fullWidth
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={getStatus}
                          onChange={(event) => {
                            setStatus(event.target.value);
                          }}
                          label="Status"
                        >
                          <MenuItem value={"Yes"}>Yes</MenuItem>
                          <MenuItem value={"No"}>No</MenuItem>
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
       <b>&nbsp;&nbsp;&nbsp;&nbsp;Add Assign Shift </b>     
       </Typography>
    </Paper>

    <Grid container spacing={2} >

       <Grid item xs={6} className={classes.gridStyle}>
        <img src={getErrVendorId} width='10' height='10' />              
        <TextField id="standard-basic" label="Vendor Id" variant="standard" fullWidth value={getVendorId}  /> 
        </Grid>

        <Grid item xs={6} className={classes.gridStyle}>
        <img src={getErrEmployeeId} width='10' height='10' />              
        <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Employee</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getEmployeeId}
          onChange={(event)=>setEmployeeId(event.target.value)}
        >  
         {fillEmployees()}
        </Select>
      </FormControl></Grid>

    <Grid item xs={6} className={classes.gridStyle}> 
        <img src={getErrShiftId} width='10' height='10' />
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" >Shifts</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getShiftId}
          fullWidth='true'
          onChange={(event)=>handleShiftChange(event)}
        >
          {fillShiftItem()}
        </Select>
      </FormControl>          
        </Grid>
        <Grid item xs={6} className={classes.gridStyle}>
        <img src={getErrNoOfDays} width='10' height='10' />            
        <TextField id="standard-basic" label="No of Days"  fullWidth variant="standard" value={getNoOfDays} onChange={(event)=>setNoOfDays(event.target.value)} /> 
        </Grid>         

        <Grid item xs={6} className={classes.gridStyle}>
        <img src={ErrselectedAssignDate} width='10' height='10' />                
        <MuiPickersUtilsProvider utils={DateFnsUtils}>    
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Assign Date"
          format="MM/dd/yyyy"
          fullWidth='true'
          value={selectedAssignDate}
          onChange={handleAssignDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider> 
        </Grid> 
 
        <Grid item xs={6} className={classes.gridStyle}>
        <img src={ErrselectedEndDate} width='10' height='10' />                
        <MuiPickersUtilsProvider utils={DateFnsUtils}>    
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="End Date"
          format="MM/dd/yyyy"
          fullWidth='true'
          value={selectedEndDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider> 
        </Grid> 
 

       
        <Grid item xs={12} className={classes.gridStyle}>
        <img src={getErrStatus} width='10' height='10' />            
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={getStatus}
          onChange={(event)=>{setStatus(event.target.value)}}
          label="Status"
          >
          <MenuItem value={"Yes"}>Yes</MenuItem>
          <MenuItem value={"No"}>No</MenuItem>
          </Select>
          </FormControl>  
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

export default AssignShift;
