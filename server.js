const express = require("express");
let mongoose = require("mongoose");
const app = express();
const api = require("./server/routes/api");

mongoose
  .connect("mongodb://127.0.0.1:27017/expense", {
    useNewUrlParser: true,
  })
  .then(() => console.log("conneted to DB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use("/", api);

const port = 3000;

app.listen(port, function () {
  console.log(`Running server on port ${port}`);
});
