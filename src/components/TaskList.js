import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, editTask, deleteTask, toggleTaskCompletion }) => {
  return (
    <div>
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleTaskCompletion={toggleTaskCompletion}
        />
      ))}
    </div>
  );
};

export default TaskList;
