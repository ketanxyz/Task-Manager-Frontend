import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RiDownloadLine, RiSearchLine } from "react-icons/ri";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TaskCard from "../../components/Cards/TaskCard";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { BASE_URL } from "../../utils/apiPaths";

const TABS = ["All", "Pending", "In Progress", "Completed"];

const ManageTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState({});
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async (status = "") => {
    setLoading(true);
    try {
      const params = status && status !== "All" ? { status } : {};
      const { data } = await axiosInstance.get(API_PATHS.TASKS.GET_ALL, { params });
      setTasks(data.tasks || []);
      setSummary(data.statusSummary || {});
    } catch (e) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(activeTab); }, [activeTab]);

  const tabCount = (tab) => {
    if (tab === "All") return summary.all || 0;
    if (tab === "Pending") return summary.pendingTasks || 0;
    if (tab === "In Progress") return summary.inProgressTasks || 0;
    if (tab === "Completed") return summary.completedTasks || 0;
    return 0;
  };

  const handleDownload = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a"); a.href = url; a.download = "tasks-report.xlsx"; a.click();
    } catch { toast.error("Export failed"); }
  };

  const filtered = tasks.filter(t => t.title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-slate-800">My Tasks</h2>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Tabs */}
          <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === tab ? "bg-white shadow text-[#1368EC]" : "text-slate-500 hover:text-slate-700"}`}>
                {tab} <span className={`ml-1 ${activeTab === tab ? "text-[#1368EC]" : "text-slate-400"}`}>{tabCount(tab)}</span>
              </button>
            ))}
          </div>
          <button onClick={handleDownload}
            className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-all">
            <RiDownloadLine /> Download Report
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..."
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#1368EC]" />
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-[#1368EC] border-t-transparent rounded-full animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">No tasks found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(task => (
            <TaskCard key={task._id} task={task} onClick={() => navigate(`/admin/create-task?id=${task._id}`)} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ManageTasks;
