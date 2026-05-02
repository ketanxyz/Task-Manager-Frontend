import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { RiAddLine, RiDeleteBin6Line, RiAttachment2, RiUserAddLine } from "react-icons/ri";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Input from "../../components/Inputs/Input";
import SelectUsersModal from "../../components/Modal/SelectUsersModal";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { getInitials } from "../../utils/helper";

const CreateTask = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get("id");
  const isEdit = !!taskId;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const [todoItems, setTodoItems] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [attachInput, setAttachInput] = useState("");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axiosInstance.get(API_PATHS.USERS.GET_ALL);
        setUsers(data);
      } catch {}
    };
    fetchUsers();
    if (isEdit) fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.TASKS.GET_BY_ID(taskId));
      setTitle(data.title || "");
      setDescription(data.description || "");
      setPriority(data.priority || "Low");
      setDueDate(data.dueDate ? data.dueDate.slice(0, 10) : "");
      setAssignedTo(data.assignedTo?.map(u => u._id) || []);
      setTodoItems(data.todoChecklist || []);
      setAttachments(data.attachments || []);
    } catch { toast.error("Failed to load task"); }
  };

  const handleAddTodo = () => {
    if (!todoInput.trim()) return;
    setTodoItems([...todoItems, { text: todoInput.trim(), completed: false }]);
    setTodoInput("");
  };

  const handleAddAttachment = () => {
    if (!attachInput.trim()) return;
    setAttachments([...attachments, attachInput.trim()]);
    setAttachInput("");
  };

  const handleSubmit = async () => {
    if (!title.trim()) return toast.error("Title is required");
    if (!dueDate) return toast.error("Due date is required");
    if (!assignedTo.length) return toast.error("Please assign at least one user");
    setLoading(true);
    const payload = { title, description, priority, dueDate, assignedTo, todoChecklist: todoItems, attachments };
    try {
      if (isEdit) {
        await axiosInstance.put(API_PATHS.TASKS.UPDATE(taskId), payload);
        toast.success("Task updated!");
      } else {
        await axiosInstance.post(API_PATHS.TASKS.CREATE, payload);
        toast.success("Task created!");
      }
      navigate("/admin/tasks");
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE(taskId));
      toast.success("Task deleted");
      navigate("/admin/tasks");
    } catch { toast.error("Delete failed"); }
  };

  const assignedUsers = users.filter(u => assignedTo.includes(u._id));

  return (
    <DashboardLayout activeMenu={isEdit ? "Manage Tasks" : "Create Task"}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">{isEdit ? "Update Task" : "Create Task"}</h2>
            {isEdit && (
              <button onClick={handleDelete} className="flex items-center gap-1.5 text-sm text-red-500 bg-red-50 px-3 py-1.5 rounded-xl hover:bg-red-100 transition-all">
                <RiDeleteBin6Line size={15} /> Delete
              </button>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Task Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Create App UI"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1368EC] focus:ring-2 focus:ring-blue-100" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Describe task"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1368EC] focus:ring-2 focus:ring-blue-100 resize-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1368EC] bg-white">
                {["Low", "Medium", "High"].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Due Date</label>
              <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1368EC]" />
            </div>
            {/* Assign To */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Assign To</label>
              <button type="button" onClick={() => setShowModal(true)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-left flex items-center gap-2 hover:border-[#1368EC] transition-all">
                {assignedUsers.length > 0 ? (
                  <div className="flex -space-x-2">
                    {assignedUsers.slice(0, 3).map((u, i) => (
                      <div key={i} className="w-7 h-7 rounded-full bg-[#1368EC] text-white text-[10px] flex items-center justify-center font-semibold border-2 border-white overflow-hidden">
                        {u.profileImageUrl ? <img src={u.profileImageUrl} className="w-full h-full object-cover" /> : getInitials(u.name)}
                      </div>
                    ))}
                    {assignedUsers.length > 3 && <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center font-semibold border-2 border-white">+{assignedUsers.length - 3}</div>}
                  </div>
                ) : (
                  <><RiUserAddLine className="text-slate-400" /> <span className="text-slate-400">Add Members</span></>
                )}
              </button>
            </div>
          </div>

          {/* TODO Checklist */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">TODO Checklist</label>
            <div className="space-y-2 mb-2">
              {todoItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-2.5">
                  <span className="text-xs text-slate-400 font-mono">{String(i+1).padStart(2,'0')}</span>
                  <span className="flex-1 text-sm text-slate-700">{item.text}</span>
                  <button onClick={() => setTodoItems(todoItems.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600">
                    <RiDeleteBin6Line size={15} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={todoInput} onChange={e => setTodoInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAddTodo()}
                placeholder="Enter Task" className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1368EC]" />
              <button onClick={handleAddTodo} className="flex items-center gap-1 bg-[#1368EC] text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700">
                <RiAddLine /> Add
              </button>
            </div>
          </div>

          {/* Attachments */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Add Attachments</label>
            <div className="space-y-2 mb-2">
              {attachments.map((a, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-2.5">
                  <RiAttachment2 size={14} className="text-slate-400" />
                  <span className="flex-1 text-sm text-slate-700 truncate">{a}</span>
                  <button onClick={() => setAttachments(attachments.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600">
                    <RiDeleteBin6Line size={15} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <RiAttachment2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input value={attachInput} onChange={e => setAttachInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAddAttachment()}
                  placeholder="Add File Link" className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1368EC]" />
              </div>
              <button onClick={handleAddAttachment} className="flex items-center gap-1 bg-[#1368EC] text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700">
                <RiAddLine /> Add
              </button>
            </div>
          </div>

          <button onClick={handleSubmit} disabled={loading}
            className="w-full bg-[#1368EC] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-all disabled:opacity-60">
            {loading ? "Saving..." : (isEdit ? "UPDATE TASK" : "CREATE TASK")}
          </button>
        </div>
      </div>

      {showModal && (
        <SelectUsersModal
          users={users}
          selectedUsers={assignedTo}
          onConfirm={(ids) => { setAssignedTo(ids); setShowModal(false); }}
          onClose={() => setShowModal(false)}
        />
      )}
    </DashboardLayout>
  );
};

export default CreateTask;
