import React from "react";
import "./Home.css";
import { Input, Upload, message, Button, Tooltip, Col, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Login from "../components/RegisterAndLogin/index";
import { data } from "../temp/fakenews";
import Card from "../components/Card";

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
      <Login />
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
      <div className="site-card-wrapper home-card">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="最新消息" data={data}></Card>
          </Col>
          <Col span={8}>
            <Card title="精品推荐" data={data}></Card>
          </Col>
          <Col span={8}>
            <Card title="专题知识库" data={data}></Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;
