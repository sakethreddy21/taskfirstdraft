import { useState, useMemo } from "react";
import { Column, Id, Task } from "../../types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import TrashIcon from "../../icons/TrashIcon";
import { Plus, Text } from "lucide-react";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  tasks: Task[];
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function ColumnContainer(props: Props) {
  const {
    column,
    deleteColumn,
    createTask,
    tasks,
    deleteTask,
    updateTask,
  } = props;
  
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: false, // Edit mode is no longer needed
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" w-[300px] opacity-40 border-2 border-rose-500 rounded-md flex flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className=" w-[300px] rounded-md flex flex-col"
    >
      {/* Column Title */}
      <div
        {...attributes}
        {...listeners}
        className="flex items-center px-2 justify-between"
      >
        <div className="flex gap-2 text-[20px]">
         
          {column.title}
         
        </div>
        <Text color='#555555'/>
      </div>
      {/* Column tasks container */}
      <div className="flex flex-col flex-grow gap-4 px-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}
      <button
        className="flex items-center gap-2 border-2 rounded-md border-columnBgColor border-x-columnBgColor hover:bg-mainBgColor hover:text-rose-500 active:bg-black"
        onClick={() => {
          createTask(column.id);
        }}
      >
       <Plus/>
        Add Task
      </button>
    </div>
  );
}

export default ColumnContainer;
