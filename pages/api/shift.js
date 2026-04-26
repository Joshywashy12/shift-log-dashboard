let shifts = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { name, action } = req.body;

    if (!name || !action) {
      return res.status(400).json({ error: "Missing data" });
    }

    const entry = {
      name,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      action
    };

    if (action === "start") {
      shifts.push({ ...entry, status: "ON SHIFT" });
    }

    if (action === "end") {
      shifts = shifts.filter((s) => s.name !== name);
    }

    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    return res.status(200).json({ shifts });
  }

  res.status(405).json({ error: "Method not allowed" });
}
