import React, { useState } from "react";
import { Form, Modal, Tabs } from "antd";
import "./index.css";
import Register from "./Register";
import Login from "./Login";
import Bdropdown from "./Bdropdown";
import request from "../../axios/index";
import { conf } from "../../axios/conf";

const { TabPane } = Tabs;

function RLogin() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tabKey, setTabKey] = useState("1");
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState(" ");
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

  const onFinish = (values: any) => {
    var url;
    if (tabKey === "1") {
      url = conf.login;
    } else {
      url = conf.register;
    }
    if (
      !values.ConfirmPassword ||
      (values.ConfirmPassword && values.ConfirmPassword === values.password)
    )
      request
        .get(url, {
          username: values.username,
          password: values.password,
        })
        .then((res: any) => {
          if (res.data === "登陆成功" || res.data === "注册成功") {
            setUserName(values.username.substr(0, 1));
            request
              .get(conf.isAdmin, {
                username: values.username,
                password: values.password,
              })
              .then((res: any) => {
                if (res.data === "是") {
                  setIsAdmin(true);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            alert(res.data);
          }
        })
        .catch((err) => {
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
        <Bdropdown name={userName} isAdmin={isAdmin}></Bdropdown>
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
