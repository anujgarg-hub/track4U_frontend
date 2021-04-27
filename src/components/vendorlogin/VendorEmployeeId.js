/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

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

export default function VendorEmployeeId(props) {
  const classes = useStyles();
  var vendor = JSON.parse(localStorage.getItem("vendor"));
  console.log(vendor);
  const [getEmpList, setEmpList] = useState([]);
  const [getEmpId, setEmpId] = useState("");
  const [getMsg, setMsg] = useState("");
  const [getVendorId, setVendorId] = useState("");

  const [getFromSelectedDate, setFromSelectedDate] = useState();
  const [getToSelectedDate, setToSelectedDate] = useState();
  const [getFromSelectedTime, setFromSelectedTime] = useState();
  const [getToSelectedTime, setToSelectedTime] = useState();
  const [getTrack, setTrack] = useState([]);

  useEffect(function () {
    setVendorId(vendor.vendorid);
    fetchEmp(vendor.vendorid);
  }, []);

  const fetchEmp = async (V_id) => {
    let body = {
      vendorid: vendor.vendorid,
    };
    let list = await postData("employees/displayall", body);
    console.log(list);
    if (list.status) {
      setEmpList(list.data);
    }
  };

  // const fillEmp = async () => {
  //   return getEmpList.map((item, key) => (

  //   ));
  // };

  const handleTracking = async (e) => {
    e.preventDefault();
    // alert(getEmpId);
    // alert(getVendorId);
    let body = {
      previousdate: getFromSelectedDate,
      nextdate: getToSelectedDate,
      previousTime: getFromSelectedTime,
      nextTime: getToSelectedTime,
      employeeid: getEmpId,
    };
    console.log(body);
    let result = await postData("tracking/fetchLatLng", body);
    if (result.status) {
      setTrack(result.data);
    }
  };

  const ClearData = () => {
    setEmpId("");
  };

  // const searchByDate = async () => {
  //   let body = {
  //     previousdate: getFromSelectedDate,
  //     nextdate: getToSelectedDate,
  //     previousTime: getFromSelectedTime,
  //     nextTime: getToSelectedTime,
  //   };
  //   console.log(body);
  //   // let list = await postData("tracking/searchByDateTime", body);
  //   // setTrackingList(list);
  // };

  const handleNextTime = (event) => {
    setToSelectedTime(event.target.value);
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
                // onSubmit={handleSubmit}
              >
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label class="control-label">Client</label>
                      <div class="append-icon">
                        <Select
                          fullWidth
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={getEmpId}
                          placeholder="Employee Id"
                          onChange={(event) => setEmpId(event.target.value)}
                        >
                          {" "}
                          {/* <MenuItem value="">Select State</MenuItem> */}
                          {getEmpList.map((item) => (
                            <MenuItem value={item.employeeid}>
                              {item.employeename}&nbsp;&nbsp;{item.mobileno}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <Grid container spacing={2}>
                  <Grid
                    container
                    xs={12}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Grid
                      container
                      spacing={2}
                      item
                      xs={12}
                      sm={4}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 10,
                      }}
                    >
                      <TextField
                        id="date"
                        label="Search From Date"
                        type="date"
                        fullWidth
                        defaultValue="2017-05-24"
                        value={getFromSelectedDate}
                        onChange={(event) =>
                          setFromSelectedDate(event.target.value)
                        }
                        // className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      item
                      xs={12}
                      sm={4}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 10,
                      }}
                    >
                      <TextField
                        id="date"
                        label="Search To Date"
                        type="date"
                        fullWidth
                        defaultValue="2017-05-24"
                        value={getToSelectedDate}
                        onChange={(event) =>
                          setToSelectedDate(event.target.value)
                        }
                        // className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      item
                      xs={12}
                      sm={4}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* <Button
                        variant="contained"
                        component="span"
                        // className={classes.button}
                        className="btn btn-success btn-rounded btn-transparent"
                        startIcon={<SearchIcon />}
                        onClick={searchByDate}
                      >
                        Search
                      </Button> */}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    xs={12}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 30,
                    }}
                  >
                    <Grid
                      container
                      spacing={2}
                      item
                      xs={12}
                      sm={4}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 10,
                      }}
                    >
                      <TextField
                        id="time"
                        label="Search From Time"
                        type="time"
                        fullWidth
                        defaultValue="07:30"
                        value={getFromSelectedTime}
                        onChange={(event) =>
                          setFromSelectedTime(event.target.value)
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      item
                      xs={12}
                      sm={4}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 10,
                      }}
                    >
                      <TextField
                        id="time"
                        label="Search To Time"
                        type="time"
                        fullWidth
                        defaultValue="07:30"
                        value={getToSelectedTime}
                        onChange={handleNextTime}
                        // onChange={(event) => setToSelectedTime(event.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      item
                      xs={12}
                      sm={4}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* <Button
                        variant="contained"
                        component="span"
                        // className={classes.button}
                        className="btn btn-success btn-rounded btn-transparent"
                        startIcon={<SearchIcon />}
                        // onClick={() => searchByTime()}
                      >
                        Search
                      </Button> */}
                    </Grid>
                  </Grid>
                </Grid>

                <div class="text-center  m-t-20">
                  <button
                    className="btn btn-success btn-transparent"
                    // type="submit"
                    onClick={(e) => handleTracking(e)}
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
