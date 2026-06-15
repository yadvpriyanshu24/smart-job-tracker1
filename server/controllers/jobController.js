import Job from "../models/Job.js";

export const addJob = async (
  req,
  res
) => {
  try {
    const {
      company,
      role,
      status,
      salary,
      notes,
    } = req.body;

    const job =
      await Job.create({
        company,
        role,
        status,
        salary,
        notes,
        userId: req.user.id,
      });

    res.status(201).json({
      success: true,
      message:
        "Job added successfully",
      job,
    });
  } catch (error) {
    console.log(
      "ADD JOB ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getJobs = async (
  req,
  res
) => {
  try {
    const jobs =
      await Job.find({
        userId: req.user.id,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateJobStatus = async (
  req,
  res
) => {
  try {
    const {
      company,
      role,
      salary,
      notes,
      status,
    } = req.body;

    const job =
      await Job.findByIdAndUpdate(
        req.params.id,
        {
          company,
          role,
          salary,
          notes,
          status,
        },
        { new: true }
      );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Job updated successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};