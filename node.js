const express = require("express");
const axios = require("axios"); // Import fetch
const app = express();
const PORT = 8080;

// for encrypting API
require("dotenv").config();

app.use(express.json());

app.listen(PORT, () => console.log(`It's alive on http://localhost:${PORT}`));

app.get("/toggl", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.track.toggl.com/api/v9/me?with_related_data=true",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${process.env.AUTH_TOKEN}:api_token`
          )}`,
        },
      }
    );
    console.log(response);
    const data = await response.data;
    const hours = data.projects[8].actual_hours;
    res.status(200).json({ hours });
  } catch (error) {
    console.log(response);
    console.error(error);
  }
});
