import React from "react";
import "./Home.css";
import { Input } from "antd";
import Login from "../components/RegisterAndLogin/index";

const { Search } = Input;

const onSearch = (value: any) => console.log(value);

function Home() {
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
          />
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
