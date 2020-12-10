import React, { useState } from "react";
import "./Home.css";
import { Input, Upload, message, Modal, Button, Tooltip } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Login from "../components/Login";

const { Search } = Input;
const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info: any) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const onSearch = (value: any) => console.log(value);

function Home() {
  return (
    <div className="home">
      <img className="home-img" src="history.png" alt="history"></img>
      <MModal />
      <div className="home-search">
        <Search
          placeholder="input search text"
          style={{ width: 500 }}
          onSearch={onSearch}
          enterButton
        />
        <Upload {...props}>
          <Tooltip title="upload image" placement="bottom">
            <Button type="primary" icon={<UploadOutlined />} />
          </Tooltip>
        </Upload>
      </div>
    </div>
  );
}

const MModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="default" onClick={showModal}>
        login
      </Button>
      <Modal
        title="login"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Login />
      </Modal>
    </>
  );
};

export default Home;
