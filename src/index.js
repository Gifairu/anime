import express from "express";
import fs from "fs";
const port = 3000;

const app = express();

app.use(express.json());

import ecchi from "./scrape/ecchi/index.js";
import hentai from "./scrape/hentai/index.js";
import hentaibondage from "./scrape/hentaibondage/index.js";
import monstergirl from "./scrape/monstergirl/index.js";
import rule34 from "./scrape/rule34/index.js";

setInterval(async () => {
  await ecchi();
  await hentai();
  await hentaibondage();
  await monstergirl();
  await rule34();
}, 30000);

app.get("/", function (req, res) {
  res.send({ hello: "world" });
});

app.get("/ecchi", function (req, res) {
  let json = fs.readFileSync("./scrape/ecchi/database.json");
  res.send(JSON.parse(json));
});

app.get("/hentai", function (req, res) {
  let json = fs.readFileSync("./scrape/hentai/database.json");
  res.send(JSON.parse(json));
});

app.get("/hentaibondage", function (req, res) {
  let json = fs.readFileSync("./scrape/hentaibondage/database.json");
  res.send(JSON.parse(json));
});

app.get("/monstergirl", function (req, res) {
  let json = fs.readFileSync("./scrape/monstergirl/database.json");
  res.send(JSON.parse(json));
});

app.get("/rule34", function (req, res) {
  let json = fs.readFileSync("./scrape/rule34/database.json");
  res.send(JSON.parse(json));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
