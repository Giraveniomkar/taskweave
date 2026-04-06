const API_URL =  "https://taskweave-backend-59rl.onrender.com"; 
// 👉 After deployment, change to your Render URL

// ================= LOGIN =================

export const loginManager = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/api/manager/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};

export const loginMember = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/api/member/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};

// ================= TOKEN HELPER =================

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found. Please login again.");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// ================= TASKS =================

export const createTask = async (task: any) => {
  const res = await fetch(`${API_URL}/api/task/create`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(task),
  });

  return res.json();
};

export const getTasks = async () => {
  const res = await fetch(`${API_URL}/api/task`, {
    headers: getAuthHeaders(),
  });

  return res.json();
};

// ================= LOGOUT =================

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};