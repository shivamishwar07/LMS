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
import Select from '@mui/material/Select';
import DisplayAllFaculty from "./DisplayAllFaculty";
import Swal from "sweetalert2";
const useStyles = makeStyles({
  root: {
      display:'flex',
      justifyContent:'center',
      alignContent:'center',
    
  },
  subdiv:{
      display:'flex',
      background:'#ecf0f1',
      padding:30,
      width:700,
      marginTop:30,
  },
  inputstyle:{
      display:'none',
  }
});

const Input = styled('input')({
    display: 'none',
  });

  export default function Faculty(props)
{ var classes=useStyles()
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
  const[listDepartment,setListDepartment]=useState([])
  const[listStates,setListStates]=useState([])
  const[listCities,setListCities]=useState([])
  
  const fetchAllDepartment=async()=>{
    var result=await getData("department/displayall")
    setListDepartment(result.result) 
}

const fetchAllStates=async()=>{
  var result=await getData("statecity/displayallstates")
  setListStates(result.result)

}
const fetchAllCities=async(stateid)=>{
  var result=await postData("statecity/displayallcities",{stateid:stateid})
  setListCities(result.result)

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

  useEffect(function(){

  fetchAllDepartment()
  fetchAllStates()
  
  },[])
 

  const handleSubmit=async()=>{
    var formData= new FormData()

    formData.append('Firstname',fname)
    formData.append('Lastname',lname)
    formData.append('Fathername',faname)
    formData.append('gender',gender)
    formData.append('dob',dob)
    formData.append('qualification',qualification)
    formData.append('department',department)
    formData.append('address',address)
    formData.append('state',state)
    formData.append('city',city)
    formData.append('mobileno',mobileno)
    formData.append('alternatemobileno',alternatemobileno)
    formData.append('emailid',email)
    formData.append('password',password)
    formData.append('designation',designation)
    formData.append('picture',facicon.bytes)

    var result= await postDataAndImage("faculty/addfaculty",formData)
 
    if(result)
    {
      Swal.fire({
        title: "LMS",
        text: ' Faculty Submitted Successfully..',
        imageUrl: '/lms.png',
        imageWidth: 150,
        imageHeight: 150,
        icon:'success'
      })
    }
    else
    {
      Swal.fire({
        title: "LMS",
        text: 'Fail To Submit Faculty',
        imageUrl: '/lms.png',
        imageWidth: 150,
        imageHeight: 150,
        icon:'error'
      })
    }

  }
 
  const handleIconChange=(event)=>{
   setFacIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
  }
  const handleGender=(gen)=>
  {
  
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

   return(
      <div className={classes.root}>
      <div className={classes.subdiv}>
           

            <Grid container spacing={2}>
             <Grid item xs={12}>
               <div style={{display:'flex',alignItems:'center',fontSize:22,fontWeight:'bolder',letterSpacing:1}}>
                   <img src="/faculty.png" style={{width:60,height:60}}/>
                   Faculty Interface
                   <div style={{marginLeft:"auto"}}>
                   <Button onClick={()=>props.setView(<DisplayAllFaculty/>)} variant="contained" >List Faculties</Button>
                   </div>
                 </div>
               </Grid>
               

                      
                      <Grid item xs={4}>
                      <TextField fullWidth onChange={(event)=>setFName(event.target.value)} label="First Name" variant="outlined" />
                       </Grid>
                       <Grid item xs={4}>
                      <TextField fullWidth onChange={(event)=>setLName(event.target.value)}label="Last Name" variant="outlined"/>
                      </Grid>

                      
                      <Grid item xs={4}>
                      <TextField fullWidth onChange={(event)=>setFAName(event.target.value)}  label="Father Name" variant="outlined" />
                      </Grid>
                      <Grid item xs={6}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                         <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                         <FormControlLabel value="female" control={<Radio />} onClick={()=>handleGender("Female")} label="Female" />
                         <FormControlLabel value="male" control={<Radio />}onClick={()=>handleGender("Male")} label="Male" />
                         <FormControlLabel value="other" control={<Radio />}onClick={()=>handleGender("Other")} label="Other" />
                             </RadioGroup>
                            </FormControl>
                      
                              </Grid>

                      
                      <Grid item xs={6}>
                      <TextField fullWidth type="date"onChange={(event)=>setDOB(event.target.value)} variant="outlined" />
                      </Grid>
                      <Grid item xs={4}>
                      <TextField fullWidth onChange={(event)=>setQualification(event.target.value)}  label="Qualificaion" variant="outlined"/>                  
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
                      <TextField fullWidth onChange={(event)=>setDesignation(event.target.value)}  label="Designation" variant="outlined" />
                      </Grid>
                      <Grid item xs={12}>
                      <TextField fullWidth onChange={(event)=>setAddress(event.target.value)}  label="Address" variant="outlined"/>
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
                      <TextField fullWidth onChange={(event)=>setMobileno(event.target.value)}  label="MobileNo." variant="outlined" />
                      </Grid>
                      <Grid item xs={4}>
                      <TextField fullWidth onChange={(event)=>setAlternateMobileno(event.target.value)}  label="Alternate MobileNo." variant="outlined"/>
                      </Grid>
                      
                       
                     
                      <Grid item xs={4}>
                      <TextField fullWidth onChange={(event)=>setEmail(event.target.value)} type='email'  label="Email ID" variant="outlined" />
                      </Grid>
                      <Grid item xs={8}>
                      <TextField fullWidth onChange={(event)=>setPassword(event.target.value)} value={password} label="Password" type='text'  variant="outlined"/>
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
              
              <Grid item xs={6} >
                  <Button fullWidth onClick={()=>handleSubmit()} variant="contained" color="primary">Save</Button>
              </Grid>

              <Grid item xs={6} >
                  <Button fullWidth variant="contained" color="primary">Reset</Button>
              </Grid>

           </Grid>
       </div>
      </div>

   )

}

