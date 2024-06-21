import React from "react";
import EditTask from "./EditTask";
import { Draggable } from "react-beautiful-dnd";

const TaskList = ({ tasks, editTask, deleteTask, toggleTaskCompletion }) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <EditTask
                task={task}
                editTask={editTask}
                deleteTask={deleteTask}
                toggleTaskCompletion={toggleTaskCompletion}
              />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default TaskList;
