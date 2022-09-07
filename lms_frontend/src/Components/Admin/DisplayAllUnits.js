import React, { useEffect, useState } from 'react'
import MaterialTable from "@material-table/core"
import { getData, ServerURL, postData, postDataAndImage } from './FetchNodeServices'
import { makeStyles, styled } from '@mui/styles';
import Swal from 'sweetalert2';
import { Button,TextField, Grid } from '@material-ui/core';
import { Avatar, StyledEngineProvider } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { chainPropTypes } from '@mui/utils';



const UseStyles = makeStyles ({
  
  one: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
},

two: {
    display: 'felx',
    margin: 20,
    padding: 20,
    width: 1000,
    background: '#ecf0f1'
}

});

   export default function DisplayAllUnits(props){
    var Classes = UseStyles()
    const [unitid, setUnitId] = useState('')
    const [departmentId, setDepartmentId] = useState('')
    const [courseId, setCourseId] = useState('')
    const [subjectId, setSubjectId] = useState('')
    const [unitno,setUnitno] = useState('')
    const [title,setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [listDepartment, setListDepartment] = useState([])
    const [listCourses, setListCourses] = useState([])
    const [listSubjects, setListSubjects] = useState([])
    const [listUnits,setListUnits]=useState([])
    const [open,setOpen]= useState(false)


     useEffect(function(){
      FetchAllDepartment()  
       FetchAllCourses()
       FetchAllUnits()
     },[])

     const FetchAllUnits=async()=>{
       var result= await getData("units/DisplayAll")
       setListUnits(result.result)
     
     }
    
const FetchAllCourses=async(departmentid)=>{
  var result = await postData("courses/displaycoursebydepartmentid",{departmentid:departmentid})
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
    
const FetchAllDepartment=async(courseid)=>{
  var result = await getData("department/displayall",{courseid:courseid})
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

 const FetchAllSubjects = async (courseid) => {
    var result = await postData("subjects/displaysubjectbycourseid", { courseid: courseid })

    setListSubjects(result.result)
}

const handleSubjects = (event) => {
    setSubjectId(event.target.value);

};

const fillSubjects = () => {
    return (listSubjects.map((item) => {
        return (<MenuItem value={item.subjectid}>{item.subjectname}  [{item.type}]</MenuItem>)
    })
    )}

    



const handleCancel=()=>{
  setOpen(false)
}

    const handleDelete=async(unitid)=>{

   
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
           
            
       var body={unitid:unitid}
       var result = await postData("units/deleteunits",body)
     
           if(result.result)
           Swal.fire(
             'Deleted!',
             'Unit has been deleted.',
             'success'
           )
         
         else
         Swal.fire(
           'Deleted!',
           'Unit has not been deleted.',
           'error'
         )
       }
       FetchAllUnits()
       })
       
        
    }


    const handleClose=()=>{
        setOpen(false)
    }
 
    const handleEdit=(rowData)=>{
      setUnitId(rowData.unitid)
      setCourseId(rowData.courseid)
      FetchAllSubjects(rowData.courseid)
      setDepartmentId(rowData.departmentid)
      FetchAllCourses(rowData.departmentid)
      setSubjectId(rowData.subjectid)
      setUnitno(rowData.unitno)
      setTitle(rowData.title)
      setDescription(rowData.description)
      setOpen(true)
    }

    const handleEditSave=async()=>{
      var body={unitid:unitid,courseid:courseId,departmentid:departmentId,subjectid:subjectId,unitno:unitno,title:title,description:description}
    var result=await postData("units/editunits",body)
   
        setOpen(false)
     if(result.result)
     {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully Edited',
            showConfirmButton: false,
            timer: 1500
          })
     }
     else{
        Swal.fire({
            position: 'center',
            icon: 'failed',
            title: 'failed to Edit',
            showConfirmButton: false,
            timer: 1500  
          })
     }
     
     FetchAllUnits()
    }

    const showDialogBox=()=>{
        return (
          <Dialog
          open={open}
          onClose={handleCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
         
          <DialogContent>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', fontSize: 30, fontWeight: 'bolder', letterSpacing: 1 }}>
                    <img src="/subjects.png" style={{ width: 50, height: 50, marginRight: 10 }} />
                    Add Units
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
                        <TextField fullWidth onChange={(event) => setUnitno(event.target.value)} value={unitno} id="outlined-basic" label="Unit No." variant="outlined" />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField fullWidth onChange={(event) => setTitle(event.target.value)} value={title} id="outlined-basic" label="Title" variant="outlined" />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField fullWidth onChange={(event) => setDescription(event.target.value)} value={description} id="outlined-basic" label="Description" variant="outlined" />
                    </Grid>

                   
                </Grid>
   
    
      
          </DialogContent>
      <DialogActions>
        <Button onClick={()=>handleEditSave()}>Edit</Button>
        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
        )
      }
  



 
    function DisplayALL() {
     return (
       <MaterialTable
         title="List Of  Units"
         columns={[
           { title: 'Unit NO.', field: 'unitno'},
           { title: 'Title', field: 'title'},
           { title:'Description', field: 'description'},
           { title: 'Course Name', field: 'coursename'},
           { title: 'Subject Types', field: 'subjecttype'},
           { title: 'Department Name', field: 'departmentname'},
           { title: 'Subject Name', field: 'subjectname'},
           
         ]}
         data={listUnits}        
         actions={[
 
           {
             icon: 'edit',
             tooltip: 'Edit User',
             onClick: (event, rowData) => {handleEdit(rowData)}
           },
           {
             icon: 'delete',
             tooltip: 'Delete User',
             onClick: (event, rowData) =>{ handleDelete(rowData.unitid)}
           }
         ]}
       />
     )
    
     }
     return (
         <div className= {Classes.one}>
         <div className= {Classes.two}>
         
                {DisplayALL()}
                {showDialogBox()}
                
            </div>
            </div>
        )
    

}