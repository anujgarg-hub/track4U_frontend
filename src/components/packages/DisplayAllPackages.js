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
import { checkRequire } from "../Checks";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 30,
    // fontSize: "14pt",
  },

  tableDiv: {
    width: window.innerWidth * 0.8,
  },
  avatortheme: {
    width: 50,
    height: 50,
  },
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperStyle: {
    width: 520,
    padding: 20,
    margin: 20,
    backgroundColor: "#FFF",
  },
  paperHeading: {
    margin: 10,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  subclass: {
    marginTop: 3,
    marginBottom: 4,
    display: "flex",
    flexDirection: "row",
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
    width: 160,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
}));

export default function DisplayAllPackages() {
  const classes = useStyles();
  const [getList, setList] = useState([]);
  const [getOpen, setOpen] = useState(false);
  const [getRowData, setRowData] = useState([]);
  const [getPackageId, setPackageId] = useState("");
  const [getPackageName, setPackageName] = useState("");
  const [getIcon, setIcon] = useState({ icon: "", fileIcon: "" });
  const [getPrice, setPrice] = useState("");
  const [getOfferPrice, setOfferPrice] = useState("");
  const [getDescription, setDescription] = useState("");
  const [getDuration, setDuration] = useState("");
  const [getNoOfusers, setNoOfUsers] = useState("");
  const [getMsg, setMsg] = useState("");
  const [getErrPackage, setErrPackage] = useState("");
  const [getErrDes, setErrDes] = useState("");
  const [getErrIcon, setErrIcon] = useState("");
  const [getErrPrice, setErrPrice] = useState("");
  const [getErrOfferPrice, setErrOfferPrice] = useState("");
  const [getErrDuration, setErrDuration] = useState("");
  const [getErrNoOfusers, setErrNoOfusers] = useState("");
  const [state, setState] = useState({
    columns: [
      { title: "Id", field: "packageid" },
      { title: "Package Name", field: "packagename" },
      { title: "Description", field: "description" },
      { title: "Price", field: "price" },
      { title: "Offer Price", field: "offerprice" },
      {
        title: "Icon",
        field: "Icon",
        render: (rowData) => (
          <div>
            <Avatar
              alt="Remy Sharp"
              variant="rounded"
              src={`${ServerURL}/images/${rowData.Icon}`}
              className={classes.avatortheme}
            />
          </div>
        ),
      },
      { title: "Duration", field: "duration" },
      { title: "No of Users", field: "noofusers" },
    ],
  });

  const fetchData = async () => {
    var list = await getData("packages/displayall");
    setList(list.data);
  };

  useEffect(function () {
    fetchData();
  }, []);

  const handleDelete = async (oldData) => {
    var body = { packageid: oldData.packageid };
    var result = await postData("packages/deleteRecord", body);
  };

  const handleEdit = async () => {
    var err = false;
    if (!checkRequire(getPackageName)) {
      err = true;
      setErrPackage("/images/cross.png");
    }
    if (checkRequire(getPackageName)) {
      setErrPackage("/images/tick.png");
    }

    if (!checkRequire(getDescription)) {
      err = true;
      setErrDes("/images/cross.png");
    }
    if (checkRequire(getDescription)) {
      setErrDes("/images/tick.png");
    }

    if (!checkRequire(getPrice)) {
      err = true;
      setErrPrice("/images/cross.png");
    }
    if (checkRequire(getPrice)) {
      setErrPrice("/images/tick.png");
    }

    if (!checkRequire(getOfferPrice)) {
      err = true;
      setErrOfferPrice("/images/cross.png");
    }
    if (checkRequire(getOfferPrice)) {
      setErrOfferPrice("/images/tick.png");
    }

    if (!checkRequire(getDuration)) {
      err = true;
      setErrDuration("/images/cross.png");
    }
    if (checkRequire(getDuration)) {
      setErrDuration("/images/tick.png");
    }

    if (!checkRequire(getNoOfusers)) {
      err = true;
      setErrNoOfusers("/images/cross.png");
    }
    if (checkRequire(getNoOfusers)) {
      setErrNoOfusers("/images/tick.png");
    }

    if (!err) {
      var formData = new FormData();

      formData.append("packagename", getPackageName);
      formData.append("description", getDescription);
      formData.append("Icon", getIcon.icon);
      formData.append("price", getPrice);
      formData.append("offerprice", getOfferPrice);
      formData.append("duration", getDuration);
      formData.append("noofusers", getNoOfusers);
      formData.append("packageid", getPackageId);

      var config = { headers: { "content-type": "multipart/form-data" } };
      var result = await postDataAndImage(
        "packages/updateRecord",
        formData,
        config
      );

      if (result) {
        setMsg("Record Edited..");
      } else {
        setMsg("Fail To Edit Record...");
      }
    } else {
      setMsg("Error in Input");
    }
  };

  const handleIcon = (event) => {
    setIcon({
      icon: event.target.files[0],
      fileIcon: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleClickOpen = async (rowData) => {
    setOpen(true);
    //setRowData(rowData)
    setPackageId(rowData.packageid);
    setPackageName(rowData.packagename);
    setPrice(rowData.price);
    setDescription(rowData.description);
    setOfferPrice(rowData.offerprice);
    setIcon({ icon: "", fileIcon: `${ServerURL}/images/${rowData.Icon}` });
    setDuration(rowData.duration);
    setNoOfUsers(rowData.noofusers);
  };

  const handleClose = () => {
    setOpen(false);
    setMsg("");
    fetchData();
  };

  const handleDialog = () => {
    return (
      <div>
        <Dialog
          open={getOpen}
          onClose={handleClose}
          // aria-labelledby="form-dialog-title"
        >
          {/* <DialogTitle id="form-dialog-title">Package Edit </DialogTitle> */}
          {/* <DialogContent> */}
          <DialogContentText>
            <div class="panel panel-default no-bd">
              <div class="panel-header bg-dark">
                <h3 class="panel-title" style={{ padding: 10 }}>
                  <strong>Edit</strong>
                  Package
                </h3>
              </div>
              <div class="panel-body bg-white">
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <form
                      role="form"
                      class="form-validation"
                      novalidate="novalidate"
                    >
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label class="control-label">Package Name</label>
                            <img src={getErrPackage} width="10" height="10" />
                            <div class="append-icon">
                              <input
                                type="text"
                                class="form-control"
                                minlength="3"
                                required=""
                                aria-required="true"
                                placeholder="Package Name"
                                value={getPackageName}
                                onChange={(event) =>
                                  setPackageName(event.target.value)
                                }
                              />
                              <i class="fa fa-edit"></i>
                            </div>
                          </div>
                        </div>

                        <div class="col-sm-12">
                          <div class="form-group">
                            <label class="control-label">Discription</label>
                            <img src={getErrDes} width="10" height="10" />
                            <div class="append-icon">
                              <input
                                type="text"
                                class="form-control"
                                minlength="3"
                                required=""
                                aria-required="true"
                                placeholder="Discription"
                                value={getDescription}
                                onChange={(event) =>
                                  setDescription(event.target.value)
                                }
                              />
                              <i class="fa fa-edit"></i>
                            </div>
                          </div>
                        </div>

                        <div class="col-sm-6">
                          <div class="form-group">
                            <label class="control-label">Price</label>
                            <img src={getErrPrice} width="10" height="10" />
                            <div class="append-icon">
                              <input
                                type="text"
                                class="form-control"
                                minlength="3"
                                placeholder="Price"
                                required=""
                                aria-required="true"
                                value={getPrice}
                                onChange={(event) =>
                                  setPrice(event.target.value)
                                }
                              />
                              <i class="fa fa-rupee"></i>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label class="control-label">Offer Price</label>
                            <img
                              src={getErrOfferPrice}
                              width="10"
                              height="10"
                            />
                            <div class="append-icon">
                              <input
                                type="text"
                                class="form-control"
                                minlength="4"
                                placeholder="Offer Price"
                                required=""
                                aria-required="true"
                                value={getOfferPrice}
                                onChange={(event) =>
                                  setOfferPrice(event.target.value)
                                }
                              />
                              <i class="fa fa-rupee"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label class="control-label">Duration</label>
                            <img src={getErrDuration} width="10" height="10" />
                            <div class="append-icon">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Duration"
                                required=""
                                aria-required="true"
                                value={getDuration}
                                onChange={(event) =>
                                  setDuration(event.target.value)
                                }
                              />
                              <i class="icon-clock"></i>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label class="control-label">No. of user</label>
                            <img src={getErrNoOfusers} width="10" height="10" />
                            <div class="append-icon">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="No. of user"
                                required=""
                                aria-required="true"
                                value={getNoOfusers}
                                onChange={(event) =>
                                  setNoOfUsers(event.target.value)
                                }
                              />
                              <i class="icon-user"></i>
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
                            onChange={(event) => handleIcon(event)}
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
                              src={getIcon.fileIcon}
                              className={classes.avatortheme}
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
                      <b>{getMsg}</b>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={classes.center}>
                <Paper className={classes.paperStyle}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} className={classes.subclass}>
                      <img src={"/images/tick.png"} width="10" height="10" />
                      <TextField
                        fullWidth
                        label="Package Id"
                        value={getPackageId}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.subclass}>
                      <img src={getErrPackage} width="10" height="10" />
                      <TextField
                        fullWidth
                        label="Package Name"
                        value={getPackageName}
                        variant="standard"
                        onChange={(event) => setPackageName(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.subclass}>
                      <img src={getErrDes} width="10" height="10" />
                      <TextField
                        fullWidth
                        label="Description"
                        value={getDescription}
                        variant="standard"
                        onChange={(event) => setDescription(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.subclass}>
                      <img src={getErrPrice} width="10" height="10" />
                      <TextField
                        fullWidth
                        label="Price"
                        value={getPrice}
                        variant="standard"
                        onChange={(event) => setPrice(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.subclass}>
                      <img src={getErrOfferPrice} width="10" height="10" />
                      <TextField
                        fullWidth
                        label="Offer Price"
                        value={getOfferPrice}
                        variant="standard"
                        onChange={(event) => setOfferPrice(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.subclass}>
                      <img src={getErrDuration} width="10" height="10" />
                      <TextField
                        fullWidth
                        label="Duration"
                        value={getDuration}
                        variant="standard"
                        onChange={(event) => setDuration(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.subclass}>
                      <img src={getErrNoOfusers} width="10" height="10" />
                      <TextField
                        fullWidth
                        label="No of Users"
                        value={getNoOfusers}
                        variant="standard"
                        onChange={(event) => setNoOfUsers(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                      <img src={getErrIcon} width="10" height="10" />
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-fileicon"
                        multiple
                        type="file"
                        onChange={(event) => handleIcon(event)}
                      />
                      <label htmlFor="contained-button-fileicon">
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          startIcon={<CloudUploadIcon />}
                          component="span"
                        >
                          Upload Icon
                        </Button>
                      </label>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                      <Avatar
                        alt="Remy Sharp"
                        variant="rounded"
                        src={getIcon.fileIcon}
                        className={classes.avatortheme}
                      />
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
                </Paper>
              </div> */}
          </DialogContentText>
          {/* </DialogContent> */}
          <DialogActions>
            <Button
              className="btn btn-danger btn-rounded btn-transparent"
              onClick={handleClose}
              // color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  return (
    <div>
      <div className={classes.tableDiv}>
        <div class="panel-header bg-dark">
          <h3 class="panel-title" style={{ color: "#FFF", padding: 17 }}>
            <strong>Package List</strong>
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
