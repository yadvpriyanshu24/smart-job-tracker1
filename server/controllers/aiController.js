export const analyzeResume =
 async (req, res) => {
  try {
   const {
    resumeText,
    jobDescription,
   } = req.body;

   if (
    !resumeText ||
    !jobDescription
   ) {
    return res.status(400).json({
     success: false,
     message:
      "Resume and Job Description are required",
    });
   }

   // Convert to lowercase
   const resume =
    resumeText
     .toLowerCase()
     .replace(/\s+/g, " ")
     .replace(/ode\.js/g, "node.js")
     .replace(/avascript/g, "javascript")
     .replace(/tml/g, "html")
     .replace(/react js/g, "react.js")
     .replace(/express js/g, "express.js");

   const job =
    jobDescription
     .toLowerCase()
     .replace(/\s+/g, " ");

   // Common tech skills
   const skills = [
    "react",
    "react.js",
    "node.js",
    "node",
    "express",
    "express.js",
    "mongodb",
    "javascript",
    "js",
    "html",
    "css",
    "tailwind",
    "tailwind css",
    "redux",
    "mysql",
    "sql",
    "postgresql",
    "docker",
    "aws",
    "firebase",
    "git",
    "github",
    "rest api",
    "api",
    "jwt",
    "c++",
    "dsa",
    "dbms",
    "oop",
   ];

   const matchedSkills =
    skills.filter(
     (skill) =>
      resume.includes(skill) &&
      job.includes(skill)
    );

   const missingSkills =
    skills.filter(
     (skill) =>
      !resume.includes(skill) &&
      job.includes(skill)
    );

   const matchScore =
    Math.round(
     (matchedSkills.length /
      (matchedSkills.length +
       missingSkills.length ||
       1)) *
     100
    );

   const suggestions = [];

   if (
    missingSkills.length > 0
   ) {
    suggestions.push(
     `Add these skills: ${missingSkills.join(
      ", "
     )}`
    );
   }

   if (matchScore < 60) {
    suggestions.push(
     "Improve resume with more relevant technologies and projects."
    );
   }

   if (matchScore >= 80) {
    suggestions.push(
     "Strong profile match. Apply confidently."
    );
   }

   res.status(200).json({
    success: true,
    matchScore,
    matchedSkills,
    missingSkills,
    suggestions,
   });
  } catch (error) {
   console.log(error);

   res.status(500).json({
    success: false,
    message:
     error.message,
   });
  }
 };