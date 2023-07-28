

import React, { useState, useEffect } from "react";
import TodoForm from "../TodoForm/TodoForm";
import TodoList from "../TodoList/TodoList";
import "./TodoApp.css"
import CongratulationsModal from "../CongratulationsModal/CongratulationsModal";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [completedTask, setCompletedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      setTasks(storedList);
    }
  }, []);

  const addTask = (taskTitle, description) => {
    const newTask = {
      id: new Date().getTime().toString(),
      title: taskTitle,
      description: description,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
  };

  const handleDelete = (task) => {
    const deleted = tasks.filter((t) => t.id !== task.id);
    setTasks(deleted);
    localStorage.setItem("localTasks", JSON.stringify(deleted));
  };

  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem("localTasks", JSON.stringify(updatedTasks));

    const completedTask = updatedTasks.find(
      (task) => task.id === taskId && task.completed
    );
    if (completedTask) {
      setCompletedTask(completedTask);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCompletedTask(null);
  };

  const handleClear = () => {
    setTasks([]);
    localStorage.removeItem("localTasks");
  };

  return (
    <div className="todo-app-container">
      <h1 className="todo-heading">To-Dos</h1>
      <TodoForm addTask={addTask} />
      <div className="todo-badge">
        You have
        {!tasks.length
          ? " To Add Tasks"
          : tasks.length === 1
          ? " 1 task"
          : ` ${tasks.length} tasks`}
      </div>
      <TodoList
        tasks={tasks}
        handleTaskCompletion={handleTaskCompletion}
        handleDelete={handleDelete}
      />
      {tasks.length > 0 && (
        <div>
          <button className="todo-clear-btn" onClick={handleClear}>
            Clear All Tasks
          </button>
        </div>
      )}
      {showModal && completedTask && (
        <>
          <CongratulationsModal
            completedTask={completedTask}
            onClose={handleCloseModal}
          />
          <div className="todo-modal-backdrop"></div>
        </>
      )}
    </div>
  );
}
