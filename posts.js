// posts.js
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const conn = require('./db');

router.use(bodyParser.json());

/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results) {
    return JSON.stringify({ "status": 200, "error": null, "response": results });
}

router.get('/api/posts', (req, res) => {
    let sqlQuery = "SELECT * FROM posts";

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

router.get('/api/posts/:id', (req, res) => {
    let postId = req.params.id;
    let sqlQuery = "SELECT * FROM posts WHERE id=" + postId;

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

router.post('/api/posts', (req, res) => {
    let body = req.body;
    let data = {
        title: body.title,
        content: body.content,
        description: body.description,
        view_count: body.view_count,
        created : body.created,
        creator : body.creator,
        updated : body.updated
    };

    let sqlQuery = "INSERT INTO posts SET ?";

    let query = conn.query(sqlQuery, data, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

router.put('/api/posts/:id', (req, res) => {
    let sqlQuery = "UPDATE items SET title='" + req.body.title + "', body='" + req.body.body + "' WHERE id=" + req.params.id;

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

module.exports = router;
