import React, { useState, useEffect } from 'react'
import { styled, makeStyles } from '@material-ui/core'
import { TextField, Grid, Button } from '@mui/material'
import { Avatar } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getData, postData, ServerURL } from '../Admin/FetchNodeServices';
import {deepOrange,deepPurple} from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DisplayQuestion from './DisplayQuestion';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import Student from '../Admin/Student';
import Department from '../Admin/Department';


const UseStyles = makeStyles({

    qno: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'center',
        alignContent: 'center',
        // width:'40%',
        background:'#f1f2f6',
        padding:10

    },
    subdiv: {
        display: 'flex',
        background: '#ecf0f1',
        padding: 30,
        width: 600,
        marginTop: 30,
        borderBlockStyle: '-moz-initial',
    },
    inputstyle: {
        display: 'none',
    }
});

const Input = styled('input')({
    display: 'none',
});
export default function OnlineTest(props) {
    var Classes= UseStyles()
   const [qlist,setQlist] = useState([])
   const [time,setTime] = useState({ min:59,sec:59});
   const [refresh,setRefresh] = useState(true);
   const [index,setIndex] = useState(0)

   var student= useSelector(state=>state.student)
     student = Object.values(student)[0]
   var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  var months=['January','Febuary','March','April','May','June','July','August','September','October','November','December']
   var d=new Date()
   var cd=days[d.getDay()]+","+d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear()
   var et;
 function StudentAppBar() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
           
            <div style={{ flexGrow: 1,fontSize:14,flexDirection:'column' }}>
             <div>
              {cd}
            </div>
            <div>
           {student.department}
            </div>
            </div>

            <div style={{ flexGrow: 1,fontSize:14,flexDirection:'column' }}>
             <div>
             {student.subjectid}
            </div>
            <div>
            {student.subject}
            </div>
            </div>

            <div style={{display:'flex',fontSize:14,flexDirection:'column'}}>
             <div>
         {student.studentname}
              </div>
              <div>
               {student.coursename}/{student.semester}
              </div>
            </div>
            <Avatar style={{margin:5}} alt="Remy Sharp" src={`${ServerURL}/images/${student.picture}`} />
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
  const handleQuestionNumber=(qn)=>{
    setIndex(qn)
  }


    const fetchAllQuestions=async()=>{
        var result=await postData('questions/fetchallquestion',{setno:student.setno,enrollmentno:student.enrollmentno})
        setQlist(result.result)
 
    }

    function examWatch(){
        setTime((t)=>{
            var sec = t.sec-1;
            if(sec==0) return {min:t.min-1,sec:59};
            else return{min:t.min,sec:t.sec-1};

        });
        setRefresh(!refresh);
    }
    const startWatch = () => {
        et = setInterval(examWatch, 1000);
      };
    
      useEffect(function () {
        fetchAllQuestions();
        startWatch();
      }, []);

      const displayQuestionNumber = () => {
        return qlist.map((item) => {
          return (
            <Grid item xs={2}>
            {item.qstatus=='attempt'?<Avatar onClick={()=>handleQuestionNumber(item.questionno)} sx={{ bgcolor: '#A3CB38' }}>{item.questionno}</Avatar>:item.qstatus==="review"?<Avatar onClick={()=>handleQuestionNumber(item.questionno)} sx={{ bgcolor: '#FFC312' }}>{item.questionno}</Avatar>:<Avatar onClick={()=>handleQuestionNumber(item.questionno)} sx={{ bgcolor:'#EE5A24' }}>{item.questionno}</Avatar>}
            </Grid>
          );
        });
      };
   
const updateColor=async()=>{
fetchAllQuestions()
}
       return(
         <div>
         {StudentAppBar()}
         <Grid container spacing={2} >
          <Grid item xs={4} >
          <div className={Classes.qno}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
          <div style={{ display:'flex',justifyContent:'center', fontFamily: "Orbitron", fontSize: 32 }}>
            {time.min>=0 && time.min<=9?`0${time.min}`:`${time.min}`}:{time.sec>=0 && time.sec<=9?`0${time.sec}`:`${time.sec}`}
          </div>
          </Grid>
          <Grid item xs={12}> 
          <Grid container spacing={3}>
            {displayQuestionNumber()}
        </Grid>       
        </Grid>
        </Grid>
       </div>
       </Grid>
       <Grid item xs={8} >
       <DisplayQuestion updateColor={updateColor} index={index}  setno={student.setno} examtransactionid={student.examtransactionid} enrollmentno={student.enrollmentno}/>
         </Grid>         
       </Grid>
       </div>
    )
}