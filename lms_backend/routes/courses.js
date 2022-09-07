var express = require("Express");
var router = express.Router();
const pool = require("./pool");
const upload = require("./multer");

router.post('/addCourse', upload.single('icon'),function(req,res){
    pool.query('insert into course (departmentid, coursename, semester, feepersemester, icon) values (?,?,?,?,?)', [req.body.departmentid, req.body.coursename, req.body.semester, req.body.feepersemester, req.filename], function(error, result){
        if(error){
            res.status(500).json({result:false, msg:'Server Error!'})
        }
        else{
            res.status(200).json({result:true, msg:'Submitted Sucessfully'})
        }
    })
})

router.get("/displayallcourses",function(req,res){
    pool.query("select C.*,(select D.departmentname from department D where D.departmentid=C.departmentid) as departmentname from course C",function(error,result){
      if(error){
        console.log(error)
        res.status(500).json({result:[]})
      }else{
        console.log(result)
        res.status(200).json({result:result})
      }
    })
  })



  router.post("/displaycoursebydepartmentid",function(req,res){
    console.log(req.body)
    pool.query("select C.*, (select D.departmentname from department D where D.departmentid=C.departmentid) as department from course C where C.departmentid=?",[req.body.departmentid],function(error,result){
      if(error){
        console.log(error)
        res.status(500).json({result:[]})
      }else{
        console.log(result)
        res.status(200).json({result:result})
      }
    })
  })


router.post('/getsemesterbycourseid', function(req,res){
    console.log(req.body)
    pool.query('select *  from course  where courseid=?',[req.body.courseid], function(error, result){
        if(error){
            
            res.status(500).json([])
        }
        else{
            
            res.status(200).json({result:result})
        }
    })
})

router.post('/getenrollmentbycourseid', function(req,res){
  console.log(req.body)
  pool.query('select *  from course  where courseid=?',[req.body.courseid], function(error, result){
      if(error){
          
          res.status(500).json([])
      }
      else{
          
          res.status(200).json({result:result})
      }
  })
})




router.post('/editcourse',function(req,res){
    pool.query("update course set departmentid=?, coursename=?, semester=?,feepersemester=? where courseid=?",[req.body.departmentid, req.body.coursename, req.body.semester, req.body.feepersemester, req.body.courseid], function(error,result){
      if(error){
        res.status(500).json({result:false,msg:'Server Error'})
      }else{
        res.status(200).json({result:true,msg:'Edited'})
      }
    })
  })

  router.post('/deletecourse',function(req,res){
    pool.query("delete from course where courseid=?",[req.body.courseid],function(error,result){
      if(error){
        res.status(500).json({result:false,msg:'Server Error'})
      }else{
        res.status(200).json({result:true,msg:'Deleted'})
      }
    })
  })





module.exports = router;



