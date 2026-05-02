import React, { useState, useEffect } from "react";
import { RiCloseLine, RiSearchLine } from "react-icons/ri";
import { getInitials } from "../../utils/helper";

const SelectUsersModal = ({ users, selectedUsers, onConfirm, onClose }) => {
  const [selected, setSelected] = useState(selectedUsers || []);
  const [search, setSearch] = useState("");

  const filtered = users?.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (userId) => {
    setSelected(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Select Users</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><RiCloseLine size={20} /></button>
        </div>
        <div className="px-6 py-3 border-b border-slate-100">
          <div className="relative">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#1368EC]"
            />
          </div>
        </div>
        <div className="max-h-80 overflow-y-auto px-2 py-2">
          {filtered?.map(user => (
            <label key={user._id} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-[#1368EC] text-white text-xs flex items-center justify-center font-semibold overflow-hidden shrink-0">
                {user.profileImageUrl ? <img src={user.profileImageUrl} className="w-full h-full object-cover" /> : getInitials(user.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
              <input type="checkbox" checked={selected.includes(user._id)} onChange={() => toggle(user._id)} className="w-4 h-4 accent-[#1368EC]" />
            </label>
          ))}
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
          <button onClick={() => onConfirm(selected)} className="flex-1 py-2.5 bg-[#1368EC] text-white rounded-xl text-sm font-medium hover:bg-blue-700">Done</button>
        </div>
      </div>
    </div>
  );
};

export default SelectUsersModal;
