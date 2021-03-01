import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Admin from "./pages/Admin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PDFViewer from "./components/PDFViewer";

function App() {
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
