import { useState } from "react";
import { Id, Task } from "../../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Clock } from "lucide-react";
import TaskModal from "./TaskModal";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string, description: string, status: string, deadline: string, timepassed: string) => void;
  onEdit: () => void;  // Make sure this is used if needed
}

function TaskCard({ task, deleteTask, updateTask, onEdit }: Props) {
  const [openMode, setOpenMode] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      Urgent: '#FF6B6B',
      Medium: '#FFA235',
      Low: '#0ECC5A',
    };
    return statusColors[status] || '#FFFFFF';
  };

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: "Task", task },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setCurrentTask(task);  // Set the current task to the clicked task
    setOpenMode(prev => !prev);  // Toggle the open mode
  };


  const statusToId = (status: string) => {
    const statusMap: { [key: string]: number } = {
      'ToDo': 1,
      'UnderReview': 2,
      'InProgress': 3,
      'Completed': 4,
    };
    return statusMap[status] || 0;  // Default to 0 or another appropriate value if status is not found
  };
  const handleSave = (task: Task) => {
    if (currentTask) {
      console.log('Updating task', task);
  
      updateTask(
        currentTask.id,  // Ensure this is the task ID
        task.content ?? '',
        task.description ?? '',
        task.status ?? '',
        task.deadline ?? '',
        task.timepassed ?? ''
      );
    } else {
      console.log('Adding new task', task);
    }
    setOpenMode(false);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={toggleEditMode}  // Click opens the modal
        className={`bg-[#F9F9F9] shadow-sm rounded-lg w-[280px] border-[1px] border-[#DEDEDE] p-3 px-4 gap-y-2 mt-4 flex flex-col ${isDragging ? 'opacity-50 cursor-grab' : ''}`}
      >
        <div className='text-[16px] max-w-[200.75px] font-medium text-[#606060]'>{task.content}</div>
        <div className='text-[14px] font-normal max-w-[220.75px] text-[#797979]'>{task.description}</div>
        <button className='text-white text-[12px] font-normal w-[55px] h-[30px] rounded-lg' style={{ backgroundColor: getStatusColor(task.status ?? '') }}>
          {task.status}
        </button>
        <div className='flex flex-row gap-x-2 items-center'>
          <Clock color='#606060' />
          <div className='text-[#606060] text-[14px]'>
            {task.deadline}
          </div>
        </div>
        <div className='mt-2 text-[#606060] text-[14px]'>
          {task.timepassed}
        </div>
      </div>

      {openMode && currentTask && (
        <TaskModal task={currentTask} openMode={openMode} setOpenMode={setOpenMode} onSave={handleSave} />
      )}
    </>
  );
}

export default TaskCard;
