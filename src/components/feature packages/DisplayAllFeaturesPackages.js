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
      { title: "Feature Id", field: "featureid", editable: "never" },
      { title: "Package ", field: "packagename", editable: "never" },
      { title: "Package Time", field: "packagetime", editable: "never" },
      {
        title: "Package Distance",
        field: "packagedistance",
        editable: "never",
      },
    ],
  });

  const [getList, setList] = useState([]);
  const [getPackageList, setPackageList] = useState([]);
  const [getOpen, setOpen] = useState(false);

  const [getFeatureId, setFeatureId] = useState("");
  const [getPackageId, setPackageId] = useState("");
  const [getPackageTime, setPackageTime] = useState("");
  const [getPackageDistance, setPackageDistance] = useState("");
  const [getErrPackageId, setErrPackageId] = useState("");
  const [getErrPackageTime, setErrPackageTime] = useState("");
  const [getErrPackageDistance, setErrPackageDistance] = useState("");

  const [getMsg, setMsg] = useState("");

  const fetchData = async () => {
    let list = await getData("featurespackages/displayall");
    setList(list.data);
  };

  useEffect(function () {
    fetchData();
    fetchAllPackages();
  }, []);

  const handleDelete = async (oldData) => {
    let body = { featureid: oldData.featureid };
    await postData("featurespackages/deleteRecord", body);
  };

  const handleClickOpen = async (rowData) => {
    setOpen(true);
    fetchPackageInEditform(rowData.featureid);
    setFeatureId(rowData.featureid);
    // setPackageId(rowData.packageid)
    setPackageTime(rowData.packagetime);
    setPackageDistance(rowData.packagedistance);
  };

  const handleClose = () => {
    setOpen(false);
    fetchData();
    setMsg("");
    setErrPackageDistance("");
    setErrPackageId("");
    setErrPackageTime("");
  };

  const handleEdit = async () => {
    var err = false;
    if (!checkRequire(getPackageId)) {
      err = true;
      setErrPackageId("/images/cross.png");
    }
    if (checkRequire(getPackageId)) {
      setErrPackageId("/images/tick.png");
    }

    if (!checkRequire(getPackageTime)) {
      err = true;
      setErrPackageTime("/images/cross.png");
    }
    if (checkRequire(getPackageTime)) {
      setErrPackageTime("/images/tick.png");
    }

    if (!checkRequire(getPackageDistance)) {
      err = true;
      setErrPackageDistance("/images/cross.png");
    }
    if (checkRequire(getPackageDistance)) {
      setErrPackageDistance("/images/tick.png");
    }

    if (!err) {
      let body = {
        featureid: getFeatureId,
        packageid: getPackageId,
        packagetime: getPackageTime,
        packagedistance: getPackageDistance,
      };
      console.log(body);
      var result = await postData("featurespackages/editRecord", body);
      if (result) {
        setMsg("Record Edited ...");
      } else {
        setMsg("Fail to Edit Record ..");
      }
    } else {
      setMsg("Error in Input");
    }
  };

  const fetchPackageInEditform = async (featureid) => {
    var body = { featureid: featureid };
    //console.log(brandid)
    var list = await postData(
      "featurespackages/displayPackageInEditform",
      body
    );
    //console.log('nidhi',list[0].packageid)
    setPackageId(list[0].packageid);
  };

  const fetchAllPackages = async () => {
    var list = await getData("packages/displayall");
    setPackageList(list.data);
  };

  const handlePackageChange = (event) => {
    setPackageId(event.target.value);
  };

  const fillPackageItem = () => {
    return getPackageList.map((item, key) => {
      return <MenuItem value={item.packageid}>{item.packagename}</MenuItem>;
    });
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
                    <strong>Edit Features</strong> Packages
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
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label class="control-label">Feature Id</label>
                              <i
                                class="fa fa-check"
                                style={{ color: "green", marginLeft: 10 }}
                              ></i>
                              <div class="append-icon">
                                <input
                                  type="text"
                                  class="form-control"
                                  minlength="3"
                                  placeholder="Feature Id"
                                  required=""
                                  aria-required="true"
                                  value={getFeatureId}
                                />
                                <i class="fa fa-clock"></i>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label class="control-label">Packages</label>
                              <img
                                src={getErrPackageId}
                                width="10"
                                height="10"
                              />
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
                              <label class="control-label">Package Time</label>
                              <img
                                src={getErrPackageTime}
                                width="10"
                                height="10"
                              />
                              <div class="append-icon">
                                <input
                                  type="text"
                                  class="form-control"
                                  minlength="3"
                                  placeholder="Package Time"
                                  required=""
                                  aria-required="true"
                                  value={getPackageTime}
                                  onChange={(event) => {
                                    setPackageTime(event.target.value);
                                  }}
                                />
                                <i class="fa fa-clock"></i>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="control-label">
                                Package Distance
                              </label>
                              <img
                                src={getErrPackageDistance}
                                width="10"
                                height="10"
                              />
                              <div class="append-icon">
                                <input
                                  type="text"
                                  class="form-control"
                                  minlength="4"
                                  placeholder="Package Distance"
                                  required=""
                                  aria-required="true"
                                  value={getPackageDistance}
                                  onChange={(event) => {
                                    setPackageDistance(event.target.value);
                                  }}
                                />
                                <i class="fa fa-map"></i>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="text-center  m-t-20">
                          <button
                            className="btn btn-primary btn-transparent"
                            type="submit"
                            // class="btn btn-embossed btn-primary"
                            onClick={(event) => {
                              handleEdit();
                            }}
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
            <strong>Display All Features Packages</strong>
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
