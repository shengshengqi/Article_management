import React from "react";
import { Card, List } from "antd";
import { Link } from "react-router-dom";

function LCard(props: any) {
  return (
    <Card>
      <List
        itemLayout="horizontal"
        dataSource={props.data}
        header={<b>{props.title}</b>}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          // pageSize: 4,
          responsive: true,
          simple: true,
        }}
        renderItem={(item: String) => (
          <List.Item>
            <List.Item.Meta
              title={
                <a href="https://ant.design">
                  {<Link to="/Article">{item}</Link>}
                </a>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
}

export default LCard;
