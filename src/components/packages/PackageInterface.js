import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { postDataAndImage } from "../FetchNodeServices";
import { checkRequire } from "../Checks";
//import {MDBIcon} from "mdbreact";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 30,
  },
  paperStyle: {
    width: 520,
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
    width: 50,
    height: 50,
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
    width: "100%",
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
}));

function PackageInterface() {
  const classes = useStyles();
  const [getPackageName, setPackageName] = useState("");
  const [getIcon, setIcon] = useState({ icon: "", fileIcon: "" });
  const [getPrice, setPrice] = useState("");
  const [getDescription, setDescription] = useState("");
  const [getOfferPrice, setOfferPrice] = useState("");
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

  const handleIcon = (event) => {
    setIcon({
      icon: event.target.files[0],
      fileIcon: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleSubmit = async () => {
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

    if (!checkRequire(getIcon.icon)) {
      err = true;
      setErrIcon("/images/cross.png");
    }
    if (checkRequire(getIcon.icon)) {
      setErrIcon("/images/tick.png");
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
      formData.append("price", getPrice);
      formData.append("Icon", getIcon.icon);
      formData.append("offerprice", getOfferPrice);
      formData.append("noofusers", getNoOfusers);
      formData.append("duration", getDuration);

      var config = { headers: { "content-type": "multipart/form-data" } };
      var result = await postDataAndImage(
        "packages/addnewpackage",
        formData,
        config
      );
      console.log(result);
      if (result) {
        setMsg("Record Submitted..");
      } else {
        setMsg("Fail To Submit..");
      }
    } else {
      setMsg("Error in Input");
    }
  };
  const ClearData = () => {
    setPackageName("");
    setDescription("");
    setIcon({ icon: "", fileIcon: "" });
    setPrice("");
    setOfferPrice("");
    setDuration("");
    setNoOfUsers("");
    setMsg("");
    setErrNoOfusers("");
    setErrPackage("");
    setErrDes("");
    setErrIcon("");
    setErrDuration("");
    setErrPrice("");
    setErrOfferPrice("");
  };

  return (
    <div className={classes.root}>
      <div style={{ width: "100%" }}>
        <div class="panel panel-default no-bd">
          <div class="panel-header bg-dark">
            <h3 class="panel-title">
              <strong>Add New Package</strong>
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
                            onChange={(event) => setPrice(event.target.value)}
                          />
                          <i class="fa fa-rupee"></i>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Offer Price</label>
                        <img src={getErrOfferPrice} width="10" height="10" />
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
                        <div class="append-icon" >
                        
                        <DatePicker                       
                        // wrapperClassName={{width:'100%'}}
                         className="form-control"
                        selected={getDuration}
                        value={getDuration}
                         onChange={date => setDuration(date)} 
                         minDate={new Date()}
                         aria-required="true"
                        //  fullWidth
                         placeholderText="Duration"
                         label="Duration"
                        //  width='100%'
                        //  width={100}
                         />
                         
                          {/* <input
                            type="text"
                            class="form-control"
                            placeholder="Duration"
                            required=""
                            aria-required="true"
                            value={getDuration}
                            onChange={(event) =>
                              setDuration(event.target.value)
                            }
                          /> */}
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
                      className="btn btn-success btn-transparent"
                      type="submit"
                      // class="btn btn-embossed btn-primary"
                      onClick={() => handleSubmit()}
                    >
                      Save
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Paper className={classes.paperStyle}>
        <Paper elevation={1} className={classes.paperHeading}>
          <Typography variant="h6" gutterBottom>
            Add New Package
          </Typography>
        </Paper>
        <Grid container spacing={1}>
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
              onClick={() => handleSubmit()}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={6} className={classes.center}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => ClearData()}
            >
              Reset
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
  );
}

export default PackageInterface;
