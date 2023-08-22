const express = require("express");
const app = express();
const PORT = 8080;

// for encrypting API
require("dotenv").config();

app.use(express.json());

app.listen(PORT, () => console.log(`It's alive on http://localhost:${PORT}`));

app.get("/toggl", async (req, res) => {
  const toggl = async function () {
    const response = await fetch(
      "https://api.track.toggl.com/api/v9/me?with_related_data=true",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${process.env.AUTH_TOKEN}:api_token`)}`,
        },
      }
    );
    const data = await response.json();
    const hours = data.projects[8].actual_hours;
    return hours;
  };
  const hours = await toggl();
  res.status(200).json({ hours });
});
