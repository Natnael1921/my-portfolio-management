import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["work", "personal"],
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    projectUrl: {
      type: String,
    },
    techStack: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
