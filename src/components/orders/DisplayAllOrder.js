import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { getData, ServerURL, postData } from "../FetchNodeServices";
import swal from "sweetalert";
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import Paper from "@material-ui/core/Paper";
// import Button from "@material-ui/core/Button";
// import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Avatar from "@material-ui/core/Avatar";
// import Radio from "@material-ui/core/Radio";
// import Typography from "@material-ui/core/Typography";
// import { checkRequire } from "../Checks";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";

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

export default function DisplayAllOrder() {
  const classes = useStyles();
  const [getList, setList] = useState([]);

  const [getColumn, setColumn] = useState({
    columns: [
      { title: "Order ", field: "orderid" },
      { title: "Client Id", field: "clientid" },
      { title: "Employee Id", field: "employeeid" },
      { title: "Description", field: "description" },
      { title: "Order Date", field: "orderdate" },
      { title: "Order Time", field: "ordertime" },
      {
        title: "Image",
        field: "uploadorder",
        render: (rowData) => (
          <div>
            <Avatar
              alt="Remy Sharp"
              variant="rounded"
              src={`${ServerURL}/images/${rowData.uploadorder}`}
              className={classes.avatortheme}
            />
          </div>
        ),
      },
    ],
  });

  const fetchData = async (v_id) => {
    let body = {
      vendorid: v_id,
    };
    var list = await postData("order/displayById", body);
    setList(list.data);
    // console.log(list.data);
  };

  useEffect(function () {
    var vendor = JSON.parse(localStorage.getItem("vendor"));
    fetchData(vendor.vendorid);
  }, []);

  const handleDelete = async (oldData) => {
    let body = { orderid: oldData.orderid };
    let result = await postData("order/deleteById", body);
    if (result.status) {
      // alert("Record Deleted");
      swal("Record Deleted", "", "success");
    }
    fetchData();
  };

  return (
    <div className={classes.root}>
      <div className={classes.tableDiv}>
        <div class="panel-header bg-dark">
          <h3 class="panel-title" style={{ color: "#FFF", padding: 17 }}>
            <strong>Orders List</strong>
          </h3>
        </div>
        <MaterialTable
          style={{ backgroundColor: "#FFF" }}
          title=" "
          columns={getColumn.columns}
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
              // onClick: (event, rowData) => handleClickOpen(rowData),
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
        {/* {handleDialog()} */}
      </div>
    </div>
  );
}
