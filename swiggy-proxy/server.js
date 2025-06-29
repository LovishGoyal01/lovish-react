// server.js
const express = require("express");
const cors = require("cors");
// ✂️ we no longer import node-fetch; Node 20 has fetch built in

const app = express();
app.use(cors());

const SWIGGY_URL =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.210994&lng=74.9454745&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

app.get("/api/restaurants", async (req, res) => {
  try {
    // use the global fetch
    const swiggyRes = await fetch(SWIGGY_URL, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (!swiggyRes.ok) {
      // forward any non-200 status and body
      const text = await swiggyRes.text();
      return res.status(swiggyRes.status).send(text);
    }

    // parse JSON and forward
    const json = await swiggyRes.json();
    res.json(json);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy fetch failed" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));
