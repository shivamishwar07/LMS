import React,{useEffect,useState} from "react";
import {styled, makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import {Grid,TextField,Button,FormControl,InputLabel,Select,MenuItem} from  "@mui/material";
import { ServerURL,postDataAndImage,getData } from "./FetchNodeServices";
import DisplayAllCourses from "./DisplayAllCourses";
import Swal from "sweetalert2";

const useStyles = makeStyles({
  root: {
     display:'flex',
     alignContent:'center',
     justifyContent:'center'  


  },
  subdiv:{
      display:'flex',
      background:'#ecf0f1',
      padding:20,
      width:500,
      marginTop:30,
  },
  inputstyle:{
      display:'none'
  }

});

const Input = styled('input')({
    display: 'none',
  });


export default function Department(props)
{ var classes=useStyles()
  const [departmentid,setDepartmentid]=useState('')
  const [coursename,setCourseName]=useState('')
  const [semester,setsemester]=useState('')
  const [feepersemester,setFeepersemester]=useState('')
  const [listDepartment, setListDepartment]=useState([])
  const [icon,setIcon]=useState({bytes:'',file:'/cicon.png'})


  const fetchAllDepartment=async()=>{
    var result=await getData("department/displayall")
    setListDepartment(result.result)
  }


  useEffect(function(){
    fetchAllDepartment()
  },[])


  const fillDepartment=()=>{
    return listDepartment.map((item)=>{
        return <MenuItem value={item.departmentid}>{item.departmentname}</MenuItem>
    }) 
  }


const handleSubmit=async()=>{
  var formData=new FormData()
  formData.append('departmentid',departmentid)
  formData.append('coursename',coursename)
  formData.append('semester',semester)
  formData.append('feepersemester',feepersemester)
  formData.append('icon',icon.bytes)

 var result=await postDataAndImage("courses/addcourse",formData)

 if(result.result){
  Swal.fire({
    title: 'LMS',
    text: 'Course submitted successfully!',
    imageUrl: '/lms.png',
    icon:'success',
    imageWidth:'300',
    imageWidth:'300'
  })
 }else{
  Swal.fire({
    title: 'LMS',
    text: 'Fail to submit course!',
    imageUrl: '/lms.png',
    icon:'error',
    imageWidth:'300',
    imageWidth:'300'
  })
 }
 

}
 const handleIconChange=(event)=>{
  setIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
}

const handleDepartmentChange=(event)=>{
  setDepartmentid(event.target.value)
}

const handleSemesterChange = (event) => {
  setsemester(event.target.value);
};


  return(
     <div className={classes.root} >
     <div className={classes.subdiv}>

    
       <Grid container spacing={2}>
       <Grid item xs={12}>
           <div style={{display:'flex',alignItems:'center', fontSize:20,fontWeight:'bold',letterSpacing:1}}>
             <img src="/department.png" style={{width:40,hieght:40}} />
               Course Interface
               <div style={{marginLeft:"auto"}}>
                   <Button onClick={()=>props.setView(<DisplayAllCourses/>)} variant="contained" >List Courses</Button>
                   </div>
           </div>
           </Grid>
           <Grid item xs={6}>
           <FormControl variant='outlined' fullWidth>
              <InputLabel id="dep">Department</InputLabel>
                <Select 
                  labelId="dep"
                  id="dep"
                  value={departmentid}
                  label="Department"
                  onChange={handleDepartmentChange}
                  >
                {fillDepartment()}
                </Select>
            </FormControl>
            </Grid>

           <Grid item xs={6}>
             <TextField onChange={(event)=>setCourseName(event.target.value)} fullWidth label="Course Name" variant="outlined"/ >
            </Grid>

            <Grid item xs={6}>
            <FormControl variant='outlined' fullWidth>
              <InputLabel id="dep">No of Semester</InputLabel>
                <Select 
                  labelId="semester"
                  id="semester"
                  value={semester}
                  label="No of Semester"
                  onChange={handleSemesterChange}
                  >
                <MenuItem value={1}>One</MenuItem>
                <MenuItem value={2}>Two</MenuItem>
                <MenuItem value={3}>Three</MenuItem>
                <MenuItem value={4}>Four</MenuItem>
                <MenuItem value={5}>Five</MenuItem>
                <MenuItem value={6}>Six</MenuItem>
                <MenuItem value={7}>Seven</MenuItem>
                <MenuItem value={8}>Eight</MenuItem>
                <MenuItem value={9}>Nine</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                </Select>
            </FormControl>
            </Grid>

            <Grid item xs={6}>
             <TextField onChange={(event)=>setFeepersemester(event.target.value)} fullWidth label="Fee per Semester" variant="outlined"/ >
            </Grid>

            <Grid item xs={6}>
            <label htmlFor="contained-button-file">
        <Input onChange={(event)=>handleIconChange(event)}  accept="image/*" id="contained-button-file" multiple type="file" />
        <Button fullWidth variant="contained" component="span">
          Upload
        </Button>
      </label>
            
            </Grid>
         <Grid item xs={6} style={{display:'flex',alignItem:'center',justifyContent:'center'}}>
         <Avatar
  alt="Upload Image"
  src={icon.file}
  variant="square"
  sx={{ width: 56, height: 56 }}
/>
           </Grid>   
<Grid item xs={6}>
<Button fullWidth  onClick={()=>handleSubmit()}  variant="contained" color="primary" >Save</Button>
</Grid>

<Grid item xs={6}>
<Button fullWidth   variant="contained" color="primary">Reset</Button>
</Grid>

       </Grid>

       </div>
     </div>

  )

}
