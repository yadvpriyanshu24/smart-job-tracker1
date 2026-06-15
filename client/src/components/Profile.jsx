import {
 useState,
 useEffect,
} from "react";

import {
 useNavigate,
} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Profile() {

 const navigate =
  useNavigate();

 const [profile, setProfile] = useState({
  name: "",
  email: "",
  skills: "",
  education: "",
  experience: "",
 });

 const [
  isSaved,
  setIsSaved,
 ] = useState(false);

 useEffect(() => {
  const token =
    localStorage.getItem(
      "token"
    );

  if (!token) {
    navigate("/");
    return;
  }

  getProfile();
}, [navigate]);

 const getProfile = async () => {
  try {
   const token = localStorage.getItem("token");

   const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/profile`,
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );

   setProfile(response.data);
  } catch (error) {
   console.log(error);
  }
 };

 const handleChange = (e) => {
  setProfile({
   ...profile,
   [e.target.name]: e.target.value,
  });
 };

 const saveProfile = async () => {
  console.log("Button clicked");

  try {
   const token =
    localStorage.getItem(
     "token"
    );

   const response =
    await axios.put(
     `${import.meta.env.VITE_API_URL}/api/profile`,
     profile,
     {
      headers: {
       Authorization: `Bearer ${token}`,
      },
     }
    );

   console.log(
    "Response:",
    response.data
   );

   toast.success(
    "Profile saved"
   );

   setIsSaved(true);
  } catch (error) {
   console.log(
    "Save Error:",
    error.response?.data ||
    error.message
   );

   toast.error(
    "Failed to save profile"
   );
  }
 };

 const handleLogout = () => {
  localStorage.removeItem(
   "token"
  );

  navigate("/");
 };

 return (

  <div className="min-h-screen bg-gray-900 text-white">

   <nav className="flex justify-between items-center px-8 py-5 border-b border-gray-800 bg-gray-950 sticky top-0 z-50">

    <h1 className="text-3xl font-bold text-blue-400">
     Smart Job Tracker
    </h1>

    <div className="flex gap-4">

     <button
      onClick={() =>
       navigate("/dashboard")
      }
      className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition"
     >
      Dashboard
     </button>

     <button
      onClick={handleLogout}
      className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700 transition"
     >
      Logout
     </button>

    </div>
   </nav>

   <div className="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-5xl mx-auto mt-10">
    <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">
     My Profile
    </h2>

    <div className="grid md:grid-cols-2 gap-5">

     <input
      type="text"
      name="name"
      placeholder="Full Name"
      value={profile.name}
      onChange={handleChange}
      className="bg-gray-700 p-4 rounded-lg outline-none"
     />

     <input
      type="email"
      name="email"
      placeholder="Email"
      value={profile.email}
      onChange={handleChange}
      className="bg-gray-700 p-4 rounded-lg outline-none"
     />

     <input
      type="text"
      name="skills"
      placeholder="Skills (React, Node.js, MongoDB)"
      value={profile.skills}
      onChange={handleChange}
      className="bg-gray-700 p-4 rounded-lg outline-none"
     />

     <input
      type="text"
      name="education"
      placeholder="Education"
      value={profile.education}
      onChange={handleChange}
      className="bg-gray-700 p-4 rounded-lg outline-none"
     />

     <textarea
      name="experience"
      placeholder="Experience"
      value={profile.experience}
      onChange={handleChange}
      className="bg-gray-700 p-4 rounded-lg outline-none resize-none md:col-span-2 h-32"
     />
    </div>

    <div className="flex justify-center mt-6">
     <button
      onClick={saveProfile}
      className="bg-blue-600 px-5 py-2 rounded hover:bg-blue-700"
     >
      {
       isSaved
        ? "Profile Saved ✓"
        : "Save Profile"
      }
     </button>
    </div>
   </div>
  </div>
 );
}

export default Profile;