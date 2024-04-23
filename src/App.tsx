import "./styles/index.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AboutUs from "./components/Aboutus";
import Signup from "./components/Signup";
import Timetable from "./components/Timetable";
import Login from "./components/Login";
import Shop from "./components/Shop";
import UserProfile from "./components/Profile";
import { baseUrl } from "../config";
import { useLocation } from "react-router-dom";
import ScrollToTopButton from "./components/ScrollToTopButton";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

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
      <ScrollToTop />
      <div className="flex flex-col min-h-screen ">
        <Navbar user={user} setUser={setUser} />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login fetchUser={fetchUser} />} />
            <Route path="/profile/:id" element={<UserProfile user={user} />} />
          </Routes>
        </div>
        <Footer />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;
