var express = require('express');
var router = express.Router();
var pool =  require("./pool")
var upload = require("./multer")



router.post('/addset', function(req,res){
    console.log("BODY:",req.body)
    pool.query("insert into sets (facultyid,departmentid,courseid,subjectid,semester,setno,time,status,marks) values(?,?,?,?,?,?,?,?,?)",[req.body.facultyid,req.body.departmentid,req.body.courseid,req.body.subjectid,req.body.semester,req.body.setno,req.body.time,req.body.status,req.body.marks],function(error,result){
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

  router.get('/displayallsets',function(req,res){
    pool.query("select CS.*,(select D.departmentname from department D where D.departmentid=CS.departmentid) as departmentname,(select C.coursename from course C where C.courseid=CS.courseid) as coursename,(select S.subjectname from subjects S where S.subjectid = CS.subjectid) as subjectname from sets CS",function(error,result){
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

router.post('/deletefaculty',  function(req, res, next) {
  pool.query("delete from sets where setid=?",[req.body.setid],function(error,result){
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

router.post('/editsets', function(req, res, next) {
  pool.query("update sets set facultyid=?,departmentid=?,courseid=?,subjectid=?,setno=?,semester=?,time=?,status=?,marks=? where setid=?",[req.body.facultyid,req.body.departmentid,req.body.courseid,req.body.subjectid,req.body.semester,req.body.setno,req.body.time,req.body.status,req.body.marks,req.body.setid],function(error,result){
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

router.get('/generateset',function(req,res){
  pool.query("select max(setid) as setid from sets",function(error,result){
      if(error)
      {
        res.status(500).json({result:[]})
      }
      else
      {
        if(result[0].setid==null)
        res.status(200).json({result:1})
        else
        res.status(200).json({result:parseInt(result[0].setid)+1})
      }   
  })
})

  module.exports = router;
