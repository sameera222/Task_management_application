import React from 'react';

const TaskFilters = ({ setFilter }) => {
  return (
    <div>
      <button onClick={() => setFilter('all')}>All Tasks</button>
      <button onClick={() => setFilter('completed')}>Completed Tasks</button>
      <button onClick={() => setFilter('active')}>Active Tasks</button>
    </div>
  );
};

export default TaskFilters;
