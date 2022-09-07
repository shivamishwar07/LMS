import React, { useState, useEffect } from 'react'
import { styled, makeStyles } from '@material-ui/core'
import { TextField, Grid, Button } from '@mui/material'
import { Avatar } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Done from '@mui/icons-material/Done';
import { getData, postData } from '../Admin/FetchNodeServices';
import Swal from 'sweetalert2';
import Student from '../Admin/Student';
import { Refresh } from '@mui/icons-material';
import {  useNavigate } from 'react-router-dom';



const UseStyles = makeStyles({

  qblock: {

    alignContent: 'center',
    padding: 20,
    margin: 20,
  },
  qfont: {
    fontSize: 32,
    fontFamily: 'Oswald',
    fontWeight: 300,
    padding: 10,
    margin: 10

  },
  options: {
    fontSize: 24,
    fontFamily: 'Oswald',
    fontWeight: 100,
    padding: 10,
    margin: 10,
  },
  schip: {
    fontSize: 12,
    fontFamily: 'Oswald',
    fontWeight: 'bold',
  },
  textoption: {
    padding: 5,
    margin: 5,
  },
  inputstyle: {
    display: 'none',
  }
});

const Input = styled('input')({
  display: 'none',
});
export default function OnlineTest(props) {
  var Classes = UseStyles()
  var navigate=useNavigate()
  const [qlist, setQlist] = useState([])
  const [index, setIndex] = useState(0)
  const [options, setOptions] = useState({ one: '', two: '', three: '', four: '' })
  const [currentQuestion, setCurrentQuestion] = useState([])
  const [refresh, setRefresh] = useState(false)
 

  const fetchAllQuestions = async () => {
    var result = await postData('questions/fetchallquestion', { setno: props.setno })
    setQlist(result.result)

  }

  const handleReview = async (choice, item) => {
    var body = { examtransactionid: props.examtransactionid, setno: props.setno, questionno: index + 1, enrollmentno: props.enrollmentno }
    var result = await postData('student/updatestatus', body)
    props.updateColor()
  }
  const handleDelete = async () => {
    var body = { examtransactionid: props.examtransactionid, setno: props.setno, questionno: index + 1, enrollmentno: props.enrollmentno }
    var result = await postData('student/deletestudentexam', body)
    props.updateColor()
    setOptions({ one: '', two: '', three: '', four: '' })
  }

  const checkStudentSelectedQuestion = async (qno) => {

    var result = await postData('student/checkstudentquestions', { questionno: qno, setno: props.setno, enrollmentno: props.enrollmentno, examtransactionid: props.examtransactionid })

    if (result.result) {
      setSelectOptionsDisplay(result.data[0].selectedans)
      displayQuestionNumber(props.index - 1)
    }
    else {
      setOptions({ one: '', two: '', three: '', four: '' })
      displayQuestionNumber(props.index - 1, -1)
    }
  }
  useEffect(function () {
    if (props.index >= 1) {
      checkStudentSelectedQuestion(props.index)
      setIndex(props.index - 1)
    }
  }, [props.index])


  useEffect(function () {
    fetchAllQuestions();

  }, []);
  const handleNext = () => {
    var i = index
    if (i > qlist.length - 1)
      setIndex(0)
    else
      setIndex(i + 1)
    checkStudentSelectedQuestion(i + 2)
  }
  const displayButton = () => {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={2} >
            <Button fullWidth variant="contained" onClick={handleDelete} >Clear</Button>
          </Grid>
          <Grid item xs={2} >
            <Button fullWidth variant="contained" onClick={handlePrev} disabled={index <= 0 ? true : false}>Previous</Button>
          </Grid>
          <Grid item xs={2} >
            <Button fullWidth variant="contained" onClick={handleNext} disabled={index >= qlist.length - 1 ? true : false}>Next</Button>
          </Grid>
          <Grid item xs={3} >
            <Button fullWidth variant="contained" onClick={() => handleReview()} >Review</Button>
          </Grid>
          <Grid item xs={3} >
            <Button fullWidth variant="contained" onClick={()=>navigate('/result')} >Submit Exam</Button>
          </Grid>
        </Grid>
      </div>
    )

  }
  const handlePrev = () => {
    var i = index
    setIndex(i - 1)
    checkStudentSelectedQuestion(i)
  }

  const setSelectOptionsDisplay = (choice) => {

    if (choice == 1)
      setOptions({ one: <Done />, two: '', three: '', four: '' })
    else if (choice == 2)
      setOptions({ one: '', two: <Done />, three: '', four: '' })
    else if (choice == 3)
      setOptions({ one: '', two: '', three: <Done />, four: '' })
    else if (choice == 4)
      setOptions({ one: '', two: '', three: '', four: <Done /> })


  }

  const setSelectOptions = async (choice, item) => {

    setOptions({ one: '', two: '', three: '', four: '' })


    if (choice == 1)
      setOptions({ one: <Done />, two: '', three: '', four: '' })
    else if (choice == 2)
      setOptions({ one: '', two: <Done />, three: '', four: '' })
    else if (choice == 3)
      setOptions({ one: '', two: '', three: <Done />, four: '' })
    else if (choice == 4)
      setOptions({ one: '', two: '', three: '', four: <Done /> })

    var result = await postData('student/checkstudentquestions', { questionno: item.questionno, setno: props.setno, enrollmentno: props.enrollmentno, examtransactionid: props.examtransactionid })


    if (result.result) {
      var body = { selectedans: choice, examtransactionid: props.examtransactionid, setno: props.setno, questionno: item.questionno, answer: item.correctanswer, selectedans: choice, status: 'attempt', enrollmentno: props.enrollmentno }
      var result = await postData('student/updatestudentexam', body)

    }
    else {
      var body = { examtransactionid: props.examtransactionid, setno: props.setno, questionno: item.questionno, answer: item.correctanswer, selectedans: choice, status: 'attempt', enrollmentno: props.enrollmentno }
      var result = await postData('student/insertstudentexam', body)

    }
    props.updateColor()
  }
  const displayQuestionNumber = (index) => {
    return (

      <Grid container spacing={2} className={Classes.qblock}>
        <Grid item xs={12} className={Classes.qfont}>

          {`Q${qlist[index].questionno}:${qlist[index].question}`}
        </Grid>
        <Grid item xs={6} className={Classes.options}>
          <Chip className={Classes.schip} icon={options.one} onClick={() => setSelectOptions(1, qlist[index])} label='1' />
          <span className={Classes.textoption}>{`${qlist[index].option1}`}  </span>
        </Grid>
        <Grid item xs={6} className={Classes.options}>
          <Chip className={Classes.schip} icon={options.two} onClick={() => setSelectOptions(2, qlist[index])} label='2' />
          <span className={Classes.textoption}>{`${qlist[index].option2}`}  </span>
        </Grid>
        <Grid item xs={6} className={Classes.options}>
          <Chip className={Classes.schip} icon={options.three} onClick={() => setSelectOptions(3, qlist[index])} label='3' />
          <span className={Classes.textoption}>{`${qlist[index].option3}`}  </span>
        </Grid>
        <Grid item xs={6} className={Classes.options}>
          <Chip className={Classes.schip} icon={options.four} onClick={() => setSelectOptions(4, qlist[index])} label='4' />
          <span className={Classes.textoption}>{`${qlist[index].option4}`}  </span>
        </Grid>
      </Grid>
    )

  }


  return (

    <div>
      {qlist.length > 0 ? displayQuestionNumber(index) : <></>}
      {qlist.length > 0 ? displayButton() : <></>}
    </div>
  )
}