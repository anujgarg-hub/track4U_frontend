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
import View from "../CardView/View.css";

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
      var config = { headers: { "content-type": "multipart/form-data" } };
      var result = await postDataAndImage(
        "employees/addnewemployee",
        formData,
        config
      );
      // console.log(result);
      if (result.status) {
        swal("Record Submitted", " ", "success", {
          buttons: false,
        });
      } else {
        swal(result.message, " ", "Error", {
          buttons: false,
        });
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
      <div class="row">
        <div class="col-lg-4 col-md-6">
          {/* <!-- Daily Feed Widget--> */}
          <div id="daily-feeds" class="card updates daily-feeds">
            <div
              id="feeds-header"
              class="card-header d-flex justify-content-between align-items-center"
            >
              <h2 class="h5 display">
                <a
                  data-toggle="collapse"
                  data-parent="#daily-feeds"
                  href="#feeds-box"
                  aria-expanded="true"
                  aria-controls="feeds-box"
                >
                  Your daily Feeds
                </a>
              </h2>
              <div class="right-column">
                <div class="badge badge-primary">10 messages</div>
                <a
                  data-toggle="collapse"
                  data-parent="#daily-feeds"
                  href="#feeds-box"
                  aria-expanded="true"
                  aria-controls="feeds-box"
                >
                  <i class="fa fa-angle-down"></i>
                </a>
              </div>
            </div>
            <div id="feeds-box" role="tabpanel" class="collapse show">
              <div class="feed-box">
                <ul class="feed-elements list-unstyled">
                  {/* <!-- List--> */}
                  <li class="clearfix">
                    <div class="feed d-flex justify-content-between">
                      <div class="feed-body d-flex justify-content-between">
                        <a href="#" class="feed-profile">
                          <img
                            src="images/avatar-5.jpg"
                            alt="person"
                            class="img-fluid rounded-circle"
                          />
                        </a>
                        <div class="content">
                          <strong>Aria Smith</strong>
                          <small>Posted a new blog </small>
                          <div class="full-date">
                            <small>Today 5:60 pm - 12.06.2014</small>
                          </div>
                        </div>
                      </div>
                      <div class="date">
                        <small>5min ago</small>
                      </div>
                    </div>
                  </li>
                  {/* <!-- List--> */}
                  <li class="clearfix">
                    <div class="feed d-flex justify-content-between">
                      <div class="feed-body d-flex justify-content-between">
                        <a href="#" class="feed-profile">
                          <img
                            src="images/avatar-2.jpg"
                            alt="person"
                            class="img-fluid rounded-circle"
                          />
                        </a>
                        <div class="content">
                          <strong>Frank Williams</strong>
                          <small>Posted a new blog </small>
                          <div class="full-date">
                            <small>Today 5:60 pm - 12.06.2014</small>
                          </div>
                          <div class="CTAs">
                            <a href="#" class="btn btn-xs btn-dark">
                              <i class="fa fa-thumbs-up"> </i>Like
                            </a>
                            <a href="#" class="btn btn-xs btn-dark">
                              <i class="fa fa-heart"> </i>Love
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="date">
                        <small>5min ago</small>
                      </div>
                    </div>
                  </li>
                  {/* <!-- List--> */}
                  <li class="clearfix">
                    <div class="feed d-flex justify-content-between">
                      <div class="feed-body d-flex justify-content-between">
                        <a href="#" class="feed-profile">
                          <img
                            src="images/avatar-3.jpg"
                            alt="person"
                            class="img-fluid rounded-circle"
                          />
                        </a>
                        <div class="content">
                          <strong>Ashley Wood</strong>
                          <small>Posted a new blog </small>
                          <div class="full-date">
                            <small>Today 5:60 pm - 12.06.2014</small>
                          </div>
                        </div>
                      </div>
                      <div class="date">
                        <small>5min ago</small>
                      </div>
                    </div>
                  </li>
                  {/* <!-- List--> */}
                  <li class="clearfix">
                    <div class="feed d-flex justify-content-between">
                      <div class="feed-body d-flex justify-content-between">
                        <a href="#" class="feed-profile">
                          <img
                            src="images/avatar-1.jpg"
                            alt="person"
                            class="img-fluid rounded-circle"
                          />
                        </a>
                        <div class="content">
                          <strong>Jason Doe</strong>
                          <small>Posted a new blog </small>
                          <div class="full-date">
                            <small>Today 5:60 pm - 12.06.2014</small>
                          </div>
                        </div>
                      </div>
                      <div class="date">
                        <small>5min ago</small>
                      </div>
                    </div>
                    <div class="message-card">
                      <small>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s.
                        Over the years, sometimes by accident, sometimes on
                        purpose (injected humour and the like).
                      </small>
                    </div>
                    <div class="CTAs pull-right">
                      <a href="#" class="btn btn-xs btn-dark">
                        <i class="fa fa-thumbs-up"> </i>Like
                      </a>
                    </div>
                  </li>
                  {/* <!-- List--> */}
                  <li class="clearfix">
                    <div class="feed d-flex justify-content-between">
                      <div class="feed-body d-flex justify-content-between">
                        <a href="#" class="feed-profile">
                          <img
                            src="images/avatar-6.jpg"
                            alt="person"
                            class="img-fluid rounded-circle"
                          />
                        </a>
                        <div class="content">
                          <strong>Sam Martinez</strong>
                          <small>Posted a new blog </small>
                          <div class="full-date">
                            <small>Today 5:60 pm - 12.06.2014</small>
                          </div>
                        </div>
                      </div>
                      <div class="date">
                        <small>5min ago</small>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <!-- Daily Feed Widget End--> */}
        </div>

        <div class="col">
          <div class="col-lg-4 col-md-6">
            {/* <!-- Daily Feed Widget--> */}
            <div id="daily-feeds" class="card updates daily-feeds">
              <div
                id="feeds-header"
                class="card-header d-flex justify-content-between align-items-center"
              >
                <h2 class="h5 display">
                  <a
                    data-toggle="collapse"
                    data-parent="#daily-feeds"
                    href="#feeds-box"
                    aria-expanded="true"
                    aria-controls="feeds-box"
                  >
                    Your daily Feeds
                  </a>
                </h2>
                <div class="right-column">
                  <div class="badge badge-primary">10 messages</div>
                  <a
                    data-toggle="collapse"
                    data-parent="#daily-feeds"
                    href="#feeds-box"
                    aria-expanded="true"
                    aria-controls="feeds-box"
                  >
                    <i class="fa fa-angle-down"></i>
                  </a>
                </div>
              </div>
              <div id="feeds-box" role="tabpanel" class="collapse show">
                <div class="feed-box">
                  <ul class="feed-elements list-unstyled">
                    {/* <!-- List--> */}
                    <li class="clearfix">
                      <div class="feed d-flex justify-content-between">
                        <div class="feed-body d-flex justify-content-between">
                          <a href="#" class="feed-profile">
                            <img
                              src="images/avatar-5.jpg"
                              alt="person"
                              class="img-fluid rounded-circle"
                            />
                          </a>
                          <div class="content">
                            <strong>Aria Smith</strong>
                            <small>Posted a new blog </small>
                            <div class="full-date">
                              <small>Today 5:60 pm - 12.06.2014</small>
                            </div>
                          </div>
                        </div>
                        <div class="date">
                          <small>5min ago</small>
                        </div>
                      </div>
                    </li>
                    {/* <!-- List--> */}
                    <li class="clearfix">
                      <div class="feed d-flex justify-content-between">
                        <div class="feed-body d-flex justify-content-between">
                          <a href="#" class="feed-profile">
                            <img
                              src="images/avatar-2.jpg"
                              alt="person"
                              class="img-fluid rounded-circle"
                            />
                          </a>
                          <div class="content">
                            <strong>Frank Williams</strong>
                            <small>Posted a new blog </small>
                            <div class="full-date">
                              <small>Today 5:60 pm - 12.06.2014</small>
                            </div>
                            <div class="CTAs">
                              <a href="#" class="btn btn-xs btn-dark">
                                <i class="fa fa-thumbs-up"> </i>Like
                              </a>
                              <a href="#" class="btn btn-xs btn-dark">
                                <i class="fa fa-heart"> </i>Love
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="date">
                          <small>5min ago</small>
                        </div>
                      </div>
                    </li>
                    {/* <!-- List--> */}
                    <li class="clearfix">
                      <div class="feed d-flex justify-content-between">
                        <div class="feed-body d-flex justify-content-between">
                          <a href="#" class="feed-profile">
                            <img
                              src="images/avatar-3.jpg"
                              alt="person"
                              class="img-fluid rounded-circle"
                            />
                          </a>
                          <div class="content">
                            <strong>Ashley Wood</strong>
                            <small>Posted a new blog </small>
                            <div class="full-date">
                              <small>Today 5:60 pm - 12.06.2014</small>
                            </div>
                          </div>
                        </div>
                        <div class="date">
                          <small>5min ago</small>
                        </div>
                      </div>
                    </li>
                    {/* <!-- List--> */}
                    <li class="clearfix">
                      <div class="feed d-flex justify-content-between">
                        <div class="feed-body d-flex justify-content-between">
                          <a href="#" class="feed-profile">
                            <img
                              src="images/avatar-1.jpg"
                              alt="person"
                              class="img-fluid rounded-circle"
                            />
                          </a>
                          <div class="content">
                            <strong>Jason Doe</strong>
                            <small>Posted a new blog </small>
                            <div class="full-date">
                              <small>Today 5:60 pm - 12.06.2014</small>
                            </div>
                          </div>
                        </div>
                        <div class="date">
                          <small>5min ago</small>
                        </div>
                      </div>
                      <div class="message-card">
                        <small>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s.
                          Over the years, sometimes by accident, sometimes on
                          purpose (injected humour and the like).
                        </small>
                      </div>
                      <div class="CTAs pull-right">
                        <a href="#" class="btn btn-xs btn-dark">
                          <i class="fa fa-thumbs-up"> </i>Like
                        </a>
                      </div>
                    </li>
                    {/* <!-- List--> */}
                    <li class="clearfix">
                      <div class="feed d-flex justify-content-between">
                        <div class="feed-body d-flex justify-content-between">
                          <a href="#" class="feed-profile">
                            <img
                              src="images/avatar-6.jpg"
                              alt="person"
                              class="img-fluid rounded-circle"
                            />
                          </a>
                          <div class="content">
                            <strong>Sam Martinez</strong>
                            <small>Posted a new blog </small>
                            <div class="full-date">
                              <small>Today 5:60 pm - 12.06.2014</small>
                            </div>
                          </div>
                        </div>
                        <div class="date">
                          <small>5min ago</small>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!-- Daily Feed Widget End--> */}
          </div>
        </div>


        <div class="col">
          <div class="col-lg-4 col-md-6">
            {/* <!-- Daily Feed Widget--> */}
            <div id="daily-feeds" class="card updates daily-feeds">
              <div
                id="feeds-header"
                class="card-header d-flex justify-content-between align-items-center"
              >
                <h2 class="h5 display">
                  <a
                    data-toggle="collapse"
                    data-parent="#daily-feeds"
                    href="#feeds-box"
                    aria-expanded="true"
                    aria-controls="feeds-box"
                  >
                    Your daily Feeds
                  </a>
                </h2>
                <div class="right-column">
                  <div class="badge badge-primary">10 messages</div>
                  <a
                    data-toggle="collapse"
                    data-parent="#daily-feeds"
                    href="#feeds-box"
                    aria-expanded="true"
                    aria-controls="feeds-box"
                  >
                    <i class="fa fa-angle-down"></i>
                  </a>
                </div>
              </div>
              <div id="feeds-box" role="tabpanel" class="collapse show">
                <div class="feed-box">
                  <ul class="feed-elements list-unstyled">
                    {/* <!-- List--> */}
                    <li class="clearfix">
                      <div class="feed d-flex justify-content-between">
                        <div class="feed-body d-flex justify-content-between">
                          <a href="#" class="feed-profile">
                            <img
                              src="images/avatar-5.jpg"
                              alt="person"
                              class="img-fluid rounded-circle"
                            />
                          </a>
                          <div class="content">
                            <strong>Aria Smith</strong>
                            <small>Posted a new blog </small>
                            <div class="full-date">
                              <small>Today 5:60 pm - 12.06.2014</small>
                            </div>
                          </div>
                        </div>
                        <div class="date">
                          <small>5min ago</small>
                        </div>
                      </div>
                    </li>
                    {/* <!-- List--> */}
                    <li class="clearfix">
                      <div class="feed d-flex justify-content-between">
                        <div class="feed-body d-flex justify-content-between">
                          <a href="#" class="feed-profile">
                            <img
                              src="images/avatar-2.jpg"
                              alt="person"
                              class="img-fluid rounded-circle"
                            />
                          </a>
                          <div class="content">
                            <strong>Frank Williams</strong>
                            <small>Posted a new blog </small>
                            <div class="full-date">
                              <small>Today 5:60 pm - 12.06.2014</small>
                            </div>
                            <div class="CTAs">
                              <a href="#" class="btn btn-xs btn-dark">
                                <i class="fa fa-thumbs-up"> </i>Like
                              </a>
                              <a href="#" class="btn btn-xs btn-dark">
                                <i class="fa fa-heart"> </i>Love
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="date">
                          <small>5min ago</small>
                        </div>
                      </div>
                    </li>
                    {/* <!-- List--> */}
                    <li class="clearfix">
                      <div class="feed d-flex justify-content-between">
                        <div class="feed-body d-flex justify-content-between">
                          <a href="#" class="feed-profile">
                            <img
                              src="images/avatar-3.jpg"
                              alt="person"
                              class="img-fluid rounded-circle"
                            />
                          </a>
                          <div class="content">
                            <strong>Ashley Wood</strong>
                            <small>Posted a new blog </small>
                            <div class="full-date">
                              <small>Today 5:60 pm - 12.06.2014</small>
                            </div>
                          </div>
                        </div>
                        <div class="date">
                          <small>5min ago</small>
                        </div>
                      </div>
                    </li>
                    {/* <!-- List--> */}
                    <li class="clearfix">
                      <div class="feed d-flex justify-content-between">
                        <div class="feed-body d-flex justify-content-between">
                          <a href="#" class="feed-profile">
                            <img
                              src="images/avatar-1.jpg"
                              alt="person"
                              class="img-fluid rounded-circle"
                            />
                          </a>
                          <div class="content">
                            <strong>Jason Doe</strong>
                            <small>Posted a new blog </small>
                            <div class="full-date">
                              <small>Today 5:60 pm - 12.06.2014</small>
                            </div>
                          </div>
                        </div>
                        <div class="date">
                          <small>5min ago</small>
                        </div>
                      </div>
                      <div class="message-card">
                        <small>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s.
                          Over the years, sometimes by accident, sometimes on
                          purpose (injected humour and the like).
                        </small>
                      </div>
                      <div class="CTAs pull-right">
                        <a href="#" class="btn btn-xs btn-dark">
                          <i class="fa fa-thumbs-up"> </i>Like
                        </a>
                      </div>
                    </li>
                    {/* <!-- List--> */}
                    <li class="clearfix">
                      <div class="feed d-flex justify-content-between">
                        <div class="feed-body d-flex justify-content-between">
                          <a href="#" class="feed-profile">
                            <img
                              src="images/avatar-6.jpg"
                              alt="person"
                              class="img-fluid rounded-circle"
                            />
                          </a>
                          <div class="content">
                            <strong>Sam Martinez</strong>
                            <small>Posted a new blog </small>
                            <div class="full-date">
                              <small>Today 5:60 pm - 12.06.2014</small>
                            </div>
                          </div>
                        </div>
                        <div class="date">
                          <small>5min ago</small>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!-- Daily Feed Widget End--> */}
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

