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
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
     
   
    two: {
        background:'#ecf0f1',
        width:1200,
        marginTop:30,
        borderRadius:10,
        padding:20,
    }
   
   })

   export default function DisplayAllSubjects(props){
    var Classes= UseStyles()
    const [open,setOpen]= useState(false)
    const [listSubjects,setListSubjects]=useState([])
    const [subjectid,setSubjectId]=useState('')
    const [courseid,setCourseId]=useState('')
    const [departmentid,setDepartmentId]=useState('')
    const [semester,setSemester]=useState('')
    const [subjectName,setSubjectName]=useState('')
    const [type,setType]=useState('')
    const [subjectMarks,setSubjectMarks]=useState('')
    const [listCourses,setListCourses]=useState([])
    const [listDep,setListDep]=useState([])
    const [sem,setSem]=useState([])


     useEffect(function(){
      FetchAllDepartment()  
       FetchAllSubjects()
     },[])

     const FetchAllSubjects=async()=>{
       var result= await getData("subjects/DisplayAll")
       setListSubjects(result.result)
     
     }
    
const FetchAllCourses=async(departmentid)=>{
  var result = await postData("courses/displaycoursebydepartmentid",{departmentid:departmentid})
  setListCourses(result.result)
}

const fillCourse=()=>{
  return(listCourses.map((item)=>{
    return(<MenuItem value={item.courseid}>{item.coursename}</MenuItem>)
  }))
}

const handleChangeCourse=(event)=>{
  setCourseId(event.target.value)
  FetchAllSemester(event.target.value)
}
    
const FetchAllDepartment=async(courseid)=>{
  var result = await getData("department/displayall",{courseid:courseid})
  setListDep(result.result)
}

const fillDepartment=()=>{
  return(listDep.map((item)=>{
    return(<MenuItem value={item.departmentid}>{item.departmentname}</MenuItem>)
  }))
}

const handleDepartment=(event)=>{
  setDepartmentId(event.target.value)
  FetchAllCourses(event.target.value)
}

const FetchAllSemester=async(courseid)=>{
  var result = await postData("courses/getsemesterbycourseid",{courseid:courseid})
  setSem(result.result[0].semester)
}

const fillsemester=()=>{
  var x=[]
  for(var i=1;i<=sem;i++)
      x.push(i)
    return ( x.map(item=>{
      
  
        return(<MenuItem value={item}>{item}</MenuItem>)
    
  })
    )}

const handleSemester=(event)=>{
  setSemester(event.target.value)
}

const handleType=(event)=>{
  setType(event.target.value)
}

const handleCancel=()=>{
  setOpen(false)
}

    const handleDelete=async(subjectid)=>{

   
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
           
            
       var body={subjectid}
       var result = await postData("subjects/deletesubjects",body)
       
           
           
           if(result.result)
           Swal.fire(
             'Deleted!',
             'Subject has been deleted.',
             'success'
           )
         
         else
         Swal.fire(
           'Deleted!',
           'Subject has not been deleted.',
           'error'
         )
       }
       FetchAllSubjects()
       })
       
        
    }


    const handleClose=()=>{
        setOpen(false)
    }
 
    const handleEdit=(rowData)=>{
      setSubjectId(rowData.subjectid)
      setCourseId(rowData.courseid)
      FetchAllSemester(rowData.courseid)
      setDepartmentId(rowData.departmentid)
      FetchAllCourses(rowData.departmentid)
      setSemester(rowData.semester)
      setSubjectName(rowData.subjectname)
      setType(rowData.type)
      setSubjectMarks(rowData.subjectmarks)
      setOpen(true)
    }

    const handleEditSave=async()=>{
      var body = {subjectid:subjectid,courseid:courseid,departmentid:departmentid,semester:semester,subjectname:subjectName,type:type,subjectmarks:subjectMarks}
    var result = await postData("subjects/editsubjects",body)
   
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
     
     FetchAllSubjects()
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
          <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'20px', fontSize:20,fontWeight:'bold',letterSpacing:1}}>
                         <img src="/Books.png"  style={{ width:40, height:40, marginRight:10}} />
                         Edit Subjects
                     </div>
                     <Grid  style={{marginTop:20}} container spacing={2}>
                <Grid item xs={6}>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Department </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={departmentid}
          label="department"
          onChange={(event)=>handleDepartment(event)}
        >
          {fillDepartment()}
        </Select>
      </FormControl>            
                </Grid>
                <Grid item xs={6}>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Course Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={courseid}
          label="Course"
          onChange={(event)=>handleChangeCourse(event)}
        >
          {fillCourse()}
        </Select>
      </FormControl>
                </Grid>
               

                <Grid item xs={6}>
                    <TextField fullWidth value={subjectName} onChange={(event)=>setSubjectName(event.target.value)} id="outlined-basic" label="Subject Name" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">No. of Semester</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={semester}
          label="semester"
          onChange={(event)=>handleSemester(event)}
        >
          {fillsemester()}
        </Select>
      </FormControl>
                </Grid>
                
              

                <Grid item xs={4}>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Exam Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={(event)=>handleType(event)}
        >
          <MenuItem value={"Theory"}>Theory</MenuItem>
          <MenuItem value={"Practical"}>Practical</MenuItem>
        </Select>
      </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <TextField fullWidth value={subjectMarks} onChange={(event)=>setSubjectMarks(event.target.value)} id="outlined-basic" label="Subject Marks" variant="outlined" />
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
         title="List Of Subjects"
         columns={[
            { title: 'Subject Id', field: 'subjectid'},
           { title: 'Course Name', field: 'coursename'},
           { title: 'Subject Name', field: 'subjectname'},
           { title: 'Department', field: 'departmentname'},
           { title: 'No. of Semester', field: 'semester'},
           { title: 'Exam Type', field: 'type'},
           { title: 'Subject Marks', field: 'subjectmarks'},
         
          
         ]}
         data={listSubjects}        
         actions={[
 
           {
             icon: 'edit',
             tooltip: 'Edit User',
             onClick: (event, rowData)=> {handleEdit(rowData)}
           },
           {
             icon: 'delete',
             tooltip: 'Delete User',
             onClick: (event, rowData) => {handleDelete(rowData.subjectid)}
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