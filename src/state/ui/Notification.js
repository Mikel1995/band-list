import { types } from "mobx-state-tree";
import { notification } from "antd";

const Notification = types
  .model("Notification", {
    title: types.string,
    description: types.string,
    type: types.enumeration("State", ["success", "info", "warning", "error"]),
    isOpen: false,
  })
  .views((self) => ({
    get isNotificationOpen() {
      return self.isOpen === true;
    },
  }))
  .actions((self) => ({
    openNotification: (title, description, type) => {
      self.title = title;
      self.description = description;
      self.type = type;
      self.isOpen = true;
      notification.open({type, message:title, description});
    },

    closeNotification: () => {
      self.title = "";
      self.description = "";
      self.type = "";
      self.isOpen = false;
    },
  }));

  export default Notification;

