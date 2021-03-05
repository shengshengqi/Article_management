import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PDFViewer from "./components/PDFViewer";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "https://localhost:3001";
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

  return (
    <Router>
      <Switch>
        <Route exact path="/" children={<Home />} />
        <Route path="/Article" children={<PDFViewer />} />
        <Route path="/Admin" children={<Admin />} />
      </Switch>
    </Router>
  );
}

export default App;
