import React from "react";
import { Button } from "antd";
import Card from "../components/Card";
import { data } from "../temp/fakenews";
import Upload from "../components/Upload";

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
      <div>
        <Card
          title={
            <div>
              <b style={{ marginRight: 20 }}>我的文章</b>
              <Upload />
            </div>
          }
          data={data}
          actions={[<Button>删除</Button>]}
        />
      </div>
    );
  }
}

export default Admin;
