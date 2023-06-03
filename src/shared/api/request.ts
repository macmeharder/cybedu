interface Request {
  endpoint: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
  body?: any;
}
export const API = "http://209.38.245.245:5000";

export async function request({ endpoint, body, method }: Request) {
  const token = localStorage.getItem("token");

  const init: any = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  if (!token) delete init.headers["Authorization"];
  if (!body) delete init.body;

  const response = await fetch(`${API}/api/v1${endpoint}`, {
    method,
    ...init,
  });

  if (!response.ok) throw "error";

  return await response.json();
}
