import moment from "moment";

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const formatDate = (date) => {
  if (!date) return "N/A";
  return moment(date).format("Do MMM YYYY");
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case "High": return "text-rose-500 bg-rose-50";
    case "Medium": return "text-amber-500 bg-amber-50";
    case "Low": return "text-emerald-500 bg-emerald-50";
    default: return "text-slate-500 bg-slate-50";
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case "Completed": return "text-emerald-600 bg-emerald-50";
    case "In Progress": return "text-cyan-600 bg-cyan-50";
    case "Pending": return "text-violet-600 bg-violet-50";
    default: return "text-slate-600 bg-slate-50";
  }
};

export const addThousandsSeparator = (num) => {
  if (num == null) return "0";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
