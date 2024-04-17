import "./styles/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AboutUs from "./components/Aboutus";
import Signup from "./components/Signup";
import Timetable from "./components/Timetable";
import Login from "./components/Login";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../config";
import axios from "axios";
import { IUser } from "./interfaces/user";


function App() {
  const [user, setUser] = useState(null);

  async function fetchUser() {
    const token = localStorage.getItem("token");
    if (token) {
      const resp = await axios.get(`${baseUrl}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(resp.data);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} setUser={setUser} />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/timetable" element={<Timetable />} />
            {/* <Route path="/shop" element={<Shop />} /> */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
