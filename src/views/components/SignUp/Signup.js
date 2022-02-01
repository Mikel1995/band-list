import React, { useContext, useEffect } from "react";
import { Form, Checkbox, Button, Input, Row, Col, Alert } from "antd";
import { RootStoreContext } from "../../../state/Index";
import { observer } from "mobx-react-lite";
import { LOGGED_IN } from "../../../constants";

const Signup = ({history}) => {
  const rootStore = useContext(RootStoreContext);
  const { register, registerError, state } = rootStore.User;

  const onFinish = (values) => {
    register(values);
  };

  const onFailed = () => {
    console.log("does it goes here?");
  };

  const generateAlerts = () => {
    return Object.keys(registerError).map((error)=>(<Alert type="error" message={error} description={registerError[error].message} showIcon closable />))
  };
  
  useEffect(() => {
    console.log(state);
    if (state === LOGGED_IN) {
      history.push("/")
    }
  }, [state]);

  return (
    <Row style={{ paddingTop: "5vh" }}>
      <Col span={12} offset={6}>
        <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFailed}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your Name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: "email", message: "The input is not valid E-mail" },
              { required: true, message: "Please input your E-mail" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your email" }]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            rules={[
              { required: true, message: "Please input your email" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary">
              Register
            </Button>
          </Form.Item>
        </Form>
        {generateAlerts()}
      </Col>
    </Row>
  );
};

Signup.propTypes = {};

export default observer(Signup);
