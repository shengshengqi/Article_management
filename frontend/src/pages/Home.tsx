import React from "react";
import "./Home.css";
import { Button, Input } from "antd";
import Login from "../components/RegisterAndLogin/index";
import { ScanOutlined } from "@ant-design/icons";

const { Search } = Input;

const onSearch = (value: any) => console.log(value);

function Home() {
  const goToScan = () => {};
  return (
    <div className="container">
      <div className="home-container">
        <div className="home-action">
          <span className="home-action__title">History</span>
          <Login />
        </div>
        <div className="home-search">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
            style={{
              width: "auto",
              flex: 1,
            }}
          />
          <a rel="noopener noreferrer" href="/camera">
            <Button onClick={goToScan}>
              <ScanOutlined />
            </Button>
          </a>
        </div>
      </div>

      {/* <div className="site-card-wrapper home-card">
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
      </div> */}
    </div>
  );
}

export default Home;
