
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskList from "./components/TaskList";
import TaskFilters from "./components/TaskFilters";
import AddTask from "./components/AddTask";
import { auth, googleProvider } from "./firebase"; // Import Firebase configuration
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState(null);

  // Effect to manage user authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Effect to load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Effect to update localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  const addTask = (title, description, dueDate, priority) => {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      dueDate,
      priority,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  // Function to edit an existing task
  const editTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Function to toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to handle drag and drop reordering of tasks
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(reorderedTasks);
  };

  // Function to sign in with Google
  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error signing in with Google: ", error);
      });
  };

  // Function to sign out
  const signOut = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      {user ? (
        <>
        <div className="signOut_button">
        <button onClick={signOut}>Sign Out</button>
        </div>
        
          <AddTask addTask={addTask} />
          <TaskFilters setFilter={setFilter} />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <TaskList
                    tasks={tasks.filter((task) => {
                      if (filter === "completed") return task.completed;
                      if (filter === "active") return !task.completed;
                      return true;
                    })}
                    editTask={editTask}
                    deleteTask={deleteTask}
                    toggleTaskCompletion={toggleTaskCompletion}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      ) : (
        <>
          <p>Please sign in to manage your tasks</p>
          <button onClick={signInWithGoogle}>Sign In with Google</button>
        </>
      )}
    </div>
  );
};

export default App;
