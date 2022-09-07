import React,{useState,useEffect} from  "react";
import {styled,makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import {ServerURL,postDataAndImage,getData,postData} from "./FetchNodeServices";
import { TextField,Button,Grid } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MaterialTable from "@material-table/core"
import Select from '@mui/material/Select';
import Swal from "sweetalert2";
const Input = styled('input')({
  display: 'none',
});
const useStyles = makeStyles({
  root: {
    display:'flex',
    alignContent:'center',
    justifyContent:'center'  


 },
 subdiv:{

     background:'#ecf0f1',
     padding:20,
     width:1000,
     marginTop:30,
 },
 inputstyle:{
      display:'none',
  }
});


export default function DisplayAllFaculty(){
  var classes=useStyles()
  const [listfaculty,setListFaculty]=useState([])
  const [facid,setFacId]=useState('')
  const [fname,setFName]=useState('')
  const [lname,setLName]=useState('')
  const [faname,setFAName]=useState('')
  const [gender,setGender]=useState('')
  const [dob,setDOB]=useState('')
  const [qualification,setQualification]=useState('') 
  const [department,setDepartment]=useState('')
  const [address,setAddress]=useState('')
  const [state,setState]=useState('')
  const [city,setCity]=useState('')    
  const [mobileno,setMobileno]=useState('')
  const [alternatemobileno,setAlternateMobileno]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [designation,setDesignation]=useState('')       
  const [facicon,setFacIcon]=useState({bytes:'',file:"/facicon.png"}) 
  const [listDepartment,setListDepartment]=useState([])
  const [listStates,setListStates]=useState([])
  const [listCities,setListCities]=useState([])
  const [tempicon,setTempIcon]=useState({byte:'',file:''})
  const [open,setOpen]=useState()
  const [gt,setGt]=useState({female:false,male:false,other:false})
  const [btnState,setBtnState]=useState(false)

  const fetchAllFaculty=async()=>{
    var result= await getData("faculty/DisplayAll")   
   
    setListFaculty(result.result)
   
  }
const fetchAllDepartment=async()=>
{
var result=await getData("department/DisplayAll")
setListDepartment(result.result)

}
const fetchAllStates=async()=>{
  var result=await getData("statecity/displayallstates")
  setListStates(result)

}
const fetchAllCities=async(stateid)=>{
  var result=await postData("statecity/displayallcities",{stateid:stateid})
  setListCities(result)

}
useEffect(function(){

  fetchAllDepartment()
  fetchAllStates()
  
  },[])
 

const handleGender=(gen)=>{
  if(gen=="Female")
  setGt({female:true,male:false,other:false})
   else if(gen=="Male")
  setGt({female:false,male:true,other:false})
  else
  setGt({female:false,male:false,other:true})

  setGender(gen)
}
const handleDepartmentChange = (event) => {
  setDepartment(event.target.value);
};
const handleStateChange = (event) => {
  setState(event.target.value);
  fetchAllCities(event.target.value)
};
const handleCityChange = (event) => {
  setCity(event.target.value);
  
};
const handleGeneratePassword=()=>
  {  var ar=['0','1','2','3','@','#','?','A','P','Q','R']
     var pwd=""   
      for(var i=1;i<=8;i++)
      { 
       var c=ar[Math.floor(Math.random()*9)]
       
      pwd+=c

     }
       setPassword(pwd)
  }
  const fillStates=()=>{
   
    return(listStates.map((item)=>{
    return( <MenuItem value={item.stateid}>{item.statename}</MenuItem>)
  
    })
    )
  
   }
   const fillCities=()=>{
    return(listCities.map((item)=>{
    return( <MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
  
    })
    )
  
   }
   
    const fillDepartment=()=>{
     
     return(listDepartment.map((item)=>{
     return( <MenuItem value={item.departmentid}>{item.departmentname}</MenuItem>)
  
     })
     )
  
    }
    const handleEditData=async()=>{
 

      var body={Firstname:fname,facultyid:facid,Lastname:lname,Fathername:faname,gender:gender,dob:dob,qualification:qualification,department:department,address:address,state:state,city:city,mobileno:mobileno,alternatemobileno:alternatemobileno,emailid:email,password:password,designation:designation}
       var result=await postData("faculty/editfaculty",body)
      
       setOpen(false)
       if(result.result)
       {
        Swal.fire({
          title: "LMS",
          text: 'Faculty Edited Successfully',
          imageUrl: '/lms.png',
          imageWidth:'150',
          imageHeight:'150',
          icon:'success'
            })
       }
      else
      {Swal.fire({
        title: "LMS",
        text: 'Fail to Edit Faculty',
        imageUrl: '/lms.png',
        imageWidth:'150',
        imageHeight:'150',
        icon:'error'
          })
          
        
        }
        fetchAllFaculty()
      
       }
       const handleIconChange=(event)=>{
        setFacIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
        setBtnState(true)
      
       }
       const handleDeleteData=async(facid,facicon)=>{
         Swal.fire({
         title: 'Are you sure?',
         text: "You won't be able to revert this!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!'
       }).then(async(result) => {
         if (result.isConfirmed) {
     
           var body={facultyid:facid,picture:facicon}
           var result=await postData("faculty/deletefaculty",body)
           if(result.result)
           Swal.fire(
             'Deleted!',
             'Faculty has been deleted.',
             'success'
           )
         }
         else 
         Swal.fire(
           'Deleted!',
           'Fail to Delete Faculty .',
           'error'
         )
         fetchAllFaculty()
       })
     
     
        
       
       
        }
        const handleEditIcon=async()=>{
 
          var formData=new FormData()
          formData.append('facultyid',facid)  
          formData.append('icon',facicon.bytes)
        
        
        
         var result=await postDataAndImage("faculty/editicon",formData)
        
         setOpen(false)
         if(result.result)
         {
          Swal.fire({
            title: "LMS",
            text: 'Icon Edited Successfully',
            imageUrl: '/lms.png',
            imageWidth:'150',
            imageHeight:'150',
            icon:'success'
              })
         }
        else
        {Swal.fire({
          title: "LMS",
          text: 'Fail to Edit Icon',
          imageUrl: '/lms.png',
          imageWidth:'150',
          imageHeight:'150',
          icon:'error'
            })
        }
        setBtnState(false)
        fetchAllFaculty()
        
        
         }
         const handleCancel=(facid)=>{
 
          setFacIcon({bytes:'',file:`${tempicon.file}`})
          setBtnState(false)
         }
     


  const handleEdit=(rowData)=>{
    setFacId(rowData.facultyid)
    setFName(rowData.Firstname)
    setLName(rowData.Lastname)
    setFAName(rowData.Fathername)
    setGender(rowData.gender)
    if(rowData.gender=="Female")
    setGt({female:true,male:false,other:false})
     else if(rowData.gender=="Male")
    setGt({female:false,male:true,other:false})
    else
    setGt({female:false,male:false,other:true})
    setDOB(rowData.dob)
    setQualification(rowData.qualification)
    setDepartment(rowData.department)
    setAddress(rowData.address)
    setState(rowData.state)
    fetchAllCities(rowData.state)
    setCity(rowData.city)
    setMobileno(rowData.mobileno)
    setAlternateMobileno(rowData.alternatemobileno)
    setEmail(rowData.emailid)
    setPassword(rowData.password)
    setDesignation(rowData.designation)
    setFacIcon({byte:'',file:`${ServerURL}/images/${rowData.picture}`})
    setTempIcon({byte:'',file:`${ServerURL}/images/${rowData.picture}`})
    setOpen(true)
  }
  

    useEffect(function(){
    fetchAllFaculty()
     fetchAllDepartment()
    },[])
    const handleClose=()=>{
     setOpen(false)
    }

    
    const showDialog=()=>{

      return(
   <Dialog
          
           open={open}
           onClose={handleClose}
           aria-labelledby="alert-dialog-title"
           aria-describedby="alert-dialog-description"
         >
           <DialogContent >
           <Grid container spacing={2}>
          <Grid item xs={12}>
              <div style={{display:'flex',alignItems:'center', fontSize:20,fontWeight:'bold',letterSpacing:1}}>
                <img src="/department.png" style={{width:40,hieght:40}} />
                   Edit Faculty 
              </div>
              </Grid>
              <Grid item xs={4}>
                      <TextField fullWidth value={fname} onChange={(event)=>setFName(event.target.value)} label="FirstName" variant="outlined" />
                       </Grid>
                       <Grid item xs={4}>
                      <TextField fullWidth value={lname} onChange={(event)=>setLName(event.target.value)}label="LastName" variant="outlined"/>
                      </Grid>

                      
                      <Grid item xs={4}>
                      <TextField fullWidth value={faname} onChange={(event)=>setFAName(event.target.value)}  label="FatherName" variant="outlined" />
                      </Grid>
                      <Grid item xs={6}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                         <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                         <FormControlLabel value="Female" control={<Radio checked={gt.female}/>} onClick={()=>handleGender("Female")} label="Female" />
                         <FormControlLabel value="Male" control={<Radio checked={gt.male}/>}onClick={()=>handleGender("Male")} label="Male" />
                         <FormControlLabel value="Other" control={<Radio checked={gt.other} />}onClick={()=>handleGender("Other")} label="Other" />
                             </RadioGroup>
                            </FormControl>
                      
                              </Grid>

                      
                      <Grid item xs={6}>
                      <TextField fullWidth type="date" value={dob}onChange={(event)=>setDOB(event.target.value)} variant="outlined" />
                      </Grid>
                      <Grid item xs={4}>
                      <TextField fullWidth value={qualification} onChange={(event)=>setQualification(event.target.value)}  label="Qualificaion" variant="outlined"/>                  
                      </Grid>
                       
                     
                      <Grid item xs={4}>
                      <FormControl fullWidth>
                       <InputLabel id="demo-simple-select-label">Department</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                         id="demo-simple-select"
                         value={department}
                         label="Department"
                        onChange={handleDepartmentChange}
                          >
                           {fillDepartment()}
                             </Select>
                          </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                      <TextField fullWidth value={designation} onChange={(event)=>setDesignation(event.target.value)}  label="Designation" variant="outlined" />
                      </Grid>
                      <Grid item xs={12}>
                      <TextField fullWidth value={address} onChange={(event)=>setAddress(event.target.value)}  label="Address" variant="outlined"/>
                      </Grid>

                      
                    
                      <Grid item xs={6}>
                      <FormControl fullWidth>
                       <InputLabel id="demo-simple-select-label1">State</InputLabel>
                        <Select
                        labelId="demo-simple-select-label1"
                         id="demo-simple-select"
                         value={state}
                         label="State"
                        onChange={handleStateChange}
                          >
                           {fillStates()}
                             </Select>
                          </FormControl>
                      
                      </Grid>
                      <Grid item xs={6}>
                      <FormControl fullWidth>
                       <InputLabel id="demo-simple-select-label2">City</InputLabel>
                        <Select
                        labelId="demo-simple-select-label2"
                         id="demo-simple-select"
                         value={city}
                         label="City"
                        onChange={handleCityChange}
                          >
                           {fillCities()}
                             </Select>
                          </FormControl>
                      </Grid>
                      
                      
                      <Grid item xs={4}>
                      <TextField fullWidth value={mobileno} onChange={(event)=>setMobileno(event.target.value)}  label="MobileNo." variant="outlined" />
                      </Grid>
                      <Grid item xs={4}>
                      <TextField fullWidth value={alternatemobileno}onChange={(event)=>setAlternateMobileno(event.target.value)}  label="Alternate MobileNo." variant="outlined"/>
                      </Grid>
                      
                       
                     
                      <Grid item xs={4}>
                      <TextField fullWidth value={email} onChange={(event)=>setEmail(event.target.value)} type='email'  label="Email ID" variant="outlined" />
                      </Grid>
                      <Grid item xs={8}>
                      <TextField fullWidth  onChange={(event)=>setPassword(event.target.value)} value={password} label="Password" type='text'  variant="outlined"/>
                      </Grid>
                      <Grid item xs={4} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <Button fullWidth sx={{padding:2}} onClick={()=>handleGeneratePassword()} variant="contained" color="primary">Create Password</Button>
              </Grid>
                    <Grid item xs={12}>
                      <label htmlFor="contained-button-file">
                      <Input onChange={(event)=>handleIconChange(event)}  accept="image/*" id="contained-button-file" multiple type="file" />
                      <Button fullWidth variant="contained" component="span">
                        Upload Picture
                       </Button>
                      </label>            
               </Grid>
               <Grid item xs={6} style={{display:'flex',alignItem:'center',justifyContent:'center'}}>
           {btnState?<><Button onClick={()=>handleEditIcon()} >Save</Button><Button onClick={()=>handleCancel()} >Cancel</Button></>:<></>}
         <Avatar
          alt="Upload Image"
          src={facicon.file}
          variant="rounded"
          sx={{ width: 56, height: 56 }}
           />
           </Grid>   

          </Grid>
           </DialogContent>
           <DialogActions>
             <Button onClick={handleClose} onClick={()=>handleEditData()} >Edit</Button>
             <Button onClick={handleClose} autoFocus>
               Cancel
             </Button>
           </DialogActions>
         </Dialog>
   
      )
   
      }

    function DisplayAll() {
        return (

          <MaterialTable
            title="List Of Faculty"
            columns={[
              { title: 'FacultyID', field: 'facultyid' },
              { title: ' Name', field: 'Firstname',render:(rowData)=>(<div>{rowData.Firstname}<br/> {rowData.Lastname}<br/> {rowData.fathername}</div>)},
             
              { title: 'Gender/DOB', field: 'gender',render:(rowData)=>(<div>{rowData.gender}<br/> {rowData.dob}</div>) },
             
              { title: 'Qualification', field: 'qualification', render:(rowData)=>(<div>{rowData.qualification}<br/> {rowData.departmentname}</div>)},
              
              { title: 'Address', field: 'address',render:(rowData)=>(<div>{rowData.address}<br/>{rowData.cityname},{rowData.statename}</div>) },
             
              { title: 'Contact List', field: 'mobileno',render:(rowData)=>(<div>{rowData.mobileno}<br/> {rowData.alternatemobileno}<br/>{rowData.emailid}</div>) },
           
           
              { title: 'Designation', field: 'designation',render:(rowData)=>(<div>{rowData.departmentname}<br/> {rowData.designation}</div>) },
      
              { title: 'Image', field: 'picture',
              render: rowData => <img src={`${ServerURL}/images/${rowData.picture}`} style={{width: 50, borderRadius: '50%'}}/>
            },
            ]} 
            data={listfaculty}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Faculty ',
                onClick: (event, rowData) => {handleEdit(rowData)}
              },
              {
                icon: 'delete',
                tooltip: 'Delete Faculty ',
                onClick: (event, rowData) => {handleDeleteData(rowData.facultyid,rowData.icon)}
              }
            ]}
          />
        )
      }
   
      return(
        <div className={classes.root}>
        <div className={classes.subdiv}>

          {DisplayAll()}
          {showDialog()}
      </div>
      </div>


      )

}