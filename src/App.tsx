import React from "react";
import { useState } from "react";
import { Todolist } from "./Todolist";
import "./App.css";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";
type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  // let tasks2: Array<TaskType> = [
  //   { id: v(1), title: "Terminator", isDone: false },
  //   { id: v(1), title: "Die Hard", isDone: true },
  //   { id: v(1), title: "Armageddon", isDone: false },
  //   { id: v(1), title: "The Fifth Element", isDone: false },
  // ];

  // let [tasks, setTasks] = useState<Array<TaskType>>([
  //   { id: v1(), title: "CSS", isDone: true },
  //   { id: v1(), title: "JS", isDone: true },
  //   { id: v1(), title: "React", isDone: false },
  //   { id: v1(), title: "GraphQL", isDone: true },
  //   { id: v1(), title: "RestAPI", isDone: false },
  // ]);

  function addTask(title: string, todolistId: string) {
    const newTask = { id: v1(), title: title, isDone: false };
    const tasks = tasksObj[todolistId];
    const newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  }

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter((el) => el.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function removeTodolist(todolistId: string) {
    let filteredTodolists = todolists.filter((tl) => tl.id !== todolistId);
    setTodolists(filteredTodolists);
    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
    }
    setTodolists([...todolists]);
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }

  const todolistId1 = v1();
  const todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "active" },
    { id: todolistId2, title: "What to watch", filter: "completed" },
  ]);

  let [tasksObj, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "GraphQL", isDone: true },
      { id: v1(), title: "RestAPI", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Terminator", isDone: false },
      { id: v1(), title: "Die Hard", isDone: true },
      { id: v1(), title: "Armageddon", isDone: false },
      { id: v1(), title: "The Fifth Element", isDone: false },
    ],
  });

  return (
    <div className="App">
      {todolists.map((tl) => {
        let tasksForTodolist = tasksObj[tl.id];
        if (tl.filter === "completed") {
          tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true);
        }
        if (tl.filter === "active") {
          tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false);
        }
        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            changeTaskStatus={changeStatus}
            addTask={addTask}
            filter={tl.filter}
            removeTodolist={removeTodolist}
          />
        );
      })}
      {/* <Todolist title="Movie list" tasks={tasks2} removeTask={removeTask} /> */}
    </div>
  );
}

export default App;
