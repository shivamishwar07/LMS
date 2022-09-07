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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

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
   const Input = styled('input')({
    display: 'none',
  });

export default function DisplayAllQuestions(props){
    var classes = UseStyles()
  const [list,setList]=React.useState([])
  const [open,setOpen]=React.useState(false)
  const [questionId,setQuestionId]=useState('')
    const [facultyId,setFacultyId]=useState('')
    const [departmentId,setDepartmentId]=useState('')
    const [courseId,setCourseId]=useState('')
    const [subjectId,setSubjectId]=useState('')
    const [semester,setSemester]=useState('')
    const [setNo,setSetNo]=useState('')
    const [unitId,setUnitId]=useState('')
    const [questionNo,setquestionNo]=useState('')
    const [question,setQuestion]=useState('')
    const [questionImage,setquestionImage]=useState({'bytes':'',file:'/ques.png'})
    const [tempPic,setTempPic]= useState({'bytes':'',file:'/ques.png'})
    const [option1,setOption1]=useState('')
    const [image1,setImage1]=useState({'bytes':'',file:'/page.png'})
    const [tempImage1,setTempImage1]=useState({'bytes':'',file:'/page.png'})
    const [option2,setOption2]=useState('')
    const [image2,setImage2]=useState({'bytes':'',file:'/page.png'})
    const [tempImage2,setTempImage2]=useState({'bytes':'',file:'/page.png'})
    const [option3,setOption3]=useState('')
    const [image3,setImage3]=useState({'bytes':'',file:'/page.png'})
    const [tempImage3,setTempImage3]=useState({'bytes':'',file:'/page.png'})
    const [option4,setOption4]=useState('')
    const [image4,setImage4]=useState({'bytes':'',file:'/page.png'})
    const [tempImage4,setTempImage4]=useState({'bytes':'',file:'/page.png'})
    const [correctans,setCorrectAns]=useState('')
    const [listcourses,setListCourses]=useState([])
    const [listsubject,setListSubject]=useState([])
    const [btnState,setBtnState]=useState(false)
    const [btnState1,setBtnState1]=useState(false)
    const [btnState2,setBtnState2]=useState(false)
    const [btnState3,setBtnState3]=useState(false)
    const [btnState4,setBtnState4]=useState(false)
    const [totalSem,setTotalSem]=useState('')
    const [listSetNo,setListSetNo]=useState([])
    const [listUnit,setListUnit]=useState([])
  

  useEffect (function(){
      fetchAllQuestions()
      fetchAllCourses()
  },[])

  const fetchAllQuestions=async()=>{
      var result= await getData("questions/displayall")
      setList(result.result)
  }

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

  const fetchAllSubject = async(sem)=>{
      var result = await postData("questions/displaysubjectbycourseid",{courseid:courseId,semester:sem})
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

      var result = await postData('questions/getsetnobysubjectid',{subjectid:subjectid}) 
      setListSetNo(result.result)
    }

    const fillSetNo=()=>{

      return(listSetNo.map((item)=>{
        return<MenuItem value={item.setno}>{item.setno}</MenuItem>
      }))
    }

    const fetchAllUnit = async(subjectid)=>{
      var result = await postData("questions/displayunitbysubjectid",{subjectid:subjectid})
      
      setListUnit(result.result)
    }

    const fillAllUnit=()=>{
      return(listUnit.map((item)=>{
        return<MenuItem value={item.title}>{item.title}</MenuItem>
      }))
    }

  const fetchAllSemester= async(courseid)=>{
     var result = await postData('questions/getsemesterbycourseid',{courseid:courseid})
     
    setTotalSem(result.result[0].semester)
   }  

   const handleSemester=(event)=>{
     setSemester(event.target.value)
     fetchAllSubject(event.target.value)
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
        setBtnState(true)
    }
 
    const handleImage1=(event)=>{
        setImage1({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
        setBtnState1(true)
    }

    const handleImage2=(event)=>{
        setImage2({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
        setBtnState2(true)
    }

    const handleImage3=(event)=>{
        setImage3({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
        setBtnState3(true)
    }

    const handleImage4=(event)=>{
        setImage4({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
        setBtnState4(true)
    }

    const handleSetNo=(event)=>{
      setSetNo(event.target.value)
    }

    const handleUnit=(event)=>{
      setUnitId(event.target.value)
    }


    const handleClose=()=>{
        setOpen(false)
    }

    const editSave=async()=>{

      var formData = new FormData()
      formData.append('questionid',questionId)
      formData.append('questionImage',questionImage.bytes)

      var result = await postDataAndImage('questions/editquestionImage',formData)
    
        setOpen(false)
     if(result.result)
     {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Picture Edited Successfully',
            showConfirmButton: false,
            timer: 1500
          })
     }
     else{
        Swal.fire({
            position: 'center',
            icon: 'failed',
            title: 'failed to Edit Picture',
            showConfirmButton: false,
            timer: 1500
          })
     }
     setBtnState(false)
     fetchAllQuestions()
    }
    
    const editSave1=async()=>{

      var formData = new FormData()
      formData.append('questionid',questionId)
      formData.append('image1',image1.bytes)

      var result = await postDataAndImage('questions/editimage1',formData)
      
        setOpen(false)
     if(result.result)
     {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Picture Edited Successfully',
            showConfirmButton: false,
            timer: 1500
          })
     }
     else{
        Swal.fire({
            position: 'center',
            icon: 'failed',
            title: 'failed to Edit Picture',
            showConfirmButton: false,
            timer: 1500
          })
     }
     setBtnState1(false)
     fetchAllQuestions()
    }
    
    const editSave2=async()=>{

      var formData = new FormData()
      formData.append('questionid',questionId)
      formData.append('image2',image2.bytes)

      var result = await postDataAndImage('questions/editimage2',formData)
     
        setOpen(false)
     if(result.result)
     {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Picture Edited Successfully',
            showConfirmButton: false,
            timer: 1500
          })
     }
     else{
        Swal.fire({
            position: 'center',
            icon: 'failed',
            title: 'failed to Edit Picture',
            showConfirmButton: false,
            timer: 1500
          })
     }
     setBtnState2(false)
     fetchAllQuestions()
    }
    
    const editSave3=async()=>{

      var formData = new FormData()
      formData.append('questionid',questionId)
      formData.append('image3',image3.bytes)

      var result = await postDataAndImage('questions/editimage3',formData)
     
        setOpen(false)
     if(result.result)
     {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Picture Edited Successfully',
            showConfirmButton: false,
            timer: 1500
          })
     }
     else{
        Swal.fire({
            position: 'center',
            icon: 'failed',
            title: 'failed to Edit Picture',
            showConfirmButton: false,
            timer: 1500
          })
     }
     setBtnState3(false)
     fetchAllQuestions()
    }
    
    const editSave4=async()=>{

      var formData = new FormData()
      formData.append('questionid',questionId)
      formData.append('image4',image4.bytes)

      var result = await postDataAndImage('questions/editimage4',formData)
     
        setOpen(false)
     if(result.result)
     {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Picture Edited Successfully',
            showConfirmButton: false,
            timer: 1500
          })
     }
     else{
        Swal.fire({
            position: 'center',
            icon: 'failed',
            title: 'failed to Edit Picture',
            showConfirmButton: false,
            timer: 1500
          })
     }
     setBtnState4(false)
     fetchAllQuestions()
    }
    

    const cancelEdit=()=>{
      setquestionImage({bytes:'',file:`${tempPic.file}`}) 
      setBtnState(false)
    }

    const cancelEdit1=()=>{
      setImage1({bytes:'',file:`${tempImage1.file}`}) 
      setBtnState1(false)
    }

    const cancelEdit2=()=>{
      setImage1({bytes:'',file:`${tempImage2.file}`}) 
      setBtnState2(false)
    }

    const cancelEdit3=()=>{
      setImage1({bytes:'',file:`${tempImage3.file}`}) 
      setBtnState3(false)
    }

    const cancelEdit4=()=>{
      setImage1({bytes:'',file:`${tempImage4.file}`}) 
      setBtnState4(false)
    }

    const handleEditSave=async()=>{
        var body={questionid:questionId,facultyid:facultyId,departmentid:departmentId,courseid:courseId,subjectid:subjectId,semester:semester,setno:setNo,unitid:unitId,questionno:questionNo,question:question,questionimage:questionImage,option1:option1,image1:image1,option2:option2,image2:image2,option3:option3,image3:image3,option4:option4,image4:image4,correctanswer:correctans}
        var result = await postData('questions/editquestions',body)
       
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
      
      fetchAllQuestions()
       
      }

    const handleEdit=(rowData)=>{
        setQuestionId(rowData.questionid)
        setFacultyId(rowData.facultyid)
      setDepartmentId(rowData.departmentid)
      fetchAllCourses(rowData.departmentid)
      setCourseId(rowData.courseid)
      fetchAllSemester(rowData.courseid)
      setSemester(rowData.semester)
      fetchAllSubject(rowData.semester)
      setSubjectId(rowData.subjectid)
      fetchAllSetNo(rowData.subjectid)
      
        setSetNo(rowData.setno)
        fetchAllUnit(rowData.subjectid)
        setUnitId(rowData.unitid)
        setquestionNo(rowData.questionno)
        setQuestion(rowData.question)
        setquestionImage({bytes:'',file:`${ServerURL}/images/${rowData.questionimage}`})
        setTempPic({bytes:'',file:`${ServerURL}/images/${rowData.questionimage}`})
        setOption1(rowData.option1)
        setImage1({bytes:'',file:`${ServerURL}/images/${rowData.image1}`})
        setTempImage1({bytes:'',file:`${ServerURL}/images/${rowData.image1}`})
        setOption2(rowData.option2)
        setImage2({bytes:'',file:`${ServerURL}/images/${rowData.image2}`})
        setTempImage2({bytes:'',file:`${ServerURL}/images/${rowData.image2}`})
        setOption3(rowData.option3)
        setImage3({bytes:'',file:`${ServerURL}/images/${rowData.image3}`})
        setTempImage3({bytes:'',file:`${ServerURL}/images/${rowData.image3}`})
        setOption4(rowData.option4)
        setImage4({bytes:'',file:`${ServerURL}/images/${rowData.image4}`})
        setTempImage4({bytes:'',file:`${ServerURL}/images/${rowData.image4}`})
        setCorrectAns(rowData.correctanswer)
           setOpen(true)
           setBtnState(false)
    }

    const handleDelete=async(questionid)=>{

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
         
          
     var body={questionid}
     var result = await postData("questions/deletequestion",body)
     
         
         
         if(result.result)
         Swal.fire(
           'Deleted!',
           'Department has been deleted.',
           'success'
         )
       
       else
       Swal.fire(
         'Deleted!',
         'Department has not been deleted.',
         'error'
       )
     }
     fetchAllQuestions()
     })
     
      
   }
   

    const dialogbox=()=>{
          return(
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"

            fullWidth={true}
            maxWidth={'md'}
          >
            
            <DialogContent>
            <div  className= {classes.one}>
                <div className= {classes.two}>
                <Grid  style={{marginTop:20}} container spacing={2}>
                  <Grid item xs={12}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'20px', fontSize:20,fontWeight:'bold',letterSpacing:1}}>
                             <img src="/paper.png"  style={{ width:40, height:40, marginRight:10}} />
                             Questions Set
                             
                         </div>
                  </Grid>
                  
                  <Grid item xs={6}>
                      <TextField  fullWidth value={facultyId}  onChange={(event)=>setFacultyId(event.target.value)} id="outlined-basic" label="Faculty ID" variant="outlined" />
                      </Grid> 
                      <Grid item xs={6}>
                      <TextField  fullWidth value={departmentId} onChange={(event)=>setDepartmentId(event.target.value)} id="outlined-basic" label="Department" variant="outlined" />
                      </Grid> 

                      <Grid item xs={6}>
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
                <Grid item xs={6}>
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
                <Grid item xs={6}>
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
                      <TextField  fullWidth value={questionNo} onChange={(event)=>setquestionNo(event.target.value)} id="outlined-basic" label="Question No." variant="outlined" />
                      </Grid> 
                      
                      <Grid item xs={4}>
                      <TextField  fullWidth value={question} onChange={(event)=>setQuestion(event.target.value)} id="outlined-basic" label="Question" variant="outlined" />
                      </Grid> 
                      <Grid item xs={4}>
           <label htmlFor="contained-button-file">
        <Input onChange={(event)=>handleQuesImage(event)} accept="image/*" id="contained-button-file" multiple type="file" />
        <Button style={{marginTop:10}} fullWidth variant="contained" component="span">
          Edit Question Image
        </Button>
      </label>
           </Grid>
           <Grid item xs={4} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
             {btnState?<><Button onClick={()=>editSave()}>Save</Button><Button onClick={()=>cancelEdit()}>Cancel</Button></>:<></>}
           <Avatar
           alt="Upload Image"
           src={questionImage.file}
           variant='square'
           sx={{ width: 40, height: 40 }}
            />
           </Grid>

           <Grid item xs={4}>
                      <TextField  fullWidth value={option1} onChange={(event)=>setOption1(event.target.value)} id="outlined-basic" label="Option 1" variant="outlined" />
                      </Grid> 
                      <Grid item xs={4}>
           <label htmlFor="contained-button-file1">
        <Input onChange={(event)=>handleImage1(event)} accept="image/*" id="contained-button-file1" multiple type="file" />
        <Button style={{marginTop:10}} fullWidth variant="contained" component="span">
           Edit image
        </Button>
      </label>
           </Grid>
           <Grid item xs={4} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
           {btnState1?<><Button onClick={()=>editSave1()}>Save</Button><Button onClick={()=>cancelEdit1()}>Cancel</Button></>:<></>}
           <Avatar
           alt="Upload Image"
           src={image1.file}
           variant='square'
           sx={{ width: 40, height: 40 }}
            />
           </Grid>

           <Grid item xs={4}>
                      <TextField  fullWidth value={option2} onChange={(event)=>setOption2(event.target.value)} id="outlined-basic" label="Option 2" variant="outlined" />
                      </Grid> 
                      <Grid item xs={4}>
           <label htmlFor="contained-button-file2">
        <Input onChange={(event)=>handleImage2(event)} accept="image/*" id="contained-button-file2" multiple type="file" />
        <Button style={{marginTop:10}} fullWidth variant="contained" component="span">
           Edit image
        </Button>
      </label>
           </Grid>
           <Grid item xs={4} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
           {btnState2?<><Button onClick={()=>editSave2()}>Save</Button><Button onClick={()=>cancelEdit2()}>Cancel</Button></>:<></>}
           <Avatar
           alt="Upload Image"
           src={image2.file}
           variant='square'
           sx={{ width: 40, height: 40 }}
            />
           </Grid>

           <Grid item xs={4}>
                      <TextField  fullWidth value={option3}  onChange={(event)=>setOption3(event.target.value)} id="outlined-basic" label="Option 3" variant="outlined" />
                      </Grid> 
                      <Grid item xs={4}>
           <label htmlFor="contained-button-file3">
        <Input onChange={(event)=>handleImage3(event)} accept="image/*" id="contained-button-file3" multiple type="file" />
        <Button style={{marginTop:10}} fullWidth variant="contained" component="span">
           Edit image
        </Button>
      </label>
           </Grid>
           <Grid item xs={4} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
           {btnState3?<><Button onClick={()=>editSave3()}>Save</Button><Button onClick={()=>cancelEdit3()}>Cancel</Button></>:<></>}
           <Avatar
           alt="Upload Image"
           src={image3.file}
           variant='square'
           sx={{ width: 40, height: 40 }}
            />
           </Grid>

           <Grid item xs={4}>
                      <TextField  fullWidth value={option4} onChange={(event)=>setOption4(event.target.value)} id="outlined-basic" label="Option 3" variant="outlined" />
                      </Grid>
                      <Grid item xs={4}>
           <label htmlFor="contained-button-file4">
        <Input onChange={(event)=>handleImage4(event)} accept="image/*" id="contained-button-file4" multiple type="file" />
        <Button style={{marginTop:10}} fullWidth variant="contained" component="span">
           Edit image
        </Button>
      </label>
           </Grid>
           <Grid item xs={4} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
           {btnState4?<><Button onClick={()=>editSave4()}>Save</Button><Button onClick={()=>cancelEdit4()}>Cancel</Button></>:<></>}
           <Avatar
           alt="Upload Image"
           src={image4.file}
           variant='square'
           sx={{ width: 40, height: 40 }}
            />
           </Grid>

           <Grid item xs={12}>
                      <TextField  fullWidth value={correctans} onChange={(event)=>setCorrectAns(event.target.value)} id="outlined-basic" label="Correct Answer" variant="outlined" />
                      </Grid> 
 
           </Grid>
                </div>
                </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditSave}>Edit</Button>
              <Button onClick={handleClose} autoFocus>
                cancel
              </Button>
            </DialogActions>
          </Dialog>
          )
    }


    function DisplayQuestionTable() {
        return (
          <MaterialTable
            title="List of Questions"
            columns={[
              
              { title: 'Subject Name', field: 'subjectid'},
              { title: 'Set No.', field: 'setno'}, 
              { title: 'Unitid', field: 'unitid'},
              { title: 'Question No.', field:'questionno'},
              { title: 'Question', field:'question', render: (rowData) =>(<div>{rowData.question}<br/> <img src={`${ServerURL}/images/${rowData.questionimage}`} style={{width: 50, borderRadius: '50%'}}/></div>)},
              { title: 'Option1', field: 'option1', render: (rowData)=>(<div>{rowData.option1}<br/> <img src={`${ServerURL}/images/${rowData.image1}`} style={{width: 50, borderRadius: '50%'}}/></div>)},
              { title: 'Option2', field: 'option2', render: (rowData)=>(<div>{rowData.option2}<br/> <img src={`${ServerURL}/images/${rowData.image2}`} style={{width: 50, borderRadius: '50%'}}/></div>)},
              { title: 'Option3', field: 'option3', render: (rowData)=>(<div>{rowData.option3}<br/> <img src={`${ServerURL}/images/${rowData.image3}`} style={{width: 50, borderRadius: '50%'}}/></div>)},
              { title: 'Option4', field: 'option4', render: (rowData)=>(<div>{rowData.option4}<br/> <img src={`${ServerURL}/images/${rowData.image4}`} style={{width: 50, borderRadius: '50%'}}/></div>)},
              { title: 'Correct Answer', field: 'correctanswer'}
            
            ]}
            data={list}        
            actions={[
 
              {
                icon: 'edit',
                tooltip: 'Edit Questions',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Questions',
                onClick: (event, rowData) => handleDelete(rowData.questionid)
              }
            ]}
          />
        )
      }

      return (
          <div className={classes.one}>
              <div className={classes.two}>
                  {DisplayQuestionTable()}
                  {dialogbox()}
              </div>
          </div>
      )
}