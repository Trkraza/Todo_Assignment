import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css"; // Import the custom CSS for TodoList

export default function TodoList({
  tasks,
  handleTaskCompletion,
  handleDelete,
}) {
  return (
    <div className="todo-list">
      {" "}
   
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          handleTaskCompletion={handleTaskCompletion}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}
