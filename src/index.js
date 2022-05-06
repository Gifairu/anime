import express from "express";
import fs from "fs";
const port = process.env.PORT || 3333;

const app = express();

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

import ecchi from "./scrape/ecchi/index.js";
import hentai from "./scrape/hentai/index.js";
import hentaibondage from "./scrape/hentaibondage/index.js";
import monstergirl from "./scrape/monstergirl/index.js";
import rule34 from "./scrape/rule34/index.js";
import oppaigif from "./scrape/oppaigif/index.js";
import oppailove from "./scrape/OppaiLove/index.js";

setInterval(async () => {
  ecchi();
  hentai();
  hentaibondage();
  monstergirl();
  rule34();
  oppailove();
  oppaigif();
}, 15000);

app.get("/", function (req, res) {
  res.send({ hello: "world" });
});

app.get("/ecchi", function (req, res) {
  let json = fs.readFileSync(__dirname + "/scrape/ecchi/database.json");
  res.send(JSON.parse(json));
});

app.get("/hentai", function (req, res) {
  let json = fs.readFileSync(__dirname + "/scrape/hentai/database.json");
  res.send(JSON.parse(json));
});

app.get("/hentaibondage", function (req, res) {
  let json = fs.readFileSync(__dirname + "/scrape/hentaibondage/database.json");
  res.send(JSON.parse(json));
});

app.get("/monstergirl", function (req, res) {
  let json = fs.readFileSync(__dirname + "/scrape/monstergirl/database.json");
  res.send(JSON.parse(json));
});

app.get("/rule34", function (req, res) {
  let json = fs.readFileSync(__dirname + "/scrape/rule34/database.json");
  res.send(JSON.parse(json));
});

app.get("/oppailove", function (req, res) {
  let json = fs.readFileSync(__dirname + "/scrape/OppaiLove/database.json");
  res.send(JSON.parse(json));
});

app.get("/oppaigif", function (req, res) {
  let json = fs.readFileSync(__dirname + "/scrape/oppaigif/database.json");
  res.send(JSON.parse(json));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
