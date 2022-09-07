import React,{useState} from  "react";
import {styled,makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import {ServerURL,postDataAndImage} from "./FetchNodeServices";
import { TextField,Button,Grid } from "@mui/material";
import DisplayAllDepartment from "./DisplayAllDepartment";
import Swal from "sweetalert2";
const useStyles = makeStyles({
  root: {
      display:'flex',
      justifyContent:'center',
      alignContent:'center',
    
  },
  subdiv:{
      display:'flex',
      background:'#ecf0f1',
      padding:20,
      width:700,
      marginTop:30,
  },
  inputstyle:{
      display:'none',
  }
});


const Input = styled('input')({
    display: 'none',
  });


export default function Department(props)
{ var classes=useStyles()
  const [depname,setDepName]=useState('') 
  const [depicon,setDepIcon]=useState({bytes:'',file:"/depicon.png"}) 
 
  const handleSubmit=async()=>{
    var formData= new FormData()

    formData.append('departmentname',depname)
    formData.append('icon',depicon.bytes)

    var result= await postDataAndImage("department/adddepartment",formData)
 
    if(result.result)
    {
      Swal.fire({
        title: "LMS",
        text: 'Department Submitted Successfully..',
        imageUrl: '/lms.png',
        imageWidth: 150,
        imageHeight: 150,
        icon:'success'
      })
    }
    else
    {
      Swal.fire({
        title: "LMS",
        text: 'Fail To Submit Department',
        imageUrl: '/lms.png',
        imageWidth: 150,
        imageHeight: 150,
        icon:'error'
      })
    }

  }
 
  const handleIconChange=(event)=>{
   setDepIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})

  }
   return(
      <div className={classes.root}>
      <div className={classes.subdiv}>
           

       <Grid container spacing={2}>
           <Grid item xs={12}>
               <div style={{display:'flex',alignItems:'center',fontSize:20,fontWeight:'bold',letterSpacing:1}}>
                   <img src="/department.png" style={{width:60,height:50}}/>
                   Department Interface
                   <div style={{marginLeft:"auto"}}>
                   <Button onClick={()=>props.setView(<DisplayAllDepartment/>)} variant="contained" >List Departments</Button>
                   </div>
               </div>
             
               </Grid>
               <Grid item xs={12}>
                <TextField onChange={(event)=>setDepName(event.target.value)} fullWidth label="DepartmentName" variant="outlined" />
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
               src={depicon.file}
               variant="rounded"
                sx={{ width: 56, height: 56 }}
               />
              </Grid>
              <Grid item xs={6} >
                  <Button fullWidth onClick={()=>handleSubmit()} variant="contained" color="primary">Save</Button>
              </Grid>

              <Grid item xs={6} >
                  <Button fullWidth variant="contained" color="primary">Reset</Button>
              </Grid>

           </Grid>
       </div>
      </div>

   )

}
