import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiDownloadLine } from "react-icons/ri";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { getInitials } from "../../utils/helper";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axiosInstance.get(API_PATHS.USERS.GET_ALL);
        setUsers(data);
      } catch { toast.error("Failed to fetch users"); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const handleDownload = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a"); a.href = url; a.download = "users-report.xlsx"; a.click();
    } catch { toast.error("Export failed"); }
  };

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">Team Members</h2>
        <button onClick={handleDownload}
          className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-all">
          <RiDownloadLine /> Download Report
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-[#1368EC] border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <div key={user._id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#1368EC] text-white flex items-center justify-center text-base font-bold overflow-hidden shrink-0">
                  {user.profileImageUrl ? <img src={user.profileImageUrl} className="w-full h-full object-cover" alt={user.name} /> : getInitials(user.name)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 text-sm truncate">{user.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <p className="text-lg font-bold text-violet-500">{user.pendingTasks || 0}</p>
                  <p className="text-[11px] text-slate-500 font-medium">Pending</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-cyan-500">{user.inProgressTasks || 0}</p>
                  <p className="text-[11px] text-slate-500 font-medium">In Progress</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-emerald-500">{user.completedTasks || 0}</p>
                  <p className="text-[11px] text-slate-500 font-medium">Completed</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ManageUsers;
