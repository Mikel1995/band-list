import { types } from "mobx-state-tree";

const DrawerState = types
  .model("DrawerState", {
    isVisible: types.boolean,
    title: types.string,
  })
  .actions((self) => ({
    openDrawer: () => {
      console.log('goes here');
      self.isVisible = true;
    },
    closeDrawer: () => {
      self.isVisible = false;
    },
  }));

  export default DrawerState;