var axios = require("axios");
const GKey = "AIzaSyCeL-_o98r7DE5H-BxKAYTSupPnio4M3Rs";
const ServerURL = "http://164.52.195.173:2000";
const SocketURL = "http://164.52.195.173:2000";

//To read Data from Node
// const SocketURL = "http://122.168.199.205:3000";
// const axios = require('axios');

// const ServerURL = "http://localhost:3001";
// const SocketURL = "http://localhost:3001";

// const ServerURL = "http://122.168.1.52:3001";
// const SocketURL = "http://192.168.1.52:3001";
//const SocketURL='http://10.0.2.2:8002'

const getData = async (url) => {
  try {
    const response = await fetch(`${ServerURL}/${url}`);
    const result = await response.json();
    if (result == "Session has Expired Please Login Again") {
      alert("Session has Expired Please Login Again");
      return [];
    } else {
      console.log(result);
      return result;
    }
  } catch (e) {
    return null;
  }
};

//To send data in node
const postData = async (url, body) => {
  try {
    const response = await fetch(`${ServerURL}/${url}`, {
      method: "post",
      mode: "cors",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (result == "Session has Expired Please Login Again") {
      alert("Session has Expired Please Login Again");
      return false;
    } else {
      console.log(result);
      return result;
    }
  } catch (e) {
    return null;
  }
};

//To send data with image in node
const postDataAndImage = async (url, formData, config) => {
  try {
    console.log(formData);
    var response = await axios.post(`${ServerURL}/${url}`, formData, config);
    if (response.data == "Session has Expired Please Login Again") {
      alert("Session has Expired Please Login Again");
      return false;
    } else {
      console.log(result);
      var result = response.data.RESULT;
      return result;
    }
  } catch (e) {
    return null;
  }
};

export { postData, postDataAndImage, getData, ServerURL, SocketURL, GKey };

/*.then((response)=>{
                const result=response.data.Result
                console.log(result)
                 return result
              } )
        .catch(function(err){
            console.log(err)
            return false;
        })*/
