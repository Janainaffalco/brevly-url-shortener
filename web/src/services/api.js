const API_URL = "http://localhost:3333";

export async function createLink(data) {
  const response = await fetch(`${API_URL}/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function getLinks() {
  const response = await fetch("http://localhost:3333/links");
  const data = await response.json();

  return data;
}

export async function deleteLink(id) {
  await fetch(`http://localhost:3333/links/${id}`, {
    method: "DELETE",
  });
}

export async function exportLinks() {
  const response = await fetch("http://localhost:3333/links/export");

  const data = await response.json();

  return data.url;
}