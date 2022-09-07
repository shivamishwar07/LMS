var express = require('express');
var router = express.Router();
var pool=require("./pool")
var upload=require("./multer")
var fs=require('fs');
/* GET home page. */

router.get("/displayall",function(req,res){

  pool.query("select * from department",function(error,result){
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

router.post('/editdepartment', function(req, res, next) {

  pool.query("update department set departmentname=? where departmentid=?",[req.body.departmentname,req.body.departmentid],function(error,result){

    if(error)
    { console.log(error)
      res.status(500).json({result:false,msg:'Server Error'})
    }
    else
    {
     res.status(200).json({result:true,msg:'Edited'})
    }
 


  })

})


router.post('/editicon',upload.single("ic on"), function(req, res, next) {

  pool.query("update department set icon=? where departmentid=?",[req.filename,req.body.departmentid],function(error,result){

    if(error)
    { console.log(error)
      res.status(500).json({result:false,msg:'Server Error'})
    }
    else
    {
     res.status(200).json({result:true,msg:'Edited'})
    }
 


  })

})

router.post('/deletedepartment', function(req, res, next) {

  pool.query("delete from  department  where departmentid=?",[req.body.departmentid],function(error,result){

    if(error)
    { console.log(error)
      res.status(500).json({result:false,msg:'Server Error'})
    }
    else
    {
     res.status(200).json({result:true,msg:'Deleted'})
     fs.unlink('d:/REACTAND NODE PROJECTS/lms_backend/public/'+req.body.icon,(err)=>{
       console.log(err)
     })
    }
 


  })

})






router.post('/adddepartment',upload.single("icon"), function(req, res, next) {
  console.log("FILE:",req.body)
  console.log("FILE:",req.file)
  pool.query("insert into department (departmentname,icon) values(?,?)",[req.body.departmentname,req.filename],function(error,result){
   if(error)
   { console.log(error)
     res.status(500).json({result:false,msg:'Server Error'})
   }
   else
   {
    res.status(200).json({result:true,msg:'Submitted'})
   }

  })
});

module.exports = router;
