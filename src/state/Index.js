import React from "react";
import { LOGGED_OUT } from "../constants";
import DrawerState from "./ui/DrawerState";
import Notification from "./ui/Notification";
import User from "./User";
const Store = {
  User: User.create({
    username: '',
    photo:'',
    name: "",
    age: 0,
    loginFailed: false,
    state: LOGGED_OUT,
    registerError: {},
  }),
  UI: {
    DrawerState: DrawerState.create({
      isVisible: false,
      title: ""
    }),
    Notification: Notification.create({
      description: "",
      title: "",
      isOpen: false,
      type: "info"
    })
  }
};

export const RootStoreContext = React.createContext(Store);