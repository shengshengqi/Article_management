import React from "react";
import { Menu, Dropdown, Button } from "antd";

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        我的信息
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="/Admin">
        管理员页
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        退出登录
      </a>
    </Menu.Item>
  </Menu>
);

const Bdropdown = (prop: any) => {
  return (
    <Dropdown overlay={menu} placement="bottomCenter">
      <Button type="default" size="small" shape="circle">
        {prop.name}
      </Button>
    </Dropdown>
  );
};
export default Bdropdown;
