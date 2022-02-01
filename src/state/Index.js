import { types } from "mobx-state-tree";
import React from "react";
import { LOGGED_OUT } from "../constants";
import User from "./User";
import Notification from "./common/Notification";
const user = types.model({ users: types.array(User) });
const Store = {
  User: User.create({
    username: '',
    photo:'',
    loginFailed: false,
    state: LOGGED_OUT
  }),
  Notification: Notification.create({
    description: "",
    title: "",
    isOpen: false,
    type: "info"
  })
};

export const RootStoreContext = React.createContext(Store);