import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io"; // Import the IoIosAdd icon from react-icons/io
import "./TodoForm.css";
export default function TodoForm({ addTask }) {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task || !description) {
      alert("Both title and description fields are required.");
      return;
    }

    addTask(task, description);
    setTask("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="task"
          type="text"
          value={task}
          placeholder="Write your task..."
          className="form-control bginput "
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          name="description"
          type="text"
          value={description}
          placeholder="Write task description..."
          className="form-control bginput"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className=" btn-primary">
          <span> Add</span> <IoIosAdd size={30} />
          {/* Use the IoIosAdd icon */}
        </button>
      </div>
    </form>
  );
}
