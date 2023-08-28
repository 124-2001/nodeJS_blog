const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service'); // Thay đổi đường dẫn đến service của bạn

// Tuyến đường đăng ký người dùng
router.post('/register', async (req, res) => {
  try {
    await authService.registerUser(req.body); // Sử dụng service để đăng ký người dùng
    res.status(201).json({ message: 'User registered successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error'});
  }
});

// Tuyến đường đăng nhập người dùng
router.post('/login', async (req, res) => {
  try {
    const message = await authService.loginUser(req.body); // Sử dụng service để đăng nhập người dùng
    if (message === 'Logged in successfully') {
      res.status(200).json({ message });
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
