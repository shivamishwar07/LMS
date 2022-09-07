import React, { useState, useEffect } from 'react'
import { styled, makeStyles } from '@mui/styles';
import {Grid,TextField,Button} from '@mui/material'
import Avatar from '@mui/material/Avatar';
import { ServerURL, postDataAndImage, getData, postData } from './FetchNodeServices';
import Swal from 'sweetalert2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DisplayAllQuestions from './DisplayAllQuestions';

const UseStyles = makeStyles ({
    one: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
     
   
    two: {
        background:'#ecf0f1',
        width:700,
        marginTop:20,
        borderRadius:10,
        padding:20,
    }
   
   })
   const Input = styled('input')({
    display: 'none',
  });


   export default function Questions(props){
    var classes = UseStyles()

    const [admissionId,setAdmissionId]=useState('')
    // const [facultyId,setFacultyId]=useState('')
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
    var months=['01','02','03','04','05','06','07','08','09','10','11','12']
    var d=new Date()
    var cd=d.getFullYear()+"-"+months[d.getMonth()]+"-"+d.getDate()
    useEffect (function(){
      setCDate(cd)
     fetchAllDepartment()

                
        },[])
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
          


            const handleSave =async()=>{
              var body = {   departmentid: departmentId,courseid: courseId, semester: semester, enrollmentno:enrollmentNo, date:cdate,session:session,status:status }

              var result = await postData("admission/addadmission", body)
          
              if(result.result)
              {
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Set Admission has been saved',
                  showConfirmButton: false,
                  timer: 1500
                })
           
              }
              else
              {
                  Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Something went wrong!',
                    })
              }
          }
            
      
          const handlereset=()=>{
           setDepartmentId("")
           setCourseId("")
           setSemester("")
           setEnrollmentNo("")
            setCDate("")
            setSession("")
            setStatus("")
         }    
        return (
            <div  className= {classes.one}>
                <div className= {classes.two}>
                <Grid  style={{marginTop:5}} container spacing={2}>
                  <Grid item xs={12}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'10px', fontSize:20,fontWeight:'bold',letterSpacing:1}}>
                             <img src="/question.png"  style={{ width:40, height:40, marginRight:10}} />
                             Admission Form
                             
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
                     
                      <Grid item xs={6}>
               <Button onClick={()=>handleSave()} fullWidth  variant='contained'>Save</Button>
           </Grid>
           <Grid item xs={6}>
           <Button fullWidth onClick={()=>handlereset()}  variant='contained' >Reset</Button>
           </Grid>
           </Grid>
                </div>
                </div>
    )

   }