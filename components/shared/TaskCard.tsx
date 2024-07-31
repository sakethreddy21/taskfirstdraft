import { useState } from "react";
import TrashIcon from "../../icons/TrashIcon";
import { Id, Task } from "../../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Clock } from "lucide-react";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [editMode, setEditMode] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Urgent':
        return '#FF6B6B';
      case 'Medium':
        return '#FFA235';
      case 'Low':
        return '#0ECC5A';
      default:
        return '#FFFFFF'; // Default color if status is not matched
    }
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
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode(prev => !prev);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-mainBgColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl opacity-50 border border-rose-500 cursor-grab relative"
      ></div>
    );
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={toggleEditMode}
        className="bg-[#F9F9F9] shadow-sm rounded-lg w-[280px] border-[1px] border-[#DEDEDE] p-3 px-4 gap-y-2 mt-4 flex flex-col"
      >
        <div className='text-[16px] max-w-[200.75px] font-medium text-[#606060]'>{task.content}</div>
        <div className='text-[14px] font-normal max-w-[220.75px] text-[#797979]'>{task.description}</div>
        <button className='text-white text-[12px] font-normal w-[55px] h-[30px] rounded-lg' style={{ backgroundColor: getStatusColor(task.status) }}>
          {task.status}
        </button>
        <div className='flex flex-row gap-x-2 items-center'>
          <Clock color='#606060'/>
          <div className='text-[#606060] text-[14px]'>
            {task.deadline}
          </div>
        </div>
        <div className='mt-2 text-[#606060] text-[14px]'>
          {task.timepassed}
        </div>
      </div>

      {/* Sliding Edit Form */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white z-50 transition-transform duration-300 ease-in-out ${editMode ? 'translate-x-0' : 'translate-x-[400px]'}`}
      >
        <button onClick={toggleEditMode} className="p-2 text-blue-500">Close</button>
        {/* Add your edit form content here */}
        <form>
          {/* Form fields */}
          <input type="text" defaultValue={task.content} className="block p-2 mb-4 w-full border" />
          <textarea defaultValue={task.description} className="block p-2 mb-4 w-full border" />
          {/* Add more form fields as needed */}
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </form>
      </div>
    </>
  );
}

export default TaskCard;
