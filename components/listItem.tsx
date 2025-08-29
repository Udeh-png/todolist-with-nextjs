"use client";

import { Task } from "@/app/types/TaskType";
import { MouseEvent, useRef, useState } from "react";

export const ListItem = ({
  task,
  taskState,
  setTaskState,
}: {
  task: Task;
  taskState: Task[];
  setTaskState: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const checkboxRef = useRef<HTMLInputElement>(null);

  function handleCompleted() {
    const updatedTask = { ...task, completed: !task.completed };

    const updatedTaskState = taskState.map((t) =>
      t.id === task.id ? updatedTask : t
    );

    setTaskState(updatedTaskState);
    localStorage.setItem("tasks", JSON.stringify(updatedTaskState));
  }

  function handleEditTask(d: FormData) {
    const newTask: string | undefined = d.get("newTask") as string;
    if (newTask.trim() === "") {
      setIsEditing(false);
      return;
    }
    const updatedTask = { ...task, task: newTask };
    const updatedTaskState = taskState.map((t) =>
      t.id === task.id ? updatedTask : t
    );
    setTaskState(updatedTaskState);
    localStorage.setItem("tasks", JSON.stringify(updatedTaskState));
    setIsEditing(false);
  }

  function handleDeleteTask(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    const updatedTaskState = taskState.filter((t) => t.id !== task.id);
    setTaskState(updatedTaskState);
    localStorage.setItem("tasks", JSON.stringify(updatedTaskState));
  }
  return (
    <div
      className={`flex justify-between h-17 px-4 items-center rounded-2xl cursor-pointer border border-[rgba(0,0,0,0.2)] caret-transparent`}
      onClick={() => {
        checkboxRef.current?.click();
      }}
    >
      <div className="flex gap-5 w-full">
        <input
          type="checkbox"
          ref={checkboxRef}
          checked={task.completed}
          onChange={() => {
            handleCompleted();
          }}
        />

        {isEditing ? (
          <form action={handleEditTask} className="w-full">
            <input
              type="text"
              name="newTask"
              placeholder="Edit task"
              autoComplete="off"
              className="bg-[rgba(0,0,0,0.2)] rounded-md w-[90%] py-[1.5px] pl-3 caret-current outline-0"
              autoFocus
              onBlur={() => setIsEditing(false)}
            />
          </form>
        ) : (
          <p className={`${task.completed ? "line-through opacity-50" : ""}`}>
            {task.task}
          </p>
        )}
      </div>
      <div className="flex gap-7">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        >
          Edit
        </button>
        <button onClick={handleDeleteTask}>Delete</button>
      </div>
    </div>
  );
};
