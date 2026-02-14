import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [projectsCount, setProjectsCount] = useState(0);
  const [personalCount, setPersonalCount] = useState(0);
  const [worksCount, setWorksCount] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all projects
        const projectsRes = await API.get("/projects");
        const projects = projectsRes.data;

        setProjectsCount(projects.length);

        // Count personal and works
        const personalProjects = projects.filter(
          (p) => p.type === "personal"
        );
        const worksProjects = projects.filter((p) => p.type === "work");

        setPersonalCount(personalProjects.length);
        setWorksCount(worksProjects.length);

        // Fetch visitor count
        const visitorsRes = await API.get("/visitors/count");
        setVisitorsCount(visitorsRes.data.count);
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
      </div>
    </div>
  );
}
