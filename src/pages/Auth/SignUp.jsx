import React, { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RiCameraLine } from "react-icons/ri";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { validateEmail, getInitials } from "../../utils/helper";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setProfileImage(localUrl);
    const fd = new FormData();
    fd.append("image", file);
    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.UPLOAD_IMAGE, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfileImageUrl(data.imageUrl);
    } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Name is required");
    if (!validateEmail(email)) return toast.error("Invalid email");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name, email, password,
        profileImageUrl: profileImageUrl || "",
        adminInviteToken: adminToken,
      });
      setUser(data);
      toast.success("Account created!");
      navigate(data.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mt-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-1">Create Account</h1>
        <p className="text-slate-500 text-sm mb-6">Sign up to get started</p>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative cursor-pointer" onClick={() => fileRef.current.click()}>
            <div className="w-16 h-16 rounded-full bg-[#1368EC] text-white flex items-center justify-center text-xl font-bold overflow-hidden border-2 border-blue-200">
              {profileImage ? <img src={profileImage} className="w-full h-full object-cover" /> : getInitials(name || "?")}
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-white rounded-full border border-slate-200 flex items-center justify-center">
              <RiCameraLine size={11} className="text-[#1368EC]" />
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Input label="Full Name" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" />
          <Input label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com" />
          <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" />
          <Input label="Admin Invite Token (Optional)" value={adminToken} onChange={e => setAdminToken(e.target.value)} placeholder="Enter admin token if you have one" />
          <button type="submit" disabled={loading}
            className="w-full bg-[#1368EC] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-all mt-2 disabled:opacity-60">
            {loading ? "Creating..." : "CREATE ACCOUNT"}
          </button>
        </form>
        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-[#1368EC] font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
