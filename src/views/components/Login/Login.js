import React from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { Form, Input, Button, Checkbox, Layout, Row, Col } from "antd";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";

const Login = (props) => {
  const login = async values => {
    const { data } = await api.get("http://localhost:3000/users");
    return data;
  };

  const onFinish = values => {
    login(values);
    console.log("Success:", values);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row style={{paddingTop: '5vh'}}>
      <Col span={12} offset={4}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

Login.propTypes = {};

export default inject('store')(observer(Login));
