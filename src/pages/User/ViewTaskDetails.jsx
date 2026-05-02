import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RiArrowLeftLine, RiCalendarLine, RiAttachment2, RiExternalLinkLine } from "react-icons/ri";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { getPriorityColor, getStatusColor, formatDate, getInitials } from "../../utils/helper";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);

  const fetchTask = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.TASKS.GET_BY_ID(id));
      setTask(data);
    } catch { toast.error("Failed to load task"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTask(); }, [id]);

  const handleStatusChange = async (status) => {
    setStatusLoading(true);
    try {
      await axiosInstance.put(API_PATHS.TASKS.UPDATE_STATUS(id), { status });
      toast.success("Status updated");
      fetchTask();
    } catch { toast.error("Failed to update status"); }
    finally { setStatusLoading(false); }
  };

  const handleTodoToggle = async (index) => {
    const updated = task.todoChecklist.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    try {
      await axiosInstance.put(API_PATHS.TASKS.UPDATE_CHECKLIST(id), { todoChecklist: updated });
      fetchTask();
    } catch { toast.error("Failed to update"); }
  };

  if (loading) return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-[#1368EC] border-t-transparent rounded-full animate-spin" /></div>
    </DashboardLayout>
  );

  if (!task) return <DashboardLayout activeMenu="My Tasks"><div className="text-center py-20 text-slate-400">Task not found</div></DashboardLayout>;

  const completedCount = task.todoChecklist?.filter(t => t.completed).length || 0;
  const totalCount = task.todoChecklist?.length || 0;
  const progress = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <DashboardLayout activeMenu="My Tasks">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#1368EC] mb-6 transition-colors">
        <RiArrowLeftLine /> Back to Tasks
      </button>

      <div className="max-w-3xl mx-auto space-y-5">
        {/* Header card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(task.status)}`}>{task.status}</span>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getPriorityColor(task.priority)}`}>{task.priority} Priority</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">{task.title}</h1>
          <p className="text-slate-500 text-sm leading-relaxed">{task.description}</p>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 mt-5">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <RiCalendarLine className="text-[#1368EC]" />
              <div><p className="text-xs text-slate-400">Created</p><p className="font-medium text-slate-700">{formatDate(task.createdAt)}</p></div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <RiCalendarLine className="text-red-400" />
              <div><p className="text-xs text-slate-400">Due Date</p><p className="font-medium text-slate-700">{formatDate(task.dueDate)}</p></div>
            </div>
          </div>
        </div>

        {/* Status Update */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-3">Update Status</h3>
          <div className="flex flex-wrap gap-2">
            {["Pending", "In Progress", "Completed"].map(s => (
              <button key={s} onClick={() => handleStatusChange(s)} disabled={statusLoading}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${task.status === s ? "bg-[#1368EC] text-white" : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-[#1368EC]"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Assigned to */}
        {task.assignedTo?.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-3">Assigned To</h3>
            <div className="flex flex-wrap gap-3">
              {task.assignedTo.map((u, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2">
                  <div className="w-7 h-7 rounded-full bg-[#1368EC] text-white text-xs flex items-center justify-center font-semibold overflow-hidden">
                    {u.profileImageUrl ? <img src={u.profileImageUrl} className="w-full h-full object-cover" /> : getInitials(u.name)}
                  </div>
                  <div><p className="text-xs font-medium text-slate-700">{u.name}</p><p className="text-[10px] text-slate-400">{u.email}</p></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Checklist */}
        {task.todoChecklist?.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">TODO Checklist</h3>
              <span className="text-sm text-slate-500 font-medium">{completedCount}/{totalCount}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4">
              <div className="bg-[#1368EC] h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="space-y-2">
              {task.todoChecklist.map((item, i) => (
                <label key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                  <input type="checkbox" checked={item.completed} onChange={() => handleTodoToggle(i)} className="w-4 h-4 accent-[#1368EC]" />
                  <span className={`text-sm ${item.completed ? "line-through text-slate-400" : "text-slate-700"}`}>{item.text}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Attachments */}
        {task.attachments?.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-3">Attachments</h3>
            <div className="space-y-2">
              {task.attachments.map((a, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-2.5">
                  <RiAttachment2 size={15} className="text-[#1368EC]" />
                  <span className="flex-1 text-sm text-slate-700 truncate">{a}</span>
                  <a href={a.startsWith("http") ? a : `https://${a}`} target="_blank" rel="noopener noreferrer" className="text-[#1368EC] hover:text-blue-700">
                    <RiExternalLinkLine size={15} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;
