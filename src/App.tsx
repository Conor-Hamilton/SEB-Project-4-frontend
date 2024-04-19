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
import Kidsbjj from "./components/Kidsbjj";

function App() {
  const [user, setUser] = useState(null);

  async function fetchUser() {
    const token = localStorage.getItem("token");
    if (token) {
      const resp = await axios.get("http://localhost:4000/api/user", {
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
            <Route path="/kidsbjj" element={<Kidsbjj />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/timetable" element={<Timetable />} />
            {/* <Route path="/shop" element={<Shop />} /> */}
            <Route path="/login" element={<Login fetchUser={fetchUser} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
