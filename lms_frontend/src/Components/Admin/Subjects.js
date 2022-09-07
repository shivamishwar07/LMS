import { ClassNames } from '@emotion/react'
import { styled, makeStyles } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { TextField, Grid, Button } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getData, postData } from './FetchNodeServices';
import DisplayAllSubjects from "./DisplayAllSubjects";
import Swal from 'sweetalert2';


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
    width: 600,
    marginTop: 30,
    borderBlockStyle: '-moz-initial',
  },
  inputstyle: {
    display: 'none',
  }
});

const Input = styled('input')({
  display: 'none',
});
export default function Subjects(props) {
  var Classes = useStyles()
  const [subjectid, setSubjectId] = useState('')
  const [courseId, setCourseId] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [semester, setSemester] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const [type, setType] = useState('')
  const [subjectMarks, setSubjectMarks] = useState('')

  const [listCourses, setListCourses] = useState([])
  const [listDep, setListDep] = useState([])
  const [sem, setSem] = useState([])



  const FetchAllDep = async () => {
    var result = await getData("department/displayall")
    setListDep(result.result)
  }

  const handleChangeDep = (event) => {
    setDepartmentId(event.target.value)
    FetchAllCourses(event.target.value)
  }

  const filldep = () => {
    return (listDep.map((item) => {
      return (<MenuItem value={item.departmentid}>{item.departmentname}</MenuItem>)
    })
    )
  }


  const FetchAllCourses = async (departmentid) => {
    var result = await postData("courses/displaycoursebydepartmentid", { departmentid: departmentid })

    setListCourses(result.result)
  }

  const handleCourses = (event) => {
    setCourseId(event.target.value);
    FetchAllSem(event.target.value)
  };

  const fillCourses = () => {
    return (listCourses.map((item) => {
      return (<MenuItem value={item.courseid}>{item.coursename}</MenuItem>)
    })
    )
  }

  const FetchAllSem = async (courseid) => {
    var result = await postData("courses/getsemesterbycourseid", { courseid: courseid })

    setSem(result.result[0].semester)
  }

  const handleChangeSem = (event) => {
    setSemester(event.target.value)
  }

  const fillsem = () => {
    var x = []
    for (var i = 1; i <= sem; i++)
      x.push(i)
    return (x.map(item => {


      return (<MenuItem value={item}>{item}</MenuItem>)

    })
    )
  }


  useEffect(function () {
    FetchAllDep()



  }, [])

  const handleChangeType = (event) => {
    setType(event.target.value);
  };


  const saveDetail = async () => {
    var body = { subjectid: subjectid, courseid: courseId, departmentid: departmentId, semester: semester, subjectname: subjectName, type: type, subjectmarks: subjectMarks }

    var result = await postData("subjects/addsubjects", body)
    if (result.result) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Course Detail has been saved',
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




  return (
    <div className={Classes.root}>
      <div className={Classes.subdiv}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', fontSize: 30, fontWeight: 'bolder', letterSpacing: 1 }}>
            <img src="/subjects.png" style={{ width: 50, height: 50, marginRight: 10 }} />
            Add Subjects
            <div style={{ marginLeft: "auto" }}>
              <Button onClick={() => props.setView(<DisplayAllSubjects />)} variant="contained" >List Subjects </Button>
            </div>

          </div>
          <Grid style={{ marginTop: 20 }} container spacing={2}>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Department </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={departmentId}
                  label="department"
                  onChange={handleChangeDep}
                >
                  {filldep()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Courses</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={courseId}
                  label="Course"
                  onChange={handleCourses}
                >
                  {fillCourses()}
                </Select>
              </FormControl>
            </Grid>



            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">No. of Semester</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={semester}
                  label="semester"
                  onChange={handleChangeSem}
                >
                  {fillsem()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth onChange={(event) => setSubjectName(event.target.value)} id="outlined-basic" label="Subject Name" variant="outlined" />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Exam Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Type"
                  onChange={handleChangeType}
                >
                  <MenuItem value={"Theory"}>Theory</MenuItem>
                  <MenuItem value={"Practical"}>Practical</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth onChange={(event) => setSubjectMarks(event.target.value)} id="outlined-basic" label="Subject Marks" variant="outlined" />
            </Grid>

            <Grid item xs={6} >
                  <Button fullWidth onClick={()=>saveDetail()} variant="contained" color="primary">Save</Button>
              </Grid>

              <Grid item xs={6} >
                  <Button fullWidth variant="contained" color="primary">Reset</Button>
              </Grid>

          </Grid>


        </div>
      </div>
    </div>
  )

}


