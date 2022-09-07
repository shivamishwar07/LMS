var express = require('express');
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");
router.post('/addfaculty', upload.single("picture"), function (req, res, next) {
  console.log("FILE:", req.body)
  console.log("FILE:", req.file)
  pool.query("insert into faculties(Firstname,Lastname,Fathername,gender,dob,qualification,department,address,state,city,mobileno,alternatemobileno,emailid,designation,password,picture) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.Firstname, req.body.Lastname, req.body.Fathername, req.body.gender, req.body.dob, req.body.qualification, req.body.department, req.body.address, req.body.state, req.body.city, req.body.mobileno, req.body.alternatemobileno, req.body.emailid, req.body.designation, req.body.password, req.filename], function (error, result) {
    if (error) {
      console.log(error)
      res.status(500).json({ result: false, msg: 'Server error..' })
    }
    else {
      console.log(result)
      res.status(200).json({ result: true, msg: 'Submitted' })
    }

  })
});

router.get('/DisplayAll', function (req, res) {
  pool.query("select F.*,(select D.departmentname from department D where D.departmentid= F.department) as departmentname,(select S.statename from states S where S.stateid= F.state ) as statename,(select C.cityname from cities C where C.cityid= F.city ) as cityname from faculties F", function (error, result) {
    if (error) {
      // console.log(error)
      res.status(500).json({ result: [] })
    }
    else {
      res.status(200).json({ result: result })
    }


  });


});
router.post('/editfaculty', function (req, res, next) {
  console.log(req.body)
  pool.query("update faculties set Firstname=?,Lastname=?,Fathername=?,gender=?,dob=?,qualification=?,department=?,address=?,state=?,city=?,mobileno=?,alternatemobileno=?,emailid=?,password=?,designation=?  where facultyid=?", [req.body.Firstname, req.body.facultyid, req.body.Lastname, req.body.Fathername, req.body.gender, req.body.dob, req.body.qualification, req.body.department, req.body.address, req.body.state, req.body.city, req.body.mobileno, req.body.alternatemobileno, req.body.emailid, req.body.password, req.body.designation], function (error, result) {

    if (error) {
      console.log(error)
      res.status(500).json({ result: false, msg: 'Server Error' })
    }
    else {
      res.status(200).json({ result: true, msg: 'Edited' })
    }



  })

})
router.post('/editicon', upload.single("icon"), function (req, res, next) {

  pool.query("update faculties set picture=? where facultyid=?", [req.filename, req.body.facultyid], function (error, result) {

    if (error) {
      console.log(error)
      res.status(500).json({ result: false, msg: 'Server Error' })
    }
    else {
      res.status(200).json({ result: true, msg: 'Edited' })
    }



  })

})

router.post('/deletefaculty', function (req, res, next) {

  pool.query("delete from  faculties  where facultyid=?", [req.body.facultyid], function (error, result) {

    if (error) {
      console.log(error)
      res.status(500).json({ result: false, msg: 'Server Error' })
    }
    else {
      res.status(200).json({ result: true, msg: 'Deleted' })

    }



  })

})
router.post('/checklogin', function (req, res, next) {
  pool.query("select F.*,(select D.departmentname from department D where D.departmentid=F.department) as departmentname from faculties F where F.emailid=? and F.password=?", [req.body.emailid, req.body.password], function (error, result) {

    if (error) {
      console.log(error)
      res.status(500).json({ result: false })
    }
    else {
      if (result.length == 0) {
        res.status(200).json({ result: false })
      }
      else {
        res.status(200).json({ result: true,data:result[0] })
      }

    }
  })

})

router.post('/getfacultydepartment', function (req, res, next) {
  pool.query("select F.*,(select D.departmentname from department D where D.departmentid=F.departmentid) as departmentname from faculties F where F.facultyid=?", [req.body.facultyid], function (error, result) {

    if (error) {
      res.status(500).json({ result: false })
    }
    else {
      if (result.length == 0) {
        res.status(200).json({ result: false })
      }
      else {
        res.status(200).json({ result: true,data:result[0] })
      }

    }
  })

})


module.exports = router