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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MaterialTable from "@material-table/core"
import Select from '@mui/material/Select';
import Swal from "sweetalert2";
import { DisplaySettings } from "@mui/icons-material";
const Input = styled('input')({
  display: 'none',
});
const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',

  },
  subdiv: {

    background: '#ecf0f1',
    padding: 30,
    width: 1500,
    marginTop: 30,
  },
  inputstyle: {
    display: 'none',
  }
});
export default function DisplayAllStudents() {
  var classes = useStyles()
  const [liststudent, setListStudent] = useState([])
  const [studentid, setStudentId] = useState('')
  const [enroll, setEnroll] = useState('')
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
  const [addhar, setAddhar] = useState('')
  const [addharno, setAddharno] = useState({ bytes: '', file: "/facicon.png" })
  const [tempaddharno, setTempaddharno] = useState({ 'bytes': '', file: `${ServerURL}/images/${addharno}` })
  const [domicileid, setDomicileid] = useState('')
  const [domicile, setDomicile] = useState({ bytes: '', file: "/facicon.png" })
  const [tempdomicile, setTempdomicile] = useState({ 'bytes': '', file: `${ServerURL}/images/${domicile}` })
  const [department, setDepartment] = useState('')
  const [listDepartment, setListDepartment] = useState([])
  const [listCStates, setListCStates] = useState([])
  const [listCCities, setListCCities] = useState([])
  const [listPStates, setListPStates] = useState([])
  const [listPCities, setListPCities] = useState([])
  const [course, setCourse] = useState('')
  const [listCourse, setListCourse] = useState([])
  const [password, setPassword] = useState('')
  const [picture, setPicture] = useState({ bytes: '', file: "/facicon.png" })
  const [temppicture, setTemppicture] = useState({ 'bytes': '', file: `${ServerURL}/images/${picture}` })
  const [open, setOpen] = useState()
  const [gt, setGt] = useState({ female: false, male: false, other: false })
  const [ct, setCt] = useState({ sc: false, st: false, obc: false, general: false })
  const [dm, setDm] = useState({ MadhyaPradesh: false, otherstates: false })
  const [btnState, setBtnState] = useState(false)
  const [btnState1, setBtnState1] = useState(false)
  const [btnState2, setBtnState2] = useState(false)


  const fetchAllStudent = async () => {
    var result = await getData("student/displayStudents")
    setListStudent(result.result)
  }
  useEffect(function () {
    fetchAllStudent()
    fetchAllDepartment()
    fetchAllStates()
    fetchAllState()

  }, [])
  const fetchAllDepartment = async () => {
    var result = await getData("department/DisplayAll")
    setListDepartment(result.result)

  }
  const fetchAllStates = async () => {
    var result = await getData("statecity/displayallstates")
    setListPStates(result)

  }
  const fetchAllCities = async (stateid) => {
    var result = await postData("statecity/displayallcities", { stateid: stateid })
    setListPCities(result)

  }
  const fetchAllState = async () => {
    var result = await getData("statecity/displayallstates")
    setListCStates(result)

  }
  const fetchAllCity = async (stateid) => {
    var result = await postData("statecity/displayallcities", { stateid: stateid })
    setListCCities(result)

  }


  const handleGender = (gen) => {
    if (gen == "Female")
      setGt({ female: true, male: false, other: false })
    else if (gen == "Male")
      setGt({ female: false, male: true, other: false })
    else
      setGt({ female: false, male: false, other: true })

    setGender(gen)
  }

  const handleCategory = (cat) => {
    if (cat == "sc")
      setCt({ sc: true, st: false, obc: false, general: false })
    else if (cat == "st")
      setCt({ sc: false, st: true, obc: false, general: false })
    else if (cat == "obc")
      setCt({ sc: false, st: false, obc: true, general: false })
    else
      setCt({ sc: false, st: false, obc: false, general: true })

    setCategory(cat)
  }

  const handleDomicile = (dm) => {
    if (dm == "MadhyaPradesh")
      setDm({ MadhyaPradesh: true, otherstates: false })
    else {
      setDm({ MadhyaPradesh: false, otherstates: true })
    }
    setDomicileid(dm)
  }
  const handleStateChange = (event) => {
    setCstate(event.target.value);
    fetchAllCity(event.target.value)
  };
  const handleCityChange = (event) => {
    setCcity(event.target.value);

  };

  const handleStateChanges = (event) => {
    setPstate(event.target.value);
    fetchAllCities(event.target.value)
    alert(JSON.stringify(event.target.value))
  };
  const handleCityChanges = (event) => {
    setPcity(event.target.value);

  };
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };
  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const fillState = () => {

    return (listCStates.map((item) => {
      return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)

    })
    )

  }
  const fillCity = () => {
    return (listCCities.map((item) => {
      return (<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)

    })
    )

  }

  const fillStates = () => {

    return (listPStates.map((item) => {
      return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)

    })
    )

  }
  const fillCities = () => {
   
    return (listPCities.map((item) => {
      return (<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)

    })
    )

  }


  const fillDepartment = () => {

    return (listDepartment.map((item) => {
      return (<MenuItem value={item.departmentid}>{item.departmentname}</MenuItem>)

    })
    )
  }

  const fillCourse = () => {

    return (listCourse.map((item) => {
      return (<MenuItem value={item.courseid}>{item.coursename}</MenuItem>)

    })
    )
  }
  const fetchAllCourses = async (departmentid) => {
    var result = await postData("courses/displaycoursebydepartmentid", { departmentid: departmentid })
    setListCourse(result.result)
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
  const handleEditAadhar = (event) => {
    setAddharno({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })

    setBtnState(true)
  }

  const handleCancel = () => {
    setAddharno({ bytes: '', file: `${tempaddharno.file}` })
    setBtnState(false)
  }

  const handlesave = async () => {

    var formData = new FormData()
    formData.append('enrollmentno', enroll)
    formData.append('addharno', addharno.bytes)

    var result = await postDataAndImage('student/editaddhar', formData)
   
    setOpen(false)
    if (result.result) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Picture Edited Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      Swal.fire({
        position: 'center',
        icon: 'failed',
        title: 'failed to Edit Picture',
        showConfirmButton: false,
        timer: 1500
      })
    }
    setBtnState(false)
    fetchAllStudent()
  }

  const handleEditDomicile = (event) => {
    setDomicile({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })

    setBtnState1(true)
  }

  const handleCanceldomicile = () => {
    setDomicile({ bytes: '', file: `${tempdomicile.file}` })
    setBtnState1(false)
  }

  const handlesavedomicile = async () => {

    var formData = new FormData()
    formData.append('enrollmentno', enroll)
    formData.append('domicile', domicile.bytes)

    var result = await postDataAndImage('student/editdomicile', formData)
   
    setOpen(false)
    if (result.result) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Picture Edited Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      Swal.fire({
        position: 'center',
        icon: 'failed',
        title: 'failed to Edit Picture',
        showConfirmButton: false,
        timer: 1500
      })
    }
    setBtnState1(false)
    fetchAllStudent()
  }


  const handlePictureChange = (event) => {
    setPicture({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
    setBtnState2(true)

  }
  const handleCancelpicture = () => {
    setPicture({ bytes: '', file: `${temppicture.file}` })
    setBtnState2(false)
  }



  const handleEditIcon = async () => {

    var formData = new FormData()
    formData.append('enrollmentno', enroll)
    formData.append('picture', picture.bytes)



    var result = await postDataAndImage("student/editpicture", formData)
    
    setOpen(false)
    if (result.result) {
      Swal.fire({
        title: "LMS",
        text: 'Picture Edited Successfully',
        imageUrl: '/lms.png',
        imageWidth: '150',
        imageHeight: '150',
        icon: 'success'
      })
    }
    else {
      Swal.fire({
        title: "LMS",
        text: 'Fail to Edit Picture',
        imageUrl: '/lms.png',
        imageWidth: '150',
        imageHeight: '150',
        icon: 'error'
      })
    }
    setBtnState2(false)
    fetchAllStudent()

  }
  const handleEdit = (rowData) => {
    setEnroll(rowData.enrollmentno)
    setStudentId(rowData.studentid)
    setStudentName(rowData.studentname)
    setFaname(rowData.fathername)
    setMname(rowData.mothername)
    setGender(rowData.gender)
    if (rowData.gender == "Female")
      setGt({ female: true, male: false, other: false })
    else if (rowData.gender == "Male")
      setGt({ female: false, male: true, other: false })
    else
      setGt({ female: false, male: false, other: true })
    setDOB(rowData.dob)
    setCategory(rowData.category)
    if (rowData.category == "sc")
      setCt({ sc: true, st: false, obc: false, general: false })
    else if (rowData.category == "st")
      setCt({ sc: false, st: true, obc: false, general: false })
    else if (rowData.category == "obc")
      setCt({ sc: false, st: false, obc: true, general: false })
    else
      setCt({ sc: false, st: false, obc: false, general: true })
    setNationality(rowData.nationality)
    setMobileno(rowData.mobileno)
    setParentMobileno(rowData.parentmobileno)
    setDepartment(rowData.departmentid)
    setCourse(rowData.courseid)
    setCAddress(rowData.caddress)
    setCstate(rowData.cstate)
    fetchAllCity(rowData.cstate)
    setCcity(rowData.ccity)
    setPAddress(rowData.paddress)
    setPstate(rowData.pstate)
    fetchAllCities(rowData.pstate)
    setPcity(rowData.pcity)
    setEmail(rowData.emailid)
    setOccupation(rowData.occupation)
    setIncome(rowData.income)
    setAddhar(rowData.addhar)
    setAddharno({ bytes: '', file: `${ServerURL}/images/${rowData.addharno}` })
    setTempaddharno({ bytes: '', file: `${ServerURL}/images/${rowData.addharno}` })
    setDomicileid(rowData.domicileid)
    if (rowData.domicile == "MadhyaPradesh")
      setDm({ MadhyaPradesh: true, otherstates: false })
    else
      setDm({ MadhyaPradesh: false, otherstates: true })
    setDomicile({ bytes: '', file: `${ServerURL}/images/${rowData.domicile}` })
    setTempdomicile({ bytes: '', file: `${ServerURL}/images/${rowData.domicile}` })
    setPassword(rowData.password)
    setPicture({ byte: '', file: `${ServerURL}/images/${rowData.picture}` })
    setTemppicture({ byte: '', file: `${ServerURL}/images/${rowData.picture}` })
    setOpen(true)
  }

  const handleDeleteData = async (studentid, picture) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {

        var body = { studentid: studentid, picture: picture }
        var result = await postData("student/deletestudent", body)
        if (result.result)
          Swal.fire(
            'Deleted!',
            'Student has been deleted.',
            'success'
          )
      }
      else
        Swal.fire(
          'Deleted!',
          'Fail to Delete Student .',
          'error'
        )
      fetchAllStudent()
    })





  }



  const handleEditData = async () => {


    var body = { studentid:studentid,enrollmentno: enroll, studentname: studentname, fathername: faname, mothername: mname, nationality: nationality, category: category, gender: gender, dob: dob, mobileno: mobileno, parentmobileno: parentmobileno, caddress: caddress, cstate: cstate, ccity: ccity, paddress: paddress, pstate: pstate, pcity: pcity, emailid: email, occupation: occupation, income: income, departmentid: department, courseid: course, addhar: addhar, domicileid: domicileid, password: password }
    var result = await postData("student/editstudent", body)
   
    setOpen(false)
    if (result.result) {
      Swal.fire({
        title: "LMS",
        text: 'Student Edited Successfully',
        imageUrl: '/lms.png',
        imageWidth: '150',
        imageHeight: '150',
        icon: 'success'
      })
    }
    else {
      Swal.fire({
        title: "LMS",
        text: 'Fail to Edit Student',
        imageUrl: '/lms.png',
        imageWidth: '150',
        imageHeight: '150',
        icon: 'error'
      })


    }
    fetchAllStudent()

  }

  const handleClose = () => {
    setOpen(false)
  }

  const showDialog = () => {

    return (
      <Dialog

        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth='xl'
      >
        <DialogContent >
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src="/admission.png" style={{ width: 45, height: 45, padding: 5 }} />
              <div style={{ textAlign: 'center', fontWeight: "bolder", fontSize: '18px', padding: 5 }}>
                STUDENT REGISTRATION FORM
              </div>
            </Grid>

            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
              <img src="/personal.jpg" style={{ width: 35, height: 35, padding: 5 }} />
              <div style={{ textAlign: 'center', fontWeight: "bolder", fontSize: '18px', padding: 5 }}>
                Personal Details
              </div>
            </Grid>

            <Grid item xs={4}>
              <TextField fullWidth variant="outlined" value={enroll} label="Enrollment No." onChange={(event) => setEnroll(event.target.value)} />
            </Grid>


            <Grid item xs={4}>
              <TextField fullWidth variant="outlined" value={studentname} label="StudentName" onChange={(event) => setStudentName(event.target.value)} />
            </Grid>

            <Grid item xs={4}>
              <TextField fullWidth variant="outlined" value={faname} label="FatherName" onChange={(event) => setFaname(event.target.value)} />
            </Grid>

            <Grid item xs={4}>
              <TextField fullWidth variant="outlined" value={mname} label="MotherName" onChange={(event) => setMname(event.target.value)} />
            </Grid>

            <Grid item xs={4}>
              <TextField fullWidth variant="outlined" value={nationality} label="Nationality" onChange={(event) => setNationality(event.target.value)} />
            </Grid>

            <Grid item xs={4}>

              <TextField fullWidth type="date" value={dob} onChange={(event) => setDOB(event.target.value)} variant="outlined" />
            </Grid>

            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Category</FormLabel>
                <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                  <FormControlLabel value="sc" control={<Radio checked={ct.sc} />} onClick={() => handleCategory("Sc")} label="SC" />
                  <FormControlLabel value="st" control={<Radio checked={ct.st} />} onClick={() => handleCategory("St")} label="ST" />
                  <FormControlLabel value="obc" control={<Radio checked={ct.obc} />} onClick={() => handleCategory("Obc")} label="OBC" />
                  <FormControlLabel value="general" control={<Radio checked={ct.general} />} onClick={() => handleCategory("General")} label="GENERAL" />
                </RadioGroup>
              </FormControl>
            </Grid>


            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                  <FormControlLabel value="female" control={<Radio checked={gt.female} />} onClick={() => handleGender("Female")} label="Female" />
                  <FormControlLabel value="male" control={<Radio checked={gt.male} />} onClick={() => handleGender("Male")} label="Male" />
                  <FormControlLabel value="other" control={<Radio checked={gt.other} />} onClick={() => handleGender("Other")} label="Other" />
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
              <TextField fullWidth value={mobileno} onChange={(event) => setMobileno(event.target.value)} label="MobileNo." variant="outlined" />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth value={parentmobileno} onChange={(event) => setParentMobileno(event.target.value)} label="Parent MobileNo." variant="outlined" />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth value={caddress} onChange={(event) => setCAddress(event.target.value)} label="Current Address" variant="outlined" />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label1">Current State</InputLabel>
                <Select
                  labelId="demo-simple-select-label1"
                  id="demo-simple-select"
                  value={cstate}
                  label="Current State"
                  onChange={handleStateChange}
                >
                  {fillStates()}
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
                  onChange={handleCityChange}
                >
                  {fillCity()}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth value={paddress} onChange={(event) => setPAddress(event.target.value)} label="Permanent Address" variant="outlined" />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label1">Permanent State</InputLabel>
                <Select
                  labelId="demo-simple-select-label1"
                  id="demo-simple-select"
                  value={pstate}
                  label="Permanent State"
                  onChange={handleStateChanges}
                >
                  {fillStates()}
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
                  onChange={handleCityChanges}
                >
                  {fillCities()}
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
              <TextField fullWidth value={email} onChange={(event) => setEmail(event.target.value)} label="EmailId" variant="outlined" />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth value={occupation} onChange={(event) => setOccupation(event.target.value)} label="Occupation" variant="outlined" />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth value={income} onChange={(event) => setIncome(event.target.value)} label="Income" variant="outlined" />
            </Grid>

            <Grid item xs={8}>
              <TextField fullWidth value={addhar} onChange={(event) => setAddhar(event.target.value)} label="Addhar No." variant="outlined" />
            </Grid>

            <Grid item xs={6}>
                <label htmlFor="contained-button-file3">
                    <Input onChange={(event)=>handleEditAadhar(event)} accept="image/*" id="contained-button-file3" multiple type="file" />
                   <Button  sx={{padding:1.8}} fullWidth variant="contained" component="span">
                   Upload Aadhar Card
                   </Button>
              </label>
           </Grid>
           <Grid item xs={6} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
           {btnState?<><Button onClick={()=>handlesave()}>Save</Button><Button onClick={()=>handleCancel()}>Cancel</Button></>:<></>}
           <Avatar
           alt="Upload Image"
           src={addharno.file}
           variant='square'
           sx={{ width: 40, height: 40 }}
            />
                </Grid>

            <Grid item xs={8}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Domicile</FormLabel>
                <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                  <FormControlLabel value="1" control={<Radio checked={dm.MadhyaPradesh} />} onClick={() => handleDomicile("MadhyaPradesh")} label="MadhyaPradesh" />
                  <FormControlLabel value="otherstates" control={<Radio checked={dm.otherstates} />} onClick={() => handleDomicile("otherstates")} label="otherstates" />

                </RadioGroup>
              </FormControl>
            </Grid>


            <Grid item xs={6}>
                <label htmlFor="contained-button-file1">
                   <Input onChange={(event)=>handleEditDomicile(event)} accept="image/*" id="contained-button-file1" multiple type="file" />
                 <Button  sx={{padding:1.8}} fullWidth variant="contained" component="span">
                 Upload Domicile
                 </Button>
               </label>
           </Grid>
           <Grid item xs={6} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
           {btnState1?<><Button onClick={()=>handlesavedomicile()}>Save</Button><Button onClick={()=>handleCanceldomicile()}>Cancel</Button></>:<></>}
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
                  value={department}
                  label="Department"
                  onChange={handleDepartmentChange}
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
                  value={course}
                  label="Course"
                  onChange={handleCourseChange}
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

            <Grid item xs={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <label htmlFor="contained-button-file">
                <Input onChange={(event) => handlePictureChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
                <Button fullWidth variant="contained" component="span">
                  Upload Picture
                </Button>
              </label>
            </Grid>

            <Grid item xs={6} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
           {btnState2?<><Button onClick={()=>handleEditIcon()}>Save</Button><Button onClick={()=>handleCancelpicture()}>Cancel</Button></>:<></>}
           <Avatar
           alt="Upload Image"
           src={picture.file}
           variant='square'
           sx={{ width: 40, height: 40 }}
            />
                 </Grid>
          

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleEditData()} >Edit</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    )

  }



  function DisplayAllStudents() {
    return (

      <MaterialTable
        title="List Of Student"
        columns={[
          { title: 'StudentId', field: 'studentid' },
          { title: ' Name', field: 'Studentname', render: (rowData) => (<div>{rowData.studentname} {rowData.fathername}<br /> {rowData.mothername}</div>) },

          { title: 'Nationality/Category', field: 'nationality', render: (rowData) => (<div>{rowData.nationality}<br /> {rowData.category}</div>) },

          { title: 'Gender/DOB', field: 'gender', render: (rowData) => (<div>{rowData.gender}<br /> {rowData.dob}</div>) },

          { title: 'Contact List', field: 'mobileno', render: (rowData) => (<div>{rowData.mobileno}<br /> {rowData.parentmobileno}<br />{rowData.emailid}</div>) },

          { title: 'Current Address', field: 'caddress', render: (rowData) => (<div>{rowData.caddress}<br />{rowData.ccityname},{rowData.cstatename}</div>) },

          { title: 'Occupation/Income', field: 'occupation', render: (rowData) => (<div>{rowData.occupation}<br /> {rowData.income}</div>) },

         
          {
            title: 'Addhar Card', field: 'addharno',
            render: rowData => <img src={`${ServerURL}/images/${rowData.addharno}`} style={{ width: 50, borderRadius: '50%' }} />
          },

          {
            title: 'Domicile ID', field: 'domicileid',
            render: rowData => <img src={`${ServerURL}/images/${rowData.domicile}`} style={{ width: 50, borderRadius: '50%' }} />
          },

          { title: 'Department/Course', field: 'departmentid', render: (rowData) => (<div>{rowData.departmentname}<br /> {rowData.coursename}</div>) },


          {
            title: 'Picture', field: 'picture',
            render: rowData => <img src={`${ServerURL}/images/${rowData.picture}`} style={{ width: 50, borderRadius: '50%' }} />
          },
        ]}
        data={liststudent}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit  Student ',
            onClick: (event, rowData) => { handleEdit(rowData) }
          },
          {
            icon: 'delete',
            tooltip: 'Delete Student ',
            onClick: (event, rowData) => { handleDeleteData(rowData.studentid, rowData.picture) }
          }
        ]}
      />
    )
  }
  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>

        {DisplayAllStudents()}
        {showDialog()}

      </div>
    </div>


  )
}
