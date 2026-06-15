import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  useNavigate,
} from "react-router-dom";
import toast, {
  Toaster,
} from "react-hot-toast";
import Profile from "../components/Profile";



function Dashboard() {

  const navigate =
    useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const [jobs, setJobs] = useState([]);

  const [search, setSearch] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("All");

  const [editingJobId, setEditingJobId] =
    useState(null);

  const [editData, setEditData] =
    useState({
      company: "",
      role: "",
      salary: "",
      notes: "",
    });

  const [formData, setFormData] =
    useState({
      company: "",
      role: "",
      status: "Applied",
      salary: "",
      notes: "",
    });

  /* AI Resume Analyzer States */
  const [resumeText, setResumeText] =
    useState("");

  const [
    jobDescription,
    setJobDescription,
  ] = useState("");

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [analysis, setAnalysis] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  /* Profile States */
  const [profile, setProfile] =
    useState({
      name: "",
      email: "",
      phone: "",
      skills: "",
      experience: "",
      linkedin: "",
      github: "",
    });

  const [profileLoading, setProfileLoading] =
    useState(false);


  const totalJobs = jobs.length;

  const appliedJobs = jobs.filter(
    (job) => job.status === "Applied"
  ).length;

  const interviewJobs = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const rejectedJobs = jobs.filter(
    (job) => job.status === "Rejected"
  ).length;

  const offerJobs = jobs.filter(
    (job) => job.status === "Offer"
  ).length;

  const chartData = [
    {
      name: "Applied",
      value: appliedJobs,
    },
    {
      name: "Interview",
      value: interviewJobs,
    },
    {
      name: "Rejected",
      value: rejectedJobs,
    },
    {
      name: "Offer",
      value: offerJobs,
    },
  ];

  const COLORS = [
    "#EAB308",
    "#9333EA",
    "#DC2626",
    "#16A34A",
  ];



  // Fetch jobs
  const getJobs = async () => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/jobs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setJobs(response.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setProfile(
          response.data.profile
        );
      } catch (error) {
        console.log(error);
      }
    };

  const saveProfile =
    async () => {
      try {
        setProfileLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/profile`,
          profile,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Profile Updated"
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Update Failed"
        );
      } finally {
        setProfileLoading(false);
      }
    };

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add job
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem(
          "token"
        );

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/jobs/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getJobs();

      toast.success(
        "Job added successfully"
      );

      setFormData({
        company: "",
        role: "",
        status: "Applied",
        salary: "",
        notes: "",
      });
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to add job"
      );
    }
  };

  const deleteJob = async (id) => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getJobs();

      toast.success(
        "Job deleted"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (job) => {
    setEditingJobId(job._id);

    setEditData({
      company: job.company,
      role: job.role,
      salary: job.salary,
      notes: job.notes,
    });
  };

  const saveEdit = async (id) => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/jobs/${id}`,
        {
          ...editData,
          status: jobs.find(
            (job) => job._id === id
          )?.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditingJobId(null);

      getJobs();

      toast.success(
        "Job updated"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    id,
    newStatus
  ) => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/jobs/${id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getJobs();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadResume =
    async () => {
      try {
        if (!selectedFile) {
          toast.error(
            "Please select a file"
          );
          return;
        }

        const formData =
          new FormData();

        formData.append(
          "resume",
          selectedFile
        );

        const response =
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/ai/upload-resume`,
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        setResumeText(
          response.data.resumeText
        );

        console.log(
          response.data.resumeText
        );

        toast.success(
          "Resume uploaded"
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Upload failed"
        );
      }
    };

  const analyzeResume =
    async () => {
      try {
        console.log(
          "Resume:",
          resumeText
        );

        console.log(
          "Job:",
          jobDescription
        );

        if (
          !resumeText.trim() ||
          !jobDescription.trim()
        ) {
          toast.error(
            "Please fill both fields"
          );
          return;
        }

        setLoading(true);

        const response =
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/ai/analyze`,
            {
              resumeText,
              jobDescription,
            }
          );

        console.log(
          response.data
        );

        setAnalysis(
          response.data
        );

        toast.success(
          "Analysis complete"
        );
      } catch (error) {
        console.log(
          error.response?.data
        );

        toast.error(
          "Analysis failed"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    toast.success(
      "Logged out successfully"
    );

    navigate("/");
  };

  const filteredJobs = jobs.filter(
    (job) => {
      const matchesSearch =
        job.company
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        job.role
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        filterStatus === "All" ||
        job.status === filterStatus;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

  useEffect(() => {
    getJobs();
    getProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      <Toaster />

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-gray-800 bg-gray-950 sticky top-0 z-50">
        <h1 className="text-3xl font-bold text-blue-400">
          Smart Job Tracker
        </h1>

        <div className="flex gap-4">

          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <h1 className="text-5xl font-extrabold mb-4">
          Track Your Job Applications
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Manage applications, monitor interviews,
          analyze progress, and land your dream job faster.
        </p>
      </section>

      <div className="px-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto mb-10">

          <div className="bg-blue-700 border border-blue-500 p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300">
            <h2 className="text-lg font-medium">
              Total Jobs
            </h2>
            <p className="text-4xl font-bold mt-3">
              {totalJobs}
            </p>
          </div>

          <div className="bg-yellow-600 border border-yellow-400 p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300">
            <h2 className="text-lg font-medium">
              Applied
            </h2>
            <p className="text-4xl font-bold mt-3">
              {appliedJobs}
            </p>
          </div>

          <div className="bg-purple-700 border border-purple-500 p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300">
            <h2 className="text-lg font-medium">
              Interview
            </h2>
            <p className="text-4xl font-bold mt-3">
              {interviewJobs}
            </p>
          </div>

          <div className="bg-red-700 border border-red-500 p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300">
            <h2 className="text-lg font-medium">
              Rejected
            </h2>
            <p className="text-4xl font-bold mt-3">
              {rejectedJobs}
            </p>
          </div>

          <div className="bg-green-700 border border-green-500 p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300">
            <h2 className="text-lg font-medium">
              Offer
            </h2>
            <p className="text-4xl font-bold mt-3">
              {offerJobs}
            </p>
          </div>

        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-center mb-5">
            Job Analytics
          </h2>

          <div className="h-[350px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label
                >
                  {chartData.map(
                    (
                      entry,
                      index
                    ) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[
                          index
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-5xl mx-auto mb-10">

          <h2 className="text-3xl font-bold text-center mb-6">
            AI Resume Analyzer
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setSelectedFile(
                    e.target.files[0]
                  )
                }
                className="mb-4 w-full bg-gray-700 p-3 rounded-lg"
              />

              <button
                onClick={uploadResume}
                className="bg-green-600 px-5 py-2 rounded-lg hover:bg-green-700 mb-4 w-full"
              >
                Upload Resume PDF
              </button>

              <textarea
                placeholder="Resume text will appear here..."
                value={resumeText}
                onChange={(e) =>
                  setResumeText(
                    e.target.value
                  )
                }
                className="bg-gray-700 p-4 rounded-lg h-44 outline-none resize-none w-full"
              />
            </div>

            <textarea
              placeholder="Paste Job Description..."
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(
                  e.target.value
                )
              }
              className="bg-gray-700 p-4 rounded-lg h-60 outline-none resize-none"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={
                analyzeResume
              }
              disabled={loading}
              className="bg-blue-600 px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading
                ? "Analyzing..."
                : "Analyze Match"}
            </button>
          </div>

          {analysis && (
            <div className="mt-8 bg-gray-700 p-6 rounded-xl">

              <h3 className="text-2xl font-bold text-green-400">
                Match Score:
                {" "}
                {
                  analysis.matchScore
                }
                %
              </h3>

              <div className="mt-4">
                <h4 className="font-bold text-lg">
                  Matched Skills
                </h4>

                <p className="text-green-400">
                  {
                    analysis
                      .matchedSkills
                      ?.join(", ")
                  }
                </p>
              </div>

              <div className="mt-4">
                <h4 className="font-bold text-lg">
                  Missing Skills
                </h4>

                <p className="text-red-400">
                  {
                    analysis
                      .missingSkills
                      ?.join(", ")
                  }
                </p>
              </div>

              <div className="mt-4">
                <h4 className="font-bold text-lg">
                  Suggestions
                </h4>

                <ul className="list-disc ml-5 text-gray-300">
                  {analysis.suggestions?.map(
                    (
                      suggestion,
                      index
                    ) => (
                      <li
                        key={index}
                      >
                        {
                          suggestion
                        }
                      </li>
                    )
                  )}
                </ul>
              </div>

            </div>
          )}
        </div>

        {/* Form */}
        {/* Job Tracker Form */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto mb-10">

          <h2 className="text-3xl font-bold text-center mb-6">
            Job Application Tracker
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                className="p-3 rounded bg-gray-700 outline-none"
                required
              />

              <input
                type="text"
                name="role"
                placeholder="Role"
                value={formData.role}
                onChange={handleChange}
                className="p-3 rounded bg-gray-700 outline-none"
                required
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="p-3 rounded bg-gray-700 outline-none"
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Rejected</option>
                <option>Offer</option>
              </select>

              <input
                type="number"
                name="salary"
                placeholder="Salary"
                value={formData.salary}
                onChange={handleChange}
                className="p-3 rounded bg-gray-700 outline-none"
              />

              <input
                type="text"
                name="notes"
                placeholder="Notes"
                value={formData.notes}
                onChange={handleChange}
                className="p-3 rounded bg-gray-700 outline-none col-span-2"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-600 px-5 py-2 rounded hover:bg-blue-700"
            >
              Add Job
            </button>
          </form>
        </div>

        <div className="max-w-4xl mx-auto flex gap-4 mb-6">

          <input
            type="text"
            placeholder="Search company or role..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 p-3 rounded bg-gray-800 text-white outline-none"
          />

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(
                e.target.value
              )
            }
            className="p-3 rounded bg-gray-800 text-white"
          >
            <option value="All">
              All
            </option>

            <option value="Applied">
              Applied
            </option>

            <option value="Interview">
              Interview
            </option>

            <option value="Rejected">
              Rejected
            </option>

            <option value="Offer">
              Offer
            </option>
          </select>

        </div>

        {/* Jobs List */}
        <div className="max-w-4xl mx-auto grid gap-4">
          {filteredJobs.length === 0 ? (
            <div className="bg-gray-800 rounded-2xl p-10 text-center shadow-lg">
              <h2 className="text-2xl font-bold text-gray-300">
                No Jobs Found
              </h2>

              <p className="text-gray-500 mt-2">
                Add a new job application to get started.
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition duration-300"
              >
                {editingJobId === job._id ? (
                  <>
                    <input
                      type="text"
                      value={editData.company}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          company: e.target.value,
                        })
                      }
                      className="w-full p-3 rounded bg-gray-700 mb-3"
                    />

                    <input
                      type="text"
                      value={editData.role}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          role: e.target.value,
                        })
                      }
                      className="w-full p-3 rounded bg-gray-700 mb-3"
                    />

                    <input
                      type="number"
                      value={editData.salary}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          salary: e.target.value,
                        })
                      }
                      className="w-full p-3 rounded bg-gray-700 mb-3"
                    />

                    <input
                      type="text"
                      value={editData.notes}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          notes: e.target.value,
                        })
                      }
                      className="w-full p-3 rounded bg-gray-700 mb-3"
                    />
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold">
                          {job.company}
                        </h2>

                        <p className="text-gray-400 mt-1">
                          {job.role}
                        </p>
                      </div>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${job.status === "Applied"
                          ? "bg-yellow-500"
                          : job.status === "Interview"
                            ? "bg-purple-600"
                            : job.status === "Rejected"
                              ? "bg-red-600"
                              : "bg-green-600"
                          }`}
                      >
                        {job.status}
                      </span>
                    </div>

                    <div className="mt-5 flex justify-between items-center">
                      <p className="text-lg font-semibold text-green-400">
                        ₹{job.salary || 0}
                      </p>

                      <select
                        value={job.status}
                        onChange={(e) =>
                          updateStatus(
                            job._id,
                            e.target.value
                          )
                        }
                        className="bg-gray-700 p-2 rounded-lg"
                      >
                        <option>
                          Applied
                        </option>

                        <option>
                          Interview
                        </option>

                        <option>
                          Rejected
                        </option>

                        <option>
                          Offer
                        </option>
                      </select>
                    </div>

                    {job.notes && (
                      <div className="mt-4 bg-gray-700 p-3 rounded-lg">
                        <p className="text-gray-300 text-sm">
                          {job.notes}
                        </p>
                      </div>
                    )}
                  </>
                )}

                <div className="flex gap-3 mt-5">
                  {editingJobId === job._id ? (
                    <button
                      onClick={() =>
                        saveEdit(job._id)
                      }
                      className="bg-green-600 px-5 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleEdit(job)
                      }
                      className="bg-yellow-500 px-5 py-2 rounded-lg hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() =>
                      deleteJob(job._id)
                    }
                    className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

}

export default Dashboard;
