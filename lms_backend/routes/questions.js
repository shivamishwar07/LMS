var express = require('express');
var router = express.Router();
var pool =  require("./pool")
var upload = require("./multer")



router.post('/addquestions',upload.any(), function(req,res){
  console.log("FILES:",req.files)
  console.log("BODY:",req.body)
  if(req.files.length==0)
  {
  if(req.body.questionimage=='')
  {questionimage='None' }
  
  if(req.body.image1=='')
  {image1='None' }
  if(req.body.image2=='')
  {image2='None' }
  if(req.body.image3=='')
  {image3='None' }
  if(req.body.image4=='')
  {image4='None' }
  }
  else
  {
     console.log("IN FILES")
     questionimage="None"
     image1="None"
     image2="None"
     image3="None"
     image4="None"

   req.files.map((items)=>{
     console.log("IIITTTEEMMS:",items.fieldname)
      if(items.fieldname=='questionimage')
      {questionimage=items.filename}
      else if(items.fieldname=='image1')
      {image1=items.filename}
      else if(items.fieldname=='image2')
      {image2=items.filename}
      else if(items.fieldname=='image3')
      {image3=items.filename}
      else if(items.fieldname=='image4')
      {image4=items.filename}
      
      
      
   })
   
  }
    pool.query("insert into questions (facultyid,departmentid,courseid,semester,subjectid,setno,unitid,questionno,question,questionimage,option1,image1,option2,image2,option3,image3,option4,image4,correctanswer) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.facultyid,req.body.departmentid,req.body.courseid,req.body.semester,req.body.subjectid,req.body.setno,req.body.unitid,req.body.questionno,req.body.question,questionimage,req.body.option1,image1,req.body.option2,image2,req.body.option3,image3,req.body.option4,image4,req.body.correctanswer],function(error,result){
      if(error)
      {
        console.log(error)
        res.status(500).json({result:false,'msg':'Server error'})
      }
      else
      {
        res.status(200).json({result:true,'msg':'Submitted'})
      }
    })
  
  })


  router.get('/displayall',function(req,res){
    pool.query("select Q.*,(select D.departmentname from department D where D.departmentid=Q.departmentid) as departmentname,(select C.coursename from course C where C.courseid=Q.courseid) as coursename,(select S.subjectname from subjects S where S.subjectid = Q.subjectid) as subjectname from questions Q",function(error,result){
        if(error)
        {
          res.status(500).json({result:[]})
        }
        else
        {
          res.status(200).json({result:result})
        }   
    })
})

router.post('/generatequestionnumber',function(req,res){
  pool.query("select count(*) as qno from questions where setno=?",[req.body.setno],function(error,result){
      if(error)
      {
        res.status(500).json({result:[]})
      }
      else
      { 
        if(result[0].qno==null)
        res.status(200).json({result:1})
        else
        res.status(200).json({result:parseInt(result[0].qno)+1})
      }   
  })
})


router.post('/editquestionimage', upload.single("questionimage"), function(req, res, next) {
  console.log(req.body)
  console.log(req.file)
  pool.query("update questions set questionimage=? where questionid=?",[req.filename,req.body.questionid],function(error,result){
    if(error)
    {    console.log(error)
        res.status(500).json({result:false, 'msg': 'Server Error'})
    }
    else
    { console.log(result)
       res.status(200).json({result:true, 'msg': 'Editted'})
    } 
  })
})

router.post('/editimage1', upload.single("image1"), function(req, res, next) {
  console.log(req.body)
  console.log(req.file)
  pool.query("update questions set image1=? where questionid=?",[req.filename,req.body.questionid],function(error,result){
    if(error)
    {    console.log(error)
        res.status(500).json({result:false, 'msg': 'Server Error'})
    }
    else
    { console.log(result)
       res.status(200).json({result:true, 'msg': 'Editted'})
    } 
  })
})

router.post('/editimage2', upload.single("image2"), function(req, res, next) {
  console.log(req.body)
  console.log(req.file)
  pool.query("update questions set image2=? where questionid=?",[req.filename,req.body.questionid],function(error,result){
    if(error)
    {    console.log(error)
        res.status(500).json({result:false, 'msg': 'Server Error'})
    }
    else
    { console.log(result)
       res.status(200).json({result:true, 'msg': 'Editted'})
    } 
  })
})

router.post('/editimage3', upload.single("image3"), function(req, res, next) {
  console.log(req.body)
  console.log(req.file)
  pool.query("update questions set image3=? where questionid=?",[req.filename,req.body.questionid],function(error,result){
    if(error)
    {    console.log(error)
        res.status(500).json({result:false, 'msg': 'Server Error'})
    }
    else
    { console.log(result)
       res.status(200).json({result:true, 'msg': 'Editted'})
    } 
  })
})

router.post('/editimage4', upload.single("image4"), function(req, res, next) {
  console.log(req.body)
  console.log(req.file)
  pool.query("update questions set image4=? where questionid=?",[req.filename,req.body.questionid],function(error,result){
    if(error)
    {    console.log(error)
        res.status(500).json({result:false, 'msg': 'Server Error'})
    }
    else
    { console.log(result)
       res.status(200).json({result:true, 'msg': 'Editted'})
    } 
  })
})

router.post('/editquestions', function(req, res, next) {
  pool.query("update questions set facultyid=?,departmentid=?,courseid=?,semester=?,subjectid=?,setno=?,unitid=?,questionno=?,question=?,option1=?,option2=?,option3=?,option4=?,correctanswer=? where questionid=?",[req.body.facultyid,req.body.departmentid,req.body.courseid,req.body.semester,req.body.subjectid,req.body.setno,req.body.unitid,req.body.questionno,req.body.question,req.body.option1,req.body.option2,req.body.option3,req.body.option4,req.body.correctanswer,req.body.questionid],function(error,result){
    if(error)
    {    console.log(error)
        res.status(500).json({result:[]})
    }
    else
    {
       res.status(200).json({result:result})
    } 
  })
})

router.post('/deletequestion',  function(req, res, next) {
  pool.query("delete from questions where questionid=?",[req.body.questionid],function(error,result){
    if(error)
    {    console.log(error)
        res.status(500).json({result:false, 'msg': 'Server Error'})
    }
    else
    {
       res.status(200).json({result:true, 'msg': 'Deleted'})
    } 
  })
})


router.post('/fetchallquestion',function(req,res){
  pool.query("select Q.*,(select D.departmentname from department D where D.departmentid=Q.departmentid) as departmentname,(select C.coursename from course C where C.courseid=Q.courseid) as coursename,(select S.subjectname from subjects S where S.subjectid = Q.subjectid) as subjectname,(select SE.status from studentexam SE where SE.questionno=Q.questionno and SE.enrollmentno=?) as qstatus from questions Q where Q.setno=?",[req.body.enrollmentno,req.body.setno],function(error,result){
      if(error)
      {
        res.status(500).json({result:[]})
      }
      else
      {
        res.status(200).json({result:result})
      }   
  })
})












  module.exports = router;