export default function Home() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  async function send(action) {
    if (!name) return alert("Enter your name");

    await fetch("/api/shift", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, action })
    });

    load();
  }

  async function load() {
    const res = await fetch("/api/shift");
    const json = await res.json();
    setData(json.shifts);
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>🚌 Shift Log System</h1>

        <input
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div style={styles.buttons}>
          <button style={styles.start} onClick={() => send("start")}>
            🟢 Start Shift
          </button>

          <button style={styles.end} onClick={() => send("end")}>
            🔴 End Shift
          </button>
        </div>
      </div>

      <div style={styles.panel}>
        <h2>📋 Live Active Shifts</h2>

        {data.length === 0 && <p>No active shifts</p>}

        {data.map((s, i) => (
          <div key={i} style={styles.item}>
            👤 {s.name} | 🟢 {s.status} | ⏰ {s.time}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial",
    background: "#0f0f0f",
    color: "white",
    minHeight: "100vh",
    padding: 20,
    display: "flex",
    gap: 20
  },

  card: {
    width: "35%",
    background: "#1a1a1a",
    padding: 20,
    borderRadius: 12
  },

  panel: {
    width: "65%",
    background: "#141414",
    padding: 20,
    borderRadius: 12
  },

  input: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    border: "none"
  },

  buttons: {
    display: "flex",
    gap: 10,
    marginTop: 15
  },

  start: {
    flex: 1,
    padding: 10,
    background: "#00c853",
    border: "none",
    borderRadius: 8,
    color: "white",
    cursor: "pointer"
  },

  end: {
    flex: 1,
    padding: 10,
    background: "#d50000",
    border: "none",
    borderRadius: 8,
    color: "white",
    cursor: "pointer"
  },

  item: {
    background: "#1f1f1f",
    padding: 10,
    marginBottom: 8,
    borderRadius: 8
  }
};
