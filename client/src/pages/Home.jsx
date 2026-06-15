import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-blue-500">
          Smart Job Tracker
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-gray-700 px-5 py-2 rounded hover:bg-gray-600"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-blue-600 px-5 py-2 rounded hover:bg-blue-700"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center px-6 py-24">

        <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl">
          Smart Job Tracking
          <br />
          <span className="text-blue-500">
            Powered by AI
          </span>
        </h1>

        <p className="text-gray-400 text-lg mt-6 max-w-2xl">
          Manage job applications, analyze resumes with AI,
          track interviews, offers, and rejections, organize
          your profile, and monitor career progress — all in one place.
          Built to help you land your dream job faster.
        </p>

        <div className="flex gap-5 mt-8">
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-600 px-8 py-3 rounded-lg text-lg hover:bg-blue-700"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="bg-gray-700 px-8 py-3 rounded-lg text-lg hover:bg-gray-600"
          >
            Login
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 transition">
            <h3 className="text-2xl font-semibold mb-4">
              📌 Job Tracking
            </h3>
            <p className="text-gray-400">
              Add, edit, delete, and manage all your
              job applications in one smart dashboard.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 transition">
            <h3 className="text-2xl font-semibold mb-4">
              🤖 AI Resume Analyzer
            </h3>
            <p className="text-gray-400">
              Analyze your resume against job descriptions
              and get skill-match suggestions instantly.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 transition">
            <h3 className="text-2xl font-semibold mb-4">
              📂 Resume Upload
            </h3>
            <p className="text-gray-400">
              Upload resumes directly and extract content
              for smarter AI-based analysis.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 transition">
            <h3 className="text-2xl font-semibold mb-4">
              📊 Analytics Dashboard
            </h3>
            <p className="text-gray-400">
              Visualize applications, interviews,
              offers, and rejections using charts.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 transition">
            <h3 className="text-2xl font-semibold mb-4">
              👤 Profile Management
            </h3>
            <p className="text-gray-400">
              Manage skills, education, experience,
              and personal career details.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 transition">
            <h3 className="text-2xl font-semibold mb-4">
              🔒 Secure Access
            </h3>
            <p className="text-gray-400">
              Protected authentication system using
              JWT for secure login and private routes.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-800 text-gray-500">
        © 2026 Smart Job Tracker. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;