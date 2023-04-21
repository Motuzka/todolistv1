import React from "react";
import { TaskType, Todolist } from "./Todolist";
import "./App.css";

function App() {
  let tasks1: Array<TaskType> = [
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: false },
  ];

  let tasks2: Array<TaskType> = [
    { id: 1, title: "Terminator", isDone: false },
    { id: 2, title: "Die Hard", isDone: true },
    { id: 3, title: "Armageddon", isDone: false },
  ];

  return (
    <div className="App">
      <Todolist title="Technologies" tasks={tasks1} />
      <Todolist title="Movie list" tasks={tasks2} />
      {/* <Todolist title="Home tasks" /> */}
    </div>
  );
}

export default App;
