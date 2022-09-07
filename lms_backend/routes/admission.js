var express = require("Express");
var router = express.Router();
const pool = require("./pool");
const upload = require("./multer");

router.post('/addadmission', function(req,res){
    console.log("BODY:",req.body)
    pool.query("insert into admission (departmentid,courseid,semester,enrollmentno,date,session,status) values(?,?,?,?,?,?,?)",[req.body.departmentid,req.body.courseid,req.body.semester,req.body.enrollmentno,req.body.date,req.body.session,req.body.status],function(error,result){
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

  router.get("/DisplayAll", function (req, res) {
    pool.query("select A.*,(select D.departmentname from department D where D.departmentid=A.departmentid) as departmentname,(select C.coursename from course C where C.courseid=A.courseid) as coursename from admission A", function (error, result) {
      if (error) {
        console.log(error)
        res.status(500).json({ result: [] })
      }
      else {
        res.status(200).json({ result: result })
      }
    })
  })
  

  router.post('/deleteadmission', function (req, res, next) {
    pool.query("delete from admission where admissionid=?", [req.body.admissionid], function (error, result) {
      if (error) {
        console.log(error)
        res.status(500).json({ result: false, 'msg': 'Server Error' })
      }
      else {
        res.status(200).json({ result: true, 'msg': 'Deleted' })
      }
    })
  })
  
  router.post('/editadmission', function (req, res, next) {
    pool.query("update admission set departmentid=?,courseid=?,semester=?, enrollmentno=?,date=?,session=?,status=? where admissionid=?", [req.body.departmentid,req.body.courseid,req.body.semester,req.body.enrollmentno,req.body.date,req.body.session,req.body.status,req.body.admissionid], function (error, result) {
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
  

  router.post('/enrollmentnobyadmissionid', function(req,res){
    console.log(req.body)
    pool.query("select A.*,(select S.studentname from student S where S.enrollmentno=A.enrollmentno) as studentname,(select D.departmentname from department D where D.departmentid=A.departmentid) as departmentname,(select C.coursename from course C where C.courseid=A.courseid) as coursename from admission A where A.courseid=? and A.semester=?",[req.body.courseid,req.body.semester], function(error, result){
        if(error){
            console.log(error)
            res.status(500).json([])
        }
        else{
            
            res.status(200).json({result:result})
        }
    })
  })
  
module.exports = router;