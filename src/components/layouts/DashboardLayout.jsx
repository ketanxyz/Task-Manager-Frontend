import React, { useContext, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import {
  RiDashboardLine, RiTaskLine, RiAddCircleLine, RiTeamLine, RiLogoutBoxLine, RiMenuLine, RiCloseLine
} from "react-icons/ri";
import { getInitials } from "../../utils/helper";

const SidebarLink = ({ to, icon: Icon, label, active, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
      ${active ? "bg-[#1368EC] text-white shadow-md shadow-blue-200" : "text-slate-600 hover:bg-blue-50 hover:text-[#1368EC]"}`}
  >
    <Icon className="text-lg shrink-0" />
    <span>{label}</span>
  </Link>
);

const DashboardLayout = ({ children, activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  const isAdmin = user?.role === "admin";
  const adminLinks = [
    { to: "/admin/dashboard", icon: RiDashboardLine, label: "Dashboard" },
    { to: "/admin/tasks", icon: RiTaskLine, label: "Manage Tasks" },
    { to: "/admin/create-task", icon: RiAddCircleLine, label: "Create Task" },
    { to: "/admin/users", icon: RiTeamLine, label: "Team Members" },
  ];
  const memberLinks = [
    { to: "/user/dashboard", icon: RiDashboardLine, label: "Dashboard" },
    { to: "/user/tasks", icon: RiTaskLine, label: "My Tasks" },
  ];
  const links = isAdmin ? adminLinks : memberLinks;

  const SidebarContent = ({ onLinkClick }) => (
    <div className="flex flex-col h-full">
      {/* User Info */}
      <div className="flex flex-col items-center py-8 px-4 border-b border-slate-100">
        <div className="relative">
          {user?.profileImageUrl ? (
            <img src={user.profileImageUrl} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#1368EC]" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#1368EC] flex items-center justify-center text-white text-xl font-bold">
              {getInitials(user?.name)}
            </div>
          )}
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#1368EC] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize">
            {user?.role}
          </span>
        </div>
        <p className="mt-4 font-semibold text-slate-800 text-sm">{user?.name}</p>
        <p className="text-xs text-slate-500 truncate max-w-full">{user?.email}</p>
      </div>
      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((link) => (
          <SidebarLink key={link.to} {...link} active={activeMenu === link.label} onClick={onLinkClick} />
        ))}
      </nav>
      {/* Logout */}
      <div className="px-3 pb-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-500 transition-all"
        >
          <RiLogoutBoxLine className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#f8f9fd]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-100 fixed top-0 left-0 h-full z-30 shadow-sm">
        <div className="px-6 pt-6">
          <h1 className="text-lg font-bold text-[#1368EC]">Task Manager</h1>
        </div>
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-sm">
        <h1 className="text-base font-bold text-[#1368EC]">Task Manager</h1>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-slate-600 p-1">
          {mobileOpen ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-white h-full shadow-2xl flex flex-col">
            <div className="px-6 pt-6 flex items-center justify-between">
              <h1 className="text-base font-bold text-[#1368EC]">Task Manager</h1>
              <button onClick={() => setMobileOpen(false)}><RiCloseLine size={22} /></button>
            </div>
            <SidebarContent onLinkClick={() => setMobileOpen(false)} />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
