import React from "react";
import { useState } from "react";
import { TaskType, Todolist } from "./Todolist";
import "./App.css";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  // let tasks2: Array<TaskType> = [
  //   { id: v(1), title: "Terminator", isDone: false },
  //   { id: v(1), title: "Die Hard", isDone: true },
  //   { id: v(1), title: "Armageddon", isDone: false },
  //   { id: v(1), title: "The Fifth Element", isDone: false },
  // ];

  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "GraphQL", isDone: true },
    { id: v1(), title: "RestAPI", isDone: false },
  ]);

  let [filter, setFilter] = useState<FilterValuesType>("all");

  function addTask(title: string) {
    const newObject = { id: v1(), title: title, isDone: false };
    const newTasks = [newObject, ...tasks];
    setTasks(newTasks);
  }

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((el) => el.id !== id);
    setTasks(filteredTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let tasksForTodolist = tasks;
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="App">
      <Todolist
        title="Technologies"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
      {/* <Todolist title="Movie list" tasks={tasks2} removeTask={removeTask} /> */}
    </div>
  );
}

export default App;
