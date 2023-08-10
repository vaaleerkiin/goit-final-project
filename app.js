const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./routes/api/user");
const boardRouter = require("./routes/api/board");
const columnRouter = require("./routes/api/column");
const taskRouter = require("./routes/api/task");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://torn80beta.github.io/"],
    // origin: "https://torn80beta.github.io/",
  })
);
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/boards", boardRouter);
app.use("/api/columns", columnRouter);
app.use("/api/tasks", taskRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error " } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
