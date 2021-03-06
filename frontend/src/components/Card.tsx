import React from "react";
import { List, Pagination } from "antd";
import { Link } from "react-router-dom";

import './Card.css'

function LCard(props: any) {
  return (
    // <Card>
    <div className="card">
      <List
        className="card-list"
        itemLayout="horizontal"
        dataSource={props.data}
        header={<b>{props.title}</b>}
        // pagination={{
        //   onChange: (page) => {
        //     console.log(page);
        //   },
        //   // pageSize: 4,
        //   responsive: true,
        //   simple: true,
        // }}
        renderItem={(item: String) => (
          <List.Item actions={props.actions}>
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
      <Pagination defaultCurrent={1} total={50} className="card-pagination"/>
    </div>
    // </Card>
  );
}

export default LCard;
