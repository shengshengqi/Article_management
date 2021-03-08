import React from "react";
import { Button } from "antd";
// import Card from "../components/Card";
import { List } from "antd";
import { Link } from "react-router-dom";
import { data } from "../temp/fakenews";
import Upload from "../components/Upload";
import "./Admin.css";

class Admin extends React.Component {
  state = {
    current: "",
  };

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
          dataSource={data}
          header={
            <b>
              {
                <div>
                  <b style={{ marginRight: 20 }}>我的文章</b>
                  <Upload />
                </div>
              }
            </b>
          }
          renderItem={(item: String) => (
            <List.Item actions={[<Button>删除</Button>]}>
              <List.Item.Meta
                title={
                  <a href="https://ant.design">
                    {
                      <Link to="/Article" style={{ color: "black" }}>
                        {item}
                      </Link>
                    }
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
