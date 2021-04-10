import React from "react";
import { Button } from "antd";
// import Card from "../components/Card";
import { List } from "antd";
import { baseUrl } from "../axios/index";

class AList extends React.Component<{
  data: any;
  header?: any;
  onDelete?: any;
}> {
  render() {
    const { data, header, onDelete } = this.props;
    return (
      <div className="admin-container">
        <List
          className="card-list"
          itemLayout="horizontal"
          dataSource={data}
          header={header ? header : null}
          renderItem={(item: any) => (
            <List.Item actions={onDelete ? [<Button onClick={() => onDelete(item.articleId)}>删除</Button>] : undefined}>
              <List.Item.Meta
                title={
                  <a href={baseUrl + "/" + item.address} target="_blank" rel="noreferrer">
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

export default AList;
