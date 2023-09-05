const db = require("./db.service");
const pagging = require("../paging.helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = pagging.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, title, content, created, creator, description, is_public, updated, updater, view_count
    FROM posts LIMIT ${offset},${config.listPerPage}`
  );
  const data = pagging.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(param) {
  const currentTime = new Date(); 
  const result = await db.query(
    `INSERT INTO posts 
    (title, content, created, creator, description, is_public, view_count) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?)`,
    [param.title, param.content, currentTime, param.creator, param.description, param.is_public ? 1 : 0, 0]
  );

  let message = "Error in creating post";

  if (result.affectedRows) {
    message = "Post created successfully";
  }

  return { message };
}

async function update(id, param) {
  const currentUpdateTime = new Date(); 
  const result = await db.query(
    `UPDATE posts 
    SET title=?, content=?, 
    description=?, is_public=?, 
    updated=?, updater=?, view_count=?
    WHERE id=?`,
    [param.title, param.content, param.description, param.is_public ? 1 : 0, currentUpdateTime, param.updater, param.view_count, id]
  );

  let message = "Error in updating post";

  if (result.affectedRows) {
    message = "Post updated successfully";
  }

  return { message };
}


async function remove(id) {
  const result = await db.query(
    `DELETE FROM posts WHERE id=${id}`
  );

  let message = "Error in deleting post";

  if (result.affectedRows) {
    message = "Post deleted successfully";
  }

  return { message };
}

async function getTagsInPost(id){
  const rows = await db.query(
    `SELECT tags.id, tags.name
    FROM post_tags
    JOIN tags ON post_tags.tag_id = tags.id
    WHERE post_tags.post_id=${id}`
  )
  return rows;  
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
  getTagsInPost,
};
