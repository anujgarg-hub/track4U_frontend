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
import {
  checkRequire,
  checkEmail,
  checkMobile,
  checkPassword,
} from "../Checks";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop:30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    display: "none",
  },

  paperstyle: {
    width: 550,
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
    margin: 5,
  },
  uploadbutton: {
    width: 250,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

function Vendors() {
  const classes = useStyles();

  const [getVendorName, setVendorName] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getMobileNo, setMobileNo] = useState("");
  const [getCompanyName, setCompanyName] = useState("");
  const [getCompanyLogo, setCompanyLogo] = useState({
    companylogo: "",
    filecompanylogo: "",
  });
  const [getPassword, setPassword] = useState("");
  const [getStatus, setStatus] = useState("");
  const [getErrVendorName, setErrVendorName] = useState("");
  const [getErrEmail, setErrEmail] = useState("");
  const [getErrMobileNo, setErrMobileNo] = useState("");
  const [getErrCompanyName, setErrCompanyName] = useState("");
  const [getErrCompanyLogo, setErrCompanyLogo] = useState("");
  const [getErrPassword, setErrPassword] = useState("");
  const [getErrStatus, setErrStatus] = useState("");

  const [getMsg, setMsg] = useState("");

  const handleCompanyLogo = (event) => {
    setCompanyLogo({
      companylogo: event.target.files[0],
      filecompanylogo: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async () => {
    var err = false;
    if (!checkRequire(getVendorName)) {
      err = true;
      setErrVendorName("/images/cross.png");
    }
    if (checkRequire(getVendorName)) {
      setErrVendorName("/images/tick.png");
    }

    if (!checkRequire(getEmail)) {
      err = true;
      setErrEmail("/images/cross.png");
    }
    if (checkRequire(getEmail)) {
      setErrEmail("/images/tick.png");
    }

    if (!checkRequire(getMobileNo)) {
      err = true;
      setErrMobileNo("/images/cross.png");
    }
    if (checkRequire(getMobileNo)) {
      setErrMobileNo("/images/tick.png");
    }

    if (!checkRequire(getCompanyName)) {
      err = true;
      setErrCompanyName("/images/cross.png");
    }
    if (checkRequire(getCompanyName)) {
      setErrCompanyName("/images/tick.png");
    }

    if (!checkRequire(getCompanyLogo.companylogo)) {
      err = true;
      setErrCompanyLogo("/images/cross.png");
    }
    if (checkRequire(getCompanyLogo.companylogo)) {
      setErrCompanyLogo("/images/tick.png");
    }

    if (!checkRequire(getPassword)) {
      err = true;
      setErrPassword("/images/cross.png");
    }
    if (checkRequire(getPassword)) {
      setErrPassword("/images/tick.png");
    }

    if (!checkRequire(getStatus)) {
      err = true;
      setErrStatus("/images/cross.png");
    }
    if (checkRequire(getStatus)) {
      setErrStatus("/images/tick.png");
    }

    if (!err) {
      const formData = new FormData();
      formData.append("vendorname", getVendorName);
      formData.append("email", getEmail);
      formData.append("mobileno", getMobileNo);
      formData.append("companyname", getCompanyName);
      formData.append("companylogo", getCompanyLogo.companylogo);
      formData.append("password", getPassword);
      formData.append("status", getStatus);

      const config = { headers: { "content-type": "multipart/form-data" } };
      let result = await postDataAndImage(
        "vendors/addnewrecord",
        formData,
        config
      );
      console.log(result);
      if (result) {
        setMsg("Record Submitted...");
      } else {
        setMsg("Fail to Submit Record..");
      }
    } else {
      setMsg("Error in Input");
    }
  };

  const ClearData = () => {
    setVendorName("");
    setEmail("");
    setMobileNo("");
    setCompanyName("");
    setCompanyLogo({ companylogo: "", filecompanylogo: "" });
    setPassword("");
    setStatus("");
    setMsg("");
    setErrVendorName("");
    setErrEmail("");
    setErrMobileNo("");
    setErrCompanyName("");
    setErrCompanyLogo({ companylogo: "", filecompanylogo: "" });
    setErrPassword("");
    setErrStatus("");
  };

  return (
    <div className={classes.root}>
      <div class="panel panel-default no-bd">
        <div class="panel-header bg-dark">
          <h3 class="panel-title">
            <strong>Add Customer</strong>
          </h3>
        </div>
        <div class="panel-body bg-white">
          <div class="row">
            <div class="col-md-12 ">
              <form role="form" class="form-validation" novalidate="novalidate">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Customer Name</label>
                      <img src={getErrVendorName} width="10" height="10" />
                      <div class="append-icon">
                        <input
                          type="text"
                          class="form-control"
                          minlength="3"
                          placeholder="Customer Name"
                          required=""
                          aria-required="true"
                          value={getVendorName}
                          onChange={(event) => {
                            setVendorName(event.target.value);
                          }}
                        />
                        <i class="fa fa-clock"></i>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Email</label>
                      <img src={getErrEmail} width="10" height="10" />
                      <div class="append-icon">
                        <input
                          type="text"
                          class="form-control"
                          minlength="3"
                          placeholder="Email"
                          required=""
                          aria-required="true"
                          value={getEmail}
                          onChange={(event) => {
                            setEmail(event.target.value);
                          }}
                        />
                        <i class="fa fa-clock"></i>
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
                        <i class="fa fa-map"></i>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Company Name</label>
                      <img src={getErrCompanyName} width="10" height="10" />
                      <div class="append-icon">
                        <input
                          type="text"
                          class="form-control"
                          minlength="4"
                          placeholder="Company Name"
                          required=""
                          aria-required="true"
                          value={getCompanyName}
                          onChange={(event) => {
                            setCompanyName(event.target.value);
                          }}
                        />
                        <i class="fa fa-map"></i>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Password</label>
                      <img src={getErrPassword} width="10" height="10" />
                      <div class="append-icon">
                        <input
                          type="password"
                          class="form-control"
                          minlength="4"
                          placeholder="Password"
                          required=""
                          aria-required="true"
                          value={getPassword}
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                        />
                        <i class="fa fa-map"></i>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Status</label>
                      <img src={getErrStatus} width="10" height="10" />
                      <div class="append-icon">
                        <Select
                          fullWidth
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          placeholder="Status"
                          value={getStatus}
                          onChange={(event) => {
                            setStatus(event.target.value);
                          }}
                          label="Status"
                        >
                          <MenuItem value={"Active"}>Active</MenuItem>
                          <MenuItem value={"Deactive"}>Deactive</MenuItem>
                        </Select>
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
                      onChange={(event) => handleCompanyLogo(event)}
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
                    </label>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <Avatar
                        alt="Remy Sharp"
                        variant="rounded"
                        src={getCompanyLogo.filecompanylogo}
                        className={classes.avatortheme}
                        style={{ width: 55, height: 55 }}
                      />
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
                    onClick={() => ClearData()}
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
            <b>&nbsp;&nbsp;&nbsp;&nbsp;Add Vendors </b>
          </Typography>
        </Paper>

        <Grid container spacing={1}>
          <Grid item xs={6} className={classes.gridStyle}>
            <img src={getErrVendorName} width="10" height="10" />
            <TextField
              id="standard-basic"
              label="Vendor Name"
              variant="standard"
              fullWidth
              value={getVendorName}
              onChange={(event) => {
                setVendorName(event.target.value);
              }}
            />
          </Grid>

          <Grid item xs={6} className={classes.gridStyle}>
            <img src={getErrEmail} width="10" height="10" />
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              fullWidth
              value={getEmail}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Grid>

          <Grid item xs={6} className={classes.gridStyle}>
            <img src={getErrMobileNo} width="10" height="10" />
            <TextField
              id="standard-basic"
              label="Mobile No"
              variant="standard"
              fullWidth
              value={getMobileNo}
              onChange={(event) => {
                setMobileNo(event.target.value);
              }}
            />
          </Grid>

          <Grid item xs={6} className={classes.gridStyle}>
            <img src={getErrCompanyName} width="10" height="10" />
            <TextField
              id="standard-basic"
              label="Company Name"
              variant="standard"
              fullWidth
              value={getCompanyName}
              onChange={(event) => {
                setCompanyName(event.target.value);
              }}
            />
          </Grid>

          <Grid
            item
            xs={6}
            className={classes.container}
            style={{ paddingTop: 20 }}
          >
            <img src={getErrCompanyLogo} width="10" height="10" />
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={(event) => handleCompanyLogo(event)}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                component="span"
                className={classes.uploadbutton}
                startIcon={<CloudUploadIcon />}
              >
                Upload Company Logo
              </Button>
            </label>
          </Grid>

          <Grid
            item
            xs={6}
            className={classes.container}
            style={{ paddingTop: 20 }}
          >
            <Avatar
              alt="Remy Sharp"
              src={getCompanyLogo.filecompanylogo}
              variant="rounded"
              style={{ width: 55, height: 55 }}
            />
          </Grid>

          <Grid item xs={6} className={classes.gridStyle}>
            <img src={getErrPassword} width="10" height="10" />
            <TextField
              id="standard-basic"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              value={getPassword}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </Grid>

          <Grid item xs={6} className={classes.gridStyle}>
            <img src={getErrStatus} width="10" height="10" />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
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
            </FormControl>
          </Grid>

          <Grid item xs={6} className={classes.container}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </Grid>

          <Grid item xs={6} className={classes.container}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => ClearData()}
            >
              Reset
            </Button>
          </Grid>

          <Grid item xs={12}>
            <b>Message:&nbsp;&nbsp;{getMsg}</b>
          </Grid>
        </Grid>
      </Paper> */}
    </div>
  );
}

export default Vendors;
