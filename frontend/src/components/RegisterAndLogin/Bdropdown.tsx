import React from "react";
import { Menu, Dropdown, Button } from "antd";

const DropMenu = (isAdmin: Boolean, exit: any) => {
  return (
    <Menu>
      {isAdmin && (
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="/Admin">
            管理员页
          </a>
        </Menu.Item>
      )}
      <Menu.Item onClick={exit}>退出登录</Menu.Item>
    </Menu>
  );
};

const Bdropdown = (prop: any) => {
  return (
    <Dropdown
      overlay={DropMenu(prop.isAdmin, prop.exit)}
      placement="bottomCenter"
    >
      <Button type="default" size="small" shape="circle">
        {prop.name}
      </Button>
    </Dropdown>
  );
};
export default Bdropdown;
