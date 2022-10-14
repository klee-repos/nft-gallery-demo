// external
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/Home";

// context
import User from "./context/User";
// instaniate context object
const user = new User();

const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<Home user={user} />} />
    </Routes>
  </Router>
);

export default routes;
