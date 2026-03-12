export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-zerion-key");

  if (req.method === "OPTIONS") return res.status(200).end();

  const { path } = req.query;
  const apiKey = req.headers["x-zerion-key"];

  if (!apiKey) return res.status(400).json({ error: "Missing Zerion API key" });

  const queryString = req.url.includes("?") ? "?" + req.url.split("?")[1] : "";
  const url = `https://api.zerion.io/v1/${Array.isArray(path) ? path.join("/") : path}${queryString}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Authorization": `Basic ${Buffer.from(apiKey + ":").toString("base64")}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
