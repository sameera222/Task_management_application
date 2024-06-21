import React, { useState } from "react";
import "./AddTask.css";

const AddTask = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      title: "",
      description: "",
      dueDate: "",
      priority: "",
    });

    let formIsValid = true;

    // Validate title
    if (!title.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "Task title cannot be empty",
      }));
      formIsValid = false;
    }

    // Validate description
    if (!description.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "Task description cannot be empty",
      }));
      formIsValid = false;
    }

    // Validate due date
    if (!dueDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dueDate: "Due date cannot be empty",
      }));
      formIsValid = false;
    }

    // Validate priority
    if (!priority) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        priority: "Priority must be selected",
      }));
      formIsValid = false;
    }

    if (formIsValid) {
      addTask(title, description, dueDate, priority);
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("medium");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label>Task Title</label>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="error-message">{errors.title}</p>}
      </div>
      <div className="form-group">
        <label>Task Description</label>
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {errors.description && (
          <p className="error-message">{errors.description}</p>
        )}
      </div>
      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        {errors.dueDate && <p className="error-message">{errors.dueDate}</p>}
      </div>
      <div className="form-group">
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.priority && <p className="error-message">{errors.priority}</p>}
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
