import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import LogIn from "./Pages/Login/LogIn";
import Dashboard from './Components/Dashboard/Dashboard-Main/Dashboard.jsx'
import Course from "./Components/Dashboard/Course/Course";
import Register from "./Pages/Register/Register";
import VideoUpload from "./Pages/Admin/VideoUpload";
import CategorySelection from "./Pages/Login/CategorySelection";
import AdminLogin from "./Pages/Admin/AdminLogin";
import MaterialAdmin from "./Pages/Admin/MaterialAdmin";
import Material from "./Components/Material/Material";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LogIn" element={<LogIn/>}/>
        <Route path="/CategorySelection" element={<CategorySelection/>}/>
        <Route path="/AdminLogin" element={<AdminLogin/>}/>
        <Route path="/MaterialAdmin" element={<MaterialAdmin/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/material' element={<Material/>}/>
        <Route path='/courses' element={<Course/>}/>
        <Route path='/videoupload' element={<VideoUpload/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
