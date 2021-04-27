import React, { useEffect, useState, useRef } from "react";
import {
  SocketURL,
  GKey,
  postData,
  ServerURL,
  getData,
} from "../FetchNodeServices";
import Button from "@material-ui/core/Button";
import GoogleMapReact from "google-map-react";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import RoadMap from "./RoadMap";
import AutocompleteTextField from "./AutoCompleteTextField";
const AnyReactComponent = ({ text }) => (
  <div
    style={{
      flexDirection: "column",
      // display: "flex",
      marginTop: 20,
    }}
  >
    <img src="/pin1.gif" width="32" height="32" />
    <div
      style={{
        padding: 2,
        backgroundColor: "#FFF",
        color: "#2980b9",
        border: "solid 3px #2980b9",
        borderRadius: "20%",
        width: "auto",
        alignItem: "center",
        justifyContent: "center",
        display: "flex",
        width: 25,
        fontWeight: "bold",
        fontSize: 6,
      }}
    >
      {text}
    </div>
  </div>
);

function TrackEmployee() {
  const data = {
    latitude: 26.215,
    longitude: 78.2074,
    date: "1/1/1",
    time: "0:0:0",
    battery: "1",
    employee_id: 1,
    vendor_id: 100,
  };

  const socket = io(SocketURL);
  const [getLocData, setLocData] = useState(data);
  const [getEmployee, setEmployee] = useState([]);
  const [getName, setName] = useState("");
  const [getList, setList] = useState([]);
  const [getEmployeeid, setEmployeeid] = useState({ id: "", name: "" });
  var ac = useRef();

  const fetchDataById = async () => {
    var list = await postData(`employee/searchbyid/${getName}`);
    setEmployee(list);
  };

  const fetchData = async (v_id) => {
    var list = await postData("tracking/alllocation", { vendor_id: v_id });
    setList(list);
  };

  const handleClick = () => {
    // alert(getName);
    var employee = getName.split(",");
    setEmployeeid({ id: employee[1], name: employee[0] });
  };

  useEffect(function () {
    var vendor = JSON.parse(localStorage.getItem("vendor"));
    fetchData(vendor.vendorid);
    // fetchData();
  }, []);
  const show = async (data) => {
    console.log("MESSAGE: ", data);
    const obj = {};

    setLocData(data);
  };
  return (
    <div
      style={{
        padding: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          height: window.screen.height * 0.65,
          width: window.screen.width * 0.8,
          alignSelf: "center",
        }}
      >
        {/* {getList != null ? (
          <AutocompleteTextField
            getName={getName}
            getEmployeeid={getEmployeeid}
            getList={getList}
            setName={setName}
            handleClick={handleClick}
          />
        ) : (
          <></>
        )} */}

        {getList.length > 0 ? (
          <>
            <GoogleMapReact
              apiKey={GKey}
              center={[getLocData.latitude, getLocData.longitude]}
              zoom={15}
            >
              {getList.map((item) => (
                <AnyReactComponent
                  lat={item.latitude}
                  lng={item.longitude}
                  text={item.employeename}
                />
              ))}
            </GoogleMapReact>
          </>
        ) : (
          <GoogleMapReact
            apiKey={GKey}
            center={[getLocData.latitude, getLocData.longitude]}
            zoom={18}
          >
            {/* <AnyReactComponent
              lat={getLocData.latitude}
              lng={getLocData.longitude}
              text={"pls wait.."}
            /> */}
          </GoogleMapReact>
        )}
        <div>{/*  <RoadMap />*/}</div>
      </div>
    </div>
  );
}

export default TrackEmployee;
