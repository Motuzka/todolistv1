import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  addTask: (title: string, todolistId: string) => void;
  removeTodolist: (todolistId: string) => void;
};

export function Todolist(props: PropsType) {
  //  props ={ title: 'Smth', tasks: [{id, title, isDone},{}] }

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onNewTitleKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter" && e.ctrlKey) {
      props.addTask(newTaskTitle, props.id);
      setNewTaskTitle("");
    }
  };
  const addTask = () => {
    const formatedNewTaskTitle = newTaskTitle.trim();

    if (formatedNewTaskTitle === "") {
      setError("Field is required");
      return;
    }

    props.addTask(formatedNewTaskTitle, props.id);
    setNewTaskTitle("");
  };
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);
  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };

  return (
    <div>
      <h3>
        {props.title} <button onClick={removeTodolist}>x</button>
      </h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyUp={onNewTitleKeyUpHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <p className="error-message">Field is required</p>}
      </div>
      <ul>
        {props.tasks.map((el) => {
          const onRemoveHandler = () => {
            props.removeTask(el.id, props.id);
          };
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(el.id, e.currentTarget.checked, props.id);
          };
          return (
            <li key={el.id} className={el.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={el.isDone}
              />
              <span>{el.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          onClick={onAllClickHandler}
          className={props.filter === "all" ? "active-filter" : ""}
        >
          All
        </button>
        <button
          onClick={onActiveClickHandler}
          className={props.filter === "active" ? "active-filter" : ""}
        >
          Active
        </button>
        <button
          onClick={onCompletedClickHandler}
          className={props.filter === "completed" ? "active-filter" : ""}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
