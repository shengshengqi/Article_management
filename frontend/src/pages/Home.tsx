import React from "react";
import "./Home.css";
import { Input, message, Col, Row } from "antd";
import Login from "../components/RegisterAndLogin/index";
import { data } from "../temp/fakenews";
import Card from "../components/Card";

const { Search } = Input;

const onSearch = (value: any) => console.log(value);

function Home() {
  return (
    <div className="home">
      <div>
        <img className="home-img" src="history.png" alt="history"></img>
        <Login />
      </div>
      <div className="home-search">
        <Search
          placeholder="input search text"
          style={{ width: 500 }}
          onSearch={onSearch}
          enterButton
        />
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
