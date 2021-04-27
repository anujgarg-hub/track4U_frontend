import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Avatar from "@material-ui/core/Avatar";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import swal from "sweetalert";
import { postDataAndImage, getData, postData } from "../FetchNodeServices";
import {
  checkRequire,
  checkEmail,
  checkMobile,
  checkPassword,
} from "../Checks";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { statecity } from "../statecity/StateCity";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  tableDiv: {
    width: window.innerWidth * 0.95,
  },
  avatortheme: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paperStyle: {
    width: window.innerWidth * 0.45,
    padding: 20,
    margin: 20,
    backgroundColor: "#f1f2f6",
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
  avatortheme: {
    width: 40,
    height: 40,
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
    width: 220,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
}));

function EmployeeInterface() {
  const classes = useStyles();
  const [getVendorId, setVendorId] = useState("");
  const [getEmployeeName, setEmployeeName] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getMobile, setMobile] = useState("");
  const [getAddress, setAddress] = useState("");
  const [getState, setState] = useState("");
  const [getCity, setCity] = useState("");
  const [getDesignation, setDesignation] = useState("");
  const [getStatus, setStatus] = useState("");
  const [getPhoto, setPhoto] = useState({ photo: "", file: "" });
  const [getJoinDate, setJoinDate] = useState(new Date());
  const [getDOB, setDOB] = useState(new Date());
  const [getMsg, setMsg] = useState("");
  const [getErrEmployeeName, setErrEmployeeName] = useState("");
  const [getErrEmail, setErrEmail] = useState("");
  const [getErrJoinDate, setErrJoinDate] = useState("");
  const [getErrDOB, setErrDOB] = useState("");
  const [getErrMob, setErrMob] = useState("");
  const [getErrDes, setErrDes] = useState("");
  const [getErrAddress, setErrAddress] = useState("");
  const [getErrState, setErrState] = useState("");
  const [getErrCity, setErrCity] = useState("");
  const [getErrStatus, setErrStatus] = useState("");
  const [getErrPhoto, setErrPhoto] = useState("");
  const [getStateList, setStateList] = useState([]);
  const [getCityList, setCityList] = useState([]);
  const [getTotalEmp, setTotalEmp] = useState("");
  const [getPassword, setPassword] = useState("123456");

  const handleVendorId = () => {
    var vendor = JSON.parse(localStorage.getItem("vendor"));
    setVendorId(vendor.vendorid);
  };
  const fetchStates = async () => {
    var list = [];
    statecity.map(function (item, key) {
      list[key] = item.state;
    });
    setStateList(list);
  };

  useEffect(function () {
    fetchStates();
    handleVendorId();
    var vendor = JSON.parse(localStorage.getItem("vendor"));
    fetchLicenceRecord(vendor.vendorid);
  }, []);

  const fetchLicenceRecord = async (V_id) => {
    let body = {
      vendorid: V_id,
    };
    let result = await postData("packagecustomer/displayPackage", body);
    if (result.status) {
      // setPackageId(result.result[0].packageid);
      fetchTotalLicence(result.result[0].packageid);
    }
  };

  const fetchTotalLicence = async (pack_id) => {
    let body = {
      packageid: pack_id,
    };
    let result = await postData("packages/displayPackageTotal", body);
    if (result.status) {
      // alert(result.result[0].noofusers);
      setTotalEmp(result.result[0].noofusers);
    }
  };

  const fillStates = () => {
    return getStateList.map(function (item, key) {
      return <MenuItem value={item}>{item}</MenuItem>;
    });
  };

  const handleState = (event) => {
    var state = event.target.value;
    setState(state);
    fetchCity(state);
  };

  const fetchCity = async (selectstate) => {
    var list = [];
    statecity.map(function (item, key) {
      if (item.state == selectstate) {
        item.districts.map(function (data, key) {
          list[key] = data;
        });
      }
    });
    setCityList(list);
  };

  const fillCities = () => {
    return getCityList.map(function (item, key) {
      return <MenuItem value={item}>{item}</MenuItem>;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var err = false;
    if (!checkRequire(getEmployeeName)) {
      err = true;
      setErrEmployeeName("/images/cross.png");
    }
    if (checkRequire(getEmployeeName)) {
      setErrEmployeeName("/images/tick.png");
    }

    if (!checkRequire(getDesignation)) {
      err = true;
      setErrDes("/images/cross.png");
    }
    if (checkRequire(getDesignation)) {
      setErrDes("/images/tick.png");
    }

    if (!checkMobile(getMobile)) {
      err = true;
      setErrMob("/images/cross.png");
    }
    if (checkMobile(getMobile)) {
      setErrMob("/images/tick.png");
    }

    if (!checkRequire(getAddress)) {
      err = true;
      setErrAddress("/images/cross.png");
    }
    if (checkRequire(getAddress)) {
      setErrAddress("/images/tick.png");
    }

    if (!checkRequire(getState)) {
      err = true;
      setErrState("/images/cross.png");
    }
    if (checkRequire(getState)) {
      setErrState("/images/tick.png");
    }

    if (!checkRequire(getStatus)) {
      err = true;
      setErrStatus("/images/cross.png");
    }
    if (checkRequire(getStatus)) {
      setErrStatus("/images/tick.png");
    }

    if (!checkRequire(getCity)) {
      err = true;
      setErrCity("/images/cross.png");
    }
    if (checkRequire(getCity)) {
      setErrCity("/images/tick.png");
    }

    if (!checkRequire(getJoinDate)) {
      err = true;
      setErrJoinDate("/images/cross.png");
    }
    if (checkRequire(getJoinDate)) {
      setErrJoinDate("/images/tick.png");
    }

    if (!checkRequire(getDOB)) {
      err = true;
      setErrDOB("/images/cross.png");
    }
    if (checkRequire(getDOB)) {
      setErrDOB("/images/tick.png");
    }

    if (!checkEmail(getEmail)) {
      err = true;
      setErrEmail("/images/cross.png");
    }
    if (checkEmail(getEmail)) {
      setErrEmail("/images/tick.png");
    }

    if (!checkRequire(getPhoto.photo)) {
      err = true;
      setErrPhoto("/images/cross.png");
    }
    if (checkRequire(getPhoto.photo)) {
      setErrPhoto("/images/tick.png");
    }

    if (!err) {
      var body = {
        vendorid: getVendorId,
      };
      var rslt = await postData("employees/countemployee", body);
      // console.log(rslt.status);
      if (rslt.status) {
        // console.log("num", rslt.data[0].num);
        // console.log("empValue", `${getTotalEmp}`);
        // console.log(rslt.data[0].num < `${getTotalEmp}`);
        if (rslt.data[0].num < `${getTotalEmp}`) {
          var formData = new FormData();
          formData.append("employeename", getEmployeeName);
          formData.append("vendorid", getVendorId);
          formData.append("mobileno", getMobile);
          formData.append("address", getAddress);
          formData.append("state", getState);
          formData.append("city", getCity);
          formData.append("photo", getPhoto.photo);
          formData.append("email", getEmail);
          formData.append("designation", getDesignation);
          formData.append("joiningdate", getJoinDate);
          formData.append("dateofbirth", getDOB);
          formData.append("status", getStatus);
          formData.append("password", getPassword);
          var config = { headers: { "content-type": "multipart/form-data" } };
          var result = await postDataAndImage(
            "employees/addnewemployee",
            formData,
            config
          );

          if (result.status) {
            swal("Record Submitted", " ", "success", {
              buttons: false,
            });
          } else {
            alert("Record Not Submitted");

            swal(result.message, " ", "Error", {
              buttons: false,
            });
          }
        } else {
          swal("Limit Is Over", "Error", {
            buttons: false,
          });
        }
      }
    } else {
      setMsg("Error in Input");
    }
    setEmployeeName("");
    setMobile("");
    setAddress("");
    setState("");
    setCity("");
    setPhoto({ photo: "", file: "" });
    setEmail("");
    setDesignation("");
    setJoinDate(new Date());
    setStatus("");
    setDOB(new Date());
    setErrEmployeeName("");
    setErrDes("");
    setErrMob("");
    setErrPhoto("");
    setErrJoinDate("");
    setErrDOB("");
    setErrStatus("");
    setErrState("");
    setErrCity("");
    setErrEmail("");
    setErrAddress("");
    setMsg("");
  };

  return (
    <div className={classes.root}>
      <div style={{ width: "100%" }}>
        <div class="panel panel-default no-bd">
          <div class="panel-header bg-dark">
            <h3 class="panel-title" style={{ color: "#FFF" }}>
              <strong>Add New Employee</strong>
            </h3>
          </div>
          <div class="panel-body bg-white">
            <div class="row">
              <div class="col-md-12">
                <form
                  role="form"
                  class="form-validation"
                  novalidate="novalidate"
                  onSubmit={handleSubmit}
                >
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Vendor Id</label>
                        <i class="fa fa-check" style={{ marginLeft: 10 }}></i>
                        <div class="append-icon">
                          <input
                            type="text"
                            class="form-control"
                            minlength="3"
                            required=""
                            aria-required="true"
                            placeholder="Vendor Id"
                            value={getVendorId}
                          />
                          <i class="fa fa-edit"></i>
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Employee Name</label>
                        <img src={getErrEmployeeName} width="10" height="10" />
                        <div class="append-icon">
                          <input
                            type="text"
                            class="form-control"
                            minlength="3"
                            required=""
                            aria-required="true"
                            placeholder="Employee Name"
                            value={getEmployeeName}
                            onChange={(event) =>
                              setEmployeeName(event.target.value)
                            }
                          />
                          <i class="fa fa-edit"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Email Id</label>
                        <img src={getErrEmail} width="10" height="10" />
                        <div class="append-icon">
                          <input
                            type="text"
                            class="form-control"
                            minlength="3"
                            required=""
                            aria-required="true"
                            placeholder="Email Id"
                            value={getEmail}
                            onChange={(event) => setEmail(event.target.value)}
                          />
                          <i class="fa fa-envelope"></i>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Mobile No</label>
                        <img src={getErrMob} width="10" height="10" />
                        <div class="append-icon">
                          <input
                            type="text"
                            class="form-control"
                            minlength="3"
                            required=""
                            aria-required="true"
                            placeholder="Mobile No"
                            value={getMobile}
                            onChange={(event) => setMobile(event.target.value)}
                          />
                          <i class="fa fa-mobile"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Select State</label>
                        <img src={getErrState} width="10" height="10" />
                        <div class="append-icon">
                          <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={getState}
                            placeholder="State"
                            onChange={(event) => handleState(event)}
                          >
                            {" "}
                            <MenuItem value="">Select State</MenuItem>
                            {fillStates()}
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Select City</label>
                        <img src={getErrCity} width="10" height="10" />
                        <div class="append-icon">
                          <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={getCity}
                            placeholder="City"
                            onChange={(event) => setCity(event.target.value)}
                          >
                            <MenuItem value="">Select City</MenuItem>
                            {fillCities()}
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Address</label>
                        <img src={getErrAddress} width="10" height="10" />
                        <div class="append-icon">
                          <input
                            type="text"
                            class="form-control"
                            minlength="3"
                            required=""
                            aria-required="true"
                            placeholder="Address"
                            value={getAddress}
                            onChange={(event) => setAddress(event.target.value)}
                          />
                          <i class="fa fa-mail"></i>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Date of Birth</label>
                        <img src={getErrDOB} width="10" height="10" />
                        <div class="append-icon">
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              fullWidth
                              // label="Date of Birth"
                              format="MM/dd/yyyy"
                              value={getDOB}
                              onChange={(event) => setDOB(event)}
                              className={classes.calender}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                              style={{ color: "#000" }}
                            />
                          </MuiPickersUtilsProvider>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Joining Date</label>
                        <img src={getErrJoinDate} width="10" height="10" />
                        <div class="append-icon">
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              fullWidth
                              // label=" "
                              format="MM/dd/yyyy"
                              value={getJoinDate}
                              onChange={(event) => setJoinDate(event)}
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
                        <label class="control-label">Designation</label>
                        <img src={getErrDes} width="10" height="10" />
                        <div class="append-icon">
                          <input
                            type="text"
                            class="form-control"
                            minlength="3"
                            required=""
                            aria-required="true"
                            placeholder="Designation"
                            value={getDesignation}
                            onChange={(event) =>
                              setDesignation(event.target.value)
                            }
                          />
                          <i class="fa fa-edit"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-6">
                      {/* <img src={getErrIcon} width="10" height="10" /> */}
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="contained-button-file"
                        type="file"
                        onChange={(event) =>
                          setPhoto({
                            photo: event.target.files[0],
                            file: URL.createObjectURL(event.target.files[0]),
                          })
                        }
                      />
                      <label htmlFor="contained-button-file">
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          startIcon={<CloudUploadIcon />}
                          fullWidth
                        >
                          Upload Icon
                        </Button>
                      </label>{" "}
                      <img src={getErrPhoto} width="10" height="10" />
                      <Avatar
                        alt="Remy Sharp"
                        variant="rounded"
                        src={getPhoto.file}
                        className={classes.avatortheme}
                      />
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Status</label>
                        <img src={getErrEmployeeName} width="10" height="10" />
                        <Radio
                          checked={getStatus === "Yes"}
                          onChange={(event) => setStatus(event.target.value)}
                          value="Yes"
                          name="radio-button-demo"
                          color="primary"
                          //inputProps={{ 'aria-label': 'A' }}
                        />
                        Yes
                        <Radio
                          checked={getStatus === "No"}
                          onChange={(event) => setStatus(event.target.value)}
                          value="No"
                          name="radio-button-demo"
                          color="primary"
                          //inputProps={{ 'aria-label': 'B' }}
                        />
                        No
                      </div>
                    </div>
                  </div>

                  <div class="text-center  m-t-20">
                    <button
                      className="btn btn-success btn-transparent"
                      type="submit"
                      // class="btn btn-embossed btn-primary"
                      // onClick={() => handleSubmit()}
                    >
                      Submit Record
                    </button>
                    {/* <button
                      className="btn btn-danger btn-transparent"
                      type="reset"
                      // class="cancel btn btn-embossed btn-default m-b-10 m-r-0"
                      onClick={() => ClearData()}
                    >
                      Reset
                    </button> */}
                  </div>
                </form>
                {getMsg}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Paper className={classes.paperStyle}>
     <Paper  elevation={1} className={classes.paperHeading} >
    <Typography variant="h6" gutterBottom>
    Add New Employee
      </Typography>
     </Paper>
        <Grid container spacing={1}>
         <Grid item xs={6} className={classes.subclass}>
         <img src='/images/tick.png' width='10' height='10' />
         <TextField fullWidth label="Vendor Id" value={getVendorId} variant='standard'  /> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrEmployeeName} width='10' height='10' />
         <TextField fullWidth label='Employee Name' value={getEmployeeName} variant='standard' onChange={(event)=>setEmployeeName(event.target.value)} /> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrEmail} width='10' height='10' />
         <TextField fullWidth label='Email-Id' value={getEmail} variant='standard'  onChange={(event)=>setEmail(event.target.value)}/> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrMob} width='10' height='10' />
         <TextField fullWidth label='Mobile No' value={getMobile} variant='standard' onChange={(event)=>setMobile(event.target.value)} /> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrState} width='10' height='10' />
         <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getState}
          onChange={(event)=>handleState(event)}
        >  <MenuItem value="">Select State</MenuItem>
         {fillStates()}
        </Select>
      </FormControl>
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrCity} width='10' height='10' />
         <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getCity}
          onChange={(event)=>setCity(event.target.value)}
        >
           <MenuItem value="">Select City</MenuItem>
           {fillCities()}
        </Select>
      </FormControl>
         </Grid>
         <Grid item xs={12} className={classes.subclass}>
         <img src={getErrAddress} width='10' height='10' />
         <TextField fullWidth label='Address'value={getAddress}  variant='standard' onChange={(event)=>setAddress(event.target.value)} /> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrDOB} width='10' height='10' />
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
         <KeyboardDatePicker
         fullWidth
          label="Date of Birth"
          format="MM/dd/yyyy"
          value={getDOB}
          onChange={(event)=>setDOB(event)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider> </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrJoinDate} width='10' height='10' />
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
         <KeyboardDatePicker
         fullWidth
          label="Joining Date"
          format="MM/dd/yyyy"
          value={getJoinDate}
          onChange={(event)=>setJoinDate(event)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider> </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrDes} width='10' height='10' />
         <TextField fullWidth label='Designation' value={getDesignation} variant='standard'  onChange={(event)=>setDesignation(event.target.value)}/> 
         </Grid>
         <Grid item xs={6} className={classes.center} >
         <img src={getErrPhoto} width='10' height='10' />
         <Avatar alt="Remy Sharp" variant='rounded' src={getPhoto.file} className={classes.avatortheme}/>
        </Grid>
        <Grid item xs={6} className={classes.subclass}>
         <img src={getErrStatus} width='10' height='10' />
         <div> Status :</div>
       <Radio
        checked={getStatus === 'Yes'}
        onChange={(event)=>setStatus(event.target.value)}
        value="Yes"
        name="radio-button-demo"
        //inputProps={{ 'aria-label': 'A' }}
      />Yes
      <Radio
        checked={getStatus === 'No'}
        onChange={(event)=>setStatus(event.target.value)}
        value="No"
        name="radio-button-demo"
        //inputProps={{ 'aria-label': 'B' }}
      />No
        </Grid>
        <Grid item xs={6} className={classes.center}>
         <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(event)=>setPhoto({photo:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})}
       />
       <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary"   className={classes.button} startIcon={<CloudUploadIcon />} component="span">
          Upload Photo
        </Button>
        </label>
         </Grid>
     
        <Grid item xs={6} className={classes.center}>
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleSubmit()} > 
          Submit Record
         </Button>
        </Grid>
        <Grid item xs={6}className={classes.center} >
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>ClearData()}>
          Reset
         </Button>
        </Grid>
        <Grid item xs={12} className={classes.subclass}>
          <div><b>Message : {getMsg}</b>
          </div>
        </Grid>
        </Grid>
        </Paper> */}
    </div>
  );
}

export default EmployeeInterface;
