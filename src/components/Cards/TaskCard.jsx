import React from "react";
import { useNavigate } from "react-router-dom";
import { RiAttachment2, RiCalendarLine } from "react-icons/ri";
import { getPriorityColor, getStatusColor, formatDate, getInitials } from "../../utils/helper";

const TaskCard = ({ task, onClick }) => {
  const navigate = useNavigate();
  const progress = task.todoChecklist?.length
    ? Math.round(((task.completedTodoCount || 0) / task.todoChecklist.length) * 100)
    : 0;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group"
    >
      {/* Status & Priority */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(task.status)}`}>{task.status}</span>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getPriorityColor(task.priority)}`}>{task.priority} Priority</span>
      </div>

      {/* Title & Desc */}
      <h3 className="font-semibold text-slate-800 text-sm mb-1 group-hover:text-[#1368EC] transition-colors line-clamp-1">{task.title}</h3>
      <p className="text-xs text-slate-500 line-clamp-2 mb-3">{task.description}</p>

      {/* Progress */}
      {task.todoChecklist?.length > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Task Done</span>
            <span>{task.completedTodoCount || 0} / {task.todoChecklist.length}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-[#1368EC] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Dates */}
      <div className="flex justify-between text-xs text-slate-400 mb-3">
        <div>
          <p className="font-medium text-slate-500 text-[11px] mb-0.5">Start Date</p>
          <p>{formatDate(task.createdAt)}</p>
        </div>
        <div className="text-right">
          <p className="font-medium text-slate-500 text-[11px] mb-0.5">Due Date</p>
          <p>{formatDate(task.dueDate)}</p>
        </div>
      </div>

      {/* Assignees & attachments */}
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {task.assignedTo?.slice(0, 4).map((user, i) => (
            <div key={i} title={user.name}
              className="w-7 h-7 rounded-full border-2 border-white bg-[#1368EC] text-white text-[10px] flex items-center justify-center font-semibold overflow-hidden"
            >
              {user.profileImageUrl
                ? <img src={user.profileImageUrl} className="w-full h-full object-cover" />
                : getInitials(user.name)}
            </div>
          ))}
          {task.assignedTo?.length > 4 && (
            <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center font-semibold">
              +{task.assignedTo.length - 4}
            </div>
          )}
        </div>
        {task.attachments?.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <RiAttachment2 size={14} />
            <span>{task.attachments.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
