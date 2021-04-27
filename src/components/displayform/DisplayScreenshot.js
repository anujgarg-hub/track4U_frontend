import React, { useState, useEffect } from "react";
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
    display: "flex",
    alignItems: "center",
    //  justifyContent:'center'
    // margin:40,
  },

  mainpaper: {
    // borderRadius: 10,
    width: "100%",
    // height: 530,
    backgroundColor: "#ffffff",
  },

  head: {
    width: "100%",
    // height: 50,
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

  modalheading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    //  fontWeight:'bold',
    marginBottom: 20,
  },
}));

export default function DisplayScreenshot() {
  const classes = useStyles();
  const [getColumn, setColumn] = useState({
    columns: [
      { title: "Transation Id", field: "transaction_id", editable: "never" },
      { title: "Employee Id", field: "employee_id", editable: "never" },
      { title: "Vendor Id", field: "vender_id", editable: "never" },
      { title: "Image Name", field: "image_name", editable: "never" },
      // { title: 'Image', render: rowData => <img src={`${BaseURL}/images/${rowData.product_image}`} style={{height:40,width:40, borderRadius: '30%'}}/>},
      { title: "Date", field: "date", editable: "never" },
      { title: "Time", field: "time", editable: "never" },
    ],
  });

  const [getScreenShotList, setScreenShotList] = useState([]);

  useEffect(function () {
    fetchScreenShotData();
  }, []);

  const fetchScreenShotData = async () => {
    let list = await postData("screenshot/displayAll");
    setScreenShotList(list);
  };

  return (
    <div style={{ width: "100%" }}>
      <div className={classes.maincontainer}>
        <div style={{ backgroundColor: "#FFF", width: "100%" }}>
          <div class="" style={{ width: "100%" }}>
            <div class="panel-header bg-dark" style={{ padding: 17 }}>
              <h3 class="panel-title">
                <strong>Screenshot Record</strong>
              </h3>
            </div>
          </div>

          <MaterialTable
            title=""
            columns={getColumn.columns}
            data={getScreenShotList}
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
