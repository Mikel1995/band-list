import React, { useEffect, useState } from "react";
import DrawerLayout from "../../common/DrawerLayout";
import UserProfile from "../UserProfile/UserProfile";
import { observer } from "mobx-react";
import { Image, Table } from "antd";
import UserApi from "../../../api/User";

const Home = (props) => {

  const [userList, setuserList] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: 'name',
    },
    {
      title: "Email",
      dataIndex: 'email'
    },
    {
      title: "Age",
      dataIndex: 'age'
    },
    {
      title: "Photo",
      dataIndex: 'photo',
      render : (text, record, index) => {
        return <Image width={20} height={20} src={record.photo} />
      } 
    }
  ]

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    const {data = []} = await UserApi.getUserList();
    const users = data.map((user)=>({key: user._id, name: user.name, email: user.email, age: user.age, photo: user.avatar ?  `data:image/png;base64, ${user.avatar}` : "https://picsum.photos/200/300"}))
    setuserList(users);
  }

  return (
    <div>
      <Table columns={columns} dataSource={userList} size="small" />
      <DrawerLayout content={<UserProfile />} />
    </div>
  );
};

Home.propTypes = {};

export default observer(Home);
