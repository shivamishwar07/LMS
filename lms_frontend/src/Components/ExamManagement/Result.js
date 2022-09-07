import React, { useState, useEffect } from 'react'
import { styled, makeStyles, Divider } from '@material-ui/core'
import { TextField, Grid, Button } from '@mui/material'
import { getData, postData } from '../Admin/FetchNodeServices';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useSelector} from "react-redux"
const UseStyles = makeStyles({

  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    // width:'40%',
    background: '#f1f2f6',
    // padding: 10

  },
  subdiv: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '95vw',
    padding: 30,
    marginTop: 30,
    borderBlockStyle: '-moz-initial',
  },
  inputstyle: {
    display: 'none',
  }
});
export default function Result(props) {
  var classes = UseStyles()
  const [getData,setData]=useState([])
  var student=useSelector(state=>state.student) 
  student=Object.values(student)[0] 
 

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)', background: 'green' }}
    >
      •
    </Box>
  );
 const fetchResult=async()=>{
   var body={setno:student.setno,enrollmentno:student.enrollmentno}
   var result=await postData('scheduleexams/result',body)

   setData(result.result)
   sendSms(result.result)
   

 }
 useEffect(function(){
fetchResult()

 },[])

 async function sendSms(Data)
 {
  var per=(Data[1][0].correct/Data[0][0].total)*100
  var result
  if(per>=60)
  result="Selected"
  else
  result="Rejected"
  var res=await postData('smsapi/sendmsg',{msg:result,moobileno:student.moobileno})
  alert(res)
 
 }

  return (
    <div className={classes.root}>
 {getData.length>0?
      <div>
        <div style={{ fontFamily: "Dancing Script, cursive", display: 'flex', justifyContent: 'center', fontSize: '43px', width: '100%' }}>
          Result
        </div>
        <div className={classes.subdiv}>

          <Box>
            <Card variant="outlined" style={{ background: '#00b894', width: '300px', display: "flex", justifyContent: 'center', margin: '10px' }}>
            <CardContent>
        <div style={{ display: 'flex', justifyContent: 'left', fontSize: 26, color: "#fff", fontFamily: "Dancing Script, cursive" }}>
          Correct Answer
        </div>
        <Divider style={{ backgroundColor: '#fff' }} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="/happy1.gif" width='150' />
        </div>
        <Divider style={{ backgroundColor: "#fff" }} />
        <div style={{ display: 'flex', justifyContent: 'center', color: "#fff", fontSize: 26, fontFamily: "Dancing Script, cursive" }}>
          { getData[1][0].correct
          }
        </div>
      </CardContent>
              
              </Card>
          </Box>
          <Box >
            <Card variant="outlined" style={{ background: '#e17055', width: '300px', display: "flex", justifyContent: 'center', margin: '10px' }}>\
            <CardContent>
        <div style={{ display: 'flex', justifyContent: 'left', fontSize: 26, color: "#fff", fontFamily: "Dancing Script, cursive" }}>
          Incorrect Answer
        </div>
        <Divider style={{ backgroundColor: "#fff" }} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="/sad.gif" width='150' />
        </div>
        <Divider style={{ backgroundColor: "#fff" }} />
        <div style={{ display: 'flex', justifyContent: 'center', color: "#fff", fontSize: 26, fontFamily: "Dancing Script, cursive" }}>
        { getData[2][0].incorrect
        }
        </div>
      </CardContent>
            
            </Card>
          </Box>
          <Box >
            <Card variant="outlined" style={{ background: '#0984e3', width: '300px', display: "flex", justifyContent: 'center', margin: '10px' }}><CardContent>
        <div style={{ display: 'flex', justifyContent: 'left', fontSize: 26, color: "#fff", fontFamily: "Dancing Script, cursive" }}>
          Not Attempt
        </div>
        <Divider style={{ backgroundColor: "#fff" }} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="/notattempt.gif" width='150' />
        </div>
        <Divider style={{ backgroundColor: "#fff" }} />
        <div style={{ display: 'flex', justifyContent: 'center', color: "#fff", fontSize: 26, fontFamily: "Dancing Script, cursive" }}>
        {getData[0][0].total-(getData[1][0].correct+getData[2][0].incorrect)
        }
        </div>
      </CardContent></Card>
          </Box>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Card variant="outlined" style={{ background: '#30336b', width: '83.5vw', display: "flex", justifyContent: 'center' }}>
            <CardContent>
              <div style={{ fontSize: 26, color: "#fff", fontFamily: "Dancing Script, cursive" }}>
                Marks:- {getData[1][0].correct}/{getData[0][0].total}
              </div>
            </CardContent>
          </Card>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '35px', marginBottom: '30px' }}>
          <Card variant="outlined" style={{ background: '#3B3B98', width: '83.5vw', display: "flex", justifyContent: 'center' }}>
            <CardContent>
              <div style={{ fontSize: 26, color: "#fff", fontFamily: "Dancing Script, cursive", display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: '80vw' }}>
              {(getData[1][0].correct/getData[0][0].total)*100>=60?<>
                <img src='/partypopper.gif' width='150' />You're Selected...<img src='/partypopperleft.gif' width='150' />
                </>: <>
                <img src='/crying.gif' width='150' />You're Rejected...<img src='/crying.gif' width='150' />
                </>}
              </div>
            </CardContent>
          </Card>
        </div>
     
      </div>:<></>}
    </div>
  )

}