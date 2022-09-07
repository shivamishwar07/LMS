var express = require("Express");
var router = express.Router();
const pool = require("./pool");
const upload = require("./multer");

router.post('/addData', function (req, res) {
  console.log("BODY:", req.body)
  pool.query("insert into scheduleexams (examdate,examtime,facultyid,departmentid,courseid,semester,subjectid,setno,enrollmentno,status) values ?", [req.body.enrollmentno.map(item => [req.body.examdate, req.body.examtime, req.body.facultyid, req.body.departmentid, req.body.courseid, req.body.semester, req.body.subjectid, req.body.setno, item, "absent"])], function (error, result) {
    if (error) {
      console.log(error)
      res.status(500).json({ result: false, 'msg': 'Server error',error })
    }
    else {
      res.status(200).json({ result: true, 'msg': 'Submitted' })
    }
  })

})


router.post('/fetchstudentexamdetails', function (req, res) {
  console.log("BODY:", req.body)
  pool.query("select SE.*,(select S.subjectname from subjects S where S.subjectid=SE.subjectid) as subname,(select D.departmentname from department D where D.departmentid=SE.departmentid) as depname from scheduleexams SE where enrollmentno=? and status='absent' ", [req.body.enrollmentno], function (error, result) {
    if (error) {
      console.log(error)
      res.status(500).json({ result: false, 'msg': 'Server error',error })
    }
    else {
      res.status(200).json({ result: true, data:result })
    }
  })

})

router.post('/result', function (req, res) {
  console.log("BODY:", req.body)
  var userresult={total:0,correct:0,incorrect:0}
  var correct;
  pool.query("select count(*) as total from questions where setno=?;select count(*) as correct from studentexam where enrollmentno=? and setno=? and answer=selectedans;select count(*) as incorrect from studentexam where enrollmentno=? and setno=? and answer!=selectedans ", [req.body.setno,req.body.enrollmentno,req.body.setno,req.body.enrollmentno,req.body.setno], function (error, result) {
   
    res.status(200).json({result:result});
   
 })

 
})


module.exports = router;