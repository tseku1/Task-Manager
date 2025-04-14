import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Auth/Login"; 
import SignUp from "./pages/Auth/SignUp";

import Dashboard from "./pages/Admin/Dashboard";
import ManageTask from './pages/Admin/ManageTasks';
import CreateTask from "./pages/Admin/CreateTask";
import ManageUsers from "./pages/Admin/ManageUsers";

import UserDashboard from "./pages/User/UserDashboard";
import MyTasks from './pages/User/MyTasks';
import ViewTaskDetail from "./pages/User/ViewTaskDetail";

import PrivateRoute from './pages/routes/PrivateRoute';


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element = {<Login/>}></Route>
          <Route path='/signUp' element = {<SignUp/>}></Route>

          {/* admin route */}
          <Route element = {<PrivateRoute allowedRoles = {["admin"]}/>}>
            <Route path='/admin/dashboard' element={<Dashboard/>}></Route>
            <Route path='/admin/tasks' element={<ManageTask/>}></Route>
            <Route path='/admin/create-task' element={<CreateTask/>}></Route>
            <Route path='/admin/users' element={<ManageUsers/>}></Route>
          </Route>

          {/* User route */}
          <Route element = {<PrivateRoute allowedRoles = {["admin"]}/>}>
            <Route path='/user/dashboard' element={<UserDashboard/>}></Route>
            <Route path='/user/my-tasks' element={<MyTasks/>}></Route>
            <Route path='/user/task-details/:id' element={<ViewTaskDetail/>}></Route>

          </Route>
           
        </Routes>
      </Router>
    </div>
  )
}

export default App