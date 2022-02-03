import { notification } from "antd";

const showNotification = (type, message, description) => {
  console.log('goes here');
  return notification[type]({
    message,
    description,
    placement: 'topRight'
  });
};

export default showNotification;
