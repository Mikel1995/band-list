import { types } from "mobx-state-tree";


const User = types.model({
    name: types.string,
    surname: types.string, 
    email:types.string
});

const Store = types.model({
    users: types.array(User)
})
.actions(self => {
    function addUser({name, surname, email}) {
        self.users.push({name, surname, email})
    }

    function deleteUser (user) {
        self.users.splice(self.users.indexOf(user), 1)
    }


    return {
        addUser,
        deleteUser
    }
})

export default Store;