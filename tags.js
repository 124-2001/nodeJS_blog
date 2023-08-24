// tags.js
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

// Xử lý yêu cầu GET cho danh sách tags
router.get('/api/tags', (req, res) => {
    let sqlQuery = "SELECT * FROM tags";

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

// Xử lý yêu cầu GET cho một tag cụ thể
router.get('/api/tags/:id', (req, res) => {
    let tagId = req.params.id;
    let sqlQuery = "SELECT * FROM tags WHERE id=" + tagId;

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

// Xử lý yêu cầu POST để thêm tag mới
router.post('/api/tags', (req, res) => {
    let body = req.body;
    let data = {
        name: body.name,
        created_by: body.created_by,
        created_date: new Date(),
        last_modified_by: null,
        last_modified_date: null
    };

    let sqlQuery = "INSERT INTO tags SET ?";

    let query = conn.query(sqlQuery, data, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

// Xử lý yêu cầu PUT để cập nhật một tag cụ thể
router.put('/api/tags/:id', (req, res) => {
    let tagId = req.params.id;
    let body = req.body;
    let data = {
        name: body.name,
        last_modified_by: body.last_modified_by,
        last_modified_date: new Date()
    };

    let sqlQuery = "UPDATE tags SET ? WHERE id=" + tagId;

    let query = conn.query(sqlQuery, data, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

// Xử lý yêu cầu DELETE để xóa một tag cụ thể
router.delete('/api/tags/:id', (req, res) => {
    let tagId = req.params.id;
    let sqlQuery = "DELETE FROM tags WHERE id=" + tagId;

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

module.exports = router;
