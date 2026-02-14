import Visitor from "../models/visitor.model.js";


// Increment visitor count
export const incrementVisitor = async (req, res) => {
  try {
    let visitor = await Visitor.findOne();

    // create if not exists
    if (!visitor) {
      visitor = new Visitor({ totalVisits: 1 });
    } else {
      visitor.totalVisits += 1;
    }

    await visitor.save();

    res.status(200).json({ totalVisits: visitor.totalVisits });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get visitor count
export const getVisitorCount = async (req, res) => {
  try {
    let visitor = await Visitor.findOne();

    if (!visitor) {
      return res.status(200).json({ totalVisits: 0 });
    }

    res.status(200).json({ totalVisits: visitor.totalVisits });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
