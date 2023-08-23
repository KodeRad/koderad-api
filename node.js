const express = require("express");
const fetch = require("node-fetch"); // Import fetch
const app = express();
const PORT = 8080;

// for encrypting API
require("dotenv").config();

app.use(express.json());

app.listen(PORT, () => console.log(`It's alive on http://localhost:${PORT}`));

app.get("/up", async (req, res) => {
  try {
    res.status(200).send({
      message: "Server's up and running!💥",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/toggl", async (req, res) => {
  try {
    // authorization
    const emailPassword = Buffer.from(
      `${process.env.EMAIL}:${process.env.PASSWORD}`
    ).toString("base64");
    const authorizationHeader = `Basic ${emailPassword}`;
    const authorizationHeader2 = `Basic ${Buffer.from(
      "kondzikaoko@gmail.com:jOo&&Uk*RP90"
    ).toString("base64")}`;

    const response = await fetch(
      "https://api.track.toggl.com/api/v9/me?with_related_data=true",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.AUTHORIZATION_STRING,
          // Authorization: `Basic ${Buffer.from(
          //   "kondzikaoko@gmail.com:jOo&&Uk*RP90"
          // ).toString("base64")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log(data.projects[8].actual_hours);
    console.log(authorizationHeader);
    console.log(authorizationHeader2);
    const hours = data.projects[8].actual_hours;
    res.status(200).json(hours);
  } catch (error) {
    console.error(error);
  }
});
