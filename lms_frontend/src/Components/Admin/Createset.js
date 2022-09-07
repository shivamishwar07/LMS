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
import DisplayAllSet from './DisplayAllSet';

const UseStyles = makeStyles ({
    one: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
     
   
    two: {
        background:'#ecf0f1',
        width:800,
        marginTop:30,
        borderRadius:10,
        padding:20,
    }
   
   })
   
   export default function Createset(props){
    var classes = UseStyles()

    const [facultyid,setFacultyid]=useState('')
    const [departmentid,setDepartmentid]=useState('')
    const [courseid,setCourseid]=useState('')
    const [subjectid,setSubjectid]=useState('')
    const [setno,setSetNo]=useState('')
    const [time,setTime]=useState('')
    const [status,setStatus]=useState('')
    const [marks,setMarks]=useState('')
    const [listcourses,setListCourses]=useState([])
    const [listsubject,setListSubject]=useState([])
    const [faculty,setFaculty]=useState([])
    const [semester,setSemester]=useState('')
    const [totalSem,setTotalSem]=useState('')

    useEffect (function(){
        var data=JSON.parse(localStorage.getItem("SES_FACULTY"))
        setFaculty(data)
         fetchAllCourses(data.department)
         setFacultyid(data.facultyid)
         setDepartmentid(data.department)
        },[])
      
      
          const fetchAllCourses = async(departmentid)=>{
              var result = await postData("courses/displaycoursebydepartmentid",{departmentid:departmentid})
              setListCourses(result.result)
          }
      
          const getSemesterByCourse=async(courseid)=>
          {var result = await postData("courses/getsemesterbycourseid",{courseid:courseid})
          alert(result.result[0].semester) 
          setTotalSem(result.result[0].semester)
            
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

          const handleCourse = (event) => {
            setCourseid(event.target.value); 
            getSemesterByCourse(event.target.value)
            //FetchAllSubject(event.target.value) 
          };
          
          const fillcourses=()=>{
            return (listcourses.map((item)=>{
                return(<MenuItem value={item.courseid}>{item.coursename}</MenuItem>)
            })
            )}

            const handleSemester=(event)=>{
              setSemester(event.target.value)
              FetchAllSubject(event.target.value) 

            }
    
            const FetchAllSubject = async(sem)=>{
                var result = await postData("subjects/displaysubjectbycourseid",{courseid:courseid,semester:sem})
                setListSubject(result.result)
            }
        
            const handleSubject = async(event) => {
              setSubjectid(event.target.value);
              // fetchAllSemester(event.target.value) 
              var result = await getData('createset/generateset')
              var result2 = await getData('subjects/fillsemester?subjectid='+event.target.value)
              setSetNo(faculty.department+"-"+courseid+"-"+subjectid+"-"+semester+"-"+result.result)
             
              
            };
            const fillsubject=()=>{
              return (listsubject.map((item)=>{
                  return(<MenuItem value={item.subjectid}>{item.subjectname}</MenuItem>)
              })
              )}

             const handleChangeStatus=(event)=>{
               setStatus(event.target.value)
             }
    
              const handleSave=async()=>{
                var body = {facultyid:facultyid,departmentid:departmentid,courseid:courseid,subjectid:subjectid,semester:semester,setno:setno,time:time,status:status,marks:marks}
               
                 var result = await postData("createset/addset",body)
              if(result.result)
              {
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Set Detail has been saved',
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
            
      
      


    return (
        <div  className= {classes.one}>
            <div className= {classes.two}>
            <Grid  style={{marginTop:20}} container spacing={2}>
              <Grid item xs={12}>
            <div style={{  display:'flex', alignItems:'center', marginTop:'20px', fontSize:20,fontWeight:'bold',letterSpacing:1}}>
                         <img src="/unit.png"  style={{ width:40, height:40, marginRight:10}} />
                         Create Set
                         <div style={{marginLeft:'auto'}}>
                       <Button onClick={()=>props.setView(<DisplayAllSet />)} variant='contained'> List Of Sets</Button>
                   </div>
                     </div>
              </Grid>
              
              <Grid item xs={6}>
                  <TextField  fullWidth value={faculty.facultyid} id="outlined-basic" label="Faculty ID" variant="outlined" />
                  </Grid>
                  <Grid item xs={6}>
                  <TextField  fullWidth value={faculty.departmentname}  id="outlined-basic" label="Department" variant="outlined" />
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
        <InputLabel id="demo-simple-select-label33">Semester</InputLabel>
        <Select
          labelId="demo-simple-select-label33"
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
                  <TextField  fullWidth  onChange={(event)=>setTime(event.target.value)} id="outlined-basic" label="Time" variant="outlined" />
                  </Grid>

                  <Grid item xs={6}>
                  <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChangeStatus}
        >
          <MenuItem value={'Enable'}>Enable</MenuItem>
          <MenuItem value={'Disable'}>Disable</MenuItem>
          
        </Select>
      </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                  <TextField  fullWidth  onChange={(event)=>setMarks(event.target.value)} id="outlined-basic" label="Marks" variant="outlined" />
                  </Grid>
                

                <Grid item xs={6}>
               <Button fullWidth onClick={()=>handleSave()} variant='contained' color='success'>Save</Button>
           </Grid>
           <Grid item xs={6}>
           <Button fullWidth  variant='contained' color='warning'>Reset</Button>
           </Grid>
           </Grid>
                </div>
                </div>
    )

   }