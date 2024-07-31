import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Column, Id, Task } from "@/types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import TaskCard from "@/components/shared/TaskCard";

const initialColumns: Column[] = [
  { id: 1, title: "Todo" },
  { id: 2, title: "In Progress" },
  { id: 3, title: "Under Review" },
  { id: 4, title: "Completed" },
];

const initialTasks: Task[] = [
  {
    id: 1,
    columnId: 1,
    content: "Implement User Authentication",
    description: "Develop and integrate user authentication using email and password.",
    status: "Urgent",
    deadline: "2024-08-12",
    timepassed: "1 hour ago",
  },
  {
    id: 2,
    columnId: 1,
    content: "Design Database Schema",
    description: "Create and optimize database schema for new project.",
    status: "Medium",
    deadline: "2024-08-15",
    timepassed: "2 hours ago",
  },
  {
    id: 3,
    columnId: 2,
    content: "Setup CI/CD Pipeline",
    description: "Implement continuous integration and delivery pipeline.",
    status: "High",
    deadline: "2024-08-10",
    timepassed: "3 hours ago",
  },
  {
    id: 4,
    columnId: 2,
    content: "Implement API Endpoints",
    description: "Develop and test API endpoints for user management.",
    status: "Medium",
    deadline: "2024-08-18",
    timepassed: "4 hours ago",
  },
  {
    id: 5,
    columnId: 3,
    content: "Code Review",
    description: "Review code for recent feature implementations.",
    status: "Low",
    deadline: "2024-08-14",
    timepassed: "5 hours ago",
  },
  {
    id: 6,
    columnId: 3,
    content: "Fix Bugs",
    description: "Identify and fix bugs reported by QA team.",
    status: "Urgent",
    deadline: "2024-08-20",
    timepassed: "6 hours ago",
  },
  {
    id: 7,
    columnId: 4,
    content: "Deploy to Production",
    description: "Deploy the latest release to the production environment.",
    status: "High",
    deadline: "2024-08-25",
    timepassed: "7 hours ago",
  },
  {
    id: 8,
    columnId: 4,
    content: "Prepare Release Notes",
    description: "Draft and publish release notes for the new version.",
    status: "Medium",
    deadline: "2024-08-22",
    timepassed: "8 hours ago",
  },
];

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isClient, setIsClient] = useState(false);
  // Generate a random number between 0 and 10000
  function generateId() {
    return Math.floor(Math.random() * 10001);
  }
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Delete column
  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  }

  // Update column
  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title: title };
    });

    setColumns(newColumns);
  }

  // Create Task
  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
      description: "",
      status: "",
      deadline: "",
      timepassed: ""
    };

    setTasks([...tasks, newTask]);
  }

  // Delete Task
  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  // Update Task
  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveTask(null);

    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    // Dropping task over another task
    if (isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        // Update column id of the active task while moving it to another column
        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    } else {
      // Dropping task over a column
      const isOverAColumn = over.data.current?.type === "Column";

      if (isOverAColumn) {
        setTasks((tasks) => {
          const activeIndex = tasks.findIndex((t) => t.id === activeId);

          // Update column id of the active task while moving it to another column
          tasks[activeIndex].columnId = overId;

          return arrayMove(tasks, activeIndex, activeIndex);
        });
      }
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    // Dropping task over another task
    if (isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        // Update column id of the active task while moving it to another column
        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    } else {
      // Dropping task over a column
      const isOverAColumn = over.data.current?.type === "Column";

      if (isOverAColumn) {
        setTasks((tasks) => {
          const activeIndex = tasks.findIndex((t) => t.id === activeId);

          // Update column id of the active task while moving it to another column
          tasks[activeIndex].columnId = overId;

          return arrayMove(tasks, activeIndex, activeIndex);
        });
      }
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 3px
      },
    })
  );

  // Effect to log task updates
  useEffect(() => {
    console.log("Tasks updated:", tasks);
  }, [tasks]); // Dependency array ensures this runs when `tasks` changes

  // Effect to log column updates
  useEffect(() => {
    console.log("Columns updated:", columns);
  }, [columns]); // Dependency array ensures this runs when `columns` changes

  return (
    <div className="flex min-h-screen w-full p-4 overflow-x-auto overflow-y-hidden">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="flex w-full">
          <div className="flex gap-2 w-full justify-between">
            {columns.map((column) => (
              <ColumnContainer
                key={column.id}
                column={column}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter((task) => task.columnId === column.id)}
              />
            ))}
          </div>
        </div>

        {isClient && createPortal(
          <DragOverlay>
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
