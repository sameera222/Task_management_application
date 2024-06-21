import React from 'react';
import './TaskFilters.css'

const TaskFilters = ({ setFilter }) => {
  return (
    <div className="task-filters">
      <button onClick={() => setFilter('all')}>All Tasks</button>
      <button onClick={() => setFilter('completed')}>Completed Tasks</button>
      <button onClick={() => setFilter('active')}>Active Tasks</button>
    </div>
  );
};

export default TaskFilters;
