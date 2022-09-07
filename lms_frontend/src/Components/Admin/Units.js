import { ClassNames } from '@emotion/react'
import { styled, makeStyles } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { TextField, Grid, Button } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getData, postData } from './FetchNodeServices';
import Subjects from './Subjects';
import DisplayAllUnits from "./DisplayAllUnits"
import Swal from 'sweetalert2';



const UseStyles = makeStyles({

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
export default function Units(props) {
    var Classes = UseStyles()
    const [unitId, setUnitId] = useState('')
    const [departmentId, setDepartmentId] = useState('')
    const [courseId, setCourseId] = useState('')
    const [subjectId, setSubjectId] = useState('')
    const [unitno, setUnitno] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [listDepartment, setListDepartment] = useState([])
    const [listCourses, setListCourses] = useState([])
    const [listsubjects, setListSubjects] = useState([])

    const FetchAllDepartment = async () => {
        var result = await getData("department/displayall")
        setListDepartment(result.result)
    }

    const handleChangeDepartment = (event) => {
        setDepartmentId(event.target.value)
        FetchAllCourses(event.target.value)
    }

    const filldepartment = () => {
        return (listDepartment.map((item) => {
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
        FetchAllSubjects(event.target.value)

    };

    const fillCourses = () => {
        return (listCourses.map((item) => {
            return (<MenuItem value={item.courseid}>{item.coursename}</MenuItem>)
        })
        )
    }

    const FetchAllSubjects = async (courseid) => {
        var result = await postData("subjects/displaysubjectbycourse", { courseid: courseid })

        setListSubjects(result.result)
    }

    const handleSubjects = (event) => {
        setSubjectId(event.target.value);

    };

    const fillSubjects = () => {
        return (listsubjects.map((item) => {
            return (<MenuItem value={item.subjectid}>{item.subjectname} [{item.type}]</MenuItem>)
        })
        )}
    useEffect(function () {
        FetchAllDepartment()
        FetchAllCourses()
    }, [])


    const saveDetail = async () => {
        var body = { unitid: unitId, departmentid: departmentId, courseid: courseId, subjectid: subjectId, unitno: unitno, title: title, description: description }

        var result = await postData("units/addunits", body)
        if (result.result) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: ' Units Detail has been saved',
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


    const unitShow = () => {

        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', fontSize: 30, fontWeight: 'bolder', letterSpacing: 1 }}>
                    <img src="/subjects.png" style={{ width: 50, height: 50, marginRight: 10 }} />
                    Add Units
                    <div style={{marginLeft:"auto"}}>
                   <Button onClick={()=>props.setView(<DisplayAllUnits/>)} variant="contained" >List Units</Button>
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
                                onChange={handleChangeDepartment}
                            >
                                {filldepartment()}
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
                            <InputLabel id="demo-simple-select-label">Subjects</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subjectId}
                                label="subject"
                                onChange={handleSubjects}
                            >
                               {fillSubjects()}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={6}>
                        <TextField fullWidth onChange={(event) => setUnitno(event.target.value)} id="outlined-basic" label="Unit No." variant="outlined" />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField fullWidth onChange={(event) => setTitle(event.target.value)} id="outlined-basic" label="Title" variant="outlined" />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField fullWidth onChange={(event) => setDescription(event.target.value)} id="outlined-basic" label="Description" variant="outlined" />
                    </Grid>

                    <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button fullWidth onClick={() => saveDetail()} variant="contained">Save</Button>
                    </Grid>

                    <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button fullWidth variant="contained">Reset</Button>
                    </Grid>


                </Grid>


            </div>
        )
    }

return(


<div className={Classes.root}>
        <div className={Classes.subdiv}>
         {unitShow()}
        </div>
    </div>
)

}
