import React, { useState } from "react";
import { Form, Button, Modal, Tabs } from "antd";
import "./index.css";
import Register from "./Register";
import Login from "./Login";
import Bdropdown from "./Bdropdown";

const { TabPane } = Tabs;

function RLogin() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tabKey, setTabKey] = useState("1");
  const [isHandleOK, setIsHandleOK] = useState(false);
  const [userName, setUserName] = useState("temp");
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
    setIsHandleOK(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    console.log(values);
    setUserName(values.username.substr(0, 1));
  };

  return (
    <>
      {!isHandleOK ? (
        // <Button type="dashed" onClick={showModal} size="small"  className="loginTrigger">
        <div className="loginTrigger" onClick={showModal}>Login</div>
      ) : (
        // </Button>
        <Bdropdown name={userName}></Bdropdown>
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
