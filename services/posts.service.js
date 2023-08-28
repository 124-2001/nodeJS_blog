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
  const result = await db.query(
    `INSERT INTO posts 
    (title, content, created, creator, description, is_public, updated, updater, view_count) 
    VALUES 
    ("${param.title}", "${param.content}", "${param.created}", "${param.creator}", "${param.description}", 
    ${param.is_public ? 1 : 0}, "${param.updated}", "${param.updater}", ${param.view_count})`
  );

  let message = "Error in creating post";

  if (result.affectedRows) {
    message = "Post created successfully";
  }

  return { message };
}

async function update(id, param) {
  const result = await db.query(
    `UPDATE posts 
    SET title="${param.title}", content="${param.content}", created="${param.created}", 
    creator="${param.creator}", description="${param.description}", 
    is_public=${param.is_public ? 1 : 0}, updated="${param.updated}", updater="${param.updater}", 
    view_count=${param.view_count}
    WHERE id=${id}`
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

async function getTagsInPost(id,page =1){
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
  getTagsInPost
};
