import React, { useState } from "react";
import "./Home.css";
import { Button, Input } from "antd";
import Login from "../components/RegisterAndLogin/index";
import { ScanOutlined } from "@ant-design/icons";
import request from "../axios";
import { conf } from "../axios/conf";
import List from "../components/List";

const { Search } = Input;

function Home() {
  const [isSearchData, setIsSearchData] = useState([]);
  const loadData = (name: any) => {
    const item = localStorage.getItem("userData");
    if (item !== null) {
      request.get(conf.find_article_by_imageName, { imageName: name }).then(({ data: res = {} }: any) => {
        if (res.data) {
          setIsSearchData(res.data);
        }
      });
    } else {
      alert("查询失败");
    }
  };
  const onSearch = (value: any) => {
    console.log(value);
    loadData(value);
  };
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
            <Button>
              <ScanOutlined />
            </Button>
          </a>
        </div>
        {isSearchData.length > 0 && <List data={isSearchData} />}
      </div>
    </div>
  );
}

export default Home;
