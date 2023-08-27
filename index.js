const express = require("express");
const app = express();
const port = 3005;
const postRouter = require("./routers/posts.router");
const tagRouter = require("./routers/tags.router");
const roleRouter = require("./routers/roles.router");
const userRouter = require("./routers/users.router");

app.use(express.json());
app.use(
    express.urlencoded({
      extended: true,
    })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/api/posts", postRouter);
app.use("/api/tags", tagRouter);
app.use("/api/roles", roleRouter);
app.use("/api/users", userRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
