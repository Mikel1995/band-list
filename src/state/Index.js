import { types } from "mobx-state-tree";
import React from "react";
import { LOGGED_OUT } from "../constants";
import User from "./User";
const user = types.model({ users: types.array(User) });
const Store = {
  User: User.create({
    username: '',
    photo:'',
    loginFailed: true,
    state: LOGGED_OUT
  })
};

export const RootStoreContext = React.createContext(Store);