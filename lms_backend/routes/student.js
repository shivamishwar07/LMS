var express = require('express');
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");
router.post('/addstudent', upload.any(), function (req, res, next) {
  console.log("BODY:",req.body)

  pool.query("insert into student (enrollmentno,studentname,fathername,mothername,nationality,category,gender,dob,mobileno,parentmobileno,caddress,cstate,ccity,paddress,pstate,pcity,emailid,occupation,income,addharno,addhar,domicile,domicileid,departmentid,courseid,password,picture) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.enrollmentno, req.body.studentname, req.body.fathername, req.body.mothername, req.body.nationality, req.body.category, req.body.gender, req.body.dob, req.body.mobileno, req.body.parentmobileno, req.body.caddress, req.body.cstate, req.body.ccity, req.body.paddress, req.body.pstate, req.body.pcity, req.body.emailid, req.body.occupation, req.body.income, req.files[0].filename, req.body.addhar, req.files[1].filename, req.body.domicileid, req.body.departmentid, req.body.courseid, req.body.password, req.files[2].filename], function (error, result) {
    if (error) {
       console.log(error)
      res.status(500).json({ result: false, msg: 'Server error..' })
    }
    else {
      // console.log(result)
      res.status(200).json({ result: true, msg: 'Submitted' })
    }

  })
});

router.get('/displayStudents', function (req, res) {
  pool.query("select S.*,(select D.departmentname from department D where D.departmentid=S.departmentid) as departmentname,(select C.coursename from course C where C.courseid=S.courseid) as coursename,(select Sta.statename from states Sta where Sta.stateid=S.cstate) as cstatename,(select Sta.statename from states Sta where Sta.stateid=S.pstate) as pstatename,(select C.cityname from cities C where C.cityid=S.ccity) as ccityname,(select C.cityname from cities C where C.cityid=S.pcity) as pcityname from student S", function (error, result) {
    if (error) {
      console.log(error)
      res.status(500).json({ result: [] })
    }
    else {
      res.status(200).json({ result: result })
    }


  });


});
router.post('/editstudent', function (req, res, next) {
  console.log("=====>",req.body)
  pool.query("update student set studentname=?,fathername=?,mothername=?,nationality=?,category=?,gender=?,dob=?,mobileno=?,parentmobileno=?,caddress=?,cstate=?,ccity=?,paddress=?,pstate=?,pcity=?,emailid=?,occupation=?,income=?,addhar=?,domicile=?,departmentid=?,courseid=?,password=? where studentid=?", [ req.body.studentname, req.body.fathername, req.body.mothername, req.body.nationality, req.body.category, req.body.gender, req.body.dob, req.body.mobileno, req.body.parentmobileno, req.body.caddress, req.body.cstate, req.body.ccity, req.body.paddress, req.body.pstate, req.body.pcity, req.body.emailid, req.body.occupation, req.body.income, req.body.addhar, req.body.domicile, req.body.departmentid, req.body.courseid, req.body.password,req.body.studentid], function (error, result) {

    if (error) {
      console.log(error)
      res.status(500).json({ result: [] })
    }
    else {
      res.status(200).json({ result: result })
    }



  })

})

router.post('/deletestudent', function (req, res, next) {

  pool.query("delete from  student  where studentid=?", [req.body.studentid], function (error, result) {

    if (error) {
      // console.log(error)
      res.status(500).json({ result: false, msg: 'Server Error' })
    }
    else {
      res.status(200).json({ result: true, msg: 'Deleted' })

    }



  })

})

router.post('/insertstudentexam', upload.any(), function (req, res, next) {
  console.log("BODY:",req.body)

  pool.query("insert into studentexam (examtransactionid,setno,questionno,answer,selectedans,status,enrollmentno) values(?,?,?,?,?,?,?)", [req.body.examtransactionid, req.body.setno,req.body.questionno,req.body.answer,req.body.selectedans,req.body.status,req.body.enrollmentno], function (error, result) {
    if (error) {
       console.log(error)
      res.status(500).json({ result: false, msg: 'Server error..' })
    }
    else {
      // console.log(result)
      res.status(200).json({ result: true, msg: 'Submitted' })
    }

  })
});


