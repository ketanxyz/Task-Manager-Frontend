import React, { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

const Input = ({ value, onChange, label, placeholder, type = "text", error }) => {
  const [show, setShow] = useState(false);
  const inputType = type === "password" ? (show ? "text" : "password") : type;

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>}
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all
            ${error ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-slate-200 focus:border-[#1368EC] focus:ring-2 focus:ring-blue-100"}
            bg-white text-slate-800 placeholder:text-slate-400`}
        />
        {type === "password" && (
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            {show ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
