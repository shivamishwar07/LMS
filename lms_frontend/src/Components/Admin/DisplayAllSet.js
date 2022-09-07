import React, { useState, useEffect } from 'react'
import { styled, makeStyles } from '@mui/styles';
import MaterialTable from '@material-table/core'
import { getData, ServerURL, postData, postDataAndImage } from './FetchNodeServices'
import Swal from 'sweetalert2';
import { Button,TextField, Grid } from '@mui/material';
import { Avatar, StyledEngineProvider } from '@mui/material';
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
   
   export default function DisplayAllSet(props){
    var classes = UseStyles()
     const [list,setList]=useState([])
     const [open,setOpen]=useState(false)
     const [setid,setSetId]=useState('')
     const [facultyId,setFacultyId]=useState('')
    const [departmentid,setDepartmentid]=useState('')
    const [courseid,setCourseid]=useState('')
    const [subjectid,setSubjectid]=useState('')
    const [semester,setSemester]=useState('')
    const [setno,setSetNo]=useState('')
    const [time,setTime]=useState('')
    const [status,setStatus]=useState('')
    const [marks,setMarks]=useState('')
    const [listdepartment,setListDepartment]=useState([])
    const [listcourses,setListCourses]=useState([])
    const [listsubject,setListSubject]=useState([])
    const [faculty,setFaculty]=useState([])
    const [totalSem,setTotalSem]=useState('')

     const fetchAllSets= async()=>{
        var result=await getData('createset/displayallsets')
            setList(result.result)
      
    }
    useEffect (function() { 
    
      
       fetchAllCourses()
       fetchAllSets()
      },[])


    const fetchAllCourses = async(departmentid)=>{
      var result = await postData("courses/displaycoursebydepartmentid",{departmentid:departmentid})
      setListCourses(result.result)
  }

  const handleCourse = (event) => {
    setCourseid(event.target.value); 
    fetchAllSemester(event.target.value) 
  };
  
  const fillcourses=()=>{
    return (listcourses.map((item)=>{
        return(<MenuItem value={item.courseid}>{item.coursename}</MenuItem>)
    })
    )}

    const FetchAllSubject = async(sem)=>{
        var result = await postData("subjects/displaysubjectbycourseid",{courseid:courseid,semester:sem})
        setListSubject(result.result)
    }

    const handleSubject = (event) => {
      setSubjectid(event.target.value); 
      
    };
    
    const fillsubject=()=>{
      return (listsubject.map((item)=>{
          return(<MenuItem value={item.subjectid}>{item.subjectname}</MenuItem>)
      })
      )}


      const fetchAllSemester= async(courseid)=>{
        var result = await postData('courses/getsemesterbycourseid',{courseid:courseid})
       
       setTotalSem(result.result[0].semester)
      }  

      const handleSemester=(event)=>{
        setSemester(event.target.value)
        FetchAllSubject(event.target.value)
      }

      const fillsemester=()=>{
       var sem=[]
        for(var i=1;i<=totalSem;i++)
       { sem.push(i)
           

       }

       return sem.map((item)=>{

        return <MenuItem value={item}>{item}</MenuItem>

       })

       }

    
   

    const handleClose=()=>{
      setOpen(false)
    }

    const handleChangeStatus=(event)=>{
      setStatus(event.target.value)
    }


    const handleDelete=async(setid)=>{
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

          var body={setid}
          var result = await postData("createset/deletefaculty",body)

          if(result.result)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          else
          Swal.fire(
            'Error!',
            'Your file has not been deleted.',
            'error'
          )
        }
        fetchAllSets()
      })
      
    }

    const handleEditSave=async()=>{
      var body={setid:setid,facultyid:facultyId,departmentid:departmentid,courseid:courseid,subjectid:subjectid,semester:semester,setno:setno,time:time,status:status,marks:marks}
      var result = await postData('createset/editsets',body)
     
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
    
    fetchAllSets()
     
    }

    const handleEdit=(rowData)=>{
      setSetId(rowData.setid)
      setFacultyId(rowData.facultyid)
      setDepartmentid(rowData.departmentname)
      fetchAllCourses(rowData.departmentid)
      setCourseid(rowData.courseid)
      fetchAllSemester(rowData.courseid)
      setSemester(rowData.semester)
      FetchAllSubject(rowData.semester)
      setSubjectid(rowData.subjectid)
      setSetNo(rowData.setno)
      setTime(rowData.time)
      setStatus(rowData.status)
      setMarks(rowData.marks)
      setOpen(true)
 }

    function Dialogbox(){
      return(
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogContent>
        <div  className= {classes.one}>
            <div className= {classes.two}>
            <Grid  style={{marginTop:20}} container spacing={2}>
              <Grid item xs={12}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'20px', fontSize:20,fontWeight:'bold',letterSpacing:1}}>
                         <img src="/unit.png"  style={{ width:40, height:40, marginRight:10}} />
                         Create Set
                         
                     </div>
              </Grid>
              
              <Grid item xs={6}>
                  <TextField  fullWidth value={facultyId} onChange={(event)=>setFacultyId(event.target.value)} id="outlined-basic" label="Faculty ID" variant="outlined" />
                  </Grid>
                  <Grid item xs={6}>
                  <TextField  fullWidth value={departmentid} onChange={(event)=>setDepartmentid(event.target.value)} id="outlined-basic" label="Department" variant="outlined" />
                  </Grid>
                
                <Grid item xs={4}>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Course</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={courseid}
          label="Course"
          onChange={(event)=>handleCourse(event)}
        >
          {fillcourses()}
        </Select>
      </FormControl>
                </Grid>
                <Grid item xs={4}>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Semester</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={semester}
          label="Semester"
          onChange={(event)=>handleSemester(event)}
        >
          {fillsemester()}
        </Select>
      </FormControl>
                </Grid>
                <Grid item xs={4}>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Subject</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subjectid}
          label="Subject"
          onChange={(event)=>handleSubject(event)}
        >
          {fillsubject()}
        </Select>
      </FormControl>
                </Grid>
               

                <Grid item xs={6}>
                  <TextField  fullWidth value={setno} onChange={(event)=>setSetNo(event.target.value)} id="outlined-basic" label="Set No." variant="outlined" />
                  </Grid>
                  <Grid item xs={6}>
                  <TextField  fullWidth value={time} onChange={(event)=>setTime(event.target.value)} id="outlined-basic" label="Time" variant="outlined" />
                  </Grid>

                  <Grid item xs={6}>
                  <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={(event)=>handleChangeStatus(event)}
        >
          <MenuItem value={'Enable'}>Enable</MenuItem>
          <MenuItem value={'Disable'}>Disable</MenuItem>
          
        </Select>
      </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                  <TextField  fullWidth value={marks}  onChange={(event)=>setMarks(event.target.value)} id="outlined-basic" label="Marks" variant="outlined" />
                  </Grid>
             
           </Grid>
                </div>
                </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditSave}>Edit</Button>
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
            title="List Of Sets"
            columns={[
              { title: 'SetID', field: 'setid'},
              { title: 'FacultyID', field: 'facultyid'},
              { title: 'Department Name', field: 'departmentname'},
              { title: 'Course Name', field:'coursename'},
              { title: 'Subject Name', field: 'subjectname'},
              { title: 'Semester', field: 'semester'},
              { title: 'Set No.', field: 'setno'}, 
              { title: 'Time', field: 'time'}, 
              { title: 'Status', field: 'status'}, 
              { title: 'Marks', field: 'marks'}, 
              
              
            ]}
            data={ list }        
            actions={[
    
              {
                icon: 'edit',
                tooltip: 'Edit User',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete User',
                onClick: (event, rowData) => handleDelete(rowData.setid)
              }
            ]}
          />
        )
       
        }
        return (
            <div className= {classes.one}>
            <div className= {classes.two}>
            
                   {DisplayALL()}
                   {Dialogbox()}
                
                   
               </div>
               </div>
           )
   }