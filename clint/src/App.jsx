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

function App() {

  return (
    <>
   
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-up" element={<Signup/>}/>
      <Route path="/sign-in" element={<Signin/>}/>
      <Route element={<PrivetRoute />} >
      <Route path="/profile" element={<Profile/>}/>
      </Route>
      <Route path="/admin-login" element={<Login/>} />
      <Route path="/admin-home" element={<HomeAdmin/>} />
      <Route path="/admin-edit/:id" element={<Edit/>} />
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
