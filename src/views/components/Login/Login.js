import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Checkbox, Layout, Row, Col } from "antd";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import { LOGGED_IN, PENDING_LOGIN } from "../../../constants";
import { RootStoreContext } from "../../../state/Index";

const Login = props => {

  const rootStore = useContext(RootStoreContext);
  const { history } = props;
  const { state, login } = rootStore.User;

  const onFinish = values => {
    login(values);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (state === LOGGED_IN) {
      history.push('/');
    }
  }, [state])

  return (
    <Row style={{ paddingTop: "5vh" }}>
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
            <Button
              loading={state === PENDING_LOGIN}
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

Login.propTypes = {};

export default (observer(Login));
