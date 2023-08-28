const db = require("./db.service");
const paging = require("../paging.helper");
const config = require("../config");

async function getMultipleTags(page = 1) {
  const offset = paging.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, created_by, created_date, last_modified_by, last_modified_date
    FROM tags LIMIT ${offset},${config.listPerPage}`
  );
  const data = paging.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function createTag(tag) {
  const result = await db.query(
    `INSERT INTO tags 
    (name, created_by, created_date, last_modified_by, last_modified_date) 
    VALUES 
    (?, ?, ?, ?, ?)`,
    [tag.name, tag.created_by, tag.created_date, tag.last_modified_by, tag.last_modified_date]
  );

  let message = "Error in creating tag";

  if (result.affectedRows) {
    message = "Tag created successfully";
  }

  return { message };
}

async function updateTag(id, tag) {
  const result = await db.query(
    `UPDATE tags 
    SET name=?, created_by=?, created_date=?, last_modified_by=?, last_modified_date=?
    WHERE id=?`,
    [tag.name, tag.created_by, tag.created_date, tag.last_modified_by, tag.last_modified_date, id]
  );

  let message = "Error in updating tag";

  if (result.affectedRows) {
    message = "Tag updated successfully";
  }

  return { message };
}

async function removeTag(id) {
  const result = await db.query(
    `DELETE FROM tags WHERE id=?`,
    [id]
  );

  let message = "Error in deleting tag";

  if (result.affectedRows) {
    message = "Tag deleted successfully";
  }

  return { message };
}
async function getPostsInTag(id){
  const rows = await db.query(
    `SELECT posts.id, posts.title,posts.content
    FROM post_tags
    JOIN posts ON post_tags.post_id = posts.id
    WHERE post_tags.tag_id=${id}`
  )
  return rows;  
}

module.exports = {
  getMultipleTags,
  createTag,
  updateTag,
  removeTag,
  getPostsInTag,
};
