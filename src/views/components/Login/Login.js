import React, { useContext, useEffect } from "react";
import { Form, Input, Button, Checkbox, Row, Col, notification } from "antd";
import { observer } from "mobx-react-lite";
import { parseErrorMessage } from "../../../utils/Index";
import { PENDING_LOGIN } from "../../../constants";
import { RootStoreContext } from "../../../state/Index";
import { withTranslation } from "react-i18next";
import { t } from "i18next";

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
    openNotification(t('Login.unableToLogin'), errorMessage, "error");
  };

  useEffect(() => {
    if (localStorage.getItem("TOKEN") !== null) {
      history.push("/");
    }
  }, [state]);

  useEffect(() => {
    if (loginFailed) {
      openNotification(
        t('Login.unableToLogin'),
        t('Login.verifyCredencial'),
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
            label={t('common.username')}
            name="email"
            rules={[{ required: true, message: t('Login.usernameRule') }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t('common.password')}
            name="password"
            rules={[
              {
                required: true,
                min: 6,
                message: t('Login.usernamePassword'),
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>{t('Login.rememberMe')}</Checkbox>
          </Form.Item>

          <Form.Item >
            <Button
              loading={state === PENDING_LOGIN}
              type="primary"
              htmlType="submit"
            >
              {t('Login.loginButton')}
            </Button>
            <br />
            {t('common.or')}
            <a
              onClick={() => {
                history.push("/register");
              }}
              href=""
            >
              {t('Login.registerNow')}
            </a>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

Login.propTypes = {};

export default observer(withTranslation()(Login));
