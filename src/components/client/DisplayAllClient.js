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
import { checkRequire, checkEmail, checkMobile } from "../Checks";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { statecity } from "../statecity/StateCity";

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
  root: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    display: "none",
  },
  paperstyle: {
    width: 600,
    margin: 30,
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
    marginTop: 10,
  },

  button: {
    width: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

function DisplayAllClient() {
  const [states, setStates] = useState({
    columns: [
      { title: "Client Id", field: "clientid", editable: "never" },
      { title: "Client Name", field: "clientname", editable: "never" },
      { title: "Address", field: "clientaddress", editable: "never" },
      { title: "Firm Name", field: "firmname", editable: "never" },
      { title: "Mobile No", field: "mobileno", editable: "never" },
      { title: "Email", field: "email", editable: "never" },
    ],
  });

  const [getList, setList] = useState([]);
  const [getOpen, setOpen] = useState(false);
  const [getClientId, setClientId] = useState("");
  const [getClientName, setClientName] = useState("");
  const [getClientAddress, setClientAddress] = useState("");
  const [getState, setState] = useState("");
  const [getCity, setCity] = useState("");
  const [getFirmName, setFirmName] = useState("");
  const [getMobileNo, setMobileNo] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getDescription, setDescription] = useState("");
  const [getVendorId, setVendorId] = useState("");
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

  const fetchData = async (V_id) => {
    let body = {
      vendorid: V_id,
    };
    let list = await postData("client/displayall", body);
    setList(list.data);
  };

  useEffect(function () {
    var vendor = JSON.parse(localStorage.getItem("vendor"));
    fetchData(vendor.vendorid);
    fetchStates();
  }, []);

  const fetchStates = async () => {
    var list = [];
    statecity.map(function (item, key) {
      list[key] = item.state;
    });
    setStateList(list);
  };

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
  const handleDelete = async (oldData) => {
    let body = { clientid: oldData.clientid };
    await postData("client/deleteRecord", body);
  };

  const handleClickOpen = async (rowData) => {
    setOpen(true);
    fetchCity(rowData.state);
    setClientId(rowData.clientid);
    setClientName(rowData.clientname);
    setClientAddress(rowData.clientaddress);
    setState(rowData.state);
    setCity(rowData.city);
    setFirmName(rowData.firmname);
    setMobileNo(rowData.mobileno);
    setEmail(rowData.email);
    setDescription(rowData.description);
    setVendorId(rowData.vendorid);
  };

  const handleClose = () => {
    setOpen(false);
    setMsg("");
    setErrClientName("");
    setErrClientAddress("");
    setErrState("");
    setErrCity("");
    setErrFirmName("");
    setErrMobileNo("");
    setErrEmail("");
    setErrDescription("");
    fetchData();
  };

  const handleEdit = async () => {
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
        clientid: getClientId,
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
      var result = await postData("client/editRecord", body);

      if (result) {
        setMsg("Record Edited ...");
      } else {
        setMsg("Fail to Edit Record ..");
      }
    } else {
      setMsg("Error in Input");
    }
  };

  const editDialog = () => {
    return (
      <div>
        <Dialog
          open={getOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xl"
        >
          {/* <DialogTitle id="alert-dialog-title">{"Client Edit"}</DialogTitle> */}

          <div>
            <div class="panel panel-default no-bd" style={{ width: "100%" }}>
              <div class="panel-header bg-dark">
                <h3 class="panel-title" style={{ padding: 10 }}>
                  <strong>Client </strong> Edit
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
                            <label class="control-label">Client Id</label>
                            <i
                              class="fa fa-check"
                              style={{ marginLeft: 5 }}
                            ></i>
                            <div class="append-icon">
                              <input
                                type="text"
                                class="form-control"
                                minlength="3"
                                placeholder="Client Id"
                                required=""
                                aria-required="true"
                                value={getClientId}
                              />
                              <i class="fa fa-edit "></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label class="control-label">Client Name</label>
                            <img
                              src={getErrClientName}
                              width="10"
                              height="10"
                            />
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
                            <img
                              src={getErrClientAddress}
                              width="10"
                              height="10"
                            />
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
                                onChange={(event) =>
                                  setCity(event.target.value)
                                }
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
                            <img
                              src={getErrDescription}
                              width="10"
                              height="10"
                            />
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
                          onClick={() => handleEdit()}
                        >
                          Save Record
                        </button>
                      </div>
                      {getMsg}
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* <Paper className={classes.paperstyle}>    

    <Grid container spacing={2} >

    <Grid item xs={12} className={classes.gridStyle}>
    <img src={'/images/tick.png'} width='10' height='10' />
        <TextField id="standard-basic" label="Client Id"  fullWidth variant="standard" value={getClientId}  />
        </Grid> 
      
        <Grid item xs={12} className={classes.gridStyle}>
        <img src={getErrClientName} width='10' height='10' />            
        <TextField id="standard-basic" label="Client Name"  fullWidth variant="standard" value={getClientName} onChange={(event)=>{setClientName(event.target.value)}} />
        </Grid> 

        <Grid item xs={12} className={classes.gridStyle}>
        <img src={getErrClientAddress} width='10' height='10' />              
        <TextField id="standard-basic" label="Client Address" variant="standard" fullWidth value={getClientAddress} onChange={(event)=>{setClientAddress(event.target.value)}}  /> 
        </Grid>

        <Grid item xs={12} className={classes.gridStyle}>
        <img src={getErrFirmName} width='10' height='10' />           
        <TextField id="standard-basic" label="Firm Name"  fullWidth variant="standard" value={getFirmName} onChange={(event)=>{setFirmName(event.target.value)}} /> 
        </Grid>

        <Grid item xs={6} className={classes.gridStyle}>
        <img src={getErrState} width='10' height='10' /> 
        <FormControl fullWidth>      
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getState}
          onChange={(event)=>handleState(event)}
        >  <MenuItem value="">Select State</MenuItem>
         {fillStates()}
        </Select>
      </FormControl></Grid>
      
        <Grid item xs={6} className={classes.gridStyle}>
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
      </FormControl> </Grid> 


        <Grid item xs={6} className={classes.gridStyle}>
        <img src={getErrMobileNo} width='10' height='10' />            
        <TextField id="standard-basic" label="Mobile No"  fullWidth variant="standard" value={getMobileNo} onChange={(event)=>{setMobileNo(event.target.value)}} /> 
        </Grid>  

         <Grid item xs={6} className={classes.gridStyle}>
        <img src={getErrEmail} width='10' height='10' />            
        <TextField id="standard-basic" label="Email"  fullWidth variant="standard" value={getEmail} onChange={(event)=>{setEmail(event.target.value)}} /> 
        </Grid>        

        <Grid item xs={12} className={classes.gridStyle}>
        <img src={getErrDescription} width='10' height='10' />            
        <TextField id="standard-basic" label="Description"  fullWidth variant="standard" value={getDescription} onChange={(event)=>{setDescription(event.target.value)}} /> 
        </Grid> 

        <Grid item xs={12} className={classes.gridStyle}>
        <img src={getErrVendorId} width='10' height='10' />            
        <TextField id="standard-basic" label="Vendor Id"  fullWidth variant="standard" value={getVendorId} onChange={(event)=>{setVendorId(event.target.value)}} /> 
        </Grid>

        <Grid item xs={6} className={classes.container}>
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleEdit()} >
         Save Record
        </Button>
        </Grid>


        <Grid item xs={12} style={{marginLeft:5}}>
       <b>Message:&nbsp;&nbsp;{getMsg}</b>
        </Grid>

  </Grid>
</Paper> */}
          </div>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
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
            <strong>Display All Client</strong>
          </h3>
        </div>
        <MaterialTable
          style={{ backgroundColor: "#FFF" }}
          title=" "
          columns={states.columns}
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

export default DisplayAllClient;
