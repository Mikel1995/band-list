import React, { useContext, useState } from "react";
import { Drawer } from "antd";
import { RootStoreContext } from "../../state/Index";
import { observer } from "mobx-react";
const DrawerLayout = ({ content }) => {

  const rootStore = useContext(RootStoreContext);
  const {isVisible, closeDrawer} = rootStore.UI.DrawerState;

  return <Drawer width={700} onClose={closeDrawer} visible={isVisible}>{content}</Drawer>;
};

DrawerLayout.propTypes = {};

export default observer(DrawerLayout);
