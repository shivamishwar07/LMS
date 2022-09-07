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
import Createset from './Createset';
import Questions from './Questions';
import Scheduleexams from './Scheduleexams';

export default function FacultyListItems(props)
{
  const handleClick=(v)=>{
    props.setView(v)
  }
  return(
  <div>
    <ListItem button onClick={()=>handleClick(<Createset setView={props.setView}/>)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Create Set" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<Questions setView={props.setView}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Add Questions" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<Scheduleexams />)} >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="ScheduleExam" />
    </ListItem>
    <ListItem button   >
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Subject" />
    </ListItem>
    <ListItem button >
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Units" />
    </ListItem>
    <ListItem button >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Students" />
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