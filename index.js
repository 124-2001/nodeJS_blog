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
  // Tạo một lỗi bằng cách ném một ngoại lệ (exception)
  const error = new Error("This is a test error");
  error.statusCode = 400;

  // Gọi next với lỗi để chuyển quyền kiểm soát đến middleware xử lý lỗi
  next(error);
});

app.use("/api/posts", postRouter);
app.use("/api/tags", tagRouter);
app.use("/api/roles", roleRouter);
app.use("/api/users", userRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  console.log("day la loi");
  const statusCode = err.statusCode || 500;
  console.error(err.message);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
