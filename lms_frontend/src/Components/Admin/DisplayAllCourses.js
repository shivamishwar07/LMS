import React from "react";
import { useEffect,useState } from "react";
import { styled,makeStyles } from "@mui/styles";
import { Button,TextField,Grid,Avatar,FormControl,InputLabel,Select,MenuItem } from "@material-ui/core";
import MaterialTable from "@material-table/core"
import { getData, ServerURL, postData, postDataAndImage } from "./FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";



const Input = styled('input')({
    display: 'none',
  });


const useStyles = makeStyles({

    root: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },

    subdiv: {
        display: 'felx',
        margin: 20,
        padding: 20,
        width: 1000,
        background: '#ecf0f1'
    }

});

export default function DisplayAllCourses(props) {
    const classes = useStyles();

    const [listCourses,setListCourses]=useState([])
    const [open,setOpen]=useState(false)
    const [departmentid,setDepartmentid]=useState('')
    const [courseid,setCourseId]=useState('')
    const [coursename,setCourseName]=useState('')
    const [semester,setSemester]=useState('')
    const [feepersemester,setFeepersemester]=useState('')
    const [listDepartment, setListDepartment]=useState([])
    const [icon,setIcon]=useState({bytes:'',file:'/cicon.png'})
    const [tempicon,setTempIcon]=useState({bytes:'',file:''})
    const [btnState,setBtnState]=useState(false)


    const fetchAllCourses = async () => {
        var result = await getData('courses/displayallcourses')
        setListCourses(result.result);
    }

    useEffect(function () {
        fetchAllCourses();
        fetchAllDepartment()
    }, [])

    const fetchAllDepartment=async()=>{
        var result=await getData("department/displayall")
        setListDepartment(result.result)
      }
    
    const handleIconChange=(event)=>{
      setIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
      setBtnState(true)
    }

    const handleDepartmentChange=(event)=>{
        setDepartmentid(event.target.value)
      }
      
      const handlesemesterChange = (event) => {
        setSemester(event.target.value);
      };


  

    const fillDepartment=()=>{
        return listDepartment.map((item)=>{
            return <MenuItem value={item.departmentid}>{item.departmentname}</MenuItem>
        }) 
      }

    const handleClose=()=>{
        setOpen(false)
        }
    
        const handleCancel=()=>{
          setIcon({bytes:'',file:`${tempicon.file}`})
          setBtnState(false)
          }


    const handleEditData=async()=>{
        var body={courseid:courseid,departmentid:departmentid,coursename:coursename,semester:semester,feepersemester:feepersemester}
        var result=await postData("courses/editcourse",body)
        
        setOpen(false)
        if(result.result){
          Swal.fire({
          title: 'LMS',
          text: 'Course edited successfully!',
          imageUrl: '/lms.png',
          icon:'success',
          imageWidth:'300',
          imageWidth:'300'
          })
        }else{
          Swal.fire({
          title: 'LMS',
          text: 'Fail to edit course!',
          imageUrl: '/lms.png',
          icon:'error',
          imageWidth:'300',
          imageWidth:'300'
          })
        }
        fetchAllCourses()
      }
  
      const handleEditIcon=async()=>{
        var formData=new FormData()
        formData.append('courseid',courseid)
        formData.append('icon',icon.bytes)
  
        var result=await postDataAndImage("courses/editicon",formData)
        
        setOpen(false)
        if(result.result){
          Swal.fire({
          title: 'LMS',
          text: 'Icon edited successfully!',
          imageUrl: '/lms.png',
          icon:'success',
          imageWidth:'300',
          imageWidth:'300'
          })
        }else{
          Swal.fire({
          title: 'LMS',
          text: 'Fail to edit icon!',
          imageUrl: '/lms.png',
          icon:'error',
          imageWidth:'300',
          imageWidth:'300'
          })
        }
        setBtnState(false)
        fetchAllCourses()
      }
  
      const handleDeleteData=async(courseid,icon)=>{
        
       
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
            var body={courseid:courseid,icon:icon}
            var result=await postData("courses/deletecourse",body)
  
            if(result.result){ 
            Swal.fire(
              'Deleted!',
              'Course has been deleted.',
              'success'
            )
            }else{
              Swal.fire(
                'Deleted!',
                'Failed to delete Course.',
                'error'
              )
            }
          }
          fetchAllCourses()
        })
      }
  
      const handleEdit=(rowData)=>{
        setCourseId(rowData.courseid)
        setDepartmentid(rowData.departmentid)
        setCourseName(rowData.coursename)
        setSemester(rowData.semester)
        setFeepersemester(rowData.feepersemester)
        setIcon({bytes:'',file:`${ServerURL}/images/${rowData.icon}`})
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
               Course Interface
           </div>
           </Grid>
           <Grid item xs={6}>
           <FormControl variant='outlined' fullWidth>
              <InputLabel id="dep">Department</InputLabel>
                <Select 
                  labelId="dep"
                  id="dep"
                  value={departmentid}
                  label="Department"
                  onChange={handleDepartmentChange}
                  >
                {fillDepartment()}
                </Select>
            </FormControl>
            </Grid>

           <Grid item xs={6}>
             <TextField value={coursename} onChange={(event)=>setCourseName(event.target.value)} fullWidth label="Course Name" variant="outlined"/ >
            </Grid>

            <Grid item xs={6}>
            <FormControl variant='outlined' fullWidth>
              <InputLabel id="dep">No of Semester</InputLabel>
                <Select 
                  labelId="semester"
                  id="semester"
                  value={semester}
                  label="No of Semester"
                  onChange={handlesemesterChange}
                  >
                <MenuItem value={1}>One</MenuItem>
                <MenuItem value={2}>Two</MenuItem>
                <MenuItem value={3}>Three</MenuItem>
                <MenuItem value={4}>Four</MenuItem>
                <MenuItem value={5}>Five</MenuItem>
                <MenuItem value={6}>Six</MenuItem>
                <MenuItem value={7}>Seven</MenuItem>
                <MenuItem value={8}>Eight</MenuItem>
                <MenuItem value={9}>Nine</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                </Select>
            </FormControl>
            </Grid>

            <Grid item xs={6}>
             <TextField value={feepersemester} onChange={(event)=>setFeepersemester(event.target.value)} fullWidth label="Fee per Semester" variant="outlined"/ >
            </Grid>

            <Grid item xs={6}>
            <label htmlFor="contained-button-file">
        <Input onChange={(event)=>handleIconChange(event)}  accept="image/*" id="contained-button-file" multiple type="file" />
        <Button fullWidth variant="contained" component="span">
          Upload
        </Button>
      </label>
            
            </Grid>
         <Grid item xs={6} style={{display:'flex',alignItem:'center',justifyContent:'center'}}>
         {btnState?<><Button onClick={()=>handleEditIcon()}>Save</Button><Button onClick={()=>handleCancel()}>Cancel</Button></>:<></>}
         <Avatar
  alt="Upload Image"
  src={icon.file}
  variant="square"
  sx={{ width: 56, height: 56 }}
/>
           </Grid>   


       </Grid>
          </DialogContent>
          <DialogActions>
            <Button style={{fontWeight:'bold'}} onClick={()=>handleEditData()}>Edit</Button>
            <Button style={{fontWeight:'bold'}} onClick={handleClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        )
      }



  

    function displayAll() {
        return (
            <MaterialTable
                title="List of Courses"
                columns={[
                    { title: 'Course Id', field: 'courseid' },
                    { title: 'Course Name', field: 'coursename' },
                    { title: 'Department', field: 'departmentname' },
                    { title: 'Semester', field: 'semester' },
                    { title: 'Semester Fee', field: 'feepersemester' },
                    { title: 'Icon', field: 'icon', render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 50 }} /> },

                ]}
                data={listCourses}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Course',
                          onClick: (event, rowData) => { handleEdit(rowData) }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Course',
                        onClick: (event, rowData) => { handleDeleteData(rowData.courseid,rowData.icon) }
                    }
                ]}
            />
            )
    }

    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                {displayAll()}
                {showDialog()}
            </div>
        </div>
    )
}