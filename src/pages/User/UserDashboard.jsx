import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { RiTaskLine, RiTimeLine, RiCheckboxCircleLine, RiLoader4Line, RiArrowRightLine } from "react-icons/ri";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { getPriorityColor, getStatusColor, formatDate } from "../../utils/helper";

const UserDashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.TASKS.GET_USER_DASHBOARD_DATA);
        setData(res.data);
      } catch {} finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const greeting = () => {
    const h = moment().hour();
    if (h < 12) return "Good Morning";
    if (h < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const stats = [
    { label: "Total Tasks", count: data?.statistics?.totalTasks || 0, icon: RiTaskLine, color: "bg-blue-50 text-[#1368EC]" },
    { label: "Pending Tasks", count: data?.statistics?.pendingTasks || 0, icon: RiTimeLine, color: "bg-violet-50 text-violet-500" },
    { label: "In Progress", count: data?.statistics?.inProgressTasks || 0, icon: RiLoader4Line, color: "bg-cyan-50 text-cyan-500" },
    { label: "Completed Tasks", count: data?.statistics?.completedTasks || 0, icon: RiCheckboxCircleLine, color: "bg-emerald-50 text-emerald-500" },
  ];

  const pieData = data?.charts?.taskDistribution
    ? [
        { name: "Pending", value: data.charts.taskDistribution.Pending || 0, color: "#a78bfa" },
        { name: "In Progress", value: data.charts.taskDistribution.InProgress || 0, color: "#22d3ee" },
        { name: "Completed", value: data.charts.taskDistribution.Completed || 0, color: "#34d399" },
      ]
    : [];

  const barData = data?.charts?.taskPriorityLevels
    ? [
        { name: "Low", count: data.charts.taskPriorityLevels.Low || 0, fill: "#34d399" },
        { name: "Medium", count: data.charts.taskPriorityLevels.Medium || 0, fill: "#fbbf24" },
        { name: "High", count: data.charts.taskPriorityLevels.High || 0, fill: "#f43f5e" },
      ]
    : [];

  if (loading) return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#1368EC] border-t-transparent rounded-full animate-spin" />
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
        <h2 className="text-2xl font-bold text-slate-800">{greeting()}! {user?.name}</h2>
        <p className="text-slate-500 text-sm mt-0.5">{moment().format("dddd Do MMM YYYY")}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${s.color}`}><s.icon /></div>
              <div>
                <p className="text-xl font-bold text-slate-800">{s.count}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Task Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={3}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend iconType="circle" iconSize={8} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Task Priority Levels</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} barSize={40}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {barData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Recent Tasks</h3>
          <button onClick={() => navigate("/user/tasks")} className="flex items-center gap-1 text-sm text-[#1368EC] hover:underline font-medium">
            See All <RiArrowRightLine />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-500 text-xs font-medium border-b border-slate-100">
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Priority</th>
                <th className="px-6 py-3 text-left">Created On</th>
              </tr>
            </thead>
            <tbody>
              {data?.recentTasks?.map((task, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer" onClick={() => navigate(`/user/tasks-details/${task._id}`)}>
                  <td className="px-6 py-3.5 font-medium text-slate-700">{task.title}</td>
                  <td className="px-6 py-3.5"><span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor(task.status)}`}>{task.status}</span></td>
                  <td className="px-6 py-3.5"><span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>{task.priority}</span></td>
                  <td className="px-6 py-3.5 text-slate-500">{formatDate(task.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
