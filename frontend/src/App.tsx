import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Camera from "./pages/Camera";

function App() {
  return (
    <>
      <div className="app-bg"></div>
      <Router>
        <Switch>
          <Route exact path="/camera" children={<Camera />} />,
          <Route exact path="/" children={<Home />} />
          <Route path="/Admin" children={<Admin />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
