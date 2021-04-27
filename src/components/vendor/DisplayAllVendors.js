import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import {
  getData,
  ServerURL,
  postData,
  postDataAndImage,
} from "../FetchNodeServices";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Radio from "@material-ui/core/Radio";
import { findByLabelText } from "@testing-library/react";
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
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

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
    width: 800,
    margin: 5,
    padding: 30,
    backgroundColor: "#f5f6fa",
  },
  headingstyle: {
    margin: 5,
    padding: 13,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f2f6",
    marginBottom: 17,
  },

  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    width: 180,
    margin: 5,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },

  gridStyle: {
    display: "flex",
    flexDirection: "row",
  },
}));

function DisplayAllVendors() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Customer Id", field: "vendorid", editable: "never" },
      { title: "Customer Name", field: "vendorname", editable: "never" },
      { title: "Email", field: "email", editable: "never" },
      { title: "Mobile No", field: "mobileno", editable: "never" },
      { title: "Company Name", field: "companyname", editable: "never" },

      {
        title: "Company Logo",
        field: "companylogo",
        editable: "never",
        render: (rowData) => (
          <div>
            <Avatar
              variant="rounded"
              src={`${ServerURL}/images/${rowData.companylogo}`}
            />
          </div>
        ),
      },
      { title: "Status", field: "status", editable: "never" },
    ],
  });

  const [getList, setList] = useState([]);
  const [getOpen, setOpen] = useState(false);
  const [getRowData, setRowData] = useState([]);

  const [getVendorId, setVendorId] = useState("");
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
  const [getMsg, setMsg] = useState("");
  const [getErrVendorName, setErrVendorName] = useState("");
  const [getErrEmail, setErrEmail] = useState("");
  const [getErrMobileNo, setErrMobileNo] = useState("");
  const [getErrCompanyName, setErrCompanyName] = useState("");
  const [getErrCompanyLogo, setErrCompanyLogo] = useState("");
  const [getErrPassword, setErrPassword] = useState("");
  const [getErrStatus, setErrStatus] = useState("");

  const handleClickOpen = (rowData) => {
    setOpen(true);
    setVendorId(rowData.vendorid);
    setVendorName(rowData.vendorname);
    setEmail(rowData.email);
    setMobileNo(rowData.mobileno);
    setCompanyName(rowData.companyname);
    setCompanyLogo({
      companylogo: "",
      filecompanylogo: `${ServerURL}/images/${rowData.companylogo}`,
    });
    setPassword(rowData.password);
    setStatus(rowData.status);
  };

  const handleClose = () => {
    setOpen(false);
    fetchData();
  };

  const fetchData = async () => {
    let list = await getData("vendors/displayall");
    setList(list.data);
  };

  useState(function () {
    fetchData();
  }, []);

  const handleDelete = async (oldData) => {
    let body = { vendorid: oldData.vendorid };
    await postData("vendors/deleteRecord", body);
  };

  const handleCompanyLogo = (event) => {
    setCompanyLogo({
      companylogo: event.target.files[0],
      filecompanylogo: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleEdit = async () => {
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
      formData.append("vendorid", getVendorId);
      formData.append("vendorname", getVendorName);
      formData.append("email", getEmail);
      formData.append("mobileno", getMobileNo);
      formData.append("companyname", getCompanyName);
      formData.append("companylogo", getCompanyLogo.companylogo);
      formData.append("password", getPassword);
      formData.append("status", getStatus);

      console.log("qwerty", getCompanyLogo.companylogo);
      const config = { headers: { "content-type": "multipart/form-data" } };
      let result = await postDataAndImage(
        "vendors/editRecord",
        formData,
        config
      );
      console.log(result);
      if (result) {
        setMsg("Record Edited...");
      } else {
        setMsg("Fail to Update Record..");
      }
    }
  };

  const editDialog = () => {
    return (
      <Dialog
        open={getOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        //maxWidth='xl'
      >
        {/* <DialogTitle id="alert-dialog-title">{"Vendor Edit"}</DialogTitle> */}
        {/* <DialogContent> */}
        <div>
          <div class="panel panel-default no-bd">
            <div class="panel-header bg-dark">
              <h3 class="panel-title" style={{ color: "#FFF", padding: 10 }}>
                <strong>Customer</strong> Edit
              </h3>
            </div>
            <div class="panel-body bg-white">
              <div class="row">
                <div class="col-md-12 ">
                  <div
                    role="form"
                    class="form-validation"
                    novalidate="novalidate"
                  >
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <label class="control-label">Customer Id</label>
                          <img src={getErrVendorName} width="10" height="10" />
                          <div class="append-icon">
                            <input
                              type="text"
                              class="form-control"
                              minlength="3"
                              placeholder="Customer Id"
                              required=""
                              aria-required="true"
                              value={getVendorId}
                            />
                            <i class="fa fa-edit"></i>
                          </div>
                        </div>
                      </div>
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
                        className="btn btn-primary btn-transparent"
                        type="submit"
                        // class="btn btn-embossed btn-primary"
                        onClick={() => handleEdit()}
                      >
                        Edit
                      </button>
                    </div>
                    {getMsg}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Paper className={classes.paperstyle}>
              <Grid container spacing={1}>
                <Grid item xs={12} className={classes.gridStyle}>
                  <img src="/images/tick.png" width="10" height="10" />
                  <TextField
                    id="standard-basic"
                    label="Vendor id"
                    variant="standard"
                    fullWidth
                    value={getVendorId}
                  />
                </Grid>
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

                <Grid item xs={6} className={classes.gridStyle}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file1"
                    multiple
                    type="file"
                    onChange={(event) => handleCompanyLogo(event)}
                  />
                  <label htmlFor="contained-button-file1">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      className={classes.button}
                    >
                      Upload Logo
                    </Button>
                  </label>
                </Grid>

                <Grid item xs={6} className={classes.container}>
                  <Avatar
                    alt="Remy Sharp"
                    src={getCompanyLogo.filecompanylogo}
                    fullWidth
                    variant="rounded"
                    className={classes.large}
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
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
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
                    className="btn btn-success btn-transparent"
                    color="primary"
                    className={classes.button}
                    onClick={() => handleEdit()}
                  >
                    Save
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  {getMsg}
                </Grid>
              </Grid>
            </Paper> */}
        </div>
        {/* </DialogContent> */}
        <DialogActions>
          <Button
            className="btn btn-danger btn-rounded btn-transparent"
            onClick={handleClose}
            // color="primary"
          >
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const classes = useStyles();
  return (
    <div>
      <div className={classes.tablediv}>
        <div class="panel-header bg-dark">
          <h3 class="panel-title" style={{ color: "#FFF", padding: 17 }}>
            <strong>Customer List</strong>
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
                  console.log(getList);
                  setList(data);
                  console.log(data);
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

export default DisplayAllVendors;
