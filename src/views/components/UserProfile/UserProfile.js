import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Space,
  Input,
  Image,
  Upload,
  Modal,
  message,
} from "antd";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../../state/Index";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../../utils/Index";

const UserProfile = () => {
  const rootStore = useContext(RootStoreContext);
  const { name, age, photo, updateProfile, uploadImage } = rootStore.User;

  const uploadConfig = {
    name: "avatars",
    action: "http://localhost:3000/users/me/avatar",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
    },
    onChange: async (info) => {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        setimage(await getBase64(info.file.originFileObj));
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const [image, setimage] = useState(photo);

  const [form] = Form.useForm();

  const { closeDrawer } = rootStore.UI.DrawerState;
  form.setFieldsValue({
    name,
    age,
  });

  useEffect(() => {
    console.log(image);
  }, [image]);

  const onFinish = (values) => {
    updateProfile(values);
  };
  return (
    <>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="password" label="Password">
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="age" label="Age">
              <Input type="number" value={age} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Space>
            <Button onClick={closeDrawer}>Cancel</Button>
            <Button onClick={closeDrawer} type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <Row>
        <Col span={12}>
          <Image width={200} src={image} />
        </Col>
        <Col span={6}>
          <Upload {...uploadConfig}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Col>
      </Row>
    </>
  );
};

UserProfile.propTypes = {};

export default observer(UserProfile);
