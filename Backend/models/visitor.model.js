import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  ips: {
    type: [String],
    default: [],
  },
});

const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor; 
