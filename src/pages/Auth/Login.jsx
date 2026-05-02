import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { validateEmail } from "../../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return toast.error("Please enter a valid email");
    if (!password) return toast.error("Please enter your password");
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
      setUser(data);
      toast.success("Welcome back!");
      navigate(data.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mt-12">
        <h1 className="text-3xl font-bold text-slate-800 mb-1">Welcome Back</h1>
        <p className="text-slate-500 text-sm mb-8">Please enter your details to log in</p>
        <form onSubmit={handleSubmit}>
          <Input label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="mike@example.com" />
          <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
          <button type="submit" disabled={loading}
            className="w-full bg-[#1368EC] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-all mt-2 disabled:opacity-60">
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>
        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#1368EC] font-semibold hover:underline">SignUp</Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
