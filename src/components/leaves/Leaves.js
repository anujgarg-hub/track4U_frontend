import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {postDataAndImage}   from  '../FetchNodeServices'
import {checkRequire} from '../Checks'
//import {MDBIcon} from "mdbreact";

const useStyles = makeStyles((theme) => ({
    root: {
       display:'flex',
       justifyContent:'center',
       alignItems:'center',
       marginTop:30,
      },
      paperStyle:{
        width:520,
        padding:20,
        margin:20,
        backgroundColor:'#f1f2f6'
      },
      paperHeading :{
        margin:10,
        padding:10,
        display:'flex',
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:'#dfe4ea'
      },
      subclass:{
        marginTop:3,
        marginBottom:4,
        display:'flex',
        flexDirection:'row'
      },
      avatortheme:{
        width:50,
        height:50,
      },
    input:
     {
      display: 'none',

    },
    button: {
      margin: theme.spacing(1),
       width:160,
    },
    center:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row'
    }
  }));

function Leaves(){
  const classes=useStyles();

  const [getVendorId,setVendorId]=useState('')
  const [getLeaveType,setLeaveType]=useState('')
  const [getTotalLeave,setTotalLeave]=useState('') 
  const [getImage,setImage]=useState({image:'',fileimage:''})
  const [getMsg,setMsg]=useState('')
  const [getErrVendorId,setErrVendorId]=useState('')
  const [getErrLeaveType,setErrLeaveType]=useState('')
  const [getErrTotalLeave,setErrTotalLeave]=useState('') 
  const [getErrImage,setErrImage]=useState('')
  
  const handleImage=(event)=>{
    setImage({image:event.target.files[0],fileimage:URL.createObjectURL(event.target.files[0])})  
   }
   const handleVendorId=()=>{
    var vendor=JSON.parse(localStorage.getItem('vendor'))
    setVendorId(vendor.vendorid)
    
  }
  useEffect(function(){
    handleVendorId()
  })

const  handleSubmit=async()=>{
    var err=false;
   if(!checkRequire(getVendorId))
    { err=true
      setErrVendorId('/images/cross.png') }
    if(checkRequire(getVendorId))
    { setErrVendorId('/images/tick.png')}

    if(!checkRequire(getLeaveType))
    { err=true
      setErrLeaveType('/images/cross.png') }
    if(checkRequire(getLeaveType))
    { setErrLeaveType('/images/tick.png')}    

    
    if(!checkRequire(getTotalLeave))
    { err=true
      setErrTotalLeave('/images/cross.png') }
    if(checkRequire(getTotalLeave))
    { setErrTotalLeave('/images/tick.png')} 
    

    if(!checkRequire(getImage.image))
    { err=true
      setErrImage('/images/cross.png') }
    if(checkRequire(getImage.image))
    { setErrImage('/images/tick.png')}   
    
   
   if(!err) 
 { const formData=new FormData()
   formData.append('vendorid',getVendorId)
   formData.append('leavetype',getLeaveType)
   formData.append('totalleave',getTotalLeave)
   formData.append('image',getImage.image)
   console.log('fgh',formData)
   const config={headers:{'content-type':'multipart/form-data'}}
        let result=await postDataAndImage('leaves/addnewrecord',formData,config)
        console.log(result)
        if(result)
        {setMsg("Record Submitted...")}
        else
        {
          setMsg("Fail to Submit Record..")
        }
    }   
    else{
      setMsg("Error in Input")
    }   
}


  const ClearData=()=>{    
    setVendorId('')
    setLeaveType('')
    setTotalLeave('')
    setImage({image:'',fileImage:''})
    setMsg('')
    setErrVendorId('')
    setErrLeaveType('')
    setErrTotalLeave('')
    setErrImage('')    
  }

   
 return(
 <div className={classes.root}>
 <Paper className={classes.paperStyle}>
 <Paper  elevation={1} className={classes.paperHeading} >
    <Typography variant="h6" gutterBottom>
        Add Leaves
      </Typography>
     </Paper>
     <Grid container spacing={1}>
         <Grid item xs={12} className={classes.subclass} > 
           <img src={getErrVendorId} width='10' height='10' />
             <TextField fullWidth label='Vendor Id' value={getVendorId} variant='standard' onChange={(event)=>setVendorId(event.target.value)}/>
         </Grid>
         <Grid item xs={6} className={classes.subclass} > 
           <img src={getErrLeaveType} width='10' height='10' />  
             <TextField  fullWidth label='Leave Type'  value={getLeaveType} variant='standard' onChange={(event)=>setLeaveType(event.target.value)}/>
         </Grid>
        <Grid item xs={6} className={classes.subclass} > 
          <img src={getErrTotalLeave} width='10' height='10' />
          <TextField fullWidth label='Total Leave' value={getTotalLeave} variant='standard' onChange={(event)=>setTotalLeave(event.target.value)}/>
         </Grid>
        
        <Grid item xs={6} className={classes.center}>
        <img src={getErrImage} width='10' height='10' />
         <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(event)=>handleImage(event)}
       />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" className={classes.button} startIcon={<CloudUploadIcon />} component="span">
         Image
        </Button>
      </label>
      </Grid>
       
       <Grid item xs={6} className={classes.center} >
         <Avatar alt="Remy Sharp" variant='rounded' src={getImage.fileimage}  />
        </Grid>

        <Grid item xs={6} className={classes.center}>
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleSubmit()}>
          Submit
         </Button>
        </Grid>
        <Grid item xs={6}className={classes.center} >
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>ClearData()}>
          Reset
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
 );

}


export default Leaves;