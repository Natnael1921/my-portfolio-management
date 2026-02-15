import Project from "../models/project.model.js";

// GET all projects (public)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE new project (admin only later)
export const createProject = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    const { title, description, category, tech, github, live } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: "Required fields missing" });
    }

   const imageUrl = req.file ? req.file.path : "";


    const project = new Project({
      title,
      description,
      category,
      tech,
      github,
      live,
      imageUrl,
    });

    await project.save();

    res.status(201).json(project);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE project
export const updateProject = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    let updateData = {
      title,
      description,
      category,
    };

    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// DELETE project
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
