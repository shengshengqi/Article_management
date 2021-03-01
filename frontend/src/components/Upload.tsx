import React, { useState } from "react";
import { Modal, Button, Upload, message } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import "./Upload.css";

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

function NUpload() {
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
      <Button
        icon={<PlusOutlined />}
        onClick={showModal}
        shape="circle"
      ></Button>
      <Modal
        title="上传新的文章"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload image</Button>
        </Upload>
        <p className="tips">一次只能上传一张图片</p>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload article</Button>
        </Upload>
        <p className="tips">可以同时上传与该图片对应的多篇文章</p>
      </Modal>
    </>
  );
}

export default NUpload;
