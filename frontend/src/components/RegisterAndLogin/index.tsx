import React, { useState } from "react";
import { Form, Modal, Tabs } from "antd";
import "./index.css";
import Register from "./Register";
import Login from "./Login";
import Bdropdown from "./Bdropdown";
import request from "../../axios/index";
import { conf } from "../../axios/conf";

const { TabPane } = Tabs;
const data = (function () {
  const item = localStorage.getItem("userData");
  if (item !== null) {
    return JSON.parse(item);
  } else {
    return item;
  }
})();

const getAdmin = () => {
  if (data !== null) {
    return data.isAdmin === "是";
  } else {
    return false;
  }
};
const getUserName = () => {
  if (data !== null) {
    return data.username.substr(0, 1);
  } else {
    return " ";
  }
};

function RLogin() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tabKey, setTabKey] = useState("1");
  const [isAdmin, setIsAdmin] = useState(getAdmin());
  const [userName, setUserName] = useState(getUserName());
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  function callback(key: string) {
    setTabKey(key);
  }

  const handleOk = () => {
    if (tabKey === "1") {
      loginForm.submit();
    } else {
      registerForm.submit();
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const exit = () => {
    localStorage.clear();
    setIsAdmin(false);
    setUserName(" ");
  };

  const onFinish = (values: any) => {
    const confirmPassword = values.ConfirmPassword;
    const password = values.password;
    const username = values.username;
    var url;
    if (tabKey === "1") {
      url = conf.login;
    } else {
      url = conf.register;
    }
    if (!confirmPassword || (confirmPassword && confirmPassword === password))
      request
        .get(url, {
          username: username,
          password: password,
        })
        .then((res: any) => {
          if (res.data.msg === "登录成功" || res.data.msg === "注册成功") {
            setUserName(username.substr(0, 1));
            localStorage.setItem("userData", JSON.stringify(res.data.data));
            if (res.data.data.isAdmin === "是") {
              setIsAdmin(true);
            }
          } else {
            alert(res.data);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
  };

  return (
    <>
      {userName === " " ? (
        <div className="loginTrigger" onClick={showModal}>
          Login
        </div>
      ) : (
        <Bdropdown name={userName} isAdmin={isAdmin} exit={exit}></Bdropdown>
      )}
      <Modal visible={isModalVisible} onCancel={handleCancel} onOk={handleOk}>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="登录" key="1">
            <Login form={loginForm} onFinish={onFinish} />
          </TabPane>
          <TabPane tab="注册" key="2">
            <Register form={registerForm} onFinish={onFinish} />
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
}

export default RLogin;
