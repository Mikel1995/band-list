import React, { useContext, useEffect } from "react";
import { Form, Input, Button, Checkbox, Row, Col, notification } from "antd";
import { observer } from "mobx-react-lite";
import { parseErrorMessage } from "../../../utils/Index";
import { PENDING_LOGIN } from "../../../constants";
import { RootStoreContext } from "../../../state/Index";

const Login = (props) => {
  const rootStore = useContext(RootStoreContext);
  const { history } = props;
  const { state, login, loginFailed } = rootStore.User;
  const { openNotification } = rootStore.UI.Notification;

  const onFinish = (values) => {
    login(values);
  };

  const onFinishFailed = (errorInfo) => {
    const errorMessage = parseErrorMessage(errorInfo);
    openNotification("Unable To Login", errorMessage, "error");
  };

  useEffect(() => {
    if (localStorage.getItem("TOKEN") !== null) {
      history.push("/");
    }
  }, [state]);

  useEffect(() => {
    if (loginFailed) {
      openNotification(
        "Unable To Login",
        "Please verify you credencials",
        "error"
      );
    }
  }, [loginFailed]);

  return (
    <Row style={{ paddingTop: "5vh" }}>
      <Col span={12} offset={6}>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                min: 6,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item >
            <Button
              loading={state === PENDING_LOGIN}
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
            <br />
            Or{" "}
            <a
              onClick={() => {
                history.push("/register");
              }}
              href=""
            >
              register now!
            </a>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

Login.propTypes = {};

export default observer(Login);
