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
import { checkMobile, checkRequire, checkEmail } from "../Checks";
import { statecity } from "../statecity/StateCity";
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
    marginTop: 15,
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

function Client() {
  const classes = useStyles();

  var vendor = JSON.parse(localStorage.getItem("vendor"));

  const [getClientName, setClientName] = useState("");
  const [getClientAddress, setClientAddress] = useState("");
  const [getState, setState] = useState("");
  const [getCity, setCity] = useState("");
  const [getFirmName, setFirmName] = useState("");
  const [getMobileNo, setMobileNo] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getDescription, setDescription] = useState("");
  const [getVendorId, setVendorId] = useState(vendor.vendorid);
  const [getMsg, setMsg] = useState("");

  const [getErrClientName, setErrClientName] = useState("");
  const [getErrClientAddress, setErrClientAddress] = useState("");
  const [getErrState, setErrState] = useState("");
  const [getErrCity, setErrCity] = useState("");
  const [getErrFirmName, setErrFirmName] = useState("");
  const [getErrMobileNo, setErrMobileNo] = useState("");
  const [getErrEmail, setErrEmail] = useState("");
  const [getErrDescription, setErrDescription] = useState("");
  const [getErrVendorId, setErrVendorId] = useState("");
  const [getStateList, setStateList] = useState([]);
  const [getCityList, setCityList] = useState([]);
  // const [getVendor,setVendor]=useState([])

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

  const handleSubmit = async () => {
    var err = false;
    if (!checkRequire(getClientName)) {
      err = true;
      setErrClientName("/images/cross.png");
    }
    if (checkRequire(getClientName)) {
      setErrClientName("/images/tick.png");
    }

    if (!checkRequire(getClientAddress)) {
      err = true;
      setErrClientAddress("/images/cross.png");
    }
    if (checkRequire(getClientAddress)) {
      setErrClientAddress("/images/tick.png");
    }

    if (!checkRequire(getState)) {
      err = true;
      setErrState("/images/cross.png");
    }
    if (checkRequire(getState)) {
      setErrState("/images/tick.png");
    }

    if (!checkRequire(getCity)) {
      err = true;
      setErrCity("/images/cross.png");
    }
    if (checkRequire(getCity)) {
      setErrCity("/images/tick.png");
    }

    if (!checkRequire(getFirmName)) {
      err = true;
      setErrFirmName("/images/cross.png");
    }
    if (checkRequire(getFirmName)) {
      setErrFirmName("/images/tick.png");
    }

    if (!checkMobile(getMobileNo)) {
      err = true;
      setErrMobileNo("/images/cross.png");
    }
    if (checkMobile(getMobileNo)) {
      setErrMobileNo("/images/tick.png");
    }

    if (!checkEmail(getEmail)) {
      err = true;
      setErrEmail("/images/cross.png");
    }
    if (checkEmail(getEmail)) {
      setErrEmail("/images/tick.png");
    }

    if (!checkRequire(getDescription)) {
      err = true;
      setErrDescription("/images/cross.png");
    }
    if (checkRequire(getDescription)) {
      setErrDescription("/images/tick.png");
    }

    if (!checkRequire(getVendorId)) {
      err = true;
      setErrVendorId("/images/cross.png");
    }
    if (checkRequire(getVendorId)) {
      setErrVendorId("/images/tick.png");
    }

    if (!err) {
      let body = {
        clientname: getClientName,
        clientaddress: getClientAddress,
        state: getState,
        city: getCity,
        firmname: getFirmName,
        mobileno: getMobileNo,
        email: getEmail,
        description: getDescription,
        vendorid: getVendorId,
      };
      console.log(body);
      var result = await postData("client/addnewrecord", body);

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
    setClientName("");
    setClientAddress("");
    setState("");
    setCity("");
    setFirmName("");
    setMobileNo("");
    setEmail("");
    setDescription("");
    setMsg("");
    setErrClientName("");
    setErrClientAddress("");
    setErrState("");
    setErrCity("");
    setErrFirmName("");
    setErrMobileNo("");
    setErrEmail("");
    setErrDescription("");
  };

  return (
    <div className={classes.root}>
      <div class="panel panel-default no-bd" style={{ width: "100%" }}>
        <div class="panel-header bg-dark">
          <h3 class="panel-title">
            <strong>Add Client</strong>
          </h3>
        </div>
        <div class="panel-body bg-white">
          <div class="row">
            <div class="col-md-12 ">
              <form role="form" class="form-validation" novalidate="novalidate">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Client Name</label>
                      <img src={getErrClientName} width="10" height="10" />
                      <div class="append-icon">
                        <input
                          type="text"
                          class="form-control"
                          minlength="3"
                          placeholder="Client Name"
                          required=""
                          aria-required="true"
                          value={getClientName}
                          onChange={(event) => {
                            setClientName(event.target.value);
                          }}
                        />
                        <i class="fa fa-clock "></i>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Client Address</label>
                      <img src={getErrClientAddress} width="10" height="10" />
                      <div class="append-icon">
                        <input
                          type="text"
                          class="form-control"
                          minlength="4"
                          placeholder="Client Address"
                          required=""
                          aria-required="true"
                          value={getClientAddress}
                          onChange={(event) => {
                            setClientAddress(event.target.value);
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
                      <label class="control-label">Firm Name</label>
                      <img src={getErrFirmName} width="10" height="10" />
                      <div class="append-icon">
                        <input
                          type="text"
                          class="form-control"
                          minlength="3"
                          placeholder="Firm Name"
                          required=""
                          aria-required="true"
                          value={getFirmName}
                          onChange={(event) => {
                            setFirmName(event.target.value);
                          }}
                        />
                        <i class="fa fa-clock "></i>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Mobile No</label>
                      <img src={getErrMobileNo} width="10" height="10" />
                      <div class="append-icon">
                        <input
                          type="text"
                          class="form-control"
                          minlength="4"
                          placeholder="Mobile No"
                          required=""
                          aria-required="true"
                          value={getMobileNo}
                          onChange={(event) => {
                            setMobileNo(event.target.value);
                          }}
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
                      <label class="control-label">Email Id</label>
                      <img src={getErrEmail} width="10" height="10" />
                      <div class="append-icon">
                        <input
                          type="text"
                          class="form-control"
                          minlength="3"
                          placeholder="Email Id"
                          required=""
                          aria-required="true"
                          value={getEmail}
                          onChange={(event) => {
                            setEmail(event.target.value);
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
                        <i class="fa fa-edit"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label class="control-label">Vendor Id</label>
                      <img src={getErrVendorId} width="10" height="10" />
                      <div class="append-icon">
                        <input
                          disabled
                          type="text"
                          class="form-control"
                          minlength="3"
                          placeholder="Vendor Id"
                          required=""
                          aria-required="true"
                          value={getVendorId}
                          onChange={(event) => {
                            setVendorId(event.target.value);
                          }}
                        />
                        <i class="fa fa-edit "></i>
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
    </div>
  );
}

export default Client;
