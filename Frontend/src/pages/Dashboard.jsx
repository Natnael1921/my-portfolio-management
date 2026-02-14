import { useEffect } from "react";
import API from "../api";
export default function Dashboard() {

  useEffect(() => {
    API.get("/projects")
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
