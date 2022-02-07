import React, { useContext } from "react";
import { Table, Switch, Button, Modal, Input, Form, Popconfirm } from "antd";
import { RootStoreContext } from "../../../state/Index";
import { observer } from "mobx-react-lite";
import { DeleteOutlined } from "@ant-design/icons";

const TaskList = (props) => {
  const [form] = Form.useForm();

  const rootStore = useContext(RootStoreContext);

  const { tasks, updateTask, addNewTask, deleteTask } = rootStore.User;
  const { openModal, closeModal, isOpen, title } = rootStore.UI.Modal;

  const handleChangeSwich = (value, taskId) => {
    updateTask(taskId, { completed: value });
  };

  const onSubmitMethod = () => {
    addNewTask(form.getFieldValue());
    closeModal();
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
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <Popconfirm title="Are you sure" okText="Yes" cancelText="No" onConfirm={()=>deleteTask(record._id)}>
            <Button icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        );
      },
    },
  ];

  const modalContent = (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      onFinish={onSubmitMethod}
    >
      <Form.Item label="Task Description" name="description">
        <Input />
      </Form.Item>
      <Form.Item valuePropName="checked" label="Is Completed" name="completed">
        <Switch />
      </Form.Item>
    </Form>
  );

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          openModal("Create a new Task");
        }}
        style={{ marginBottom: "2vh" }}
      >
        Add Task
      </Button>
      <Table columns={columns} dataSource={tasks}></Table>

      <Modal
        visible={isOpen}
        title={title}
        onCancel={closeModal}
        okText="Save Task"
        onOk={onSubmitMethod}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

TaskList.propTypes = {};

export default observer(TaskList);
