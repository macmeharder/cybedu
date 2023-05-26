interface Request {
  endpoint: string;
  method: "POST" | "GET";
  body?: any;
}

export async function request({ endpoint, body, method }: Request) {
  const api = "http://209.38.245.245:5000";
  const token = localStorage.getItem("token");

  const init: any = {
    headers: {
      "X-Csrf-Token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  if (!token) delete init.headers["X-Csrf-Token"];
  if (!body) delete init.body;

  const response = await fetch(`${api}/api/v1${endpoint}`, {
    method,
    ...init,
  });

  if (!response.ok) throw "error";

  return await response.json();
}
