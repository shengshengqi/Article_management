import React from "react";
import { Button } from "antd";
// import Card from "../components/Card";
import { List } from "antd";
import Upload from "../components/Upload";
import request from "../axios/index";
import { conf } from "../axios/conf";
import "./Admin.css";

class Admin extends React.Component {
  state = {
    current: "",
    data: [],
  };

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const item = localStorage.getItem("userData");
    if (item !== null) {
      request.get(conf.article_list, { id: JSON.parse(item).uid }).then((res: any) => {
        this.setState({ data: res.data });
      });
    } else {
      alert("请先登录");
    }
  }

  handleClick = (e: any) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  render() {
    return (
      <div className="admin-container">
        <List
          className="card-list"
          itemLayout="horizontal"
          dataSource={this.state.data}
          header={
            <b>
              {
                <div>
                  <b style={{ marginRight: 20 }}>我的文章</b>
                  <Upload
                    onSuccess={() => {
                      this.loadData();
                    }}
                  />
                </div>
              }
            </b>
          }
          renderItem={(item: any) => (
            <List.Item actions={[<Button>删除</Button>]}>
              <List.Item.Meta
                title={
                  <a href={item.address} target="_blank">
                    {item.articleName}
                  </a>
                }
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Admin;
