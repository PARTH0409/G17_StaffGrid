import { Route, Routes, useLocation,Navigate } from 'react-router-dom';
import './App.css'; 
import Login from './components/Login'; 
import RegisterEmp from './components/RegisterEmp';
import Forgotpassword from './components/Forgotpassword'; 
import React from 'react'; 
import Home from "./pages/home.js"
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Attendance from './components/Attendance/Attendance';
import ProfilePage from './pages/profile.js';
import Announcement from './components/Announcement.jsx';
import ProjectPage from './pages/projectPage';
import UploadProject from './components/UploadProject.jsx';
import HomePage from './pages/HomePage.js'
import LeaveForm from './components/leaveform.jsx';
import LeaveApprpval from './components/leaveApproval.jsx';
import LeaveBalance from './components/leaveBalance.jsx';
import People from './components/People.jsx';
import Salary from './components/Salary.jsx';
import ProtectedRoutesLogin from "./components/hook/ProtectedRoutesLogin.js";
import ProtectedRoutesAdmin from "./components/hook/ProtectedRoutesAdmin.js";
import ProtectedRoutesManager from "./components/hook/ProtectedRoutesManager.js";
import ErrorPage from './components/Error404.jsx'

function App() {
  const location = useLocation();
 
  const hideHomeRoutes = ['/api/login', "/api/login/forgotpassword"];

  return (
    <>  
    {!hideHomeRoutes.includes(location.pathname) && <Home />} 
    <Routes>
      <Route exact path="/" element={<Navigate to="/api/login" />} />
      <Route path='/api/login'element = {<Login/>}/>
      <Route path="/api/login/forgotpassword" element={<Forgotpassword />} /> 

      {/* Login User View */}
      <Route element ={<ProtectedRoutesLogin/>}> 
        <Route path="/api/homepage" element={<HomePage/>} /> 
        <Route path="/attendance" element={<Attendance />} />  
        <Route path="/api/profile" element={<ProfilePage/>} /> 
        <Route path="/api/view" element={<Announcement/>} />
        <Route path="/api/project" element={<ProjectPage/>} />
        <Route path="/api/leaveform" element={<LeaveForm/>}/>
        <Route path="/api/leave" element={<LeaveBalance/>}/>
      </Route>
      
      {/* Only Admin  */}
      <Route element ={<ProtectedRoutesAdmin/>}> 
        <Route path='/api/registration'element = {<RegisterEmp/>}/> 
        <Route path="/api/allemployeeview" element={<People/>} /> 
        <Route path="/api/uploadproject" element={<UploadProject/>} />
        <Route path="/api/approve" element={<LeaveApprpval/>}/>
      </Route>

      {/* Only Manager */}
      <Route element ={<ProtectedRoutesManager/>}> 
        <Route path="/api/uploadproject" element={<UploadProject/>} />
      </Route>

      {/* Only HR */}
       <Route path="/salary" element={<Salary/>} /> 
      
      <Route path ='*' element={<ErrorPage/>}/> 
      
    </Routes>
    </>
  );
}

export default App;

