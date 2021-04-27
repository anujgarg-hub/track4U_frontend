/* eslint-disable import/no-anonymous-default-export */
import { Grid, MenuItem, Select, TextField } from "@material-ui/core";
import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Polyline,
  Marker,
} from "react-google-maps";
import {
  SocketURL,
  GKey,
  postData,
  ServerURL,
  getData,
} from "../FetchNodeServices";
class Map extends React.Component {
  vendor = JSON.parse(localStorage.getItem("vendor"));
  state = {
    progress: [],
    path: [
      { lat: 18.558908, lng: -68.389916 },
      { lat: 18.558853, lng: -68.389922 },
      { lat: 18.558375, lng: -68.389729 },
      { lat: 18.558032, lng: -68.389182 },
      { lat: 18.55805, lng: -68.388613 },
      { lat: 18.558256, lng: -68.388213 },
      { lat: 18.558744, lng: -68.387929 },
    ],
    index: 0,
    emplist: [],
    empid: "",
    fromselectdate: "",
    toselectdate: "",
    fromtime: "",
    totime: "",
  };

  velocity = 5;
  initialDate = new Date();

  fetchEmp = async () => {
    let body = {
      vendorid: this.vendor.vendorid,
    };
    let list = await postData("employees/displayall", body);
    console.log(list);
    if (list.status) {
      this.setState({ emplist: list.data });
    }
  };

  getDistance = () => {
    // seconds between when the component loaded and now
    const differentInTime = (new Date() - this.initialDate) / 1000; // pass to seconds
    return differentInTime * this.velocity; // d = v*t -- thanks Newton!
  };

  componentDidMount = () => {
    this.interval = window.setInterval(this.moveObject, 300);
  };

  componentWillUnmount = () => {
    window.clearInterval(this.interval);
  };

  moveObject = () => {
    const distance = this.getDistance();
    if (!distance) {
      return;
    }

    let progress = this.state.path.filter((coordinates, index) => {
      return coordinates.distance < distance;
    });

    // const nextLine = this.state.path.find(
    //   (coordinates) => coordinates.distance > distance
    // );
    const nextLine = this.state.path[this.state.index];
    this.setState({ index: this.state.index + 1 });
    console.log("nextLine", this.state.index, nextLine);
    if (!nextLine) {
      // this.setState({ progress });
      return; // it's the end!
    }
    this.setState({ progress: [...this.state.progress, nextLine] });
  };

  componentWillMount = () => {
    this.fetchEmp();
  };

