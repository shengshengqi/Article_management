import React, { useState } from "react";
import { Form, Checkbox, Input, Button, Modal, Tabs } from "antd";
import "./Login.css";
import Register from "./Register";

const { TabPane } = Tabs;

function RLogin() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoginKey, setIsLoginKey] = useState(true);
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  function callback(key: String) {
    if (key === "2") {
      setIsLoginKey(false);
    } else {
      setIsLoginKey(true);
    }
  }

  const handleOk = () => {
    if (isLoginKey) {
      loginForm.submit();
    } else {
      registerForm.submit();
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="default" onClick={showModal} size="small">
        这是一个用户名
      </Button>
      <Modal visible={isModalVisible} onCancel={handleCancel} onOk={handleOk}>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="登录" key="1">
            <Login form={loginForm} />
          </TabPane>
          <TabPane tab="注册" key="2">
            <Register form={registerForm} />
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
}

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 8,
  },
};

const Login = (prop: any) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      form={prop.form}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="账号"
        name="username"
        rules={[
          {
            required: true,
            message: "账号不能为空!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: "密码不能为空!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>记住密码</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default RLogin;
