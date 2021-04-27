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
    marginTop: 30,
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

export default function DisplayAllLeaves() {
  const classes = useStyles();
  const [getList, setList] = useState([]);
  const [getOpen, setOpen] = useState(false);
  const [getRowData, setRowData] = useState([]);
  const [getLeaveId, setLeaveId] = useState("");
  const [getVendorId, setVendorId] = useState("");
  const [getLeaveType, setLeaveType] = useState("");
  const [getTotalLeave, setTotalLeave] = useState("");
  const [getImage, setImage] = useState({ image: "", fileimage: "" });
  const [getMsg, setMsg] = useState("");
  const [getErrVendorId, setErrVendorId] = useState("");
  const [getErrLeaveType, setErrLeaveType] = useState("");
  const [getErrTotalLeave, setErrTotalLeave] = useState("");
  const [getErrImage, setErrImage] = useState("");

  const [state, setState] = useState({
    columns: [
      { title: "Leave Id", field: "leaveid" },
      { title: "Vendor Id", field: "vendorid" },
      { title: "Leave Type", field: "leavetype" },
      { title: "Total Leave", field: "totalleave" },
      {
        title: "Image",
        field: "image",
        render: (rowData) => (
          <div>
            <Avatar
              alt="Remy Sharp"
              variant="rounded"
              src={`${ServerURL}/images/${rowData.image}`}
              className={classes.avatortheme}
            />
          </div>
        ),
      },
    ],
  });

  const fetchData = async () => {
    var list = await getData("leaves/displayall");
    setList(list);
  };

  useEffect(function () {
    fetchData();
  }, []);

  const handleDelete = async (oldData) => {
    var body = { leaveid: oldData.leaveid };
    var result = await postData("leaves/deleteRecord", body);
  };

  const handleEdit = async () => {
    var err = false;
    if (!checkRequire(getVendorId)) {
      err = true;
      setErrVendorId("/images/cross.png");
    }
    if (checkRequire(getVendorId)) {
      setErrVendorId("/images/tick.png");
    }

    if (!checkRequire(getLeaveType)) {
      err = true;
      setErrLeaveType("/images/cross.png");
    }
    if (checkRequire(getLeaveType)) {
      setErrLeaveType("/images/tick.png");
    }

    if (!checkRequire(getTotalLeave)) {
      err = true;
      setErrTotalLeave("/images/cross.png");
    }
    if (checkRequire(getTotalLeave)) {
      setErrTotalLeave("/images/tick.png");
    }

    if (!err) {
      const formData = new FormData();
      formData.append("leaveid", getLeaveId);
      formData.append("vendorid", getVendorId);
      formData.append("leavetype", getLeaveType);
      formData.append("totalleave", getTotalLeave);
      formData.append("image", getImage.image);
      const config = { headers: { "content-type": "multipart/form-data" } };
      let result = await postDataAndImage(
        "leaves/editRecord",
        formData,
        config
      );
      console.log(result);
      if (result) {
        setMsg("Record Edited...");
      } else {
        setMsg("Fail to Edit Record..");
      }
    } else {
      setMsg("Error in Input");
    }
  };

  const handleClickOpen = async (rowData) => {
    setOpen(true);
    //setRowData(rowData)
    setLeaveId(rowData.leaveid);
    setVendorId(rowData.vendorid);
    setLeaveType(rowData.leavetype);
    setTotalLeave(rowData.totalleave);
    setImage({ image: "", fileimage: `${ServerURL}/images/${rowData.image}` });
  };

  const handleClose = () => {
    setOpen(false);
    fetchData();
    setMsg("");
    setErrVendorId("");
    setErrLeaveType("");
    setErrTotalLeave("");
    setErrImage("");
  };

  const handleImage = (event) => {
    setImage({
      image: event.target.files[0],
      fileimage: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleDialog = () => {
    return (
      <div>
        <Dialog
          open={getOpen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Package Edit </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div className={classes.center}>
                <Paper className={classes.paperStyle}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} className={classes.subclass}>
                      <img src={"/images/tick.png"} width="10" height="10" />
                      <TextField
                        fullWidth
                        label="Leave Id"
                        value={getLeaveId}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.subclass}>
                      <img src={getErrVendorId} width="10" height="10" />
                      <TextField
                        fullWidth
                        label="Vendor Id"
                        value={getVendorId}
                        variant="standard"
                        onChange={(event) => setVendorId(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.subclass}>
                      <img src={getErrLeaveType} width="10" height="10" />
                      <TextField
                        fullWidth
                        label="Leave Type"
                        value={getLeaveType}
                        variant="standard"
                        onChange={(event) => setLeaveType(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.subclass}>
                      <img src={getErrTotalLeave} width="10" height="10" />
                      <TextField
                        fullWidth
                        label="Total Leave"
                        value={getTotalLeave}
                        variant="standard"
                        onChange={(event) => setTotalLeave(event.target.value)}
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.center}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={(event) => handleImage(event)}
                      />
                      <label htmlFor="contained-button-file">
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          startIcon={<CloudUploadIcon />}
                          component="span"
                        >
                          Image
                        </Button>
                      </label>
                    </Grid>

                    <Grid item xs={6} className={classes.center}>
                      <Avatar
                        alt="Remy Sharp"
                        variant="rounded"
                        src={getImage.fileimage}
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
            <strong>Leaves List</strong>
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
