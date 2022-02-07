import React, { useContext, useEffect } from "react";
import { Table, Switch } from "antd";
import { RootStoreContext } from "../../../state/Index";
import { observer } from "mobx-react-lite";

const TaskList = (props) => {
  const rootStore = useContext(RootStoreContext);

  const { tasks, updateTask } = rootStore.User;

  const handleChangeSwich = (value, taskId) => {
    updateTask(taskId, { completed: value });
  };

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Is Completed",
      dataIndex: "completed",
      render: (text, record, index) => {
        return (
          <Switch
            checked={record.completed}
            onChange={(value) => handleChangeSwich(value, record.key)}
          />
        );
      },
    },
    {
      title: "Created By",
      dataIndex: "owner",
    },
  ];
  
  return (
    <div>
      <Table columns={columns} dataSource={tasks}></Table>
    </div>
  );
};

TaskList.propTypes = {};

export default observer(TaskList);
