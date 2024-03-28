import React from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Profile from "./Pages/Profile"
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"
import Home from "./Pages/Home"
import Header from "./Components/Header"
function App() {

  return (
    <>
   
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-up" element={<Signup/>}/>
      <Route path="/sign-in" element={<Signin/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
