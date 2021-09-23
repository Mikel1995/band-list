import { types } from "mobx-state-tree";
import User from './User'

const Store = {
    User: User.create(),
}

export default Store;