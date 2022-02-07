import { types } from "mobx-state-tree";

const ModalState = types
  .model("ModalState", {
    isOpen: types.boolean,
    title: types.string,
  })
  .actions((self) => ({
    openModal: (title) => {
      self.isOpen = true;
      self.title = title;
    },
    closeModal: () => {
      self.isOpen = false;
      self.title = "";
    },
  }));

  export default ModalState;
