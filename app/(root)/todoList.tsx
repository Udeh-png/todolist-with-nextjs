"use client";

import { ListItem } from "@/components/listItem";
import { Session } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { Task } from "../types/TaskType";

export default function TodoList({ session }: { session: Session | null }) {
  const tasksInitialState: Task[] = [];
  const [tasksState, setTasksState] = useState(tasksInitialState);
  const [value, setValue] = useState("");
  const scrollBottom = useRef<HTMLLIElement>(null);
  const userName = session?.user?.name;

  useEffect(() => {
    setTasksState(JSON.parse(localStorage.getItem("tasks") as string) || []);
  }, []);

  function handleNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value.trim() === "" || !session) {
      return;
    }
    setTasksState((prevTasks: Task[]) => [
      ...prevTasks,
      {
        id: prevTasks.length + 1,
        task: value,
        completed: false,
      },
    ]);
    setValue("");

    // So that the new task is added to localStorage cuz useState does not update immediately
    const localTaskState = [
      ...tasksState,
      {
        id: tasksState.length + 1,
        task: value,
        completed: false,
      },
    ];
    localStorage.setItem("tasks", JSON.stringify(localTaskState));
    setTimeout(() => {
      scrollBottom.current?.scrollIntoView({
        behavior: "smooth",
      });
    });
  }
  return (
    <div className="md:p-5 md:w-1/2 rounded-2xl h-[85vh] mx-auto md:h-[89vh] md:shadow-[0px_1px_3px_0px_rgba(0,0,0,0.5)] p-2 relative md:bg-[rgb(236,229,207)]">
      <div className="mb-5 flex justify-between items-top">
        <div>
          <h1 className="text-[clamp(18px,3vw,36px)]">
            Welcome,{" "}
            {userName ? userName.slice(0, userName.indexOf(" ")) : "Stranger"}
            👋🏾
          </h1>
          <p className="pl-1 text-[clamp(12px,2vw,16px)]">
            {session ? "what we doing today." : "Please sign in"}
          </p>
        </div>
        <button
          onClick={() => {
            if (session) {
              setTasksState([]);
              localStorage.setItem("tasks", JSON.stringify([]));
            }
          }}
          className="my-button"
        >
          Clear All
        </button>
      </div>

      <div className="flex justify-center items-center gap-5 h-[80%] md:h-[60%] overflow-y-auto scrollbar-custom">
        {session ? (
          tasksState.length > 0 ? (
            <ul className="flex flex-col gap-3 h-full w-full">
              {tasksState.map((task, index) => (
                <li key={index} ref={scrollBottom}>
                  <ListItem
                    task={task}
                    taskState={tasksState}
                    setTaskState={setTasksState}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks added</p>
          )
        ) : (
          <div>Signin to view tasks</div>
        )}
      </div>

      <form
        onSubmit={handleNewTask}
        className="absolute bottom-2 md:bottom-5 left-0 flex w-full px-2"
      >
        <input
          type="text"
          placeholder="Add task"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          className="border-2 rounded-2xl w-full py-3 outline-0 text-lg pl-3 border-[rgba(0,0,0,0.2)] caret-current"
        />
        <div className="flex justify-end mt-3">
          <button type="submit" className="my-button">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}
