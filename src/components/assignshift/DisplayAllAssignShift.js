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
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

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
    marginLeft: 20,
    marginRight: 20,
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
    minWidth: 220,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

function DisplayAllAssignShift() {
  const [state, setState] = useState({
    columns: [
      { title: "Assign Shift Id", field: "assignshiftid", editable: "never" },
      { title: "Shift Id", field: "shiftid", editable: "never" },
      {
        title: "Assign Date",
        field: "assigndate",
        render: (rowData) => <div>{displayDate(rowData.assigndate)}</div>,
      },
      {
        title: "End Date",
        field: "enddate",
        render: (rowData) => <div>{displayDate(rowData.enddate)}</div>,
      },
      { title: "No Of Days", field: "noofdays", editable: "never" },
      { title: "Status", field: "status", editable: "never" },
    ],
  });

  const [getList, setList] = useState([]);
  const [getShiftList, setShiftList] = useState([]);
  const [getOpen, setOpen] = useState(false);

  const [getAssignShiftId, setAssignShiftId] = useState("");
  const [getVendorId, setVendorId] = useState("");
  const [getEmployeeId, setEmployeeId] = useState("");
  const [getShiftId, setShiftId] = useState("");
  const [selectedAssignDate, setSelectedAssignDate] = React.useState(
    new Date()
  );
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
  const [getNoOfDays, setNoOfDays] = useState("");
  const [getStatus, setStatus] = useState("");
  const [getMsg, setMsg] = useState("");
  const [getErrVendorId, setErrVendorId] = useState("");
  const [getErrEmployeeId, setErrEmployeeId] = useState("");
  const [getErrShiftId, setErrShiftId] = useState("");
  const [ErrselectedAssignDate, setErrSelectedAssignDate] = React.useState(
    new Date()
  );
  const [ErrselectedEndDate, setErrSelectedEndDate] = React.useState(
    new Date()
  );
  const [getErrNoOfDays, setErrNoOfDays] = useState("");
  const [getErrStatus, setErrStatus] = useState("");
  const [getEmployeesList, setEmployeesList] = useState([]);

  const fetchData = async () => {
    let list = await getData("assignshift/displayall");
    setList(list.data);
  };

  useEffect(function () {
    fetchData();
    fetchAllShift();
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    var list = await getData("employees/displayall");
    setEmployeesList(list.data);
  };

  const fillEmployees = () => {
    return getEmployeesList.map(function (item, key) {
      return (
        <MenuItem value={item.employeeid}>
          {item.employeename}&nbsp;&nbsp;{item.mobileno}
        </MenuItem>
      );
    });
  };

  const handleDelete = async (oldData) => {
    let body = { assignshiftid: oldData.assignshiftid };
    await postData("assignshift/deleteRecord", body);
  };

  const handleClickOpen = async (rowData) => {
    setOpen(true);
    fetchShiftInEditform(rowData.assignshiftid);
    setAssignShiftId(rowData.assignshiftid);
    setVendorId(rowData.vendorid);
    setEmployeeId(rowData.employeeid);
    setShiftId(rowData.shiftid);
    setSelectedAssignDate(rowData.assigndate);
    setSelectedEndDate(rowData.enddate);
    setNoOfDays(rowData.noofdays);
    setStatus(rowData.status);
  };

  const fetchShiftInEditform = async (assignshiftid) => {
    var body = { assigntshiftid: assignshiftid };
    //console.log(brandid)
    var list = await postData("assignshift/displayShiftInEditform", body);
    console.log("nidhi", list);
    //setShiftId(list[0].shiftid)
  };

  const fetchAllShift = async () => {
    var list = await getData("shifts/displayall");
    setShiftList(list.data);
  };

  const handleShiftChange = (event) => {
    setShiftId(event.target.value);
  };

  const fillShiftItem = () => {
    return getShiftList.map(function (item, key) {
      let st = new Date(item.shiftstarttime);
      var hs = st.getHours();
      var ms = st.getMinutes();
      var start = hs > 12 ? hs - 12 + ":" + ms + " PM" : hs + ":" + ms + " AM";
      let et = new Date(item.shiftendtime);
      var he = et.getHours();
      var me = et.getMinutes();
      var end = he > 12 ? he - 12 + ":" + me + " PM" : he + ":" + me + " AM";
      return (
        <MenuItem value={item.shiftid}>
          {start}&nbsp;to&nbsp;{end}
        </MenuItem>
      );
    });
  };

  const displayDate = (date) => {
    let d = new Date(date);
    let cd = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    return cd;
  };

  const handleClose = () => {
    setOpen(false);
    fetchData();
    setMsg("");
    setErrVendorId("");
    setErrEmployeeId("");
    setErrShiftId("");
    setErrSelectedAssignDate(new Date());
    setErrSelectedEndDate(new Date());
    setErrStatus("");
    setErrNoOfDays("");
  };

  const handleEdit = async () => {
    var err = false;

    if (!checkRequire(getEmployeeId)) {
      err = true;
      setErrEmployeeId("/images/cross.png");
    }
    if (checkRequire(getEmployeeId)) {
      setErrEmployeeId("/images/tick.png");
    }

    if (!checkRequire(getShiftId)) {
      err = true;
      setErrShiftId("/images/cross.png");
    }
    if (checkRequire(getShiftId)) {
      setErrShiftId("/images/tick.png");
    }

    if (!checkRequire(selectedAssignDate)) {
      err = true;
      setErrSelectedAssignDate("/images/cross.png");
    }
    if (checkRequire(selectedAssignDate)) {
      setErrSelectedAssignDate("/images/tick.png");
    }

    if (!checkRequire(selectedEndDate)) {
      err = true;
      setErrSelectedEndDate("/images/cross.png");
    }
    if (checkRequire(selectedEndDate)) {
      setErrSelectedEndDate("/images/tick.png");
    }

    if (!checkRequire(getNoOfDays)) {
      err = true;
      setErrNoOfDays("/images/cross.png");
    }
    if (checkRequire(getNoOfDays)) {
      setErrNoOfDays("/images/tick.png");
    }

    if (!checkRequire(getStatus)) {
      err = true;
      setErrStatus("/images/cross.png");
    }
    if (checkRequire(getStatus)) {
      setErrStatus("/images/tick.png");
    }

    if (!err) {
      let body = {
        assignshiftid: getAssignShiftId,
        vendorid: getVendorId,
        employeeid: getEmployeeId,
        shiftid: getShiftId,
        assigndate: selectedAssignDate,
        enddate: selectedEndDate,
        noofdays: getNoOfDays,
        status: getStatus,
      };
      console.log(body);
      var result = await postData("assignshift/editRecord", body);

      if (result) {
        setMsg("Record Edited ...");
      } else {
        setMsg("Fail to Edit Record ..");
      }
    } else {
      setMsg("Error in Input");
    }
  };

  const handleAssignDateChange = (date) => {
    setSelectedAssignDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
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
            {"Assign Shift Edit"}
          </DialogTitle> */}

          <div>
            <div class="panel panel-default no-bd" style={{ width: "100%" }}>
              <div class="panel-header bg-dark" style={{ padding: 10 }}>
                <h3 class="panel-title">
                  <strong>Assign Shift </strong> Edit
                </h3>
              </div>
              <div class="panel-body bg-white">
                <div class="row">
                  <div class="col-md-12 ">
                    {/* <form class="form-validation"> */}
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <label class="control-label">Assign Shift Id</label>
                          <i class="fa fa-check"></i>
                          <div class="append-icon">
                            <input
                              type="text"
                              class="form-control"
                              minlength="3"
                              placeholder="Assign Shift Id"
                              required=""
                              aria-required="true"
                              value={getAssignShiftId}
                            />
                            <i class="fa fa-edit "></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
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
                            />
                            <i class="fa fa-edit "></i>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="control-label">No of Days</label>
                          <img src={getErrNoOfDays} width="10" height="10" />
                          <div class="append-icon">
                            <input
                              type="text"
                              class="form-control"
                              minlength="3"
                              placeholder="No of Days"
                              required=""
                              aria-required="true"
                              value={getNoOfDays}
                              onChange={(event) =>
                                setNoOfDays(event.target.value)
                              }
                            />
                            <i class="fa fa-edit "></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="control-label">Employee</label>
                          <img src={getErrEmployeeId} width="10" height="10" />

                          <div class="append-icon">
                            <Select
                              fullWidth
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={getEmployeeId}
                              onChange={(event) =>
                                setEmployeeId(event.target.value)
                              }
                            >
                              {fillEmployees()}
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="control-label">Shifts</label>
                          <img src={getErrShiftId} width="10" height="10" />
                          <div class="append-icon">
                            <Select
                              fullWidth
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={getShiftId}
                              fullWidth="true"
                              onChange={(event) => handleShiftChange(event)}
                            >
                              {fillShiftItem()}
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="control-label">Assign Date</label>
                          <img
                            src={ErrselectedAssignDate}
                            width="10"
                            height="10"
                          />
                          <div class="append-icon">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Assign Date"
                                format="MM/dd/yyyy"
                                fullWidth="true"
                                value={selectedAssignDate}
                                onChange={handleAssignDateChange}
                                KeyboardButtonProps={{
                                  "aria-label": "change date",
                                }}
                              />
                            </MuiPickersUtilsProvider>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="control-label">End Date</label>
                          <img
                            src={ErrselectedEndDate}
                            width="10"
                            height="10"
                          />
                          <div class="append-icon">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="End Date"
                                format="MM/dd/yyyy"
                                fullWidth="true"
                                value={selectedEndDate}
                                onChange={handleEndDateChange}
                                KeyboardButtonProps={{
                                  "aria-label": "change date",
                                }}
                              />
                            </MuiPickersUtilsProvider>
                          </div>
                        </div>
                      </div>

                      <div class="col-sm-12">
                        <div class="form-group">
                          <label class="control-label">Status</label>
                          <img src={getErrStatus} width="10" height="10" />
                          <div class="append-icon">
                            <Select
                              fullWidth
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
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="text-center  m-t-20">
                      <button
                        className="btn btn-success btn-transparent"
                        type="submit"
                        onClick={() => handleEdit()}
                      >
                        Submit
                      </button>
                    </div>
                    {getMsg}
                    {/* </form> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <Paper className={classes.paperstyle}>
              <Grid container spacing={2}>
                <Grid item xs={12} className={classes.gridStyle}>
                  <img src={"/images/tick.png"} width="10" height="10" />
                  <TextField
                    id="standard-basic"
                    label="Assign Shift Id"
                    fullWidth
                    value={getAssignShiftId}
                  />
                </Grid>

                <Grid item xs={6} className={classes.gridStyle}>
                  <img src={"/images/tick.png"} width="10" height="10" />
                  <TextField
                    id="standard-basic"
                    label="Vendor Id"
                    variant="standard"
                    fullWidth
                    value={getVendorId}
                  />
                </Grid>

                <Grid item xs={6} className={classes.gridStyle}>
                  <img src={getErrEmployeeId} width="10" height="10" />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Employee
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={getEmployeeId}
                      onChange={(event) => setEmployeeId(event.target.value)}
                    >
                      {fillEmployees()}
                    </Select>
                  </FormControl>{" "}
                </Grid>

                <Grid item xs={6} className={classes.gridStyle}>
                  <img src={getErrShiftId} width="10" height="10" />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Shifts
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={getShiftId}
                      fullWidth="true"
                      onChange={(event) => handleShiftChange(event)}
                    >
                      {fillShiftItem()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} className={classes.gridStyle}>
                  <img src={getErrNoOfDays} width="10" height="10" />
                  <TextField
                    id="standard-basic"
                    label="No of Days"
                    fullWidth
                    variant="standard"
                    value={getNoOfDays}
                    onChange={(event) => {
                      setNoOfDays(event.target.value);
                    }}
                  />
                </Grid>

                <Grid item xs={6} className={classes.gridStyle}>
                  <img src={ErrselectedAssignDate} width="10" height="10" />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Assign Date"
                      format="MM/dd/yyyy"
                      fullWidth="true"
                      value={selectedAssignDate}
                      onChange={handleAssignDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid item xs={6} className={classes.gridStyle}>
                  <img src={ErrselectedEndDate} width="10" height="10" />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="End Date"
                      format="MM/dd/yyyy"
                      fullWidth="true"
                      value={selectedEndDate}
                      onChange={handleEndDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid item xs={12} className={classes.gridStyle}>
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
                    color="primary"
                    className={classes.button}
                    onClick={() => handleEdit()}
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
            <strong>Assign Shift List</strong>
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

export default DisplayAllAssignShift;
