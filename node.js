const express = require("express");
const fetch = require("node-fetch"); // Import fetch
const app = express();
const PORT = 8080;

// for encrypting API
require("dotenv").config();

app.use(express.json());

app.listen(PORT, () => console.log(`It's alive on http://localhost:${PORT}`));

app.get("/toggl", async (req, res) => {
  try {
    // authorization
    const emailPassword = Buffer.from(
      `${process.env.EMAIL}:${process.env.PASSWORD}`
    ).toString("base64");
    const authorizationHeader = `Basic ${emailPassword}`;

    const response = await fetch(
      "https://api.track.toggl.com/api/v9/me?with_related_data=true",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authorizationHeader}`,
          //   Authorization: `Basic ${Buffer.from(
          //     "kondzikaoko@gmail.com:jOo&&Uk*RP90"
          //   ).toString("base64")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    const hours = data.data?.projects[8].actual_hours;
    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
  }
});
