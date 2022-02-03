import React from "react";
import DrawerLayout from "../../common/DrawerLayout";
import UserProfile from "../UserProfile/UserProfile";
import { observer } from "mobx-react";

const Home = (props) => {
  return (
    <div>
      {`User List `}
      <DrawerLayout content={<UserProfile />} />
    </div>
  );
};

Home.propTypes = {};

export default observer(Home);
