
import mongoose from "mongoose";

const jobSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      company: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        default: "Applied",
      },

      salary: {
        type: Number,
      },

      notes: {
        type: String,
      },

    },
    { timestamps: true }
  );

export default mongoose.model(
  "Job",
  jobSchema
);