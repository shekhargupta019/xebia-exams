const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const SWAPI_ROOT_URL = "https://swapi.dev/api";

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.get("/api/planets/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(
      `${SWAPI_ROOT_URL}/planets/?search=${name}`
    );
    res.send(response.data);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.post("/api/auth", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const response = await axios.get(`${SWAPI_ROOT_URL}/people`);
    const person = response.data.results.find(
      (item) => item.name === userName && item.birth_year === password
    );

    if (person) {
      return res.status(200).send(person);
    }
    res.status(403).send({ error: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5002;
app.listen(PORT);
