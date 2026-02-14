import Visitor from "../models/visitor.model.js";

export const incrementVisitor = async (req, res) => {
  try {
    const visitorIp = req.ip; // get visitor IP
    let visitor = await Visitor.findOne();

    if (!visitor) {
      visitor = new Visitor({ ips: [visitorIp] });
    } else if (!visitor.ips.includes(visitorIp)) {
      visitor.ips.push(visitorIp); // only add new IPs
    }

    await visitor.save();

    res.status(200).json({ totalVisits: visitor.ips.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get visitor count
export const getVisitorCount = async (req, res) => {
  try {
    const visitor = await Visitor.findOne();
    const total = visitor ? visitor.ips.length : 0;
    res.status(200).json({ totalVisits: total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
