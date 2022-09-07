import React, { useState, useEffect } from 'react'
import { styled, makeStyles } from '@mui/styles';
import { Grid, TextField, Button } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import { ServerURL, postDataAndImage, getData, postData } from './FetchNodeServices';
import Swal from 'sweetalert2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import { DataGrid } from '@mui/x-data-grid';
import { daDKCore } from '@mui/material/locale';

const UseStyles = makeStyles({
  one: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },


  two: {
    background: '#ecf0f1',
    width: 1500,
    marginTop: 10,
    borderRadius: 10,
    padding: 20,
  }

})

export default function Createset(props) {
  var classes = UseStyles()


  const [examDate, setExamDate] = useState('')
  const [examTime, setExamTime] = useState('')
  const [facultyid, setFacultyid] = useState('')
  const [departmentid, setDepartmentid] = useState('')
  const [courseid, setCourseid] = useState('')
  const [subjectid, setSubjectid] = useState('')
  const [setno, setSetNo] = useState('')
  const [status, setStatus] = useState('')
  const [listcourses, setListCourses] = useState([])
  const [listsubject, setListSubject] = useState([])
  const [listSetNo, setListSetNo] = useState([])
  const [faculty, setFaculty] = useState([])
  const [semester, setSemester] = useState('')
  const [totalSem, setTotalSem] = useState('')
  const [enrollmentno, setEnrollmentNo] = useState('')
  const [listEnrollmentNo, setListEnrollmentNo] = useState([])
  const [selectionEnrollment, setSelectionEnrollment] = useState([])




  useEffect(function () {
    var data = JSON.parse(localStorage.getItem("SES_FACULTY"))
    setFaculty(data)
    fetchAllCourses(data.department)
    setFacultyid(data.facultyid)
    setDepartmentid(data.department)

  }, [])


  const fetchAllCourses = async (departmentid) => {
    var result = await postData("courses/displaycoursebydepartmentid", { departmentid: departmentid })
    setListCourses(result.result)
  }

  const handleCourse = (event) => {
    setCourseid(event.target.value);
    fetchAllSemester(event.target.value)
  };

  const fillcourses = () => {
    return (listcourses.map((item) => {
      return (<MenuItem value={item.courseid}>{item.coursename}</MenuItem>)
    })
    )
  }

  const FetchAllSubject = async (sem) => {
    var result = await postData("subjects/displaysubjectbycourseid", { courseid: courseid, semester: sem })
    setListSubject(result.result)
  }

  const handleSubject = async (event) => {
    setSubjectid(event.target.value);
    FetchAllSetNo(event.target.value)

  };

  const fillsubject = () => {
    return (listsubject.map((item) => {
      return (<MenuItem value={item.subjectid}>{item.subjectname}</MenuItem>)
    })
    )
  }

  const FetchAllSetNo = async (subjectid) => {
    var result = await postData("subjects/getsetnobysubjectid", { subjectid: subjectid })
    setListSetNo(result.result)
  }

  const handleSetNo = async (event) => {
    setSetNo(event.target.value);

  };

  const fillSetNo = () => {
    return (listSetNo.map((item) => {
      return (<MenuItem value={item.setno}>{item.setno}</MenuItem>)
    })
    )
  }

  const FetchAllEnrollmentNo = async (semesterid) => {
    var result = await postData("admission/enrollmentnobyadmissionid", { courseid: courseid, semester: semesterid })
    const data = result.result.map(item => ({ id: item.enrollmentno, ...item }))
    setListEnrollmentNo(data)
  }

  const handleEnrollmentNo = async (event) => {
    setEnrollmentNo(event.target.value);
  };

  const fillEnrollment = () => {
    return (listEnrollmentNo.map((item) => {
      return (<MenuItem value={item.enrollmentno}>{item.enrollmentno}</MenuItem>)
    })
    )
  }

  const fetchAllSemester = async (courseid) => {
    var result = await postData('courses/getsemesterbycourseid', { courseid: courseid })

    setTotalSem(result.result[0].semester)
  }

  const handleSemester = (event) => {
    setSemester(event.target.value)
    FetchAllSubject(event.target.value)
    FetchAllEnrollmentNo(event.target.value)

  }

  const fillsemester = () => {
    var sem = []
    for (var i = 1; i <= totalSem; i++) { sem.push(i) }

    return sem.map((item) => {

      return <MenuItem value={item}>{item}</MenuItem>
    })
  }

  const handleSave = async () => {
    var body = { examdate: examDate, examtime: examTime, facultyid: facultyid, departmentid: departmentid, courseid: courseid, semester: semester, subjectid: subjectid, setno: setno, enrollmentno: selectionEnrollment, status: status }

    var result = await postData("scheduleexams/addData", body)
    if (result.result) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Set Detail has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  }

  // CHECKBOX TABLE OF ENROLLMENT NO. BY COURSE

  function DataTable() {

    const columns = [

      { headerName: 'Enrollment No.', field: 'enrollmentno', width: 130 },
      { headerName: 'Student Name', field: 'studentname', width: 130 },
      { headerName: 'Department', field: 'departmentname', width: 130 },
      { headerName: 'Course', field: 'coursename', width: 130 },
    ];



    return (
      <div style={{ height: 400, width: '100%', padding: 10 }}>
        <DataGrid fullWidth
          rows={listEnrollmentNo}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(data)=>{
            setSelectionEnrollment(data)
          }}
        />
      </div>
    );
  }




  return (
    <div className={classes.one}>
      <div className={classes.two}>
        <Grid style={{ marginTop: 20 }} container spacing={2}>
          <Grid item xs={12}>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', fontSize: 20, fontWeight: 'bold', letterSpacing: 1 }}>
              <img src="/unit.png" style={{ width: 40, height: 40, marginRight: 10 }} />
              Schedule Exams
            </div>
          </Grid>


          <Grid item xs={2}>
            <TextField fullWidth value={examDate} type="date" onChange={(event) => setExamDate(event.target.value)} id="outlined-basic" variant="outlined" />
          </Grid>
          <Grid item xs={2}>
            <TextField fullWidth value={examTime} type="time" onChange={(event) => setExamTime(event.target.value)} id="outlined-basic" variant="outlined" />
          </Grid>
          <Grid item xs={2}>
            <TextField fullWidth value={faculty.facultyid} id="outlined-basic" label="Faculty ID" variant="outlined" />
          </Grid>
          <Grid item xs={2}>
            <TextField fullWidth value={faculty.departmentname} id="outlined-basic" label="Department" variant="outlined" />
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Course</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={courseid}
                label="Course"
                onChange={(event) => handleCourse(event)}
              >
                {fillcourses()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Semester</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={semester}
                label="Semester"
                onChange={(event) => handleSemester(event)}
              >
                {fillsemester()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Subject</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subjectid}
                label="Subject"
                onChange={(event) => handleSubject(event)}
              >
                {fillsubject()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Set No.</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={setno}
                label="Subject"
                onChange={(event) => handleSetNo(event)}
              >
                {fillSetNo()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth value={status} onChange={(event) => setStatus(event.target.value)} id="outlined-basic" label="Status" variant="outlined" />
          </Grid>




          <Grid item xs={12}>
            {DataTable()}
          </Grid>


          <Grid item xs={6}>
            <Button fullWidth onClick={() => handleSave()} variant='contained' color='success'>Save</Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant='contained' color='warning'>Reset</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  )

}