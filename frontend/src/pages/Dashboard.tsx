import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ManagerDashboard from "./ManagerDashboard";
import TeamMemberDashboard from "./TeamMemberDashboard";

export default function Dashboard() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ get data from localStorage (FIXED)
    const storedRole = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    // ❌ if no token → go to login
    if (!token) {
      setLoading(false);
      return;
    }

    setRole(storedRole);
    setLoading(false);
  }, []);

  // ⏳ wait until data loads
  if (loading) return null;

  // ❌ no role → redirect to login
  if (!role) {
    return <Navigate to="/login" />;
  }

  // ✅ render correct dashboard
  return role === "manager" ? (
    <ManagerDashboard />
  ) : (
    <TeamMemberDashboard />
  );
}