router.post('/updatestudentexam', upload.any(), function (req, res, next) {
  console.log("BODY:",req.body)

  pool.query("update studentexam set status='attempt', selectedans=? where  examtransactionid=? and setno=? and questionno=? and enrollmentno=?", [req.body.selectedans,req.body.examtransactionid,req.body.setno,req.body.questionno,req.body.enrollmentno] , function (error, result) {
    if (error) {
       console.log(error)
      res.status(500).json({ result: false, msg: 'Server error..' })
    }
    else {
      // console.log(result)
      res.status(200).json({ result: true, msg: 'Submitted' })
    }

  })
});





router.post('/deletestudentexam', upload.any(), function (req, res, next) {
  console.log("BODY:",req.body)

  pool.query(
    "delete from studentexam   where  examtransactionid=? and setno=? and questionno=? and enrollmentno=?", [req.body.examtransactionid,req.body.setno,req.body.questionno,req.body.enrollmentno] , function (error, result) {
    if (error) {
       console.log(error)
      res.status(500).json({ result: false, msg: 'Server error..' })
    }
    else {
      // console.log(result)
      res.status(200).json({ result: true, msg: 'Submitted' })
    }

  })
});


router.post('/updatestatus', upload.any(), function (req, res, next) {
  console.log("BODY:",req.body)

  pool.query("update studentexam set status='review' where  examtransactionid=? and setno=? and questionno=? and enrollmentno=?", [req.body.examtransactionid,req.body.setno,req.body.questionno,req.body.enrollmentno] , function (error, result) {
    if (error) {
       console.log(error)
      res.status(500).json({ result: false, msg: 'Server error..' })
    }
    else {
      // console.log(result)
      res.status(200).json({ result: true, msg: 'Submitted' })
    }

  })
});


router.post('/checkstudentquestions', function (req, res, next) {

  pool.query(
    "select * from studentexam where examtransactionid=? and setno=? and questionno=? and enrollmentno=?", [req.body.examtransactionid,req.body.setno,req.body.questionno,req.body.enrollmentno], function (error, result) {

    if (error) {
      // console.log(error)
      res.status(500).json({ result: false, msg: 'Server Error' })
    }
    else {
      if(result.length>=1)
      res.status(200).json({ result: true, data:result })
      else
      res.status(200).json({result:false,data:[]})

    }



  })

})
router.post('/editaddhar', upload.single("addharno"), function(req, res, next) {
  console.log(req.body)
  console.log(req.file)
  pool.query("update student set addharno=? where enrollmentno=?",[req.filename,req.body.enroll],function(error,result){
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

router.post('/editdomicile', upload.single("domicile"), function(req, res, next) {
  console.log(req.body)
  console.log(req.file)
  pool.query("update student set domicile=? where enrollmentno=?",[req.filename,req.body.enroll],function(error,result){
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

router.post('/editpicture', upload.single("picture"), function(req, res, next) {
  console.log(req.body)
  console.log(req.file)
  pool.query("update student set picture=? where enrollmentno=?",[req.filename,req.body.enrollmentno],function(error,result){
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



router.post('/checklogin', function (req, res, next) {
  pool.query("select S.*,(select C.coursename from course C where C.courseid=S.courseid ) as coursename from student S where emailid=? and password=?", [req.body.emailid, req.body.password], function (error, result) {

    if (error) {
      console.log(error)
      res.status(500).json({ result: false })
    }
    else {
      if (result.length == 0) {
        res.status(200).json({ result: false,data:[] })
      }
      else {
        res.status(200).json({ result: true,data:result})
      }

    }
  })

})

router.post('/enrollmentnobycourseid', function(req,res){
  console.log(req.body)
  pool.query("select S.*,(select D.departmentname from department D where D.departmentid = S.departmentid) as departmentname,(select C.coursename from course C where C.courseid = S.courseid) as coursename from student S where courseid=?",[req.body.courseid], function(error, result){
      if(error){
          console.log(error)
          res.status(500).json([])
      }
      else{
          
          res.status(200).json({result:result})
      }
  })
})


module.exports = router