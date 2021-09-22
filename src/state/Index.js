import { types } from "mobx-state-tree";
import User from './User'

const Store = types.model({
    users: types.array(User)
})

export default Store;