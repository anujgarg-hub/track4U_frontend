import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ListItems from "./ListItems";
import { getData, postData, ServerURL } from "../FetchNodeServices";
import Avatar from "@material-ui/core/Avatar";
import PackageInterface from "../packages/PackageInterface";
import DisplayAllPackages from "../packages/DisplayAllPackages";
import DisplayAllVendors from "../vendor/DisplayAllVendors";
import DisplayAllFeaturesPackages from "../feature packages/DisplayAllFeaturesPackages";
import Vendors from "../vendor/Vendors";
import FeaturesPackages from "../feature packages/FeaturesPackages";
import AnalogueClock from "react-analogue-clock";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },

  toproot: {
    // backgroundColor:'#81ecec',
    // borderRadius:15,
    maxHeight:350,
    padding:3,
    width:400,
    // height:450,
    // margin:20,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    // border:'1px solid #dcdde1'
  },

}));


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

export default function DashOne(props) {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

/// For Slider...
  var settings = {
    arrows:false,
    autoplay:true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 2000
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />
    // nextArrow:false,
    // prevArrow:false
  };

  const clockOptions = {
    baseColor: "#ffffff",
    borderColor: "#000000",
    borderWidth: 5,
    centerColor: "#000000",
    handColors: {
      hour: "#000000",
      minute: "#000000",
      second: "#000000",
    },
    notchColor: "#000000",
    numbersColor: "#000000",
    showNumbers: true,
    size: 250,
  };

  const [getVendor, setVendor] = useState([]);
  const [VendorsCount, setVendorsCount] = useState('')
  const [PackagesCount, setPackagesCount] = useState('')
  const [getTotalEmp, setTotalEmp] = useState(100);
  const [getCountEmp, setCountEmp] = useState(10);
  const [getPackageName, setPackageName] = useState("Gold");

  useEffect(() => {
    // var vendor = JSON.parse(localStorage.getItem("vendor"));
    // setVendor(vendor);
    // fetchLicenceRecord(vendor.vendorid);
    // fetchCountEmp(vendor.vendorid);
    fetchVendorsList();
    fetchPackageCounts();
  }, []);

  // const fetchLicenceRecord = async (V_id) => {
  //   let body = {
  //     vendorid: V_id,
  //   };
  //   let result = await postData("packagecustomer/displayPackage", body);
  //   if (result.status) {
  //     // setPackageId(result.result[0].packageid);
  //     fetchTotalLicence(result.result[0].packageid);
  //   }
  // };

  // const fetchTotalLicence = async (pack_id) => {
  //   let body = {
  //     packageid: pack_id,
  //   };
  //   let result = await postData("packages/displayPackageTotal", body);
  //   if (result.status) {
  //     setTotalEmp(result.result[0].noofusers);
  //     setPackageName(result.result[0].packagename);
  //   }
  // };

  // const fetchCountEmp = async (V_id) => {
  //   var body = {
  //     vendorid: V_id,
  //   };
  //   var rslt = await postData("employees/countemployee", body);
  //   if (rslt.status) {
  //     setCountEmp(rslt.data[0].num);
  //   }
  // };


  const fetchVendorsList=async()=>{
    var result = await getData('vendors/displayall')
    console.log('resultttttttttttttttttTTTTTTTT',result);
    // console.log('VendorsCount',result.data.length)
    if(result)
    {     
      setVendor(result.data)
      setVendorsCount(result.data.length)

    }
  }

  const renderItem=()=>{
    return(
    getVendor.map((item)=>{
      return(
        
        <div className={classes.toproot}>
        <div class="panel widget-member">
          <div class="row">
            <div class="col-xs-3">
              <img
               // src="/images/avatar-4.jpg"
                src={`${ServerURL}/images/${item.companylogo}`}
                alt="avatar 12"
                class="pull-left img-responsive"
              />
            </div>
            <div class="col-xs-9">
              <h3 class="m-t-0 member-name">
                <strong>{item.vendorname}</strong>
              </h3>
              <p class="member-jobV" style={{ margin: 2 }}>
                Accu Track{" "}
                <i
                  class="fa fa-book"
                  style={{
                    color: "blue",
                    fontSize: 17,
                    marginLeft: 5,
                  }}
                ></i>
                {/*  */}
              </p>
              <p class="member-jobV">{item.mobileno}</p>
              <div class="row">
                <div class="col-lg-12">
                  <div class="col-lg-3">
                    <p>
                      <i
                        class="fa fa-wifi"
                        style={{ color: "green", fontSize: 17 }}
                      ></i>
                    </p>
                  </div>
                  <div class="col-lg-3">
                    <p>
                      <i
                        class="fa fa-battery-half"
                        style={{ color: "black", fontSize: 17 }}
                      ></i>
                    </p>
                  </div>
                  <div class="col-lg-3">
                    <p style={{ display: "flex" }}>
                      <i
                        class="fa fa-percent"
                        style={{ color: "green", fontSize: 17 }}
                      ></i>
                      50
                    </p>
                  </div>
                  <div class="col-lg-3">
                    <p>
                      <i
                        class="fa fa-map-marker"
                        style={{ color: "red", fontSize: 17 }}
                      ></i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
  
            <div class="vikramsub">
              <p class="bAelFa">Attendance IN : 04/08/2021</p>
              <span class="locationV">
                <i
                  class="fa fa-map-marker"
                  style={{ color: "white", marginRight: 4 }}
                ></i>
                Gwalior Tahsil, Gwalior, M.P, 474001, India
              </span>
            </div>
            <div class="card-bodyV">
              <span class="dataV">
                <span class="textV">Tasks Completed</span>
                <span class="countV">0</span>
              </span>
              <span class="dataV">
                <span class="textV">Tasks not started</span>
                <span class="countV">0</span>
              </span>
            </div>
            <div
              class="footerV"
              style={{ backgroundColor: "white", color: "black" }}
            >
              <span class="text">No active Task</span>
            </div>
          </div>
        </div>
      </div>
      
      )
    }
    )
    
    )
  }


  const fetchPackageCounts=async()=>{
    var counts = await getData('packages/displayall')
    console.log('packagesCounts',counts)
    if(counts)
    {
      setPackagesCount(counts.data.length)
    }
  }

  return (
    <div>
      {/*  className={classes.root} */}
      {/* <CssBaseline /> */}

      <div class="">
        {/* BEGIN PAGE CONTENT */}
        <div class="">
          <div>
              <div >
                {/* <div class="col-md-12 portlets">
                  <div class="panel">
                    <div class="panel-header panel-controls">
                      <h3>
                        Colored <strong>version</strong>
                      </h3>
                    </div>
                    <div class="panel-content">
                      <ul class="nav nav-tabs nav-primary">
                        <li class="">
                          <a href="#tab2_1" data-toggle="tab">
                            <i class="icon-home"></i> Home
                          </a>
                        </li>
                        <li class="active">
                          <a href="#tab2_2" data-toggle="tab">
                            <i class="icon-user"></i> Profile
                          </a>
                        </li>
                        <li>
                          <a href="#tab2_3" data-toggle="tab">
                            <i class="icon-cloud-download"></i> Other Tab
                          </a>
                        </li>
                      </ul>
                      <div class="tab-content">
                        <div class="tab-pane fade" id="tab2_1">
                          <div class="row column-seperation">
                            <div class="col-md-6 line-separator">
                              <h3>
                                <strong>Big</strong> Title for your tab
                              </h3>
                              <h4>Customize your tab as you want easily</h4>
                            </div>
                            <div class="col-md-6">
                              <p class="light">
                                default, the textarea element comes with a
                                vertical scrollbar (and maybe even a horizontal
                                scrollbar). This vertical scrollbar enables the
                                user to continue entering and reviewing their
                                text (by scrolling up and down).
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="tab-pane fade active in" id="tab2_2">
                          <h3>
                            "Sooner or later, those who win are those who think
                            they <strong>can</strong>."
                          </h3>
                          <p>
                            Food truck fixie locavore, accusamus mcsweeney's
                            marfa nulla single-origin coffee squid. Exercitation
                            +1 labore velit, blog sartorial.
                          </p>
                        </div>
                        <div class="tab-pane fade" id="tab2_3">
                          <p>
                            Etsy mixtape wayfarers, ethical wes anderson tofu
                            before they sold out mcsweeney's organic lomo retro
                            fanny pack lo-fi farm-to-table readymade. Messenger
                            bag gentrify pitchfork tattooed craft beer, iphone
                            skateboard locavore carles etsy salvia banksy hoodie
                            helvetica. DIY synth PBR banksy irony. Leggings
                            gentrify squid 8-bit cred pitchfork. Williamsburg
                            banh mi whatever gluten-free, carles pitchfork
                            biodiesel fixie etsy retro mlkshk vice blog.
                            Scenester cred you probably haven't heard of them,
                            vinyl craft beer blog stumptown. Pitchfork
                            sustainable tofu synth chambray yr.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

{/* 
                <div class="col-lg-3">
                  <div class="panel widget-member">
                    <div class="row">
                      <div class="col-xs-3">
                        <img
                          src="/images/avatar-2.jpg"
                          alt="avatar 12"
                          class="pull-left img-responsive"
                        />
                      </div>
                      <div class="col-xs-9">
                        <h3 class="m-t-0 member-name">
                          <strong>NIVRATI JAIN</strong>
                        </h3>
                        <p class="member-jobV" style={{ margin: 2 }}>
                          Accu Track{" "}
                          <i
                            class="fa fa-book"
                            style={{
                              color: "blue",
                              fontSize: 17,
                              marginLeft: 5,
                            }}
                          ></i>
                        </p>
                        <p class="member-jobV">+919303533532</p>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="col-lg-3">
                              <p>
                                <i
                                  class="fa fa-wifi"
                                  style={{ color: "green", fontSize: 17 }}
                                ></i>
                              </p>
                            </div>
                            <div class="col-lg-3">
                              <p>
                                <i
                                  class="fa fa-battery-half"
                                  style={{ color: "black", fontSize: 17 }}
                                ></i>
                              </p>
                            </div>
                            <div class="col-lg-3">
                              <p style={{ display: "flex" }}>
                                <i
                                  class="fa fa-percent"
                                  style={{ color: "green", fontSize: 17 }}
                                ></i>
                                50
                              </p>
                            </div>
                            <div class="col-lg-3">
                              <p>
                                <i
                                  class="fa fa-map-marker"
                                  style={{ color: "red", fontSize: 17 }}
                                ></i>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="vikramsub">
                        <p class="bAelFa">Attendance IN : 04/08/2021</p>
                        <span class="locationV">
                          <i
                            class="fa fa-map-marker"
                            style={{ color: "white", marginRight: 4 }}
                          ></i>
                          Gwalior Tahsil, Gwalior, M.P, 474001, India
                        </span>
                      </div>
                      <div class="card-bodyV">
                        <span class="dataV">
                          <span class="textV">Tasks Completed</span>
                          <span class="countV">0</span>
                        </span>
                        <span class="dataV">
                          <span class="textV">Tasks not started</span>
                          <span class="countV">0</span>
                        </span>
                      </div>
                      <div
                        class="footerV"
                        style={{ backgroundColor: "white", color: "black" }}
                      >
                        <span class="text">No active Task</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="panel widget-member">
                    <div class="row">
                      <div class="col-xs-3">
                        <img
                          src="/images/avatar-6.jpg"
                          alt="avatar 12"
                          class="pull-left img-responsive"
                        />
                      </div>
                      <div class="col-xs-9">
                        <h3 class="m-t-0 member-name">
                          <strong>Prashant Rana</strong>
                        </h3>
                        <p class="member-jobV" style={{ margin: 2 }}>
                          Accu Track{" "}
                          <i
                            class="fa fa-book"
                            style={{
                              color: "blue",
                              fontSize: 17,
                              marginLeft: 5,
                            }}
                          ></i>
                        </p>
                        <p class="member-jobV">+917773883041</p>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="col-lg-3">
                              <p>
                                <i
                                  class="fa fa-wifi"
                                  style={{ color: "green", fontSize: 17 }}
                                ></i>
                              </p>
                            </div>
                            <div class="col-lg-3">
                              <p>
                                <i
                                  class="fa fa-battery-half"
                                  style={{ color: "black", fontSize: 17 }}
                                ></i>
                              </p>
                            </div>
                            <div class="col-lg-3">
                              <p style={{ display: "flex" }}>
                                <i
                                  class="fa fa-percent"
                                  style={{ color: "green", fontSize: 17 }}
                                ></i>
                                50
                              </p>
                            </div>
                            <div class="col-lg-3">
                              <p>
                                <i
                                  class="fa fa-map-marker"
                                  style={{ color: "red", fontSize: 17 }}
                                ></i>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="vikramsub">
                        <p class="bAelFa">Attendance IN : 04/08/2021</p>
                        <span class="locationV">
                          <i
                            class="fa fa-map-marker"
                            style={{ color: "white", marginRight: 4 }}
                          ></i>
                          Gwalior Tahsil, Gwalior, M.P, 474001, India
                        </span>
                      </div>
                      <div class="card-bodyV">
                        <span class="dataV">
                          <span class="textV">Tasks Completed</span>
                          <span class="countV">0</span>
                        </span>
                        <span class="dataV">
                          <span class="textV">Tasks not started</span>
                          <span class="countV">0</span>
                        </span>
                      </div>
                      <div
                        class="footerV"
                        style={{ backgroundColor: "white", color: "black" }}
                      >
                        <span class="text">No active Task</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="panel widget-member">
                    <div class="row">
                      <div class="col-xs-3">
                        <img
                          src="/images/avatar-2.jpg"
                          alt="avatar 12"
                          class="pull-left img-responsive"
                        />
                      </div>
                      <div class="col-xs-9">
                        <h3 class="m-t-0 member-name">
                          <strong>NIVRATI JAIN</strong>
                        </h3>
                        <p class="member-jobV" style={{ margin: 2 }}>
                          Accu Track{" "}
                          <i
                            class="fa fa-book"
                            style={{
                              color: "blue",
                              fontSize: 17,
                              marginLeft: 5,
                            }}
                          ></i>
                        </p>
                        <p class="member-jobV">+919303533532</p>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="col-lg-3">
                              <p>
                                <i
                                  class="fa fa-wifi"
                                  style={{ color: "green", fontSize: 17 }}
                                ></i>
                              </p>
                            </div>
                            <div class="col-lg-3">
                              <p>
                                <i
                                  class="fa fa-battery-half"
                                  style={{ color: "black", fontSize: 17 }}
                                ></i>
                              </p>
                            </div>
                            <div class="col-lg-3">
                              <p style={{ display: "flex" }}>
                                <i
                                  class="fa fa-percent"
                                  style={{ color: "green", fontSize: 17 }}
                                ></i>
                                50
                              </p>
                            </div>
                            <div class="col-lg-3">
                              <p>
                                <i
                                  class="fa fa-map-marker"
                                  style={{ color: "red", fontSize: 17 }}
                                ></i>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="vikramsub">
                        <p class="bAelFa">Attendance IN : 04/08/2021</p>
                        <span class="locationV">
                          <i
                            class="fa fa-map-marker"
                            style={{ color: "white", marginRight: 4 }}
                          ></i>
                          Gwalior Tahsil, Gwalior, M.P, 474001, India
                        </span>
                      </div>
                      <div class="card-bodyV">
                        <span class="dataV">
                          <span class="textV">Tasks Completed</span>
                          <span class="countV">0</span>
                        </span>
                        <span class="dataV">
                          <span class="textV">Tasks not started</span>
                          <span class="countV">0</span>
                        </span>
                      </div>
                      <div
                        class="footerV"
                        style={{ backgroundColor: "white", color: "black" }}
                      >
                        <span class="text">No active Task</span>
                      </div>
                    </div>
                  </div>
                </div> */}
                   <Slider {...settings}>        
                   {renderItem()}
                   </Slider>
              </div>

              {/* aaa */}
              <div class="row m-t-10">
                <div class="col-lg-3">
                  <div class="panel">
                    <div class="panel-content widget-info">
                      <div class="row">
                        <div class="left">
                          <i class="fa fa-umbrella bg-green"></i>
                        </div>
                        <div class="right">
                          <p
                            class="number"
                            // data-from="0"
                            // data-to="5200"
                          >
                            {VendorsCount}
                          </p>
                          <p class="text">Vendors</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="panel">
                    <div class="panel-content widget-info">
                      <div class="row">
                        <div class="left">
                          <i class="fa fa-bug bg-blue"></i>
                        </div>
                        <div class="right">
                          <p
                            class="number"
                            // data-from="1234"
                            // data-to="575"
                            // data-suffix="k"
                          >
                            {PackagesCount}
                          </p>
                          <p class="text">Packages</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="panel">
                    <div class="panel-content widget-info">
                      <div class="row">
                        <div class="left">
                          <i class="fa fa-fire-extinguisher bg-red"></i>
                        </div>
                        <div class="right">
                          <p
                            class="number"
                            // data-from="222"
                            // data-to="463"
                            // data-suffix="k"
                          >
                            {getTotalEmp - getCountEmp}
                          </p>
                          <p class="text">Remaining Licences</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="panel">
                    <div class="panel-content widget-info">
                      <div class="row">
                        <div class="left">
                          <i class="icon-microphone bg-purple"></i>
                        </div>
                        <div class="right">
                          <p
                            class="number"
                            // data-from="0"
                            // data-to="1210"
                          >
                            {getPackageName}
                          </p>
                          <p class="text">Package Name</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div class="row">
        
        <div class="col-md-4">
          <div class="widget widget_calendar bg-red">
            <div class="multidatepicker"></div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="widget widget_calendar bg-primary">
            <div class="multidatepicker"></div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="widget widget_calendar bg-dark">
            <div class="multidatepicker"></div>
          </div>
        </div>
      </div> */}
              {/* 
              <div class="m-b-30">
                <div class="panel panel-default">
                  <div class="panel-body p-10">
                    <div class="text-center col-xs-4">
                      <img
                        src="/images/1.png"
                        class="img-responsive"
                        alt="avatar 4"
                      />
                    </div>
                    <div class="clearfix col-xs-8">
                      <h2 class="c-dark w-600">Winston Bowman</h2>
                      <p class="c-gray f-16">Photographer</p>
                      <p class="c-gray">
                        <i class="fa fa-map-marker p-r-10"></i> Trade Business
                        Park, Ohio
                      </p>
                    </div>
                  </div>
                  <div class="panel-footer p-t-0 p-b-0">
                    <div class="row">
                      <div class="col-xs-4 bg-blue p-20">
                        <div class="text-center m-b-10">
                          <i class="f-24 icon-speech"></i>
                        </div>
                        <div class="text-center f-16">1568</div>
                      </div>
                      <div class="col-xs-4 bg-purple p-20">
                        <div class="text-center m-b-10">
                          <i class="f-24 icon-users"></i>
                        </div>
                        <div class="text-center f-16">866</div>
                      </div>
                      <div class="col-xs-4 bg-primary" style={{ padding: 15 }}>
                        <div class="text-center m-b-10">
                          <i class="f-24 fa icon-heart"></i>
                        </div>
                        <div class="text-center f-16">254</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            */}
             </div>

          <section class="dashboard-header section-padding">
            <div class="container-fluid">
              <div class="row d-flex align-items-md-stretch">
                {/* <!-- To Do List--> */}
                <div class="col-lg-4">
                  <div
                    class="card to-do"
                    style={{ padding: 10, backgroundColor: "white" }}
                  >
                    <h2 class="display h4">To do List</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                    <ul class="check-lists list-unstyled">
                      <li class="d-flex align-items-center">
                        <input
                          type="checkbox"
                          id="list-1"
                          name="list-1"
                          class="form-control-custom"
                        />
                        <label for="list-1">
                          Similique sunt in culpa qui officia
                        </label>
                      </li>
                      <li class="d-flex align-items-center">
                        <input
                          type="checkbox"
                          id="list-2"
                          name="list-2"
                          class="form-control-custom"
                        />
                        <label for="list-2">
                          Ed ut perspiciatis unde omnis iste
                        </label>
                      </li>
                      <li class="d-flex align-items-center">
                        <input
                          type="checkbox"
                          id="list-3"
                          name="list-3"
                          class="form-control-custom"
                        />
                        <label for="list-3">
                          At vero eos et accusamus et iusto
                        </label>
                      </li>
                      <li class="d-flex align-items-center">
                        <input
                          type="checkbox"
                          id="list-4"
                          name="list-4"
                          class="form-control-custom"
                        />
                        <label for="list-4">
                          Explicabo Nemo ipsam voluptatem
                        </label>
                      </li>
                      <li class="d-flex align-items-center">
                        <input
                          type="checkbox"
                          id="list-5"
                          name="list-5"
                          class="form-control-custom"
                        />
                        <label for="list-5">
                          Similique sunt in culpa qui officia
                        </label>
                      </li>
                      <li class="d-flex align-items-center">
                        <input
                          type="checkbox"
                          id="list-6"
                          name="list-6"
                          class="form-control-custom"
                        />
                        <label for="list-6">
                          At vero eos et accusamus et iusto
                        </label>
                      </li>
                      <li class="d-flex align-items-center">
                        <input
                          type="checkbox"
                          id="list-7"
                          name="list-7"
                          class="form-control-custom"
                        />
                        <label for="list-7">
                          Similique sunt in culpa qui officia
                        </label>
                      </li>
                      <li class="d-flex align-items-center">
                        <input
                          type="checkbox"
                          id="list-8"
                          name="list-8"
                          class="form-control-custom"
                        />
                        <label for="list-8">
                          Ed ut perspiciatis unde omnis iste
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <!-- Pie Chart--> */}
                <div class="col-lg-4">
                  <div
                    class="card project-progress"
                    style={{ padding: 10, backgroundColor: "white" }}
                  >
                    <h2 class="display h4">Project Beta progress</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                    <div class="pie-chart">
                      <canvas id="pieChart" style={{ width: 300, height: 300 }}>
                        {" "}
                      </canvas>
                    </div>
                  </div>
                </div>
                {/* <!-- Line Chart --> */}
                {/* <div
              class="col-lg-6 col-md-12 flex-lg-last flex-md-first align-self-baseline"
            > */}
                <div class="col-lg-4">
                  <div
                    class="card sales-report"
                    style={{ padding: 10, backgroundColor: "white" }}
                  >
                    <h2 class="display h4">Sales marketing report</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                    <div class="line-chart">
                      <canvas id="lineCahrt"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div class="row">
            <div class="col-lg-12" style={{ height: "720px" }}></div>
          </div>
          <div class="footer">
            <div class="copyright">
              <p class="pull-left sm-pull-reset">
                {/* <span>
                  Copyright <span class="copyright">©</span> 2016{" "}
                </span>
                <span>THEMES LAB</span>.<span>All rights reserved. </span> */}
              </p>
              <p class="pull-right sm-pull-reset">
                {/* <span>
                  <a href="#" class="m-r-10">
                    Support
                  </a>{" "}
                  |{" "}
                  <a href="#" class="m-l-10 m-r-10">
                    Terms of use
                  </a>{" "}
                  |{" "}
                  <a href="#" class="m-l-10">
                    Privacy Policy
                  </a>
                </span> */}
              </p>
            </div>
          </div>
        </div>
        {/* END PAGE CONTENT */}
      </div>
      {/* END MAIN CONTENT */}
      {/* BEGIN BUILDER */}
      <div class="builder hidden-sm hidden-xs" id="builder">
        <a class="builder-toggle">
          <i class="icon-wrench"></i>
        </a>
        <div class="inner">
          <div class="builder-container">
            <a href="#" class="btn btn-sm btn-default" id="reset-style">
              reset default style
            </a>
            <h4>Layout options</h4>
            <div class="layout-option">
              <span> Fixed Sidebar</span>
              <label class="switch pull-right">
                <input
                  data-layout="sidebar"
                  id="switch-sidebar"
                  type="checkbox"
                  class="switch-input"
                  checked
                />
                <span class="switch-label" data-on="On" data-off="Off"></span>
                <span class="switch-handle"></span>
              </label>
            </div>
            <div class="layout-option">
              <span> Sidebar on Hover</span>
              <label class="switch pull-right">
                <input
                  data-layout="sidebar-hover"
                  id="switch-sidebar-hover"
                  type="checkbox"
                  class="switch-input"
                />
                <span class="switch-label" data-on="On" data-off="Off"></span>
                <span class="switch-handle"></span>
              </label>
            </div>
            <div class="layout-option">
              <span> Submenu on Hover</span>
              <label class="switch pull-right">
                <input
                  data-layout="submenu-hover"
                  id="switch-submenu-hover"
                  type="checkbox"
                  class="switch-input"
                />
                <span class="switch-label" data-on="On" data-off="Off"></span>
                <span class="switch-handle"></span>
              </label>
            </div>
            <div class="layout-option">
              <span>Fixed Topbar</span>
              <label class="switch pull-right">
                <input
                  data-layout="topbar"
                  id="switch-topbar"
                  type="checkbox"
                  class="switch-input"
                  checked
                />
                <span class="switch-label" data-on="On" data-off="Off"></span>
                <span class="switch-handle"></span>
              </label>
            </div>
            <div class="layout-option">
              <span>Boxed Layout</span>
              <label class="switch pull-right">
                <input
                  data-layout="boxed"
                  id="switch-boxed"
                  type="checkbox"
                  class="switch-input"
                />
                <span class="switch-label" data-on="On" data-off="Off"></span>
                <span class="switch-handle"></span>
              </label>
            </div>
            <h4 class="border-top">Color</h4>
            <div class="row">
              <div class="col-xs-12">
                <div
                  class="theme-color bg-dark"
                  data-main="default"
                  data-color="#2B2E33"
                ></div>
                <div
                  class="theme-color background-primary"
                  data-main="primary"
                  data-color="#319DB5"
                ></div>
                <div
                  class="theme-color bg-red"
                  data-main="red"
                  data-color="#C75757"
                ></div>
                <div
                  class="theme-color bg-green"
                  data-main="green"
                  data-color="#1DA079"
                ></div>
                <div
                  class="theme-color bg-orange"
                  data-main="orange"
                  data-color="#D28857"
                ></div>
                <div
                  class="theme-color bg-purple"
                  data-main="purple"
                  data-color="#B179D7"
                ></div>
                <div
                  class="theme-color bg-blue"
                  data-main="blue"
                  data-color="#4A89DC"
                ></div>
              </div>
            </div>
            <h4 class="border-top">Theme</h4>
            <div class="row row-sm">
              <div class="col-xs-6">
                <div class="theme clearfix sdtl" data-theme="sdtl">
                  <div class="header theme-left"></div>
                  <div class="header theme-right-light"></div>
                  <div class="theme-sidebar-dark"></div>
                  <div class="bg-light"></div>
                </div>
              </div>
              <div class="col-xs-6">
                <div class="theme clearfix sltd" data-theme="sltd">
                  <div class="header theme-left"></div>
                  <div class="header theme-right-dark"></div>
                  <div class="theme-sidebar-light"></div>
                  <div class="bg-light"></div>
                </div>
              </div>
              <div class="col-xs-6">
                <div class="theme clearfix sdtd" data-theme="sdtd">
                  <div class="header theme-left"></div>
                  <div class="header theme-right-dark"></div>
                  <div class="theme-sidebar-dark"></div>
                  <div class="bg-light"></div>
                </div>
              </div>
              <div class="col-xs-6">
                <div class="theme clearfix sltl" data-theme="sltl">
                  <div class="header theme-left"></div>
                  <div class="header theme-right-light"></div>
                  <div class="theme-sidebar-light"></div>
                  <div class="bg-light"></div>
                </div>
              </div>
            </div>
            <h4 class="border-top">Background</h4>
            <div class="row">
              <div class="col-xs-12">
                <div
                  class="bg-color bg-clean"
                  data-bg="clean"
                  data-color="#F8F8F8"
                ></div>
                <div
                  class="bg-color bg-lighter"
                  data-bg="lighter"
                  data-color="#EFEFEF"
                ></div>
                <div
                  class="bg-color bg-light-default"
                  data-bg="light-default"
                  data-color="#E9E9E9"
                ></div>
                <div
                  class="bg-color bg-light-blue"
                  data-bg="light-blue"
                  data-color="#E2EBEF"
                ></div>
                <div
                  class="bg-color bg-light-purple"
                  data-bg="light-purple"
                  data-color="#E9ECF5"
                ></div>
                <div
                  class="bg-color bg-light-dark"
                  data-bg="light-dark"
                  data-color="#DCE1E4"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* END BUILDER */}
      {/* </section> */}
      {/* BEGIN QUICKVIEW SIDEBAR */}
      <div id="quickview-sidebar">
        <div class="quickview-header">
          <ul class="nav nav-tabs">
            <li class="active">
              <a href="#chat" data-toggle="tab">
                Chat
              </a>
            </li>
            <li>
              <a href="#notes" data-toggle="tab">
                Notes
              </a>
            </li>
            <li>
              <a href="#settings" data-toggle="tab" class="settings-tab">
                Settings
              </a>
            </li>
          </ul>
        </div>
        <div class="quickview">
          <div class="tab-content">
            <div class="tab-pane fade active in" id="chat">
              <div class="chat-body current">
                <div class="chat-search">
                  <form class="form-inverse" action="#" role="search">
                    <div class="append-icon">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Search contact..."
                      />
                      <i class="icon-magnifier"></i>
                    </div>
                  </form>
                </div>
                <div class="chat-groups">
                  <div class="title">GROUP CHATS</div>
                  <ul>
                    <li>
                      <i class="turquoise"></i> Favorites
                    </li>
                    <li>
                      <i class="turquoise"></i> Office Work
                    </li>
                    <li>
                      <i class="turquoise"></i> Friends
                    </li>
                  </ul>
                </div>
                <div class="chat-list">
                  <div class="title">FAVORITES</div>
                  <ul>
                    <li class="clearfix">
                      <div class="user-img">
                        <img
                          src="../assets/global/images/avatars/avatar13.png"
                          alt="avatar"
                        />
                      </div>
                      <div class="user-details">
                        <div class="user-name">Bobby Brown</div>
                        <div class="user-txt">On the road again...</div>
                      </div>
                      <div class="user-status">
                        <i class="online"></i>
                      </div>
                    </li>
                    <li class="clearfix">
                      <div class="user-img">
                        <img
                          src="../assets/global/images/avatars/avatar5.png"
                          alt="avatar"
                        />
                        <div class="pull-right badge badge-danger">3</div>
                      </div>
                      <div class="user-details">
                        <div class="user-name">Alexa Johnson</div>
                        <div class="user-txt">Still at the beach</div>
                      </div>
                      <div class="user-status">
                        <i class="away"></i>
                      </div>
                    </li>
                    <li class="clearfix">
                      <div class="user-img">
                        <img
                          src="../assets/global/images/avatars/avatar10.png"
                          alt="avatar"
                        />
                      </div>
                      <div class="user-details">
                        <div class="user-name">Bobby Brown</div>
                        <div class="user-txt">On stage...</div>
                      </div>
                      <div class="user-status">
                        <i class="busy"></i>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="chat-list">
                  <div class="title">FRIENDS</div>
                  <ul>
                    <li class="clearfix">
                      <div class="user-img">
                        <img
                          src="../assets/global/images/avatars/avatar7.png"
                          alt="avatar"
                        />
                        <div class="pull-right badge badge-danger">3</div>
                      </div>
                      <div class="user-details">
                        <div class="user-name">James Miller</div>
                        <div class="user-txt">At work...</div>
                      </div>
                      <div class="user-status">
                        <i class="online"></i>
                      </div>
                    </li>
                    <li class="clearfix">
                      <div class="user-img">
                        <img
                          src="../assets/global/images/avatars/avatar11.png"
                          alt="avatar"
                        />
                      </div>
                      <div class="user-details">
                        <div class="user-name">Fred Smith</div>
                        <div class="user-txt">Waiting for tonight</div>
                      </div>
                      <div class="user-status">
                        <i class="offline"></i>
                      </div>
                    </li>
                    <li class="clearfix">
                      <div class="user-img">
                        <img
                          src="../assets/global/images/avatars/avatar8.png"
                          alt="avatar"
                        />
                      </div>
                      <div class="user-details">
                        <div class="user-name">Ben Addams</div>
                        <div class="user-txt">On my way to NYC</div>
                      </div>
                      <div class="user-status">
                        <i class="offline"></i>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="chat-conversation">
                <div class="conversation-header">
                  <div class="user clearfix">
                    <div class="chat-back">
                      <i class="icon-action-undo"></i>
                    </div>
                    <div class="user-details">
                      <div class="user-name">James Miller</div>
                      <div class="user-txt">On the road again...</div>
                    </div>
                  </div>
                </div>
                <div class="conversation-body">
                  <ul>
                    <li class="img">
                      <div class="chat-detail">
                        <span class="chat-date">today, 10:38pm</span>
                        <div class="conversation-img">
                          <img
                            src="../assets/global/images/avatars/avatar4.png"
                            alt="avatar 4"
                          />
                        </div>
                        <div class="chat-bubble">
                          <span>Hi you!</span>
                        </div>
                      </div>
                    </li>
                    <li class="img">
                      <div class="chat-detail">
                        <span class="chat-date">today, 10:45pm</span>
                        <div class="conversation-img">
                          <img
                            src="../assets/global/images/avatars/avatar4.png"
                            alt="avatar 4"
                          />
                        </div>
                        <div class="chat-bubble">
                          <span>Are you there?</span>
                        </div>
                      </div>
                    </li>
                    <li class="img">
                      <div class="chat-detail">
                        <span class="chat-date">today, 10:51pm</span>
                        <div class="conversation-img">
                          <img
                            src="../assets/global/images/avatars/avatar4.png"
                            alt="avatar 4"
                          />
                        </div>
                        <div class="chat-bubble">
                          <span>Send me a message when you come back.</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="conversation-message">
                  <input
                    type="text"
                    placeholder="Your message..."
                    class="form-control form-white send-message"
                  />
                  <div class="item-footer clearfix">
                    <div class="footer-actions">
                      <i class="icon-rounded-marker"></i>
                      <i class="icon-rounded-camera"></i>
                      <i class="icon-rounded-paperclip-oblique"></i>
                      <i class="icon-rounded-alarm-clock"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="notes">
              <div class="list-notes current withScroll">
                <div class="notes ">
                  <div class="row">
                    <div class="col-md-12">
                      <div id="add-note">
                        <i class="fa fa-plus"></i>ADD A NEW NOTE
                      </div>
                    </div>
                  </div>
                  <div id="notes-list">
                    <div class="note-item media current fade in">
                      <button class="close">×</button>
                      <div>
                        <div>
                          <p class="note-name">Reset my account password</p>
                        </div>
                        <p class="note-desc hidden">Break security reasons.</p>
                        <p>
                          <small>Tuesday 6 May, 3:52 pm</small>
                        </p>
                      </div>
                    </div>
                    <div class="note-item media fade in">
                      <button class="close">×</button>
                      <div>
                        <div>
                          <p class="note-name">Call John</p>
                        </div>
                        <p class="note-desc hidden">He have my laptop!</p>
                        <p>
                          <small>Thursday 8 May, 2:28 pm</small>
                        </p>
                      </div>
                    </div>
                    <div class="note-item media fade in">
                      <button class="close">×</button>
                      <div>
                        <div>
                          <p class="note-name">Buy a car</p>
                        </div>
                        <p class="note-desc hidden">I'm done with the bus</p>
                        <p>
                          <small>Monday 12 May, 3:43 am</small>
                        </p>
                      </div>
                    </div>
                    <div class="note-item media fade in">
                      <button class="close">×</button>
                      <div>
                        <div>
                          <p class="note-name">Don't forget my notes</p>
                        </div>
                        <p class="note-desc hidden">I have to read them...</p>
                        <p>
                          <small>Wednesday 5 May, 6:15 pm</small>
                        </p>
                      </div>
                    </div>
                    <div class="note-item media current fade in">
                      <button class="close">×</button>
                      <div>
                        <div>
                          <p class="note-name">Reset my account password</p>
                        </div>
                        <p class="note-desc hidden">Break security reasons.</p>
                        <p>
                          <small>Tuesday 6 May, 3:52 pm</small>
                        </p>
                      </div>
                    </div>
                    <div class="note-item media fade in">
                      <button class="close">×</button>
                      <div>
                        <div>
                          <p class="note-name">Call John</p>
                        </div>
                        <p class="note-desc hidden">He have my laptop!</p>
                        <p>
                          <small>Thursday 8 May, 2:28 pm</small>
                        </p>
                      </div>
                    </div>
                    <div class="note-item media fade in">
                      <button class="close">×</button>
                      <div>
                        <div>
                          <p class="note-name">Buy a car</p>
                        </div>
                        <p class="note-desc hidden">I'm done with the bus</p>
                        <p>
                          <small>Monday 12 May, 3:43 am</small>
                        </p>
                      </div>
                    </div>
                    <div class="note-item media fade in">
                      <button class="close">×</button>
                      <div>
                        <div>
                          <p class="note-name">Don't forget my notes</p>
                        </div>
                        <p class="note-desc hidden">I have to read them...</p>
                        <p>
                          <small>Wednesday 5 May, 6:15 pm</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="detail-note note-hidden-sm">
                <div class="note-header clearfix">
                  <div class="note-back">
                    <i class="icon-action-undo"></i>
                  </div>
                  <div class="note-edit">Edit Note</div>
                  <div class="note-subtitle">title on first line</div>
                </div>
                <div id="note-detail">
                  <div class="note-write">
                    <textarea
                      class="form-control"
                      placeholder="Type your note here"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="settings">
              <div class="settings">
                <div class="title">ACCOUNT SETTINGS</div>
                <div class="setting">
                  <span> Show Personal Statut</span>
                  <label class="switch pull-right">
                    <input type="checkbox" class="switch-input" checked />
                    <span
                      class="switch-label"
                      data-on="On"
                      data-off="Off"
                    ></span>
                    <span class="switch-handle"></span>
                  </label>
                  <p class="setting-info">
                    Lorem ipsum dolor sit amet consectetuer.
                  </p>
                </div>
                <div class="setting">
                  <span> Show my Picture</span>
                  <label class="switch pull-right">
                    <input type="checkbox" class="switch-input" checked />
                    <span
                      class="switch-label"
                      data-on="On"
                      data-off="Off"
                    ></span>
                    <span class="switch-handle"></span>
                  </label>
                  <p class="setting-info">
                    Lorem ipsum dolor sit amet consectetuer.
                  </p>
                </div>
                <div class="setting">
                  <span> Show my Location</span>
                  <label class="switch pull-right">
                    <input type="checkbox" class="switch-input" />
                    <span
                      class="switch-label"
                      data-on="On"
                      data-off="Off"
                    ></span>
                    <span class="switch-handle"></span>
                  </label>
                  <p class="setting-info">
                    Lorem ipsum dolor sit amet consectetuer.
                  </p>
                </div>
                <div class="title">CHAT</div>
                <div class="setting">
                  <span> Show User Image</span>
                  <label class="switch pull-right">
                    <input type="checkbox" class="switch-input" checked />
                    <span
                      class="switch-label"
                      data-on="On"
                      data-off="Off"
                    ></span>
                    <span class="switch-handle"></span>
                  </label>
                </div>
                <div class="setting">
                  <span> Show Fullname</span>
                  <label class="switch pull-right">
                    <input type="checkbox" class="switch-input" checked />
                    <span
                      class="switch-label"
                      data-on="On"
                      data-off="Off"
                    ></span>
                    <span class="switch-handle"></span>
                  </label>
                </div>
                <div class="setting">
                  <span> Show Location</span>
                  <label class="switch pull-right">
                    <input type="checkbox" class="switch-input" />
                    <span
                      class="switch-label"
                      data-on="On"
                      data-off="Off"
                    ></span>
                    <span class="switch-handle"></span>
                  </label>
                </div>
                <div class="setting">
                  <span> Show Unread Count</span>
                  <label class="switch pull-right">
                    <input type="checkbox" class="switch-input" checked />
                    <span
                      class="switch-label"
                      data-on="On"
                      data-off="Off"
                    ></span>
                    <span class="switch-handle"></span>
                  </label>
                </div>

                <div class="m-t-30" style={{ width: "100%" }}>
                  <canvas id="setting-chart" height="300"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END QUICKVIEW SIDEBAR */}
      {/* BEGIN SEARCH */}
      <div id="morphsearch" class="morphsearch">
        {/* /morphsearch-content */}
        <span class="morphsearch-close"></span>
      </div>
    </div>
  );
}
