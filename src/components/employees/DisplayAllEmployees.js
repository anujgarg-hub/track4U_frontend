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
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Avatar from "@material-ui/core/Avatar";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import { checkRequire, checkMobile, checkEmail } from "../Checks";
import Dialog from "@material-ui/core/Dialog";
import { statecity } from "../statecity/StateCity";
import DateFnsUtils from "@date-io/date-fns";
import DialogActions from "@material-ui/core/DialogActions";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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

export default function DisplayAllOutlets() {
  const classes = useStyles();
  const [getList, setList] = useState([]);
  const [getOpen, setOpen] = useState(false);
  const [getVendorId, setVendorId] = useState("");
  const [getEmployeeId, setEmployeeId] = useState("");
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

  const [state, setstate] = useState({
    columns: [
      { title: "Id", field: "employeeid" },
      { title: "Employee Name", field: "employeename" },
      {
        title: "Joining date",
        render: (rowData) => <div>{displayDate(rowData.joiningdate)}</div>,
      },
      {
        title: "Address",
        render: (rowData) => (
          <div>
            {rowData.address}
            <br />
            {rowData.city},{rowData.state}
          </div>
        ),
      },
      {
        title: "Contact Details",
        render: (rowData) => (
          <div>
            {rowData.mobileno}
            <br />
            {rowData.email}
          </div>
        ),
      },
      { title: "Designation", field: "designation" },
      {
        title: "Photograph",
        field: "photograph",
        render: (rowData) => (
          <div>
            <Avatar
              alt="Remy Sharp"
              variant="rounded"
              src={`${ServerURL}/images/${rowData.photograph}`}
              className={classes.avatortheme}
            />
          </div>
        ),
      },
      { title: "Status", field: "status" },
    ],
  });

  const displayDate = (date) => {
    let d = new Date(date);
    let cd = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    return cd;
  };

  const fetchData = async (V_id) => {
    let body = {
      vendorid: V_id,
    };
    var list = await postData("employees/displayall", body);
    setList(list.data);
  };

  useEffect(function () {
    var vendor = JSON.parse(localStorage.getItem("vendor"));
    fetchData(vendor.vendorid);
    fetchStates();
  }, []);

  const fetchStates = async () => {
    var list = [];
    statecity.map(function (item, key) {
      list[key] = item.state;
    });
    setStateList(list);
  };

  useEffect(function () {
    fetchStates();
  }, []);

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

  const handleDelete = async (oldData) => {
    var body = { employeeid: oldData.employeeid };
    var result = await postData("employees/deleteRecord", body);
  };

  const handleClickOpen = (rowData) => {
    setOpen(true);
    fetchCity(rowData.state);
    setEmployeeId(rowData.employeeid);
    setEmployeeName(rowData.employeename);
    setJoinDate(rowData.joiningdate);
    setMobile(rowData.mobileno);
    setAddress(rowData.address);
    setState(rowData.state);
    setCity(rowData.city);
    setPhoto({ photo: "", file: `${ServerURL}/images/${rowData.photograph}` });
    setEmail(rowData.email);
    setDesignation(rowData.designation);
    setDOB(rowData.dateofbirth);
    setStatus(rowData.status);
    setVendorId(rowData.vendorid);
  };

  const handleClose = () => {
    setOpen(false);
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
    fetchData();
  };

  const handleEdit = async () => {
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
    if (!err) {
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
      formData.append("employeeid", getEmployeeId);

      var config = { headers: { "content-type": "multipart/form-data" } };
      var result = await postDataAndImage(
        "employees/updateRecord",
        formData,
        config
      );
      console.log(result);
      if (result) {
        setMsg("Record Edited..");
      } else {
        setMsg("Fail To Edit Record...");
      }
    } else {
      setMsg("Error in Input");
    }
  };
  const handleDialog = () => {
    return (
      <div style={{ height: "auto" }}>
        <Dialog
          // fullScreen
          open={getOpen}
          onClose={handleClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          style={{ height: "auto" }}
        >
          {/* <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
           <Typography variant="h6" className={classes.title}>
              Employees [Edit Record]
            </Typography> 
          </Toolbar> */}
          <div>
            <div style={{ width: "100%" }}>
              <div class="panel panel-default no-bd">
                <div class="panel-header bg-dark">
                  <h3 class="panel-title" style={{ padding: 10 }}>
                    <strong>Employees Edit Record</strong>
                  </h3>
                </div>
                <div class="panel-body bg-white">
                  <div class="row">
                    <div class="col-md-12">
                      <form
                        role="form"
                        class="form-validation"
                        novalidate="novalidate"
                      >
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label class="control-label">Employee Id</label>
                              <i
                                class="fa fa-check"
                                style={{ marginLeft: 5 }}
                              ></i>
                              <div class="append-icon">
                                <input
                                  type="text"
                                  class="form-control"
                                  minlength="3"
                                  required=""
                                  aria-required="true"
                                  placeholder="Employee Id"
                                  value={getEmployeeId}
                                />
                                <i class="fa fa-edit"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="control-label">Vendor Id</label>
                              <i
                                class="fa fa-check"
                                style={{ marginLeft: 5 }}
                              ></i>
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
                              <img
                                src={getErrEmployeeName}
                                width="10"
                                height="10"
                              />
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
                                  onChange={(event) =>
                                    setEmail(event.target.value)
                                  }
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
                                  onChange={(event) =>
                                    setMobile(event.target.value)
                                  }
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
                                  onChange={(event) =>
                                    setCity(event.target.value)
                                  }
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
                                  onChange={(event) =>
                                    setAddress(event.target.value)
                                  }
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
                                    label="Date of Birth"
                                    format="MM/dd/yyyy"
                                    value={getDOB}
                                    onChange={(event) => setDOB(event)}
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
                              <label class="control-label">Joining Date</label>
                              <img
                                src={getErrJoinDate}
                                width="10"
                                height="10"
                              />
                              <div class="append-icon">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <KeyboardDatePicker
                                    fullWidth
                                    label="Joining Date"
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
                                  file: URL.createObjectURL(
                                    event.target.files[0]
                                  ),
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
                              <img
                                src={getErrEmployeeName}
                                width="10"
                                height="10"
                              />
                              <Radio
                                checked={getStatus === "Yes"}
                                onChange={(event) =>
                                  setStatus(event.target.value)
                                }
                                value="Yes"
                                name="radio-button-demo"
                                color="primary"
                                //inputProps={{ 'aria-label': 'A' }}
                              />
                              Yes
                              <Radio
                                checked={getStatus === "No"}
                                onChange={(event) =>
                                  setStatus(event.target.value)
                                }
                                value="No"
                                name="radio-button-demo"
                                color="primary"
                                //inputProps={{ 'aria-label': 'B' }}
                              />
                              No
                            </div>
                          </div>
                        </div>

                        <div class="text-center">
                          <button
                            className="btn btn-success btn-transparent"
                            type="submit"
                            // class="btn btn-embossed btn-primary"
                            onClick={() => handleEdit()}
                          >
                            Save Record
                          </button>
                          <DialogActions>
                            <button
                              // className="btn btn-danger btn-rounded btn-transparent"
                              onClick={handleClose}
                              color="primary"
                            >
                              <i class="fa fa-close"></i>
                            </button>
                          </DialogActions>
                        </div>
                      </form>
                      {getMsg}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <Paper className={classes.paperStyle}>
              <Grid container spacing={1}>
                <Grid item xs={12} className={classes.subclass}>
                  <img src="/images/tick.png" width="10" height="10" />
                  <TextField
                    fullWidth
                    label="Employee Id"
                    value={getEmployeeId}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={6} className={classes.subclass}>
                  <img src="/images/tick.png" width="10" height="10" />
                  <TextField
                    fullWidth
                    label="Vendor Id"
                    value={getVendorId}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={6} className={classes.subclass}>
                  <img src={getErrEmployeeName} width="10" height="10" />
                  <TextField
                    fullWidth
                    label="Employee Name"
                    value={getEmployeeName}
                    variant="standard"
                    onChange={(event) => setEmployeeName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6} className={classes.subclass}>
                  <img src={getErrEmail} width="10" height="10" />
                  <TextField
                    fullWidth
                    label="Email-Id"
                    value={getEmail}
                    variant="standard"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6} className={classes.subclass}>
                  <img src={getErrMob} width="10" height="10" />
                  <TextField
                    fullWidth
                    label="Mobile No"
                    value={getMobile}
                    variant="standard"
                    onChange={(event) => setMobile(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6} className={classes.subclass}>
                  <img src={getErrState} width="10" height="10" />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={getState}
                      onChange={(event) => handleState(event)}
                    >
                      {" "}
                      <MenuItem value="">Select State</MenuItem>
                      {fillStates()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} className={classes.subclass}>
                  <img src={getErrCity} width="10" height="10" />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={getCity}
                      onChange={(event) => setCity(event.target.value)}
                    >
                      <MenuItem value="">Select City</MenuItem>
                      {fillCities()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.subclass}>
                  <img src={getErrAddress} width="10" height="10" />
                  <TextField
                    fullWidth
                    label="Address"
                    value={getAddress}
                    variant="standard"
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6} className={classes.subclass}>
                  <img src={getErrDOB} width="10" height="10" />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      fullWidth
                      label="Date of Birth"
                      format="MM/dd/yyyy"
                      value={getDOB}
                      onChange={(event) => setDOB(event)}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>{" "}
                </Grid>
                <Grid item xs={6} className={classes.subclass}>
                  <img src={getErrJoinDate} width="10" height="10" />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      fullWidth
                      label="Joining Date"
                      format="MM/dd/yyyy"
                      value={getJoinDate}
                      onChange={(event) => setJoinDate(event)}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>{" "}
                </Grid>
                <Grid item xs={6} className={classes.subclass}>
                  <img src={getErrDes} width="10" height="10" />
                  <TextField
                    fullWidth
                    label="Designation"
                    value={getDesignation}
                    variant="standard"
                    onChange={(event) => setDesignation(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6} className={classes.center}>
                  <Avatar
                    alt="Remy Sharp"
                    variant="rounded"
                    src={getPhoto.file}
                    className={classes.avatortheme}
                  />
                </Grid>
                <Grid item xs={6} className={classes.subclass}>
                  <img src={getErrStatus} width="10" height="10" />
                  <div> Status :</div>
                  <Radio
                    checked={getStatus === "Yes"}
                    onChange={(event) => setStatus(event.target.value)}
                    value="Yes"
                    name="radio-button-demo"
                    //inputProps={{ 'aria-label': 'A' }}
                  />
                  Yes
                  <Radio
                    checked={getStatus === "No"}
                    onChange={(event) => setStatus(event.target.value)}
                    value="No"
                    name="radio-button-demo"
                    //inputProps={{ 'aria-label': 'B' }}
                  />
                  No
                </Grid>
                <Grid item xs={6} className={classes.center}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
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
                      className={classes.button}
                      startIcon={<CloudUploadIcon />}
                      component="span"
                    >
                      Upload Photo
                    </Button>
                  </label>
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
            </Paper> */}
          </div>
        </Dialog>
      </div>
    );
  };
  return (
    <div className={classes.root}>
      <div className={classes.tableDiv}>
        <div class="panel-header bg-dark">
          <h3 class="panel-title" style={{ color: "#FFF", padding: 17 }}>
            <strong>Employees List</strong>
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
        {handleDialog()}
      </div>
    </div>
  );
}
