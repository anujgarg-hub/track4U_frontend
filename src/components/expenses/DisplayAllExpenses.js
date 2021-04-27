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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { checkRequire } from "../Checks";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Avatar from "@material-ui/core/Avatar";
import Radio from "@material-ui/core/Radio";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 30,
  },
  tableDiv: {
    width: window.innerWidth * 0.77,
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
    width: 900,
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

export default function DisplayAllExpenses() {
  const classes = useStyles();
  const [getList, setList] = useState([]);
  const [getOpen, setOpen] = useState(false);
  const [getExpensesId, setExpensesId] = useState("");
  const [getVendorId, setVendorId] = useState("");
  const [getEmployeeId, setEmployeeId] = useState("");
  const [getExpensesOn, setExpensesOn] = useState("");
  const [getShortDescription, setShortDescription] = useState("");
  const [getDate, setDate] = useState("");
  const [getTime, setTime] = useState("");
  const [getDescription, setDescription] = useState("");
  const [getAmount, setAmount] = useState("");
  const [getBillImage, setBillImage] = useState({ img: "", fileImg: "" });
  const [getStatus, setStatus] = useState("");
  const [getMsg, setMsg] = useState("");
  const [getErrEmployeeId, setErrEmployeeId] = useState("");
  const [getErrExpensesOn, setErrExpensesOn] = useState("");
  const [getErrShortDescription, setErrShortDescription] = useState("");
  const [getErrDate, setErrDate] = useState("");
  const [getErrTime, setErrTime] = useState("");
  const [getErrDescription, setErrDescription] = useState("");
  const [getErrAmount, setErrAmount] = useState("");
  const [getErrStatus, setErrStatus] = useState("");
  const [getEmployeesList, setEmployeesList] = useState([]);
  const [state, setState] = useState({
    columns: [
      { title: "Id", field: "expensesid" },
      { title: "Vendor Id", field: "vendorid" },
      { title: "Employee Id", field: "employeeid" },
      {
        title: "Date",
        field: "date",
        render: (rowData) => <div>{displayDate(rowData.date)}</div>,
      },
      {
        title: "Time",
        field: "time",
        render: (rowData) => <div>{displayTime(rowData.time)}</div>,
      },
      { title: "Short Description", field: "shortdescription" },
      { title: "Amount", field: "amount" },
      {
        title: "BillImage",
        render: (rowData) => (
          <div>
            <Avatar
              alt="Remy Sharp"
              variant="rounded"
              src={`${ServerURL}/images/${rowData.billimage}`}
              className={classes.avatortheme}
            />
          </div>
        ),
      },
      {
        title: "Status",
        field: "status",
        render: (rowData) => (
          <div>
            {rowData.status == "Approved" ? (
              <button
                className="btn btn-success btn-rounded btn-transparent"
                value={rowData.status}
                style={{ width: 150 }}
                // class="btn btn-embossed btn-primary"
              >
                {rowData.status}
              </button>
            ) : (
              <button
                className="btn btn-danger btn-rounded btn-transparent"
                value={rowData.status}
                onClick={() => alert(rowData.status)}
                style={{ width: 150 }}
                // class="btn btn-embossed btn-primary"
              >
                {rowData.status}
              </button>
            )}
          </div>
        ),
      },
    ],
  });

  const displayDate = (date) => {
    let d = new Date(date);
    let cd = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    return cd;
  };

  const displayTime = (time) => {
    let tm = new Date(time);
    var h = tm.getHours();
    var m = tm.getMinutes();
    var t = h > 12 ? h - 12 + ":" + m + " PM" : h + ":" + m + " AM";
    return t;
  };

  useEffect(function () {
    var vendor = JSON.parse(localStorage.getItem("vendor"));
    fetchData(vendor.vendorid);
    fetchEmployees(vendor.vendorid);
  }, []);

  const fetchData = async (V_id) => {
    let body = {
      vendorid: V_id,
    };
    let list = await postData("expenses/displayall", body);
    setList(list.data);
  };

  const fetchEmployees = async (V_id) => {
    let body = {
      vendorid: V_id,
    };
    var list = await postData("employees/displayall", body);
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
    var body = { expensesid: oldData.expensesid };
    var result = await postData("expenses/deleteRecord", body);
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

    if (!checkRequire(getExpensesOn)) {
      err = true;
      setErrExpensesOn("/images/cross.png");
    }
    if (checkRequire(getExpensesOn)) {
      setErrExpensesOn("/images/tick.png");
    }

    if (!checkRequire(getShortDescription)) {
      err = true;
      setErrShortDescription("/images/cross.png");
    }
    if (checkRequire(getShortDescription)) {
      setErrShortDescription("/images/tick.png");
    }

    if (!checkRequire(getDate)) {
      err = true;
      setErrDate("/images/cross.png");
    }
    if (checkRequire(getDate)) {
      setErrDate("/images/tick.png");
    }

    if (!checkRequire(getTime)) {
      err = true;
      setErrTime("/images/cross.png");
    }
    if (checkRequire(getTime)) {
      setErrTime("/images/tick.png");
    }

    if (!checkRequire(getDescription)) {
      err = true;
      setErrDescription("/images/cross.png");
    }
    if (checkRequire(getDescription)) {
      setErrDescription("/images/tick.png");
    }

    if (!checkRequire(getAmount)) {
      err = true;
      setErrAmount("/images/cross.png");
    }
    if (checkRequire(getAmount)) {
      setErrAmount("/images/tick.png");
    }

    if (!checkRequire(getStatus)) {
      err = true;
      setErrStatus("/images/cross.png");
    }
    if (checkRequire(getStatus)) {
      setErrStatus("/images/tick.png");
    }

    if (!err) {
      var formData = new FormData();
      formData.append("vendorid", getVendorId);
      formData.append("employeeid", getEmployeeId);
      formData.append("expenseson", getExpensesOn);
      formData.append("shortdescription", getShortDescription);
      formData.append("date", getDate);
      formData.append("time", getTime);
      formData.append("description", getDescription);
      formData.append("amount", getAmount);
      formData.append("billimage", getBillImage.img);
      formData.append("status", getStatus);
      formData.append("expensesid", getExpensesId);
      var config = { headers: { "content-type": "multipart/form-data" } };
      var result = await postDataAndImage(
        "expenses/updateRecord",
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

  const handleClickOpen = async (rowData) => {
    setOpen(true);
    setVendorId(rowData.vendorid);
    setEmployeeId(rowData.employeeid);
    setExpensesOn(rowData.expenseson);
    setExpensesId(rowData.expensesid);
    setBillImage({
      img: "",
      fileImg: `${ServerURL}/images/${rowData.billimage}`,
    });
    setAmount(rowData.amount);
    setStatus(rowData.status);
    setDescription(rowData.description);
    setShortDescription(rowData.shortdescription);
    setDate(rowData.date);
    setTime(rowData.time);
  };

  const handleClose = () => {
    setOpen(false);
    setMsg("");
    setErrEmployeeId("");
    setErrExpensesOn("");
    setErrShortDescription("");
    setErrDescription("");
    setErrDate("");
    setErrTime("");
    setErrStatus("");
    setErrAmount("");
    fetchData();
  };

  const handleDialog = () => {
    return (
      <div>
        <Dialog
          open={getOpen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          style={{ width: 1300 }}
        >
          <DialogTitle id="form-dialog-title">Expenses Edit </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div className={classes.center}>
                <Paper className={classes.paperStyle}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} className={classes.subclass}>
                      <img src="images/tick.png" width="10" height="10" />
                      <TextField
                        fullWidth
                        label="Expense Id"
                        value={getExpensesId}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.subclass}>
                      <img src="images/tick.png" width="10" height="10" />
                      <TextField
                        fullWidth
                        label="Vendor Id"
                        value={getVendorId}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.subclass}>
                      <img src={getErrEmployeeId} width="10" height="10" />
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Employee
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={getEmployeeId}
                          onChange={(event) =>
                            setEmployeeId(event.target.value)
                          }
                        >
                          {fillEmployees()}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} className={classes.subclass}>
                      <img src={getErrExpensesOn} width="10" height="10" />
                      <TextField
                        fullWidth
                        label="Expenses On"
                        value={getExpensesOn}
                        variant="standard"
                        onChange={(event) => setExpensesOn(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.subclass}>
                      <img src={getErrAmount} width="10" height="10" />
                      <TextField
                        fullWidth
                        label="Amount"
                        value={getAmount}
                        variant="standard"
                        onChange={(event) => setAmount(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.subclass}>
                      <img src={getErrDate} width="10" height="10" />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          label="Date"
                          format="MM/dd/yyyy"
                          value={getDate}
                          onChange={(event) => setDate(event)}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>{" "}
                    </Grid>
                    <Grid item xs={6} className={classes.subclass}>
                      <img src={getErrTime} width="10" height="10" />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                          id="time-picker"
                          label="Time"
                          value={getTime}
                          onChange={(event) => setTime(event)}
                          KeyboardButtonProps={{
                            "aria-label": "change time",
                          }}
                        />
                      </MuiPickersUtilsProvider>{" "}
                    </Grid>
                    <Grid item xs={12} className={classes.subclass}>
                      <img
                        src={getErrShortDescription}
                        width="10"
                        height="10"
                      />
                      <TextField
                        fullWidth
                        label="Short Description"
                        value={getShortDescription}
                        variant="standard"
                        onChange={(event) =>
                          setShortDescription(event.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.subclass}>
                      <img src={getErrDescription} width="10" height="10" />
                      <TextField
                        fullWidth
                        label="Description"
                        value={getDescription}
                        variant="standard"
                        onChange={(event) => setDescription(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-fileimg"
                        multiple
                        type="file"
                        onChange={(event) =>
                          setBillImage({
                            img: event.target.files[0],
                            fileImg: URL.createObjectURL(event.target.files[0]),
                          })
                        }
                      />
                      <label htmlFor="contained-button-fileimg">
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          startIcon={<CloudUploadIcon />}
                          component="span"
                        >
                          Bill Image
                        </Button>
                      </label>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                      <Avatar
                        alt="Remy Sharp"
                        variant="rounded"
                        src={getBillImage.fileImg}
                        className={classes.avatortheme}
                      />
                    </Grid>

                    <Grid item xs={12} className={classes.subclass}>
                      <img src={getErrStatus} width="10" height="10" />
                      <div> Status :</div>
                      <Radio
                        checked={getStatus === "Approved"}
                        onChange={(event) => setStatus(event.target.value)}
                        value="Approved"
                        name="radio-button-demo"
                        //inputProps={{ 'aria-label': 'A' }}
                      />
                      Approved{" "}
                      <Radio
                        checked={getStatus === "Not-Approved"}
                        onChange={(event) => setStatus(event.target.value)}
                        value="Not-Approved"
                        name="radio-button-demo"
                        //inputProps={{ 'aria-label': 'B' }}
                      />
                      Not-Approved
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
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  return (
    <div className={classes.root}>
      <div className={classes.tableDiv}>
        <div class="panel-header bg-dark">
          <h3 class="panel-title" style={{ color: "#FFF", padding: 17 }}>
            <strong>Expenses List</strong>
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
          // actions={[
          //   {
          //     icon: 'edit',
          //     tooltip: 'Edit',
          //     onClick: (event, rowData) => handleClickOpen(rowData)
          //   }
          // ]}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const data = [...getList];
                  data.splice(data.indexOf(oldData), 1);
                  setList(data);
                  handleDelete(oldData);
                }, 200);
              }),
          }}
        />
        {handleDialog()}
      </div>
    </div>
  );
}
