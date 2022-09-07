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
        width:1000,
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

    const [questionId,setQuestionId]=useState('')
    const [facultyId,setFacultyId]=useState('')
    const [departmentId,setDepartmentId]=useState('')
    const [courseId,setCourseId]=useState('')
    const [subjectId,setSubjectId]=useState('')
    const [setNo,setSetNo]=useState('')
    const [unitId,setUnitId]=useState('')
    const [questionNo,setquestionNo]=useState('')
    const [question,setQuestion]=useState('')
    const [questionImage,setquestionImage]=useState({'bytes':'',file:'/ques.png'})
    const [option1,setOption1]=useState('')
    const [image1,setImage1]=useState({'bytes':'',file:'/page.png'})
    const [option2,setOption2]=useState('')
    const [image2,setImage2]=useState({'bytes':'',file:'/page.png'})
    const [option3,setOption3]=useState('')
    const [image3,setImage3]=useState({'bytes':'',file:'/page.png'})
    const [option4,setOption4]=useState('')
    const [image4,setImage4]=useState({'bytes':'',file:'/page.png'})
    const [correctans,setCorrectAns]=useState('')
    const [listcourses,setListCourses]=useState([])
    const [listsubject,setListSubject]=useState([])
    const [faculty,setFaculty]=useState([])
    const [semester,setSemester]=useState('')
    const [totalSem,setTotalSem]=useState('')
    const [listSetNo,setListSetNo]=useState([])
    const [listUnit,setListUnit]=useState([])

    useEffect (function(){
        
      var data=JSON.parse(localStorage.getItem("SES_FACULTY"))
      setFaculty(data)
       fetchAllCourses(data.department)
       setFacultyId(data.facultyid)
       setDepartmentId(data.department)
                
        },[])

        const fetchAllCourses = async(departmentid)=>{
          var result = await postData("courses/displaycoursebydepartmentid",{departmentid:departmentid})
          setListCourses(result.result)
      }
  
      const handleCourse = (event) => {
        setCourseId(event.target.value); 
        fetchAllSemester(event.target.value) 
      };
      
      const fillcourses=()=>{
        return (listcourses.map((item)=>{
            return(<MenuItem value={item.courseid}>{item.coursename}</MenuItem>)
        })
        )}

        const FetchAllSubject = async(sem)=>{
            var result = await postData("subjects/displaysubjectbycourseid",{courseid:courseId,semester:sem})
            setListSubject(result.result)
        }
    
        const handleSubject = async(event) => {
          setSubjectId(event.target.value);
          fetchAllSetNo(event.target.value)
          fetchAllUnit(event.target.value)
        
        };

        const fillsubject=()=>{
          return (listsubject.map((item)=>{
              return(<MenuItem value={item.subjectid}>{item.subjectname}</MenuItem>)
          })
          )}

          const fetchAllSetNo=async(subjectid)=>{

            var result = await postData('subjects/getsetnobysubjectid',{subjectid:subjectid}) 
            setListSetNo(result.result)
          }

          const fillSetNo=()=>{

            return(listSetNo.map((item)=>{
              return<MenuItem value={item.setno}>{item.setno}</MenuItem>
            }))
          }

          const fetchAllUnit = async(subjectid)=>{
            var result = await postData("units/displayunitbysubjectid",{subjectid:subjectid})
            setListUnit(result.result)
          }

          const fillAllUnit=()=>{
            return(listUnit.map((item)=>{
              return<MenuItem value={item.unitid}>{item.title}</MenuItem>
            }))
          }

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
 
       


            const handleQuesImage=(event)=>{
                setquestionImage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
            }
         
            const handleImage1=(event)=>{
                setImage1({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
            }

            const handleImage2=(event)=>{
                setImage2({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
            }

            const handleImage3=(event)=>{
                setImage3({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
            }

            const handleImage4=(event)=>{
                setImage4({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
            }

            const fetchQuestionNumber=async(setno)=>{
              var result=await postData("questions/generatequestionnumber",{setno:setno})
              setquestionNo(result.result)

            }
            const handleSetNo=(event)=>{
              setSetNo(event.target.value)
              fetchQuestionNumber(event.target.value)
            }

            const handleUnit=(event)=>{
              setUnitId(event.target.value)
            }





            const handleSave =async()=>{
                var formData = new FormData()
                
                formData.append('facultyid',facultyId)
                formData.append('departmentid',departmentId)
                formData.append('courseid',courseId)
                formData.append('subjectid',subjectId)
                formData.append('setno',setNo)
                formData.append('semester',semester)
                formData.append('unitid',unitId)
                formData.append('questionno',questionNo)
                formData.append('question',question)
                formData.append('questionimage',questionImage.bytes)
                formData.append('option1',option1)
                formData.append('image1',image1.bytes)
                formData.append('option2',option2)
                formData.append('image2',image2.bytes)
                formData.append('option3',option3)
                formData.append('image3',image3.bytes)
                formData.append('option4',option4)
                formData.append('image4',image4.bytes)
                formData.append('correctanswer',correctans)


                 var result = await postDataAndImage("questions/addquestions",formData)
               
              if(result.result)
              {
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Set Detail has been saved',
                  showConfirmButton: false,
                  timer: 1500
                })
                clearValues()
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
            
      
          const clearValues=()=>{
            setQuestion("")
            setOption1("")
            setOption2("")
            setOption3("")
            setOption4("")
            setquestionImage({'bytes':'',file:'/ques.png'})
            setImage1({'bytes':'',file:'/page.png'})
            setImage2({'bytes':'',file:'/page.png'})
            setImage3({'bytes':'',file:'/page.png'})
            setImage4({'bytes':'',file:'/page.png'})
            setCorrectAns('') 
           fetchQuestionNumber(setNo)
   
         }
         const handlereset=()=>{
           setFacultyId("")
           setDepartmentId("")
           setCourseId("")
           setSemester("")
           setSubjectId("")
           setQuestion("")
            setOption1("")
            setOption2("")
            setOption3("")
            setOption4("")
            setquestionImage({'bytes':'',file:'/ques.png'})
            setImage1({'bytes':'',file:'/page.png'})
            setImage2({'bytes':'',file:'/page.png'})
            setImage3({'bytes':'',file:'/page.png'})
            setImage4({'bytes':'',file:'/page.png'})
            setCorrectAns('') 
         }    
        return (
            <div  className= {classes.one}>
                <div className= {classes.two}>
                <Grid  style={{marginTop:5}} container spacing={2}>
                  <Grid item xs={12}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'10px', fontSize:20,fontWeight:'bold',letterSpacing:1}}>
                             <img src="/question.png"  style={{ width:40, height:40, marginRight:10}} />
                             Questions Set
                             <div style={{marginLeft:'auto'}}>
                             <Button onClick={()=>props.setView(<DisplayAllQuestions />)} variant='contained'>Questions List</Button>
                   </div>
                         </div>
                  </Grid>
                  
                  <Grid item xs={4}>
                      <TextField  fullWidth  value={faculty.facultyid} id="outlined-basic" label="Faculty ID" variant="outlined" />
                      </Grid> 
                      <Grid item xs={4}>
                      <TextField  fullWidth value={faculty.departmentname} id="outlined-basic" label="Department" variant="outlined" />
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
        <InputLabel id="demo-simple-select-label">Subject</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subjectId}
          label="subject"
          onChange={(event)=>handleSubject(event)}
        >
          {fillsubject()}
        </Select>
      </FormControl>
                </Grid>
               
                     
                      <Grid item xs={4}>
                      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Units</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={unitId}
          label="Units"
          onChange={(event)=>handleUnit(event)}
        >
          {fillAllUnit()}
        </Select>
      </FormControl>  </Grid> 

      <Grid item xs={6}>
                       <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Set No</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={setNo}
          label="Set No"
          onChange={(event)=>handleSetNo(event)}
        >
          {fillSetNo()}
        </Select>
      </FormControl>  
      </Grid> 
          

                      <Grid item xs={6}>
                      <TextField  fullWidth value={questionNo}  onChange={(event)=>setquestionNo(event.target.value)} id="outlined-basic" label="Question No." variant="outlined" />
                      </Grid> 
                   
                      <Grid item xs={12}>
                      <TextField  fullWidth value={question}  onChange={(event)=>setQuestion(event.target.value)} id="outlined-basic" label="Question" variant="outlined" />
                      </Grid> 
                      <Grid item xs={6}>
           <label htmlFor="contained-button-file">
        <Input onChange={(event)=>handleQuesImage(event)} accept="image/*" id="contained-button-file" multiple type="file" />
        <Button  fullWidth variant="contained" component="span">
           question image
        </Button>
      </label>
           </Grid>
           <Grid item xs={6} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
           <Avatar
           alt="question image"
           src={questionImage.file}
           variant='square'
           sx={{ width: 40, height: 40 }}
            />
           </Grid>

                  <Grid item xs={6}>
                      <TextField  fullWidth value={option1} onChange={(event)=>setOption1(event.target.value)} id="outlined-basic" label="Option 1" variant="outlined" />
                      </Grid> 
                      <Grid item xs={4}>
           <label htmlFor="contained-button-file1">
        <Input onChange={(event)=>handleImage1(event)} accept="image/*" id="contained-button-file1" multiple type="file" />
        <Button style={{marginTop:10}} fullWidth variant="contained" component="span">
           image1
        </Button>
      </label>
           </Grid>
           <Grid item xs={2} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
           <Avatar
           alt="image1"
           src={image1.file}
           variant='square'
           sx={{ width: 40, height: 40 }}
            />
           </Grid>

           <Grid item xs={6}>
                      <TextField  fullWidth value={option2}  onChange={(event)=>setOption2(event.target.value)} id="outlined-basic" label="Option 2" variant="outlined" />
                      </Grid> 
                      <Grid item xs={4}>
           <label htmlFor="contained-button-file2">
        <Input onChange={(event)=>handleImage2(event)} accept="image/*" id="contained-button-file2" multiple type="file" />
        <Button style={{marginTop:10}} fullWidth variant="contained" component="span">
          image2
        </Button>
      </label>
           </Grid>
           <Grid item xs={2} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
           <Avatar
           alt="image2"
           src={image2.file}
           variant='square'
           sx={{ width: 40, height: 40 }}
            />
           </Grid>

           <Grid item xs={6}>
                      <TextField  fullWidth value={option3}  onChange={(event)=>setOption3(event.target.value)} id="outlined-basic" label="Option 3" variant="outlined" />
                      </Grid> 
                      <Grid item xs={4}>
           <label htmlFor="contained-button-file3">
        <Input onChange={(event)=>handleImage3(event)} accept="image/*" id="contained-button-file3" multiple type="file" />
        <Button style={{marginTop:10}} fullWidth variant="contained" component="span">
           image3
        </Button>
      </label>
           </Grid>
           <Grid item xs={2} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
           <Avatar
           alt="image3"
           src={image3.file}
           variant='square'
           sx={{ width: 40, height: 40 }}
            />
           </Grid>

           <Grid item xs={6}>
                      <TextField  fullWidth value={option4}   onChange={(event)=>setOption4(event.target.value)} id="outlined-basic" label="Option 3" variant="outlined" />
                      </Grid>
                      <Grid item xs={4}>
           <label htmlFor="contained-button-file4">
        <Input onChange={(event)=>handleImage4(event)} accept="image/*" id="contained-button-file4" multiple type="file" />
        <Button style={{marginTop:10}} fullWidth variant="contained" component="span">
           image4
        </Button>
      </label>
           </Grid>
           <Grid item xs={2} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
           <Avatar
           alt="image4"
           src={image4.file}
           variant='square'
           sx={{ width: 40, height: 40 }}
            />
           </Grid>

           <Grid item xs={12}>
                      <TextField  fullWidth value={correctans} onChange={(event)=>setCorrectAns(event.target.value)} id="outlined-basic" label="Correct Answer" variant="outlined" />
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