import React from "react";
import { Form, Checkbox, Input } from "antd";
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
      onFinish={prop.onFinish}
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

export default Login;
