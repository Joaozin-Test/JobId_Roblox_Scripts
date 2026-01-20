const express = require("express");
const app = express();

app.use(express.json());

let servers = {};

app.post("/jobid", (req, res) => {
  const { action, username, jobId, placeId } = req.body;

  if (action === "add") {
    servers[username] = {
      username,
      jobId,
      placeId,
      lastSeen: Date.now()
    };
  }

  if (action === "remove") {
    delete servers[username];
  }

  res.json({ ok: true });
});

app.get("/list", (req, res) => {
  res.json(Object.values(servers));
});

module.exports = app;
