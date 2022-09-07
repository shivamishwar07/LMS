import React, { useState, useEffect } from "react";
import { styled, makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import { ServerURL, postDataAndImage, getData, postData } from "./FetchNodeServices";
import { TextField, Button, Grid } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DisplayAllStudents from "./DisplayAllStudents";
import Swal from "sweetalert2";
import { Label } from "@mui/icons-material";
const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',

  },
  subdiv: {
    display: 'flex',
    background: '#ecf0f1',
    padding: 30,
    width: 700,
    marginTop: 30,
  },
  inputstyle: {
    display: 'none',
  }
});

const Input = styled('input')({
  display: 'none',
});

export default function Student(props) {
  var classes = useStyles()
  const [ enrollmentno, setEnrollmentNo] = useState('')
  const [studentname, setStudentName] = useState('')
  const [faname, setFaname] = useState('')
  const [mname, setMname] = useState('')
  const [nationality, setNationality] = useState('')
  const [category, setCategory] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDOB] = useState('')
  const [mobileno, setMobileno] = useState('')
  const [parentmobileno, setParentMobileno] = useState('')
  const [caddress, setCAddress] = useState('')
  const [cstate, setCstate] = useState('')
  const [ccity, setCcity] = useState('')
  const [paddress, setPAddress] = useState('')
  const [pstate, setPstate] = useState('')
  const [pcity, setPcity] = useState('')
  const [email, setEmail] = useState('')
  const [occupation, setOccupation] = useState('')
  const [income, setIncome] = useState('')
  const [addharno, setAddharno] = useState({ 'bytes': '', file: "/facicon.png" })
  const [addhar, setAddhar] = useState('')
  const [domicileid, setDomicileid] = useState('')
  const [domicile, setDomicile] = useState({ 'bytes': '', file: "/facicon.png" })
  const [departmentid, setDepartmentId] = useState('')
  const [listDepartment, setListDepartment] = useState([])
  const [listcstate,setListCstate]=useState([])
  const [listpstate,setListPstate]=useState([])
  const [listccity,setListCcity]=useState([])
  const [listpcity,setListPcity]=useState([])
  const [courseid, setCourseId] = useState('')
  const [listCourse, setListCourse] = useState([])
  const [password, setPassword] = useState('')
  const [picture, setPicture] = useState({ bytes: '', file: "/facicon.png" })

  
  useEffect (function(){
    FetchAllCstate()
    FetchAllPstate()
    fetchAllDepartment()
        
},[])

  const fetchAllDepartment = async () => {
    var result = await getData("department/displayall")
    setListDepartment(result.result)
  }



  const FetchAllCstate=async()=>{
    var result = await getData("statecity/displayallstates")
    setListCstate(result.result)
 }

 const handlecstate=(event)=>{
   setCstate(event.target.value)
   FetchAllCcity(event.target.value)
 }

 
 const fillcstate=()=>{
  return(listcstate.map((item)=>{
    return(<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
  }))
}


 const FetchAllPstate=async()=>{
  var result = await getData("statecity/displayallstates")
  setListPstate(result.result)
}

const handlepstate=(event)=>{
 setPstate(event.target.value)
  FetchAllPcity(event.target.value)
 
}


const fillpstate=()=>{
  return(listpstate.map((item)=>{
    return(<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
  }))
}

 const FetchAllCcity=async(stateid)=>{

   var result = await postData("statecity/displayallcities",{stateid:stateid})
   setListCcity(result.result)
 }

 const handleccity=(event)=>{
   setCcity(event.target.value)
   
 }

 const fillccity=()=>{
   return(listccity.map((item)=>{
     return(<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
   }))
 }

 const FetchAllPcity=async(stateid)=>{
  var result = await postData("statecity/displayallcities",{stateid:stateid})
  setListPcity(result.result)
}

const handlepcity=(event)=>{
  setPcity(event.target.value)
  
}

const fillpcity=()=>{
  return(listpcity.map((item)=>{
    return(<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
  }))
}


  const fillDepartment = () => {

    return (listDepartment.map((item) => {
      return (<MenuItem value={item.departmentid}>{item.departmentname}</MenuItem>)

    })
    )
  }

  const fillCourse=()=>{
    return(listCourse.map((item)=>{
      return(<MenuItem value={item.courseid}>{item.coursename}</MenuItem>)
    }))
  }

const fetchAllCourses=async(departmentid)=>{
  var result= await postData("courses/displaycoursebydepartmentid",{departmentid:departmentid})
  setListCourse(result.result)
}

  const handleGender = (gen) => {

    setGender(gen)
  }
  const handleCategory = (cat) => {

    setCategory(cat)
  }
  const handleDomicile = (dom) => {

    setDomicile(dom)
  }
  
  


  const handleDepartmentChange = (event) => {
    setDepartmentId(event.target.value);
   fetchAllCourses(event.target.value)
  };
  const handleCourseChange = (event) => {
  
    setCourseId(event.target.value);
  };

  const handleAddharChange = (event) => {
    setAddharno({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
  }

  const handleDomicileChange = (event) => {
    setDomicile({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
  }
  const handlePictureChange = (event) => {
    setPicture({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
  }


  const handleGeneratePassword = () => {
    var ar = ['0', '1', '2', '3', '@', '#', '?', 'A', 'P', 'Q', 'R']
    var pwd = ""
    for (var i = 1; i <= 8; i++) {
      var c = ar[Math.floor(Math.random() * 9)]

      pwd += c

    }
    setPassword(pwd)
  }

  const handleSubmit = async () => {
    var formData = new FormData()
    formData.append('enrollmentno', enrollmentno)
    formData.append('studentname', studentname)
    formData.append('fathername', faname)
    formData.append('mothername', mname)
    formData.append('nationality', nationality)
    formData.append('category', category)
    formData.append('gender', gender)
    formData.append('dob', dob)
    formData.append('mobileno', mobileno)
    formData.append('parentmobileno', parentmobileno)
    formData.append('caddress', caddress)
    formData.append('cstate', cstate)
    formData.append('ccity', ccity)
    formData.append('paddress', paddress)
    formData.append('pstate', pstate)
    formData.append('pcity', pcity)
    formData.append('emailid', email)
    formData.append('occupation', occupation)
    formData.append('income', income)
    formData.append('addhar', addhar)
    formData.append('addharno', addharno.bytes)
    formData.append('domicileid', domicileid)
    formData.append('domicile', domicile.bytes)
    formData.append('departmentid', departmentid)
    formData.append('courseid', courseid)
    formData.append('password', password)
    formData.append('picture', picture.bytes)

    var result = await postDataAndImage("student/addstudent", formData)
   
    if (result.result) {
      Swal.fire({
        title: "LMS",
        text: ' Student Submitted Successfully..',
        imageUrl: '/lms.png',
        imageWidth: 150,
        imageHeight: 150,
        icon: 'success'
      })
    }
    else {
      Swal.fire({
        title: "LMS",
        text: 'Fail To Submit Student',
        imageUrl: '/lms.png',
        imageWidth: 150,
        imageHeight: 150,
        icon: 'error'
      })
    }

  }





  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid container spacing={2}>

          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="/admission.png" style={{ width: 45, height: 45, padding: 5 }} />
            <div style={{ textAlign: 'center', fontWeight: "bolder", fontSize: '18px', padding: 5 }}>
              STUDENT REGISTRATION FORM
            
              <Button style={{marginLeft:"left"}} onClick={()=>props.setView(<DisplayAllStudents/>)} variant="contained" >List Students</Button>
              
            </div>
          </Grid>

          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
            <img src="/personal.jpg" style={{ width: 35, height: 35, padding: 5 }} />
            <div style={{ textAlign: 'center', fontWeight: "bolder", fontSize: '18px', padding: 5 }}>
              Personal Details
            </div>
          </Grid>

          <Grid item xs={4}>
            <TextField fullWidth variant="outlined" label="Enrollment No."  onChange={(event) => setEnrollmentNo(event.target.value)} />
          </Grid>


          <Grid item xs={4}>
            <TextField fullWidth variant="outlined" label="StudentName"  onChange={(event) => setStudentName(event.target.value)} />
          </Grid>

          <Grid item xs={4}>
            <TextField fullWidth variant="outlined" label="FatherName"  onChange={(event) => setFaname(event.target.value)} />
          </Grid>

          <Grid item xs={4}>
            <TextField fullWidth variant="outlined" label="MotherName"  onChange={(event) => setMname(event.target.value)} />
          </Grid>

          <Grid item xs={4}>
            <TextField fullWidth variant="outlined" label="Nationality"  onChange={(event) => setNationality(event.target.value)} />
          </Grid>

          <Grid item xs={4}>

            <TextField fullWidth type="date" onChange={(event) => setDOB(event.target.value)} variant="outlined" />
          </Grid>

          <Grid item xs={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Category</FormLabel>
              <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                <FormControlLabel value="sc" control={<Radio />} onClick={() => handleCategory("Sc")} label="SC" />
                <FormControlLabel value="st" control={<Radio />} onClick={() => handleCategory("St")} label="ST" />
                <FormControlLabel value="obc" control={<Radio />} onClick={() => handleCategory("Obc")} label="OBC" />
                <FormControlLabel value="general" control={<Radio />} onClick={() => handleCategory("General")} label="GENERAL" />
              </RadioGroup>
            </FormControl>
          </Grid>


          <Grid item xs={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                <FormControlLabel value="female" control={<Radio />} onClick={() => handleGender("Female")} label="Female" />
                <FormControlLabel value="male" control={<Radio />} onClick={() => handleGender("Male")} label="Male" />
                <FormControlLabel value="other" control={<Radio />} onClick={() => handleGender("Other")} label="Other" />
              </RadioGroup>
            </FormControl>
          </Grid>



          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
            <img src="/contact.png" style={{ width: 35, height: 35, padding: 5 }} />

            <div style={{ textAlign: 'center', fontWeight: "bolder", fontSize: '18px', padding: 5 }}>
              Contact Details
            </div>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth onChange={(event) => setMobileno(event.target.value)} label="MobileNo." variant="outlined" />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth onChange={(event) => setParentMobileno(event.target.value)}  label="Parent MobileNo." variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth onChange={(event) => setCAddress(event.target.value)} label="Current Address" variant="outlined" />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label1">Current State</InputLabel>
              <Select
                labelId="demo-simple-select-label1"
                id="demo-simple-select"
                value={cstate}
                label="Current State"
                onChange={(event)=>handlecstate(event)}
              >
                {fillcstate()}
              </Select>
            </FormControl>

          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label2">Current City</InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select"
                value={ccity}
                label="Current City"
                onChange={(event)=>handleccity(event)}
              >
                {fillccity()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth onChange={(event) => setPAddress(event.target.value)} label="Permanent Address" variant="outlined" />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label1">Permanent State</InputLabel>
              <Select
                labelId="demo-simple-select-label1"
                id="demo-simple-select"
                value={pstate}
                label="Permanent State"
                onChange={(event)=>handlepstate(event)}
              >
                {fillpstate()}
              </Select>
            </FormControl>

          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label2">Permanent City</InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select"
                value={pcity}
                label="Permanent City"
                onChange={(event)=>handlepcity(event)}
              >
                {fillpcity()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
            <img src="/document.png" style={{ width: 35, height: 35, padding: 5 }} />
            <div style={{ textAlign: 'center', fontWeight: "bolder", fontSize: '18px', padding: 5 }}>
              Documentation
            </div>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth onChange={(event) => setEmail(event.target.value)} label="EmailId" variant="outlined" />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth onChange={(event) => setOccupation(event.target.value)} label="Occupation" variant="outlined" />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth onChange={(event) => setIncome(event.target.value)} label="Income" variant="outlined" />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth onChange={(event) => setAddhar(event.target.value)} label="Addhar No." variant="outlined" />
          </Grid>

          <Grid item xs={4}>
                <label htmlFor="contained-button-file3">
        <Input onChange={(event)=>handleAddharChange(event)} accept="image/*" id="contained-button-file3" multiple type="file" />
        <Button  sx={{padding:1.8}} fullWidth variant="contained" component="span">
          Upload Aadhar Card
        </Button>
      </label>
           </Grid>
           <Grid item xs={2} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
           <Avatar
           alt="Upload Image"
           src={addharno.file}
           variant='square'
           sx={{ width: 40, height: 40 }}
            />
                </Grid> 



          <Grid item xs={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Domicile</FormLabel>
              <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                <FormControlLabel value="MadhyaPradesh" control={<Radio />} onClick={() => handleDomicile("MadhyaPradesh")} label="MadhyaPradesh" />
                <FormControlLabel value="otherstates" control={<Radio />} onClick={() => handleDomicile("otherstates")} label="otherstates" />

              </RadioGroup>
            </FormControl>
          </Grid>


          <Grid item xs={4}>
                <label htmlFor="contained-button-file1">
        <Input onChange={(event)=>handleDomicileChange(event)} accept="image/*" id="contained-button-file1" multiple type="file" />
        <Button  sx={{padding:1.8}} fullWidth variant="contained" component="span">
          Upload Domicile
        </Button>
      </label>
           </Grid>
           <Grid item xs={2} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
           <Avatar
           alt="Upload Image"
           src={domicile.file}
           variant='square'
           sx={{ width: 40, height: 40 }}
            />
                </Grid> 

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={departmentid}
                label="Department"
                onChange={(event)=>handleDepartmentChange(event)}
              >
                {fillDepartment()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Course</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={courseid}
                label="Course"
                onChange={(event)=>handleCourseChange(event)}

              >
                {fillCourse()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={8}>
            <TextField fullWidth onChange={(event) => setPassword(event.target.value)} value={password} label="Password" type='text' variant="outlined" />
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button fullWidth sx={{ padding: 2 }} onClick={() => handleGeneratePassword()} variant="contained" color="primary">Create Password</Button>
          </Grid>

          <Grid item xs={6}>
                <label htmlFor="contained-button-file2">
                   <Input onChange={(event)=>handlePictureChange(event)} accept="image/*" id="contained-button-file2" multiple type="file" />
                  <Button sx={{padding:1.8}} fullWidth variant="contained" component="span">
          Upload Photo
        </Button>
      </label>
           </Grid>
           <Grid item xs={3} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
           <Avatar
           alt="Upload Image"
           src={picture.file}
           variant='square'
           sx={{ width: 40, height: 40 }}
            />
                 </Grid>
      


          <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button fullWidth onClick={() => handleSubmit()} variant="contained">Save</Button>
          </Grid>

          <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button fullWidth variant="contained">Reset</Button>
          </Grid>

        </Grid>
      </div>
    </div>
  )



}