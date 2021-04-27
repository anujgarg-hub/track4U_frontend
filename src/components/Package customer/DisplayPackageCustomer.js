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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  rootx: {
    display: "flex",
    // marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  tablediv: {
    width: "100%",
    height: "auto",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
    fullWidth: "true",
  },
  root: {
    // marginTop: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
  },
  mainpaper: {
    width: 500,
    margin: 7,
    padding: 15,
    backgroundColor: "#f1f2f6",
  },
  button: {
    width: 120,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  headingstyle: {
    margin: 10,
    padding: 10,
    display: "flex",
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dfe4ea",
    marginBottom: 15,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10",
  },
}));

function DisplayAllFeaturesPackages() {
  const [state, setState] = useState({
    columns: [
      {
        title: "Package Customer",
        field: "packagecustomerid",
        editable: "never",
      },
      { title: "Vendor", field: "vendorname", editable: "never" },
      { title: "Package ", field: "packagename", editable: "never" },
      { title: "Date", field: "date", editable: "never" },
      { title: "Expire Date", field: "expiredate", editable: "never" },
      { title: "Payment Status", field: "paymentstatus", editable: "never" },
      { title: "Status", field: "status", editable: "never" },
    ],
  });

  const [getList, setList] = useState([]);
  const [getPackageList, setPackageList] = useState([]);
  const [getOpen, setOpen] = useState(false);
  const [getPackageCustomerid, setPackageCustomerid] = useState("");
  const [getVendorId, setVendorId] = useState("");
  const [getPackageId, setPackageId] = useState("");
  const [getdate, setdate] = useState("");
  const [getPaymentstatus, setPaymentstatus] = useState("");
  const [getStatus, setStatus] = useState("");
  const [getExpiredate, setExpiredate] = useState("");
  //   const [getErrPackageId, setErrPackageId] = useState("");
  const [getMsg, setMsg] = useState("");
  const [getVendorList, setVendorList] = useState([]);

  const fetchData = async () => {
    let list = await getData("packagecustomer/display");
    setList(list.data);
  };

  useEffect(function () {
    fetchData();
    fetchAllPackages();
    fetchAllVendors();
  }, []);

  const handleDelete = async (oldData) => {
    let body = { packagecustomerid: oldData.packagecustomerid };
    await postData("packagecustomer/delete", body);
  };

  const handleClickOpen = async (rowData) => {
    setOpen(true);
    fetchPackageInEditform(rowData.packagecustomerid);
    setPackageCustomerid(rowData.packagecustomerid);
    setVendorId(rowData.vendorid);
    setPackageId(rowData.packageid);
    setdate(rowData.date);
    setExpiredate(rowData.expiredate);
    setPaymentstatus(rowData.paymentstatus);
    setStatus(rowData.status);
  };

  const handleClose = () => {
    setOpen(false);
    fetchData();
    setMsg("");
    // setErrPackageDistance("");
    // setErrPackageId("");
    // setErrPackageTime("");
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    var err = false;
    // if (!checkRequire(getPackageId)) {
    //   err = true;
    //   setErrPackageId("/images/cross.png");
    // }
    // if (checkRequire(getPackageId)) {
    //   setErrPackageId("/images/tick.png");
    // }

    // if (!checkRequire(getPackageTime)) {
    //   err = true;
    //   setErrPackageTime("/images/cross.png");
    // }
    // if (checkRequire(getPackageTime)) {
    //   setErrPackageTime("/images/tick.png");
    // }

    // if (!checkRequire(getPackageDistance)) {
    //   err = true;
    //   setErrPackageDistance("/images/cross.png");
    // }
    // if (checkRequire(getPackageDistance)) {
    //   setErrPackageDistance("/images/tick.png");
    // }

    if (!err) {
      let body = {
        packagecustomerid: getPackageCustomerid,
        vendorid: getVendorId,
        packageid: getPackageId,
        date: getdate,
        expiredate: getExpiredate,
        paymentstatus: getPaymentstatus,
        status: getStatus,
      };
      console.log(body);
      var result = await postData("packagecustomer/update", body);
      if (result) {
        setMsg("Record Edited ...");
      } else {
        setMsg("Fail to Edit Record ..");
      }
    } else {
      setMsg("Error in Input");
    }
  };

  const fetchPackageInEditform = async (packagecustomerid) => {
    var body = { packagecustomerid: packagecustomerid };
    //console.log(brandid)
    var list = await postData(
      "featurespackages/displayPackageInEditform",
      body
    );
    //console.log('nidhi',list[0].packageid)
    // setPackageId(list[0].packageid);
  };

  const fetchAllPackages = async () => {
    var list = await getData("packages/displayall");
    setPackageList(list.data);
  };

  const fetchAllVendors = async () => {
    var list = await getData("vendors/displayall");
    setVendorList(list.data);
  };

  const handlePackageChange = (event) => {
    setPackageId(event.target.value);
  };

  const handleVendorChange = (event) => {
    setVendorId(event.target.value);
  };

  const fillPackageItem = () => {
    return getPackageList.map((item, key) => {
      return <MenuItem value={item.packageid}>{item.packagename}</MenuItem>;
    });
  };

  const fillVendorItem = () => {
    return getVendorList.map((item, key) => {
      return <MenuItem value={item.vendorid}>{item.vendorname}</MenuItem>;
    });
  };

  const todayDate = (e) => {
    setdate(e.target.value);
    const today = new Date(e.target.value);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setExpiredate(tomorrow.toString().substr(0, 16));
  };

  const editDialog = () => {
    return (
      <div>
        <Dialog
          open={getOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle id="alert-dialog-title">
            {"Feature Packages Edit"}
          </DialogTitle> */}

          <div>
            <div class="">
              <div class="panel panel-default no-bd">
                <div class="panel-header bg-dark">
                  <h3 class="panel-title" style={{ padding: 10 }}>
                    <strong>Package Customer Packages</strong>
                  </h3>
                </div>
                <div class="panel-body bg-white">
                  <div class="row">
                    <div class="col-md-12 ">
                      <form
                        role="form"
                        class="form-validation"
                        novalidate="novalidate"
                        onSubmit={handleEdit}
                      >
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label class="control-label">
                                PackageCustomer
                              </label>
                              <i
                                class="fa fa-check"
                                style={{ color: "green", marginLeft: 10 }}
                              ></i>
                              <div class="append-icon">
                                <input
                                  type="text"
                                  class="form-control"
                                  minlength="3"
                                  placeholder="package customer"
                                  required=""
                                  aria-required="true"
                                  value={getPackageCustomerid}
                                />
                                <i class="fa fa-clock"></i>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="control-label">Packages</label>
                              {/* <img
                                src={getErrPackageId}
                                width="10"
                                height="10"
                              /> */}
                              <div class="append-icon">
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  placeholder="Select Packages"
                                  value={getPackageId}
                                  fullWidth="true"
                                  onChange={(event) =>
                                    handlePackageChange(event)
                                  }
                                >
                                  {fillPackageItem()}
                                </Select>
                              </div>
                            </div>
                          </div>

                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="control-label">Vendors</label>
                              {/* <img
                                src={getErrPackageId}
                                width="10"
                                height="10"
                              /> */}
                              <div class="append-icon">
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  placeholder="Select Vendor"
                                  value={getVendorId}
                                  fullWidth="true"
                                  onChange={(event) =>
                                    handleVendorChange(event)
                                  }
                                >
                                  {fillVendorItem()}
                                </Select>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label class="control-label">Date</label>
                              {/* <img
                                src={getErrPackageDistance}
                                width="10"
                                height="10"
                              /> */}
                              <div class="append-icon">
                                <input
                                  type="text"
                                  class="form-control"
                                  minlength="4"
                                  placeholder="Date"
                                  required=""
                                  disabled="false"
                                  aria-required="true"
                                  value={getdate.toString().substr(0, 16)}
                                  onChange={(e) => todayDate(e)}
                                  // onChange={(event) => {
                                  //   setdate(event.target.value);
                                  // }}
                                />
                                <i class="fa fa-map"></i>
                              </div>
                            </div>
                          </div>

                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="control-label">Expire Date</label>
                              {/* <img src={getErrPackageTime} width="10" height="10" /> */}
                              <div class="append-icon">
                                <input
                                  // type="date"
                                  class="form-control"
                                  minlength="3"
                                  placeholder="Date"
                                  required=""
                                  disabled="false"
                                  aria-required="true"
                                  value={getExpiredate}
                                  onChange={(e) => alert(e.target.value)}
                                />
                                <i class="fa fa-clock "></i>
                              </div>
                            </div>
                          </div>

                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="control-label">PaymentStatus</label>
                              <select
                                class="form-control"
                                value={getPaymentstatus}
                                onChange={(event) =>
                                  setPaymentstatus(event.target.value)
                                }
                              >
                                <option>----Payement Status----</option>
                                <option value="Pending">Pending</option>
                                <option value="Done">Done</option>
                              </select>
                            </div>
                          </div>

                          <div class="col-sm-12">
                            <label class="control-label">Status</label>
                            <select
                              class="form-control"
                              value={getStatus}
                              onChange={(event) =>
                                setStatus(event.target.value)
                              }
                            >
                              <option>----Status----</option>
                              <option value="Activate">Activate</option>
                              <option value="Deactivate">Deactivate</option>
                            </select>
                          </div>
                        </div>

                        <div class="text-center  m-t-20">
                          <button
                            className="btn btn-primary btn-transparent"
                            type="submit"
                            // class="btn btn-embossed btn-primary"
                            // onClick={(event) => {
                            //   handleEdit();
                            // }}
                          >
                            Save
                          </button>
                        </div>
                        {getMsg}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <Paper className={classes.mainpaper}>
              <Grid container spacing={1}>
                <Grid item xs={6} className={classes.center}>
                  <img src={"/images/tick.png"} width="10" height="10" />
                  <TextField
                    id="standard-basic"
                    label="Feature Id"
                    value={getFeatureId}
                    style={{ width: 250, marginTop: 10 }}
                  />
                </Grid>

                <Grid item xs={6} className={classes.center}>
                  <img src={getErrPackageId} width="10" height="10" />
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Packages
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={getPackageId}
                      fullWidth="true"
                      onChange={(event) => handlePackageChange(event)}
                    >
                      {fillPackageItem()}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6} className={classes.center}>
                  <img src={getErrPackageTime} width="10" height="10" />
                  <TextField
                    id="standard-basic"
                    label="Package Time"
                    value={getPackageTime}
                    onChange={(event) => {
                      setPackageTime(event.target.value);
                    }}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6} className={classes.center}>
                  <img src={getErrPackageDistance} width="10" height="10" />
                  <TextField
                    id="standard-basic"
                    label="Package Distance"
                    value={getPackageDistance}
                    onChange={(event) => {
                      setPackageDistance(event.target.value);
                    }}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6} className={classes.container}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={(event) => {
                      handleEdit();
                    }}
                  >
                    Save Record
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <b>Message:&nbsp;&nbsp;{getMsg}</b>
                </Grid>
              </Grid>
            </Paper> */}
          </div>

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
      </div>
    );
  };

  const classes = useStyles();
  return (
    <div className={classes.rootx}>
      <div className={classes.tablediv}>
        <div class="panel-header bg-dark">
          <h3 class="panel-title" style={{ color: "#FFF", padding: 17 }}>
            <strong>Display Package Customer</strong>
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
      </div>
      {editDialog()}
    </div>
  );
}

export default DisplayAllFeaturesPackages;
