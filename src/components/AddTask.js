import React, { useState } from 'react';

const AddTask = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) return;
    addTask(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
