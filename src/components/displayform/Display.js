import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

import {
  getData,
  ServerURL,
  postData,
  postDataAndImage,
} from "../FetchNodeServices";

const useStyles = makeStyles((theme) => ({
  maincontainer: {
    // display: "flex",
    alignItems: "center",
    //  justifyContent:'center'
    // margin:40,
  },

  mainpaper: {
    borderRadius: 10,
    width: "100%",
    height: 530,
    backgroundColor: "#ffffff",
  },

  head: {
    width: "100%",
    height: 50,
    backgroundImage:
      "linear-gradient(to left, black 5px , #2979ff 600px ,black)",
    // backgroundColor:'#ececec',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  mainheading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontSize: 20,
    padding: "5px 0px 0px 0px",
  },

  input: {
    display: "none",
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    //  border: '3px solid #000',
    height: 350,
    width: 800,
    boxShadow: theme.shadows[20],
    padding: theme.spacing(3, 3, 3),
  },

  modalheading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    //  fontWeight:'bold',
    marginBottom: 20,
  },
}));

export default function Display() {
  const classes = useStyles();
  const [getColumn, setColumn] = useState({
    columns: [
      { title: "Transation Id", field: "transaction_id", editable: "never" },
      { title: "Employee Id", field: "employee_id", editable: "never" },
      { title: "Vender Id", field: "vender_id", editable: "never" },
      { title: "Longitude", field: "longitude", editable: "never" },
      { title: "Latitude", field: "latitude", editable: "never" },
      { title: "Time", field: "time", editable: "never" },
      { title: "Date", field: "date", editable: "never" },
      { title: "Battery(%)", field: "battery", editable: "never" },
    ],
  });

  const [getTrackingList, setTrackingList] = useState([]);
  const [getFromSelectedDate, setFromSelectedDate] = useState();
  const [getToSelectedDate, setToSelectedDate] = useState();
  const [getFromSelectedTime, setFromSelectedTime] = useState();
  const [getToSelectedTime, setToSelectedTime] = useState();

  useEffect(function () {
    fetchtrackingData();
  }, []);

  const fetchtrackingData = async () => {
    let list = await getData("tracking/displayAll");
    setTrackingList(list);
  };

  const searchByDate = async () => {
    let body = {
      previousdate: getFromSelectedDate,
      nextdate: getToSelectedDate,
    };
    let list = await postData("tracking/searchByDate", body);
    setTrackingList(list);
  };

  const searchByTime = async () => {
    let body = {
      previousTime: getFromSelectedTime,
      nextTime: getToSelectedTime,
    };
    alert("time");
    console.log(body);
    let list = await postData("tracking/searchByTime", body);
    setTrackingList(list);
  };

  const handleNextTime = (event) => {
    setToSelectedTime(event.target.value);
  };

  return (
    <div>
      <div className={classes.maincontainer}>
        <div style={{ backgroundColor: "#FFF" }}>
          {/* <div className={classes.head}> */}
          <div class="panel panel-default no-bd" style={{ width: "100%" }}>
            <div class="panel-header bg-dark">
              <h3 class="panel-title">
                <strong>Tracking Record</strong>
              </h3>
            </div>
          </div>
          {/* </div> */}
          <div style={{ margin: 30 }}>
            <Grid container spacing={2}>
              <Grid
                container
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Grid
                  container
                  spacing={2}
                  item
                  xs={12}
                  sm={4}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  <TextField
                    id="date"
                    label="Search From Date"
                    type="date"
                    fullWidth
                    defaultValue="2017-05-24"
                    value={getFromSelectedDate}
                    onChange={(event) =>
                      setFromSelectedDate(event.target.value)
                    }
                    // className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid
                  container
                  spacing={2}
                  item
                  xs={12}
                  sm={4}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 10,
                  }}
                >
                  <TextField
                    id="date"
                    label="Search From Date"
                    type="date"
                    fullWidth
                    defaultValue="2017-05-24"
                    value={getToSelectedDate}
                    onChange={(event) => setToSelectedDate(event.target.value)}
                    // className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid
                  container
                  spacing={2}
                  item
                  xs={12}
                  sm={4}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    component="span"
                    // className={classes.button}
                    className="btn btn-success btn-rounded btn-transparent"
                    startIcon={<SearchIcon />}
                    onClick={searchByDate}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
              <Grid
                container
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 30,
                }}
              >
                <Grid
                  container
                  spacing={2}
                  item
                  xs={12}
                  sm={4}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  <TextField
                    id="time"
                    label="Search From Time"
                    type="time"
                    fullWidth
                    defaultValue="07:30"
                    value={getFromSelectedTime}
                    onChange={(event) =>
                      setFromSelectedTime(event.target.value)
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </Grid>
                <Grid
                  container
                  spacing={2}
                  item
                  xs={12}
                  sm={4}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 10,
                  }}
                >
                  <TextField
                    id="time"
                    label="Search To Time"
                    type="time"
                    fullWidth
                    defaultValue="07:30"
                    value={getToSelectedTime}
                    onChange={handleNextTime}
                    // onChange={(event) => setToSelectedTime(event.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </Grid>
                <Grid
                  container
                  spacing={2}
                  item
                  xs={12}
                  sm={4}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    component="span"
                    // className={classes.button}
                    className="btn btn-success btn-rounded btn-transparent"
                    startIcon={<SearchIcon />}
                    onClick={() => searchByTime()}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <MaterialTable
            title="Tracking List"
            columns={getColumn.columns}
            data={getTrackingList}
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
            //     onClick: (event,rowData)=>handleDialogOpen(rowData)
            //   }
            // ]}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setColumn((prevState) => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    // const data=[...getCategoryList]
                    // data.slice(data.indexOf(oldData),1)
                    // setCategoryList(data)
                    // handleDelete(oldData)
                  }, 600);
                }),
            }}
          />
        </div>
      </div>
    </div>
  );
}