  handleTracking = async (e) => {
    e.preventDefault();
    this.setState({
      progress: [],
      // defaultCenter: { lat: res[0].lat, lng: res[0].lng },
    });
    let body = {
      previousdate: this.state.fromselectdate,
      nextdate: this.state.toselectdate,
      previousTime: this.state.fromtime,
      nextTime: this.state.totime,
      employeeid: this.state.empid,
    };
    // console.log(body);
    let result = await postData("tracking/fetchLatLng", body);
    if (result.status) {
      this.setState({
        path: result.data,
        // defaultCenter: { lat: res[0].lat, lng: res[0].lng },
      });
      let path = this.state.path.map((coordinates, i, array) => {
        if (i === 0) {
          return { ...coordinates, distance: 0 }; // it begins here!
        }
        const { lat: lat1, lng: lng1 } = coordinates;
        const latLong1 = new window.google.maps.LatLng(lat1, lng1);

        const { lat: lat2, lng: lng2 } = array[0];
        const latLong2 = new window.google.maps.LatLng(lat2, lng2);

        // in meters:
        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
          latLong1,
          latLong2
        );

        return { ...coordinates, distance };
      });

      this.setState({ path });
    }
  };

  render = () => {
    return (
      <>
        <div>
          <div class="panel panel-default no-bd" style={{ width: "100%" }}>
            <div class="panel-header bg-dark">
              <h3 class="panel-title">
                <strong>Add Task</strong>
              </h3>
            </div>
            <div class="panel-body bg-white">
              <div class="row">
                <div class="col-md-12 ">
                  <form
                    role="form"
                    class="form-validation"
                    novalidate="novalidate"
                    // onSubmit={handleSubmit}
                  >
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <label class="control-label">Client</label>
                          <div class="append-icon">
                            <Select
                              fullWidth
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={this.state.empid}
                              placeholder="Employee Id"
                              onChange={(event) =>
                                this.setState({ empid: event.target.value })
                              }
                            >
                              {" "}
                              {/* <MenuItem value="">Select State</MenuItem> */}
                              {this.state.emplist.map((item) => (
                                <MenuItem value={item.employeeid}>
                                  {item.employeename}&nbsp;&nbsp;{item.mobileno}
                                </MenuItem>
                              ))}
                            </Select>
                          </div>
                          <div class="row">
                            <div class="col-sm-6">
                              <div class="form-group">
                                <label class="control-label">From Date</label>
                                {/* <img src={getErrClientName} width="10" height="10" /> */}
                                <div class="append-icon">
                                  <TextField
                                    id="date"
                                    label="Search From Date"
                                    type="date"
                                    fullWidth
                                    defaultValue="2017-05-24"
                                    value={this.state.fromselectdate}
                                    onChange={(event) =>
                                      this.setState({
                                        fromselectdate: event.target.value,
                                      })
                                    }
                                    // className={classes.textField}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div class="col-sm-6">
                              <div class="form-group">
                                <label class="control-label">To Date:</label>
                                {/* <img src={getErrClientAddress} width="10" height="10" /> */}
                                <div class="append-icon">
                                  <TextField
                                    id="date"
                                    label="Search To Date"
                                    type="date"
                                    fullWidth
                                    defaultValue="2017-05-24"
                                    value={this.state.toselectdate}
                                    onChange={(event) =>
                                      this.setState({
                                        toselectdate: event.target.value,
                                      })
                                    }
                                    // className={classes.textField}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-sm-6">
                              <div class="form-group">
                                <label class="control-label">From Time:</label>
                                {/* <img src={getErrClientName} width="10" height="10" /> */}
                                <div class="append-icon">
                                  <TextField
                                    id="time"
                                    label="Search From Time"
                                    type="time"
                                    fullWidth
                                    defaultValue="07:30"
                                    value={this.state.fromtime}
                                    onChange={(event) =>
                                      this.setState({
                                        fromtime: event.target.value,
                                      })
                                    }
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    inputProps={{
                                      step: 300, // 5 min
                                    }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div class="col-sm-6">
                              <div class="form-group">
                                <label class="control-label">To Time:</label>
                                {/* <img src={getErrClientAddress} width="10" height="10" /> */}
                                <div class="append-icon">
                                  <TextField
                                    id="time"
                                    label="Search To Time"
                                    type="time"
                                    fullWidth
                                    defaultValue="07:30"
                                    value={this.state.totime}
                                    onChange={(event) =>
                                      this.setState({
                                        totime: event.target.value,
                                      })
                                    }
                                    // onChange={(event) => setToSelectedTime(event.target.value)}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    inputProps={{
                                      step: 300, // 5 min
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row"></div>
                        </div>
                      </div>
                    </div>

                    <div class="text-center  m-t-20">
                      <button
                        className="btn btn-success btn-transparent"
                        // type="submit"
                        onClick={(e) => this.handleTracking(e)}
                      >
                        Submit
                      </button>
                      <button
                        className="btn btn-danger btn-transparent"
                        type="reset"
                        onClick={(event) => {
                          this.ClearData();
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <GoogleMap
          defaultZoom={14}
          // defaultCenter={{ lat: 18.559008, lng: -68.388881 }}
          center={{ lat: 26.2162063, lng: 78.2021085 }}
          apiKey={GKey}
        >
          {this.state.progress && (
            <>
              <Polyline
                path={this.state.progress}
                options={{ strokeColor: "#FF0000 " }}
              />
              <Marker
                position={this.state.progress[this.state.progress.length - 1]}
              />
            </>
          )}
        </GoogleMap>
      </>
    );
  };
}

const MapComponent = withScriptjs(withGoogleMap(Map));

export default () => (
  <MapComponent
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GKey}&v=3.exp&libraries=geometry,drawing,places`}
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px`, width: "100%" }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
);
