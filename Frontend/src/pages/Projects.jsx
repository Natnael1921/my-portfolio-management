import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api";
import "../styles/Projects.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "personal",
    description: "",
    liveDemoUrl: "",
    githubUrl: "",
    image: null,
  });

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle text change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("liveDemoUrl", formData.liveDemoUrl);
      data.append("githubUrl", formData.githubUrl);
      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editingProject) {
        await API.put(`/projects/${editingProject._id}`, data);
      } else {
        await API.post("/projects", data);
      }

      setModalOpen(false);
      setEditingProject(null);

      setFormData({
        title: "",
        category: "personal",
        description: "",
        liveDemoUrl: "",
        githubUrl: "",
        image: null,
      });

      fetchProjects();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);

    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      liveDemoUrl: project.liveDemoUrl || "",
      githubUrl: project.githubUrl || "",
      image: null,
    });

    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    await API.delete(`/projects/${id}`);
    fetchProjects();
  };

  if (loading)
    return (
      <div className="projects-container">
        <Sidebar />
        <div className="projects-content">Loading...</div>
      </div>
    );

  return (
    <div className="projects-container">
      <Sidebar />

      <div className="projects-content">
        <div className="projects-header">
          <h1>Projects</h1>

          <button
            className="add-button"
            onClick={() => {
              setEditingProject(null);
              setModalOpen(true);
            }}
          >
            + Add Project
          </button>
        </div>

        {/* Grid */}
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="project-image"
              />

              <div className="project-info">
                <h2>{project.title}</h2>

                <p>{project.description}</p>

                <span className={`project-type ${project.category}`}>
                  {project.category}
                </span>

                <div className="project-actions">
                  <button onClick={() => handleEdit(project)}>Edit</button>

                  <button onClick={() => handleDelete(project._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {modalOpen && (
          <div className="modal-overlay" onClick={() => setModalOpen(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2>{editingProject ? "Edit Project" : "Add Project"}</h2>

              <form onSubmit={handleSubmit} className="modal-form">
                <label>
                  Project Title
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Category
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                  </select>
                </label>

                <label>
                  Description
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Live Demo URL
                  <input
                    name="liveDemoUrl"
                    value={formData.liveDemoUrl}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  GitHub URL
                  <input
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                  />
                </label>
                <label className="file-input">
                  Project Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>

                <div className="modal-buttons">
                  <button type="submit" className="save-button">
                    {editingProject ? "Update Project" : "Create Project"}
                  </button>

                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
