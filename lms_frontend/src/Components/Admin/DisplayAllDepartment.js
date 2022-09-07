import React ,{useEffect,useState} from "react"
import MaterialTable from "@material-table/core"

import {styled,makeStyles } from '@mui/styles';
import { Button,Grid,TextField,Avatar } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { ServerURL,postDataAndImage,getData,postData } from "./FetchNodeServices";
import Swal  from "sweetalert2";
const Input = styled('input')({
  display: 'none',
});
const useStyles = makeStyles({
    root: {
       display:'flex',
       alignContent:'center',
       justifyContent:'center'  
  
  
    },
    subdiv:{

        background:'#ecf0f1',
        padding:20,
        width:1000,
        marginTop:30,
    },
   
  });


export default function DisplayAllDepartment(props){
    var classes=useStyles()
   const [listDepartment,setListDepartment]=useState([])
   const [open,setOpen]=useState(false)
   const [depid,setDepId]=useState('')
   const [depname,setDepName]=useState('')
   const [depicon,setDepIcon]=useState({bytes:'',file:'/depicon.png'})
   const [tempicon,setTempIcon]=useState({bytes:'',file:''})
   const [btnState,setBtnState]=useState(false)

   const fetchAllDepartment=async()=>{
       var result=await getData("department/displayall")
       setListDepartment(result.result) 
   }

   const handleIconChange=(event)=>{
    setDepIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
  setBtnState(true)
  
   }
  
    useEffect(function(){

    fetchAllDepartment()

    },[])

const handleClose=()=>{
 setOpen(false)
 
}


const handleCancel=(depid)=>{
 
  setDepIcon({bytes:'',file:`${tempicon.file}`})
  setBtnState(false)
 }
 
 const handleDeleteData=async(depid,icon)=>{
 

  
   
   Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async(result) => {
    if (result.isConfirmed) {

      var body={departmentid:depid,icon:icon}
      var result=await postData("department/deletedepartment",body)
      if(result.result)
      Swal.fire(
        'Deleted!',
        'Department has been deleted.',
        'success'
      )
    }
    else 
    Swal.fire(
      'Deleted!',
      'Fail to Delete Department .',
      'error'
    )
    fetchAllDepartment()
  })


   
  
  
   }
  




 const handleEditData=async()=>{
 

var body={departmentname:depname,departmentid:depid}
 var result=await postData("department/editdepartment",body)
 
 setOpen(false)
 if(result.result)
 {
  Swal.fire({
    title: "LMS",
    text: 'Department Edited Successfully',
    imageUrl: '/lms.png',
    imageWidth:'150',
    imageHeight:'150',
    icon:'success'
      })
 }
else
{Swal.fire({
  title: "LMS",
  text: 'Fail to Edit Department',
  imageUrl: '/lms.png',
  imageWidth:'150',
  imageHeight:'150',
  icon:'error'
    })
    
  
  }
  fetchAllDepartment()

 }

 const handleEditIcon=async()=>{
 
  var formData=new FormData()
  formData.append('departmentid',depid)  
  formData.append('icon',depicon.bytes)



 var result=await postDataAndImage("department/editicon",formData)
 
 setOpen(false)
 if(result.result)
 {
  Swal.fire({
    title: "LMS",
    text: 'Icon Edited Successfully',
    imageUrl: '/lms.png',
    imageWidth:'150',
    imageHeight:'150',
    icon:'success'
      })
 }
else
{Swal.fire({
  title: "LMS",
  text: 'Fail to Edit Icon',
  imageUrl: '/lms.png',
  imageWidth:'150',
  imageHeight:'150',
  icon:'error'
    })
}
setBtnState(false)
fetchAllDepartment()


 }



const handleEdit=(rowData)=>{
  setDepId(rowData.departmentid)
  setDepName(rowData.departmentname)
  setDepIcon({bytes:'',file:`${ServerURL}/images/${rowData.icon}`})
  setTempIcon({bytes:'',file:`${ServerURL}/images/${rowData.icon}`})
  setOpen(true)
}

    const showDialog=()=>{
   return(
<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
        <Grid container spacing={2}>
       <Grid item xs={12}>
           <div style={{display:'flex',alignItems:'center', fontSize:20,fontWeight:'bold',letterSpacing:1}}>
             <img src="/department.png" style={{width:40,hieght:40}} />
               Department Interface
           </div>
           </Grid>
           <Grid item xs={12}>
             <TextField value={depname} onChange={(event)=>setDepName(event.target.value)} fullWidth label="Department Name" variant="outlined"/ >
            
            </Grid>
            <Grid item xs={6}>
            <label htmlFor="contained-button-file">
        <Input   onChange={(event)=>handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
        <Button fullWidth variant="contained" component="span">
          Edit Icon
        </Button>
      </label>
            
            </Grid>
         <Grid item xs={6} style={{display:'flex',alignItem:'center',justifyContent:'center'}}>
           {btnState?<><Button onClick={()=>handleEditIcon()} >Save</Button><Button onClick={()=>handleCancel()} >Cancel</Button></>:<></>}
         <Avatar
          alt="Upload Image"
          src={depicon.file}
          variant="rounded"
          sx={{ width: 56, height: 56 }}
           />
           </Grid>   

       </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}  onClick={()=>handleEditData()} >Edit</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

   )

   }






    function displayAll() {
        return (
          <MaterialTable
            title="List of Departments"
            columns={[
              { title: 'Department Id', field: 'departmentid' },
              { title: 'Department', field: 'departmentname' },
              { title: 'Icon', field: 'icon',
              render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{width: 50, borderRadius: '50%'}}/>
            },
              
            ]}
            data={listDepartment}     
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Department ',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Department ',
                onClick: (event, rowData) => handleDeleteData(rowData.departmentid,rowData.icon)
              }
            ]}
          />
        )
      }


   return(
     <div className={classes.root}>
         <div className={classes.subdiv}>
         {displayAll()}
         {showDialog()}
         </div>
     </div>

   )

}


    