const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.get("/hello-world", (req, res) => {
  //   res.send("dummy content");
  const pathToHtmlFile = path.resolve(__dirname, "../dist/hello-world.html");
  const content = fs.readFileSync(pathToHtmlFile, "utf-8");
  res.send(content);
});

app.get("/kiwi", (req, res) => {
  //   res.send("dummy content");
  const pathToHtmlFile = path.resolve(__dirname, "../dist/kiwi.html");
  const content = fs.readFileSync(pathToHtmlFile, "utf-8");
  res.send(content);
});

app.use("/static", express.static(path.resolve(__dirname, "../dist")));

app.listen(3000, () => {
  console.log("App running");
});