// import React, {useState, useEffect} from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import { getData } from "../FetchNodeServices";

// const useStyles = makeStyles({
//   root: {
//     minWidth: 275,
//   },
//   bullet: {
//     display: "inline-block",
//     margin: "0 2px",
//     transform: "scale(0.8)",
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });

// function CardView() {
//   const classes = useStyles();
//   const [getList, setList] = useState([]);
//   const bull = <span className={classes.bullet}>•</span>;

//   const fetchData = async () => {
//     var list = await getData("employees/displayall");
//     setList(list.data);
//   };

//   useEffect(function () {
//     fetchData();
//   }, []);

//   const ShowProfile = () => {
//     return (
//       <div>
//         <Card className={classes.root} variant="outlined">
//           <CardContent>
//             <div>

//             </div>
//             <Typography variant="h5" component="h2">
//               be{bull}nev{bull}o{bull}lent
//             </Typography>
//             <Typography className={classes.pos} color="textSecondary">
//               adjective
//             </Typography>
//             <Typography variant="body2" component="p">
//               well meaning and kindly.
//               <br />
//               {'"a benevolent smile"'}
//             </Typography>
//           </CardContent>
//           <CardActions>
//             <Button size="small">Learn More</Button>
//           </CardActions>
//         </Card>
//       </div>
//     );
//   };

//   return(
//     <div>{ShowProfile()}</div>
//   )
// }
// export default CardView;
