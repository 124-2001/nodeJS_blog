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

// Xử lý yêu cầu POST để thêm mới vai trò
router.post('/api/roles', (req, res) => {
    let body = req.body;
    let data = {
        name: body.name,
        created_by: body.created_by,
        created_date: new Date(),
        last_modified_by: null,
        last_modified_date: null
    };

    let sqlQuery = "INSERT INTO roles SET ?";

    let query = conn.query(sqlQuery, data, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

// Xử lý yêu cầu PUT để cập nhật vai trò cụ thể
router.put('/api/roles/:id', (req, res) => {
    let roleId = req.params.id;
    let body = req.body;
    let data = {
        name: body.name,
        last_modified_by: body.last_modified_by,
        last_modified_date: new Date()
    };

    let sqlQuery = "UPDATE roles SET ? WHERE id=" + roleId;

    let query = conn.query(sqlQuery, data, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

// Xử lý yêu cầu GET cho danh sách các vai trò
router.get('/api/roles', (req, res) => {
    let sqlQuery = "SELECT * FROM roles";

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

// Xử lý yêu cầu GET cho một vai trò cụ thể
router.get('/api/roles/:id', (req, res) => {
    let roleId = req.params.id;
    let sqlQuery = "SELECT * FROM roles WHERE id=" + roleId;

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

module.exports = router;