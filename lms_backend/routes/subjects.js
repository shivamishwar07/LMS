var express = require('express');
var router = express.Router();
var pool = require("./pool")
var upload = require("./multer")

router.post('/addsubjects', function (req, res) {
  pool.query("insert into subjects (courseid,departmentid,semester,subjectname,type,subjectmarks)values(?,?,?,?,?,?)", [req.body.courseid, req.body.departmentid, req.body.semester, req.body.subjectname, req.body.type, req.body.subjectmarks], function (error, result) {
    if (error) {
      console.log(error)
      res.status(500).json({ result: false, 'msg': 'Server error' })
    }
    else {
      res.status(200).json({ result: true, 'msg': 'Submitted' })
    }
  })

})



router.get("/DisplayAll", function (req, res) {
  pool.query("select S.*,(select D.departmentname from department D where D.departmentid=S.departmentid) as departmentname,(select C.coursename from course C where C.courseid=S.courseid) as coursename from subjects S", function (error, result) {
    if (error) {
      console.log(error)
      res.status(500).json({ result: [] })
    }
    else {
      res.status(200).json({ result: result })
    }
  })
})

router.post('/displaysubjectbycourseid', function (req, res) {
  console.log(req.body)
  pool.query('select * from subjects where courseid=? and semester=?',[req.body.courseid,req.body.semester], function (error, result) {
    if (error) {
   
      res.status(500).json([])
    }
    else {
    console.log(result)
      res.status(200).json({result:result})
    }
  })
})

router.post('/displaysubjectbycourse', function (req, res) {
  console.log(req.body)
  pool.query('select * from subjects where courseid=?',[req.body.courseid], function (error, result) {
    if (error) {
   
      res.status(500).json([])
    }
    else {
    console.log(result)
      res.status(200).json({result:result})
    }
  })
})






router.post('/deletesubjects', function (req, res, next) {
  pool.query("delete from subjects where subjectid=?", [req.body.subjectid], function (error, result) {
    if (error) {
      console.log(error)
      res.status(500).json({ result: false, 'msg': 'Server Error' })
    }
    else {
      res.status(200).json({ result: true, 'msg': 'Deleted' })
    }
  })
})

router.post('/editsubjects', function (req, res, next) {
  pool.query("update subjects set courseid=?,departmentid=?,semester=?, subjectname=?,type=?,subjectmarks=? where subjectid=?", [req.body.courseid,req.body.departmentid,req.body.semester,req.body.subjectname,req.body.type,req.body.subjectmarks,req.body.subjectid], function (error, result) {
    if (error) {
      console.log(error)
      res.status(500).json({result:false,msg:'Server Error'})
    }
    else {
      console.log(result)
      res.status(200).json({result:true,msg:'Edited'})
    }
  })
})
router.post('/getsetnobysubjectid',  function(req, res, next) {
  
  pool.query("select * from sets where subjectid=?",[req.body.subjectid],function(error,result){
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



module.exports = router;
