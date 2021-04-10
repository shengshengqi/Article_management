import React, { useState, useRef } from "react";
import { Form, Modal, Button, Upload, message } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import "./Upload.css";
import request from "../axios";
import { conf } from "../axios/conf";

const uploadProps = {
  name: "file",
  // action: `${baseUrl}/upload`,
  customRequest: async (obj: any) => {
    const formdata = new FormData();
    formdata.append("recfile", obj.file);
    const res = await request.upload("/upload", formdata);
    if (res.data) {
      obj.onSuccess(res);
    } else {
      obj.onError(new Error("上传失败"));
    }
  },
  headers: {
    authorization: "authorization-text",
  },
};

function NUpload(props: any) {
  const form = useRef<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.current.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getUid = () => {
    const item = localStorage.getItem("userData");
    if (item !== null) {
      try {
        return JSON.parse(item)?.uid;
      } catch (error) {
        return "";
      }
    } else {
      return "";
    }
  };

  const doCreate = async (val: any) => {
    const submitData = {
      picture: val?.picture?.fileList?.[0]?.response?.data,
      article: (val?.article?.fileList || []).map((item: any) => item?.response?.data),
    };

    const res: any = await request.get(conf.uploding_image, {
      imageName: submitData.picture,
    });
    if (String(res.data?.code) !== "200") {
      message.error("图片上传失败");
    }
    const uid = getUid();
    await Promise.all(
      submitData.article.map((item: string) => {
        return request.post(conf.uploding_article, {
          address: item,
          uid,
          imageId: res.data?.id,
          articleName: item.split(".")[0].split("-")[1],
        });
      })
    );
    setIsModalVisible(false);
    props.onSuccess && props.onSuccess();
  };

  return (
    <>
      <Button icon={<PlusOutlined />} onClick={showModal} shape="circle"></Button>
      <Modal title="上传新的文章" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
        <Form onFinish={doCreate} ref={form} {...{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}>
          <Form.Item label="上传图片" name="picture" rules={[{ required: true, message: "图片是必须上传的哦" }]}>
            <Upload {...{ ...uploadProps, maxCount: 1 }}>
              <Button icon={<UploadOutlined />}>Click to Upload image</Button>
            </Upload>
            {/* <p className="tips">一次只能上传一张图片</p> */}
          </Form.Item>

          <Form.Item label="上传文章" name="article" rules={[{ required: true, message: "图片是必须上传的哦" }]}>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload article</Button>
            </Upload>
            {/* <p className="tips">可以同时上传与该图片对应的多篇文章</p> */}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default NUpload;
