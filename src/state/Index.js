import React from "react";
import { LOGGED_OUT } from "../constants";
import DrawerState from "./ui/DrawerState";
import ModalState from "./ui/ModalState";
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
    tasks: []
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
    }),
    Modal:ModalState.create({
      isOpen: false,
      title: '',
      content: undefined
    })
  }
};

export const RootStoreContext = React.createContext(Store);