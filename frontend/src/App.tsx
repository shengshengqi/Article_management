import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Article from "./pages/Article";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" children={<Home />} />
        <Route path="/Article" children={<Article />} />
      </Switch>
    </Router>
  );
}

export default App;
