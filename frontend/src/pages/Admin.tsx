import React from "react";
import { Button } from "antd";
import Upload from "../components/Upload";
import request from "../axios/index";
import { conf } from "../axios/conf";
import List from "../components/List";
import "./Admin.css";

class Admin extends React.Component {
  state = {
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

  onDelete = (id: Number) => {
    request.get(conf.delete_article, { id: id }).then((res: any) => {
      if (res.data !== "SUCCESS") {
        alert(res.data);
      } else {
        this.loadData();
      }
    });
  };

  header = () => {
    return (
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
    );
  };

  render() {
    return (
      <div className="admin-container">
        <List data={this.state.data} header={this.header()} onDelete={this.onDelete} />
      </div>
    );
  }
}

export default Admin;
