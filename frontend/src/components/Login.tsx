import React from "react";
import { Input } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Login.css";
import Register from "../pages/Register";

function Login() {
  return (
    <Router>
      <div>
        <p>登录</p>
        <Input addonBefore="账号" />
        <br />
        <br />
        <Input type="password" addonBefore="密码" />
        <Link to="/register">没有账号？注册</Link>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Login;
