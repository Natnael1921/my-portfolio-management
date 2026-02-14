import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    totalVisits: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;
