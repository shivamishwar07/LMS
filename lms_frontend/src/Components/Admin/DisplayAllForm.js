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

   export default function DisplayAllForm(props){
    var Classes= UseStyles()
    const [open,setOpen]= useState(false)
    const [listForm,setListForm]=useState([])
    const [admissionid,setAdmissionId]=useState('')
    const [departmentId,setDepartmentId]=useState('')
    const [courseId,setCourseId]=useState('')
    const [semester,setSemester]=useState('')
    const [enrollmentNo,setEnrollmentNo]=useState('')
    const [cdate,setCDate]=useState('')
    const [session,setSession]=useState('')
    const [status,setStatus]=useState('')
    const [listDepartment,setListDepartment]=useState([])
    const [listcourses,setListCourses]=useState([])
    const [totalSem,setTotalSem]=useState('')
    const [sem, setSem] = useState([])
    const [listEnrollmentNo,setListEnrollmentNo]=useState([])


    useEffect (function(){
        
        fetchAllDepartment()
   fetchAllAdmission()
                   
           },[])

           const fetchAllAdmission=async()=>{

            
                var result= await getData("admission/DisplayAll")
                setListForm(result.result)
              
              
             
        }
           const fetchAllDepartment=async()=>{
               var result=await getData("department/displayall")
               setListDepartment(result.result)
             }
   
             const handleDepartmentChange=(event)=>{
               setDepartmentId(event.target.value)
               fetchAllCourses(event.target.value)
             }
             
     const fillDepartment=()=>{
       return listDepartment.map((item)=>{
           return <MenuItem value={item.departmentid}>{item.departmentname}</MenuItem>
       }) 
     }
   
   
   
   
     const fetchAllCourses = async (departmentid) => {
       var result = await postData("courses/displaycoursebydepartmentid", { departmentid: departmentid })
       setListCourses(result.result)
     }
   
     const handleCourse = (event) => {
       setCourseId(event.target.value);
       fetchAllSem(event.target.value)
       FetchAllEnrollmentno(event.target.value)
     };
   
     const fillcourses = () => {
       return (listcourses.map((item) => {
         return (<MenuItem value={item.courseid}>{item.coursename}</MenuItem>)
       })
       )
     }
   
     const fetchAllSem= async (courseid) => {
       var result = await postData("courses/getsemesterbycourseid", { courseid: courseid })
       setSem(result.result[0].semester)
     }
   
     const handleSemester = (event) => {
       setSemester(event.target.value)
     }
   
     const fillsemester = () => {
       var x = []
       for (var i = 1; i <= sem; i++)
         x.push(i)
       return (x.map(item => {
   
   
         return (<MenuItem value={item}>{item}</MenuItem>)
   
       })
       )
     }
   
   
   
          const FetchAllEnrollmentno=async(courseid)=>{
           var result = await postData("student/enrollmentnobycourseid", { courseid: courseid })
           setListEnrollmentNo(result.result)
          }
   
          const handleEnrollment=(event)=>{
           setEnrollmentNo(event.target.value)
         }
   
   
    const fillEnrollment=()=>{
           return (listEnrollmentNo.map((item)=>{
             return (<MenuItem value={item.enrollmentno}>{item.enrollmentno}</MenuItem>)
           })
           )}
           const handleStatusChange=(event)=>{
             setStatus(event.target.value)
           }
      

    const handleDelete=async(admissionid)=>{

   
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
           
            
       var body={admissionid}
       var result = await postData("admission/deleteadmission",body)
       
           
           
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
       fetchAllAdmission()
       })
       
        
    }


    const handleClose=()=>{
        setOpen(false)
    }
 
    const handleEdit=(rowData)=>{
      setAdmissionId(rowData.admissionid)
      setDepartmentId(rowData.departmentid)
      setCourseId(rowData.courseid)
      fetchAllSem(rowData.courseid)
      fetchAllCourses(rowData.departmentid)
      FetchAllEnrollmentno(rowData.courseid)
      setSemester(rowData.semester)
      setEnrollmentNo(rowData.enrollmentNo)
      setCDate(rowData.date)
      setSession(rowData.session)
      setStatus(rowData.status)
      setOpen(true)
    }

    const handleEditSave=async()=>{
      var body = {admissionid:admissionid,departmentid:departmentId,courseid:courseId,semester:semester,enrollmentno:enrollmentNo,date:cdate,session:session,status:status}
    var result = await postData("admission/editadmission",body)
    
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
     
     fetchAllAdmission()
    }

    const handleCancel=()=>{
        setOpen(false)
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
          <Grid  style={{marginTop:5}} container spacing={2}>
                  <Grid item xs={12}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'10px', fontSize:20,fontWeight:'bold',letterSpacing:1}}>
                             <img src="/question.png"  style={{ width:40, height:40, marginRight:10}} />
                            Edit  Form
                             
                         </div>
                  </Grid>
                  
                  <Grid item xs={4}>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Department</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={departmentId}
          label="Department"
          onChange={(event)=>handleDepartmentChange(event)}
        >
          {fillDepartment()}
        </Select>
      </FormControl>
                </Grid>
                  

                      <Grid item xs={4}>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Course</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={courseId}
          label="course"
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
        <InputLabel id="demo-simple-select-label">EnrollmentNo.</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={enrollmentNo}
          label="EnrollmentNo."
          onChange={(event)=>handleEnrollment(event)}
        >
        {fillEnrollment()}
        </Select>
      </FormControl> 
       </Grid> 


          

                      <Grid item xs={4}>
                      <TextField  fullWidth value={cdate} type="date"  onChange={(event)=>setCDate(event.target.value)} id="outlined-basic" label="Date" variant="outlined" />
                      </Grid> 
                   
                      <Grid item xs={4}>
                      <TextField  fullWidth value={session}  onChange={(event)=>setSession(event.target.value)} id="outlined-basic" label="Session" variant="outlined" />
                      </Grid> 



                     


                      <Grid item xs={12}>
            <FormControl variant='outlined' fullWidth>
              <InputLabel id="status">status</InputLabel>
                <Select 
                  labelId="status"
                  id="status"
                  value={status}
                  label="status"
                  onChange={handleStatusChange}
                  >
                       <MenuItem value="Running">Running</MenuItem>
                       <MenuItem value="Passout">Passout</MenuItem>
                     <MenuItem   value="semesterback">Semester Back</MenuItem>
                    <MenuItem value="yearback">YearBack</MenuItem>
                     </Select>
                   </FormControl> 
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
         title="List Of Admission"
         columns={[
            { title: 'Admission Id', field: 'admissionid'},
           { title: 'Course Name', field: 'coursename'},
           { title: 'Department', field: 'departmentname'},
           { title: 'No. of Semester', field: 'semester'},
           { title: 'Enrollment No.', field: 'enrollmentno'},
           {title:'Date',field:'date'},
           { title: 'Session', field: 'session'},
           { title: 'Status', field: 'status'},
         
          
         ]}
         data={listForm}        
         actions={[
 
           {
             icon: 'edit',
             tooltip: 'Edit User',
             onClick: (event, rowData)=> {handleEdit(rowData)}
           },
           {
             icon: 'delete',
             tooltip: 'Delete User',
             onClick: (event, rowData) => {handleDelete(rowData.admissionid)}
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