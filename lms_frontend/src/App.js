import Department from'./Components/Admin/Department';
import DisplayAllDepartment from'./Components/Admin/DisplayAllDepartment';
import DisplayAllFaculty from'./Components/Admin/DisplayAllFaculty';
import Faculty from'./Components/Admin/Faculty';
import Courses from'./Components/Admin/Courses';
import DisplayAllCourses from'./Components/Admin/DisplayAllCourses';
import Student from'./Components/Admin/Student';
import DisplayAllStudents from'./Components/Admin/DisplayAllStudents';
import Subjects from'./Components/Admin/Subjects';
import DisplayAllSubjects from'./Components/Admin/DisplayAllSubjects';
import Units from'./Components/Admin/Units';
import DisplayAllUnits from'./Components/Admin/DisplayAllUnits';
import Adminlogin from'./Components/Admin/Adminlogin';
import Dashboard from './Components/Admin/Dashboard';
import Facultylogin from './Components/Admin/Facultylogin';
import Studentlogin from './Components/Admin/Studentlogin';
import Createset from './Components/Admin/Createset';
import DisplayAllSet from './Components/Admin/DisplayAllSet';
import FacultyDashBoard from './Components/Admin/FacultyDashBoard';
import Questions from './Components/Admin/Questions';
import DisplayAllQuestions from './Components/Admin/DisplayAllQuestions';
import OnlineTest from './Components/ExamManagement/OnlineTest';
import DisplayQuestion from './Components/ExamManagement/DisplayQuestion';
import StudentDashboard from './Components/Admin/StudentDashboard';
import Scheduleexams from './Components/Admin/Scheduleexams';
import EnrollmentTable from './Components/ExamManagement/EnrollmentTable';
import AdmissionForm from './Components/Admin/AdmissionForm';
import{BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { propsToClassKey } from '@mui/styles';
import DisplayAllForm from './Components/Admin/DisplayAllForm';
import Result from './Components/ExamManagement/Result';

function App(props) {
  return (
    <div >
       
      <Router>
        <Routes>
        <Route element={<Department/>} path={"/department"} history={props.history}/>
        <Route element={<DisplayAllDepartment/>} path={"/displayalldepartment"} history={props.history}/>
        <Route element={<Faculty/>} path={"/faculty"} history={props.history}/>
        <Route element={<DisplayAllFaculty/>} path={"/displayallfaculty"} history={props.history}/>
        <Route element={<Courses/>} path={"/courses"} history={props.history}/>
        <Route element={<DisplayAllCourses/>} path={"/displayallcourses"} history={props.history}/>
        <Route element={<Student/>} path={"/student"} history={props.history}/>
        <Route element={<DisplayAllStudents/>} path={"/displayallstudents"} history={props.history}/>
        <Route element={<Subjects/>} path={"/subjects"} history={props.history}/>
        <Route element={<DisplayAllSubjects/>} path={"/displayallsubjects"} history={props.history}/>
        <Route element={<Units/>} path={"/units"} history={props.history}/>
        <Route element={<DisplayAllUnits/>} path={"/displayallunits"} history={props.history}/>
        <Route element={<Adminlogin/>} path={"/adminlogin"} history={props.history}/>
        <Route element={<Dashboard/>} path={"dashboard"} history={props.history}/>
        <Route element={<Facultylogin/>} path={"/facultylogin"} history={props.history}/>
        <Route element={<Studentlogin/>} path={"/studentlogin"} history={props.history}/>
        <Route element={<Createset/>} path={"/createset"} history={props.history}/>
        <Route element={<DisplayAllSet/>} path={"/displayallsets"} history={props.history}/>
         <Route element={<Questions/>} path={"/questions"} history={props.history}/>
         <Route element={<DisplayAllQuestions/>} path={"/displayallquestions"} history={props.history}/>
        <Route element={<FacultyDashBoard/>} path={"/facultydashboard"} history={props.history}/>
        <Route element={<OnlineTest/>} path={"/onlinetest"} history={props.history}/>
        <Route element={<DisplayQuestion/>} path={"/displayquestion"} history={props.history}/>
        <Route element={<StudentDashboard/>} path={"/studentdashboard"} history={props.history}/>
        <Route element={<Scheduleexams/>} path={"/scheduleexam"} history={props.history}/>
        <Route element={<EnrollmentTable/>} path={"/enrollmenttable"} history={props.history}/>
        <Route element={<AdmissionForm/>} path={"/admissionform"} history={props.history}/>
        <Route element={<DisplayAllForm/>} path={"/displayallform"} history={props.history}/>
        <Route element={<Result/>} path={"/result"} history={props.history}/>
        </Routes>
      </Router>
      
      {/* <Department/> */}
    {/* <DisplayAllDepartment/> */}
    {/* <Faculty/>   */}
    {/* <DisplayAllFaculty/> */}
    </div>
  );
}


export default App;
