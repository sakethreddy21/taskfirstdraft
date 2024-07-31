import { useState, useMemo } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import { Plus, Text } from "lucide-react";
import TaskModal from "./TaskModal";
import { Task } from "@/types";

const ColumnContainer = (props:any) => {
    const {
        column,
        createTask,
        tasks,
        deleteTask,
        updateTask,
    } = props;

    const tasksIds = useMemo(() => tasks.map((task:any) => task.id), [tasks]);

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
        disabled: false,
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

    const [openMode, setOpenMode] = useState(false);
    const [currentTask, setCurrentTask] = useState<null | Task>(null);

    const handleSave = (task:any) => {
        if (currentTask) {
            updateTask(currentTask.id, task);
        } else {
            createTask(column.id, task);
        }
        setOpenMode(false);
    };

    const openTaskModal = (task = null) => {
        setCurrentTask(task);
        setOpenMode(true);
    };

    return (
        <div ref={setNodeRef} style={style} className=" w-[300px] rounded-md flex flex-col">
            {/* Column Title */}
            <div
                {...attributes}
                {...listeners}
                className="flex items-center px-2 justify-between"
            >
                <div className="flex gap-2 text-[20px]">
                    {column.title}
                </div>
                <Text color='#555555' />
            </div>
            {/* Column tasks container */}
            <div className="flex flex-col flex-grow gap-4 px-2 overflow-x-hidden overflow-y-auto">
                <SortableContext items={tasksIds}>
                    {tasks.map((task:any) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                            onEdit={() => openTaskModal(task)}
                        />
                    ))}
                </SortableContext>
            </div>
            {/* Column footer */}
            <div className="px-2">
                <button
                    className='w-full flex justify-between items-center mt-4 p-2 rounded-xl text-left text-[#E3E1E1]'
                    style={{ background: 'linear-gradient(180deg, #3A3A3A 0%, #202020 100%)' }}
                    onClick={() => openTaskModal()}
                >
                    Add New
                    <Plus color='#E3E1E1' />
                </button>
                <TaskModal
                    task={currentTask}
                    setOpenMode={setOpenMode}
                    openMode={openMode}
                    onSave={handleSave}
                />
            </div>
        </div>
    );
};

export default ColumnContainer;
