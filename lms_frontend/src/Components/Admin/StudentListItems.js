import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Department from "./Department";
import Faculty from "./Faculty";
import Courses from "./Courses";
import Student from "./Student";
export default function StudentListItems(props)
{
  const handleClick=(v)=>{
    props.setView(v)
  }
  return(
  <div>
    <ListItem button onClick={()=>handleClick(<Department setView={props.setView}/>)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="TimeTable" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<Faculty setView={props.setView}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Result" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<Courses  setView={props.setView}/>)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Attendance" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<Student  setView={props.setView}/>)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary=" Student Proflie" />
    </ListItem>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
)
}