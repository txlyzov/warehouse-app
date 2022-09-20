const express = require("express");
const { testReq } = require("./database");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");

  // testReq();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
