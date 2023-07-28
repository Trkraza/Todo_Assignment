import React from "react";
import { IoMdTrash } from "react-icons/io";
import "./TodoItem.css";

export default function TodoItem({ task, handleTaskCompletion, handleDelete }) {
  const confirmDelete = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (shouldDelete) {
      handleDelete(task);
    }
  };

  return (
    <div className="task  grid">
      <div>
        <label
          className={`form-check ${task.completed ? "completed-task" : ""}`}
        >
          <input
            type="checkbox"
            checked={task.completed}
            className="form-check-input"
            onChange={() => handleTaskCompletion(task.id)}
          />
          <span
            className={`checkbox-text ${
              task.completed ? "completed-text" : ""
            } ${task.completed ? "bold-text" : ""}`}
          >
            {task.title}
          </span>
        </label>
      </div>
      <div>
        {task.description && (
          <p
            className={`task-description ${
              task.completed ? "completed-text" : ""
            } ${task.completed ? "bold-text" : ""}`}
          >
            Description: {task.description}
          </p>
        )}
      </div>
      <div className="button">
        <button className="delete-btn" onClick={confirmDelete}>
          <IoMdTrash size={20} />
        </button>
      </div>
    </div>
  );
}
