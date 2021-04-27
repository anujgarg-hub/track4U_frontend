import React, { useEffect, useState } from "react";
import { postData, getData, ServerURL } from "../FetchNodeServices";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { checkRequire } from "../Checks";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  root: {
    // marginTop: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  mainpaper: {
    width: 500,
    margin: 7,
    padding: 15,
    backgroundColor: "#f1f2f6",
  },
  button: {
    width: 160,
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
    marginBottom: 10,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
}));

function FeaturesPackages() {
  const classes = useStyles();
  const [getPackageId, setPackageId] = useState("");
  const [getPackageTime, setPackageTime] = useState("");
  const [getPackageDistance, setPackageDistance] = useState("");
  const [getFeaturePackages, setFeaturePackages] = useState("");
  const [getFeatureDescription, setFeatureDescription] = useState("");
  const [getStatus, setStatus] = useState("");
  const [getErrPackageId, setErrPackageId] = useState("");
  const [getErrPackageTime, setErrPackageTime] = useState("");
  const [getErrPackageDistance, setErrPackageDistance] = useState("");
  const [getMsg, setMsg] = useState("");
  const [getList, setList] = useState([]);

  const ClearData = () => {
    setPackageId("");
    setPackageTime("");
    setPackageDistance("");
    setFeaturePackages("");
    setFeatureDescription("");
    setStatus("");
    setMsg("");
    setErrPackageId("");
    setErrPackageTime("");
    setErrPackageDistance("");
  };

  const handleSubmit = async () => {
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
        packageid: getPackageId,
        packagetime: getPackageTime,
        packagedistance: getPackageDistance,
        featurepackages: getFeaturePackages,
        featuredescription: getFeatureDescription,
        status: getStatus,
      };
      console.log(body);
      var result = await postData("featurespackages/addnewrecord", body);

      if (result) {
        setMsg("Record Submitted ...");
      } else {
        setMsg("Fail to submit Record ..");
      }
    } else {
      setMsg("Error in Input");
    }
  };

  const fetchAllPackages = async () => {
    var list = await getData("packages/displayall");
    setList(list.data);
  };

  useEffect(function () {
    fetchAllPackages();
  }, []);

  const handlePackageChange = (event) => {
    setPackageId(event.target.value);
  };

  const fillPackageItem = () => {
    return getList.map((item, key) => {
      return <MenuItem value={item.packageid}>{item.packagename}</MenuItem>;
    });
  };

  return (
    <div>
      <div class="">
        <div class="panel panel-default no-bd">
          <div class="panel-header bg-dark">
            <h3 class="panel-title">
              <strong>Add Features Packages</strong> 
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
                        <label class="control-label">Packages</label>
                        <img src={getErrPackageId} width="10" height="10" />
                        <div class="append-icon">
                          {/* <FormControl fullWidth> */}

                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={getPackageId}
                            fullWidth="true"
                            onChange={(event) => handlePackageChange(event)}
                          >
                            {fillPackageItem()}
                          </Select>
                          {/* </FormControl> */}
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Package Time</label>
                        <img src={getErrPackageTime} width="10" height="10" />
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
                          <i class="fa fa-clock "></i>
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Package Distance</label>
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
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Feature Package</label>
                        {/* <img src={getErrPackageTime} width="10" height="10" /> */}
                        <div class="append-icon">
                          <input
                            type="text"
                            class="form-control"
                            minlength="3"
                            placeholder="Feature Packages"
                            required=""
                            aria-required="true"
                            value={getFeaturePackages}
                            onChange={(event) => {
                              setFeaturePackages(event.target.value);
                            }}
                          />
                          <i class="fa fa-clock "></i>
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Feature Description</label>
                        {/* <img src={getErrPackageTime} width="10" height="10" /> */}
                        <div class="append-icon">
                          <input
                            type="text"
                            class="form-control"
                            minlength="3"
                            placeholder="Description"
                            required=""
                            aria-required="true"
                            value={getFeatureDescription}
                            onChange={(event) => {
                              setFeatureDescription(event.target.value);
                            }}
                          />
                          <i class="fa fa-clock "></i>
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-3">
                      <label class="control-label">Status</label>
                      <select
                        class="form-control"
                        value={getStatus}
                        onChange={(event) => setStatus(event.target.value)}
                      >
                        <option>----Status----</option>
                        <option value="Activate">Activate</option>
                        <option value="Deactivate">Deactivate</option>
                      </select>
                    </div>
                  </div>

                  <div class="text-center  m-t-20">
                    <button
                      className="btn btn-success btn-transparent"
                      type="submit"
                      // class="btn btn-embossed btn-primary"
                      onClick={(event) => {
                        handleSubmit();
                      }}
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

      {/* <Paper className={classes.mainpaper}>
        <Paper elevation={1} className={classes.headingstyle}>
          <Typography variant="h6" gutterBottom>
            <b>&nbsp;&nbsp;&nbsp;Add Features Packages </b>
          </Typography>
        </Paper>

        <Grid container spacing={1}>
          <Grid item xs={12} className={classes.center}>
            <img src={getErrPackageId} width="10" height="10" />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Packages</InputLabel>
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
              variant="standard"
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
              variant="standard"
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
              className={classes.button}
              onClick={(event) => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </Grid>

          <Grid item xs={6} className={classes.container}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={(event) => {
                ClearData();
              }}
            >
              Reset
            </Button>
          </Grid>

          <Grid item xs={6}>
            <b>Message:&nbsp;&nbsp;{getMsg}</b>
          </Grid>
        </Grid>
      </Paper> */}
    </div>
  );
}

export default FeaturesPackages;
