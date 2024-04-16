import React from "react"
import { BrowserRouter,Routes,Route  } from "react-router-dom"
import Profile from "../src/user/Pages/Profile"
import Signin from "../src/user/Pages/Signin"
import Signup from "../src/user/Pages/Signup"
import Home from "../src/user/Pages/Home"
import Header from "./Components/Header"
import PrivetRoute from "./Components/PrivetRoute"
import Login from "./admin/Pages/Login"
import HomeAdmin from "./admin/Pages/HomeAdmin"
import Edit from "./admin/Pages/Edit"
import { useSelector } from "react-redux"
import CreateUser from "./admin/Pages/CreateUser"





function App() {
  const isAdminRoute = window.location.pathname.startsWith("/admin");

  const userCheck =() => {
    const {currentUser} = useSelector((state)=> state.user)
    const userLogged = !!currentUser
    return userLogged
  }
  
  const adminCheck = () => {
    const { currentAdmin } = useSelector((state) => state.admin);
    const adminLogin = !!currentAdmin;
    return adminLogin;
  };
  const isAdminLoggedIn = adminCheck();
  const userLog = userCheck()
  //console.log(isAdminLoggedIn);
  // console.log(userLog);
  return (
    <>
   
    <BrowserRouter>
    {!isAdminRoute && <Header />}

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-up" element={userLog? <Home/> :<Signup/>}/>
      <Route path="/sign-in" element={userLog? <Home/> : <Signin/>}/>
      


      <Route element={<PrivetRoute />} >
      <Route path="/profile" element={!userLog? <Signin/> :<Profile/>}/>
      </Route>
      <Route path="/admin-login" element={isAdminLoggedIn? <HomeAdmin/>: <Login/>} />
      <Route path="/admin-home" element={isAdminLoggedIn? <HomeAdmin/> : <Login/>} />
      <Route path="/admin-edit/:id" element={isAdminLoggedIn?<Edit/> : <Login/>} />
      <Route path="/admin-createUser" element={isAdminLoggedIn?<CreateUser/> : <Login/>} />
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
