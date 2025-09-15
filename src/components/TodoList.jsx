import React, { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { Typography, Empty, Spin, Card } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import "./TodoList.css";
import TodoGroup from "./TodoGroup";
import { TodoGenerator } from "./TodoGenerator";

const { Title } = Typography;

const TodoList = () => {
  const { todos, loading } = useContext(TodoContext);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  return (
    <div className="todo-container">
      <Card 
        style={{ 
          maxWidth: 800, 
          margin: '0 auto',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '12px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
            <CheckCircleOutlined style={{ marginRight: 8 }} />
            Todo List
          </Title>
        </div>
        
        <TodoGenerator />
        
        {todos.length === 0 ? (
          <Empty
            description="Add the things you need to do today..."
            style={{ margin: '40px 0' }}
          />
        ) : (
          <TodoGroup />
        )}
      </Card>
    </div>
  );
};export default TodoList;
