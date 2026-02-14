import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [projectsCount, setProjectsCount] = useState(0);
  const [personalCount, setPersonalCount] = useState(0);
  const [worksCount, setWorksCount] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(0);
  const [latestProject, setLatestProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all projects
        const projectsRes = await API.get("/projects");
        const projects = projectsRes.data;

        setProjectsCount(projects.length);

        const personalProjects = projects.filter(
          (p) => p.category === "personal",
        );
        const worksProjects = projects.filter((p) => p.category === "work");

        setPersonalCount(personalProjects.length);
        setWorksCount(worksProjects.length);

        if (projects.length > 0) {
          const sortedProjects = projects.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          );
          setLatestProject(sortedProjects[0]);
        }

        // Fetch visitor count
        const visitorsRes = await API.get("/visitors/count");
        setVisitorsCount(visitorsRes.data?.totalVisits || 0);
      } catch (err) {
        console.log("Error fetching dashboard data:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <div className="stats-container">
          <div className="stat-card projects-card">
            <h2>All Projects</h2>
            <p>{projectsCount}</p>
          </div>

          <div className="stat-card personal-card">
            <h2>Personal Projects</h2>
            <p>{personalCount}</p>
          </div>

          <div className="stat-card works-card">
            <h2>Works</h2>
            <p>{worksCount}</p>
          </div>

          <div className="stat-card visitors-card">
            <h2>Visitors</h2>
            <p>{visitorsCount}</p>
          </div>
        </div>

        {latestProject && (
          <div className="latest-project-card">
            <h2>Latest Project</h2>
            <h3>{latestProject.title}</h3>
            <p>{latestProject.description}</p>
            <span className={`project-type ${latestProject.category}`}>
              {latestProject.category}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
