const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const postsRoutes = require('./posts');
const tagsRoutes = require('./tags');
const usersRoutes = require('./user');
const rolesRoutes = require('./roles');

app.use(bodyParser.json());

// Sử dụng tuyến đường cho bảng posts
app.use(postsRoutes);

// Sử dụng tuyến đường cho bảng tags
app.use(tagsRoutes);

// Sử dụng tuyến đường cho bảng user
app.use(usersRoutes);

// Sử dụng tuyến đường cho bảng roles
app.use(rolesRoutes);


