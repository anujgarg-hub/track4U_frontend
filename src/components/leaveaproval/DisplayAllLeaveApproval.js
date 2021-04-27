import React,{useState,useEffect} from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import {getData, ServerURL ,postData,postDataAndImage}  from '../FetchNodeServices'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {checkRequire} from '../Checks'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  
 root:{
     display:'flex',
     alignItems:'center',
     justifyContent:'center',
     marginTop:30,
 } ,
 tableDiv:{
    width:window.innerWidth*0.8,
 },
 avatortheme:{
  width:50,
  height:50,
},
main:{
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
} ,
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
})
)

export default function DisplayAllPackages() {
  const classes=useStyles()
  const [getList,setList]=useState([])
  const [getOpen,setOpen]=useState(false)
  const [getLeaveApprovalId,setLeaveApprovalId]=useState('')
  const [getVendorId,setVendorId]=useState('')
  const [getEmployeeId,setEmployeeId]=useState('')
  const [getDateFrom,setDateFrom]=useState(new Date())
  const [getDateTo,setDateTo]=useState(new Date())
  const [getLeaveId,setLeaveId]=useState('')
  const [getStatus,setStatus]=useState('')
  const [getDescription,setDescription]=useState('')
  const [getMsg,setMsg]=useState('')
  const [getErrEmployeeId,setErrEmployeeId]=useState('')
  const [getErrDateFrom,setErrDateFrom]=useState(new Date())
  const [getErrDateTo,setErrDateTo]=useState(new Date())
  const [getErrLeaveId,setErrLeaveId]=useState('')
  const [getErrStatus,setErrStatus]=useState('')
  const [getErrDescription,setErrDescription]=useState('')
  const [getEmployeesList,setEmployeesList]=useState([])
  const [getLeaveList,setLeaveList]=useState([])

  const [state, setState] = useState({
    columns: [
      { title: 'Id', field: 'leaveapprovalid' },
      { title: 'Vendor Id', field: 'vendorid' },
      { title: 'Employee Id', field: 'employeeid' },
      { title: 'From', field: 'from',
       render :rowData=> <div>{displayDate(rowData.datefrom)}</div> },
       { title: 'To', field: 'to',
       render :rowData=> <div>{displayDate(rowData.dateto)}</div> },
     { title: 'Leave Id', field: 'leaveid' },
     { title: 'Description', field: 'description' },
     { title: 'Status', field: 'status' },
    ]
  });
  
  const displayDate=(date)=>{
    let d=new Date(date)
        let cd=d.getFullYear()+"-"+(d.getMonth() + 1)+"-"+d.getDate()
        return(cd)
    } 

  
  const fetchData=async()=>{
    var list =await getData('leaveapproval/displayall')
    setList(list.data)
}

 useEffect(function(){
    fetchData()
    fetchEmployees()
    fetchLeaves()
},[])

const  fetchEmployees=async()=>{
  var list=await getData('employees/displayall')
    setEmployeesList(list.data)
   } 
  


const fillEmployees=()=>{
  return getEmployeesList.map(function(item,key){
    return (
        <MenuItem  value={item.employeeid}>
         {item.employeename}&nbsp;&nbsp;{item.mobileno}
        </MenuItem>
    )
  })
   }

  const  fetchLeaves=async()=>{
    var list=await getData('leaves/displayall')
      setLeaveList(list.data)
     } 
    
  
  
  const fillLeaves=()=>{
    return getLeaveList.map(function(item,key){
      return (
          <MenuItem  value={item.leaveid}>
           {item.leavetype}
          </MenuItem>
      )
    })
     }



 const handleDelete=async(oldData)=>{
   var body={leaveapprovalid:oldData.leaveapprovalid}
   var result=await postData('leaveapproval/deleteRecord',body)
 }

 const  handleEdit=async()=>{
  var err=false;
  if(!checkRequire(getDateFrom))
    { err=true
      setErrDateFrom('/images/cross.png') }
    if(checkRequire(getDateFrom))
    { setErrDateFrom('/images/tick.png')}

    if(!checkRequire(getDateTo))
    { err=true
      setErrDateTo('/images/cross.png') }
    if(checkRequire(getDateTo))
    { setErrDateTo('/images/tick.png')}    
    
    if(!checkRequire(getEmployeeId))
    { err=true
      setErrEmployeeId('/images/cross.png') }
    if(checkRequire(getEmployeeId))
    { setErrEmployeeId('/images/tick.png')}  
    
    if(!checkRequire(getLeaveId))
    { err=true
      setErrLeaveId('/images/cross.png') }
    if(checkRequire(getLeaveId))
    { setErrLeaveId('/images/tick.png')} 

    if(!checkRequire(getDescription))
    { err=true
      setErrDescription('/images/cross.png') }
    if(checkRequire(getDescription))
    { setErrDescription('/images/tick.png')} 

    if(!checkRequire(getStatus))
    { err=true
      setErrStatus('/images/cross.png') }
    if(checkRequire(getStatus))
    { setErrStatus('/images/tick.png')} 
    
  if(!err) 
{var body={leaveapprovalid:getLeaveApprovalId,from:getDateFrom,to:getDateTo,vendorid:getVendorId,leaveid:getLeaveId,
                 description:getDescription,status:getStatus,employeeid:getEmployeeId}
 var result=await postData('leaveapproval/updateRecord',body)

 if(result.RESULT){
  setMsg("Record Edited..")
  }
 else{
  setMsg("Fail To Edit Record...")
 } 
}
else{
setMsg("Error in Input")
}
}

 const handleClickOpen = async(rowData) => {
  setOpen(true);
  setLeaveApprovalId(rowData.leaveapprovalid)
  setDateFrom(rowData.datefrom)
  setDateTo(rowData.dateto)
  setVendorId(rowData.vendorid)
  setEmployeeId(rowData.employeeid)
  setLeaveId(rowData.leaveid)
  setDescription(rowData.description)
  setStatus(rowData.status)
  
};


const handleClose = () => {
  setOpen(false);
  setMsg('')
  setErrDateFrom('')
  setErrDateTo('')
  setErrEmployeeId('')
  setErrDescription('')
  setErrLeaveId('')
  setErrStatus('')
  fetchData()
};


 const handleDialog=()=>{
  return (
    <div>
      <Dialog open={getOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">LeaveApproval Edit </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <div className={classes.center}>
 <Paper className={classes.paperStyle}>
  
 <Grid container spacing={1}>
 <Grid item xs={12} className={classes.subclass} > 
    <img src={'/images/tick.png'} width='10' height='10' />
     <TextField fullWidth label='Leave Approval Id' value={getLeaveApprovalId} variant='standard' />
         </Grid>
         <Grid item xs={12} className={classes.subclass} > 
           <img src='/images/tick.png' width='10' height='10' />
             <TextField fullWidth label='Vendor ' value={getVendorId} variant='standard'/>
         </Grid>
     <Grid item xs={6} className={classes.subclass} > 
   <img src={getErrEmployeeId} width='10' height='10' />
   <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Employee</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getEmployeeId}
          onChange={(event)=>setEmployeeId(event.target.value)}
        >  
         {fillEmployees()}
        </Select>
      </FormControl>
    </Grid>
        <Grid item xs={6} className={classes.subclass} > 
        <img src={getErrLeaveId} width='10' height='10' /> 
        <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Leave Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getLeaveId}
          onChange={(event)=>setLeaveId(event.target.value)}
        >  
         {fillLeaves()}
        </Select>
      </FormControl></Grid>
        <Grid item xs={12} className={classes.subclass} > 
        <img src={getErrDescription} width='10' height='10' /> 
          <TextField fullWidth label='Description' value={getDescription} variant='standard' onChange={(event)=>setDescription(event.target.value)}/>
        </Grid>
        <Grid item xs={6} className={classes.subclass} >
         <img src={getErrDateFrom} width='10' height='10' /> 
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
         <KeyboardDatePicker
          label="From"
          format="MM/dd/yyyy"
          value={getDateFrom}
          onChange={(event)=>setDateFrom(event)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider> </Grid>
        <Grid item xs={6} className={classes.subclass} >
         <img src={getErrDateTo} width='10' height='10' /> 
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
         <KeyboardDatePicker
          label="To"
          format="MM/dd/yyyy"
          value={getDateTo}
          onChange={(event)=>setDateTo(event)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider></Grid>
        
       <Grid item xs={12} className={classes.subclass} >
       <img src={getErrStatus} width='10' height='10' />
       <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label"> Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         value={getStatus}
         onChange={(event)=>setStatus(event.target.value)}
          > 
         <MenuItem value='Approved'>Approved</MenuItem>
        <MenuItem value='Not-Approved'>Not Approved</MenuItem>
        </Select>
      </FormControl></Grid>
        <Grid item xs={6} className={classes.center}>
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleEdit()}>
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
 }
  return (
      <div className={classes.root}>
     <div className={classes.tableDiv} >
     <div class="panel-header bg-dark">
          <h3 class="panel-title" style={{ color: "#FFF", padding: 17 }}>
            <strong>Leaves Approval</strong>List
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
          ac
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit',
          onClick: (event, rowData) => handleClickOpen(rowData)
        }
      ]}
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
                const data = [...getList]
           data.splice(data.indexOf(oldData), 1);
                setList(data)
                handleDelete(oldData)
              
            }, 200);
          }),
      }}
    />
    {handleDialog()}
    </div>
    </div>
  );
}