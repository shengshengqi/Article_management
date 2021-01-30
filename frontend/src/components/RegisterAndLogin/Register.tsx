import React from "react";
import { Form, Input } from "antd";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};

function Register(prop: any) {
  return (
    <Form {...layout} form={prop.form} onFinish={prop.onFinish}>
      <Form.Item
        name="username"
        label="账号"
        rules={[
          {
            required: true,
            message: "请输入邮箱或电话号码",
          },
        ]}
      >
        <Input placeholder="电话|邮箱" />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="Confirm Password"
        label="确认密码"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
    </Form>
  );
}

export default Register;
