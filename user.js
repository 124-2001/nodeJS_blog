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

// Xử lý yêu cầu POST để thêm mới người dùng
router.post('/api/users', (req, res) => {
    let body = req.body;
    let data = {
        login_id: body.login_id,
        password: body.password,
        email: body.email,
        last_name: body.last_name,
        first_name: body.first_name,
        birth_date: body.birth_date,
        address: body.address,
        phone_number: body.phone_number,
        created_by: body.created_by,
        created_date: new Date(),
        last_modified_by: null,
        last_modified_date: null
    };

    let sqlQuery = "INSERT INTO users SET ?";

    let query = conn.query(sqlQuery, data, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

// Xử lý yêu cầu PUT để cập nhật một người dùng cụ thể
router.put('/api/users/:id', (req, res) => {
    let userId = req.params.id;
    let body = req.body;
    let data = {
        login_id: body.login_id,
        password: body.password,
        email: body.email,
        last_name: body.last_name,
        first_name: body.first_name,
        birth_date: body.birth_date,
        address: body.address,
        phone_number: body.phone_number,
        last_modified_by: body.last_modified_by,
        last_modified_date: new Date()
    };

    let sqlQuery = "UPDATE users SET ? WHERE id=" + userId;

    let query = conn.query(sqlQuery, data, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

// Xử lý yêu cầu GET cho danh sách người dùng
router.get('/api/users', (req, res) => {
    let sqlQuery = "SELECT * FROM users";

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

// Xử lý yêu cầu GET cho một người dùng cụ thể
router.get('/api/users/:id', (req, res) => {
    let userId = req.params.id;
    let sqlQuery = "SELECT * FROM users WHERE id=" + userId;

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

// Các tuyến đường khác có thể được đặt ở đây nếu cần

module.exports = router;