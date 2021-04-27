import React, { useEffect, useState } from "react";
import { postData, getData, ServerURL } from "../FetchNodeServices";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
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

function PackageCustomer() {
  const classes = useStyles();
  const [getVendorId, setVendorId] = useState("");
  const [getPackageId, setPackageId] = useState("");
  const [getdate, setdate] = useState("");
  const [getAssign, setAssign] = useState("");
  const [getAssignDate, setAssignDate] = useState("");
  //   const [getErrPackageId, setErrPackageId] = useState("");
  const [getMsg, setMsg] = useState("");
  const [getList, setList] = useState([]);
  const [getVendorList, setVendorList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault()
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
        packageid: getPackageId,
        vendorid: getVendorId,
        assignby: getAssign,
        assigndate: getAssignDate,
      };
      console.log(body);
      var result = await postData("profile/add", body);

      if (result) {
        setMsg("Record Submitted ...");
      } else {
        setMsg("Fail to submit Record ..");
      }
    } else {
      setMsg("Error in Input");
    }
    setPackageId("");
    setVendorId("");
    setAssign("");
    setAssignDate("");
    setMsg("");
  };

  const fetchAllPackages = async () => {
    var list = await getData("packages/displayall");
    setList(list.data);
  };

  const fetchAllVendors = async () => {
    var list = await getData("vendors/displayall");
    setVendorList(list.data);
  };

  useEffect(function () {
    fetchAllPackages();
    fetchAllVendors();
  }, []);

  const handlePackageChange = (event) => {
    setPackageId(event.target.value);
  };

  const handleVendorChange = (event) => {
    setVendorId(event.target.value);
  };

  const fillPackageItem = () => {
    return getList.map((item, key) => {
      return <MenuItem value={item.packageid}>{item.packagename}</MenuItem>;
    });
  };

  const fillVendorItem = () => {
    return getVendorList.map((item, key) => {
      return <MenuItem value={item.vendorid}>{item.vendorname}</MenuItem>;
    });
  };

//   const todayDate = (e) => {
//     setdate(e.target.value);
//     const today = new Date(e.target.value);
//     const tomorrow = new Date(today);
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     setExpiredate(tomorrow.toString().substr(0,16))
//   };

  return (
    <div>
      <div class="">
        <div class="panel panel-default no-bd">
          <div class="panel-header bg-dark">
            <h3 class="panel-title">
              <strong>Add Profile</strong>
            </h3>
          </div>
          <div class="panel-body bg-white">
            <div class="row">
              <div class="col-md-12 ">
                <form
                  role="form"
                  class="form-validation"
                  novalidate="novalidate"
                  onSubmit={handleSubmit}
                >
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Package</label>
                        {/* <img src={getErrPackageId} width="10" height="10" /> */}
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
                        <label class="control-label">Vendors</label>
                        {/* <img src={getErrPackageId} width="10" height="10" /> */}
                        <div class="append-icon">
                          {/* <FormControl fullWidth> */}

                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={getVendorId}
                            fullWidth="true"
                            onChange={(event) => handleVendorChange(event)}
                          >
                            {fillVendorItem()}
                          </Select>
                          {/* </FormControl> */}
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Assign By</label>
                        {/* <img src={getErrPackageTime} width="10" height="10" /> */}
                        <div class="append-icon">
                          <input
                            type="text"
                            class="form-control"
                            minlength="3"
                            placeholder="Assign By"
                            required=""
                            aria-required="true"
                            value={getAssign}
                            // onChange={(e) => todayDate(e)}
                            onChange={(event) => {
                              // today(event);
                              setAssign(event.target.value);
                            }}
                          />
                          <i class="fa fa-clock "></i>
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Assign Date</label>
                        {/* <img src={getErrPackageTime} width="10" height="10" /> */}
                        <div class="append-icon">
                          <input
                            type="date"
                            class="form-control"
                            minlength="3"
                            placeholder="Date"
                            required=""
                            aria-required="true"
                            value={getAssignDate}
                            onChange={(e) => setAssignDate(e.target.value)}
                          />
                          <i class="fa fa-clock "></i>
                        </div>
                      </div>
                    </div>

                    {/* <div class="col-sm-6">
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
                        onChange={(event) => setStatus(event.target.value)}
                      >
                        <option>----Status----</option>
                        <option value="Activate">Activate</option>
                        <option value="Deactivate">Deactivate</option>
                      </select>
                    </div> */}
                  </div>

                  <div class="text-center  m-t-20">
                    <button
                      className="btn btn-success btn-transparent"
                      type="submit"
                      // class="btn btn-embossed btn-primary"
                      // onSubmit={handleSubmit}
                    >
                      Submit
                    </button>
                    <button
                      className="btn btn-danger btn-transparent"
                      type="reset"
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

export default PackageCustomer;
