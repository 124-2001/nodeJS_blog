const bcrypt = require("bcrypt");
const db = require("./db.service");

async function registerUser(params) {
  const saltRounds = 10; // Độ phức tạp của mã hóa bcrypt

  // Mã hóa mật khẩu sử dụng bcrypt
  const hashedPassword = await bcrypt.hash(params.password, saltRounds);

  // Thực hiện truy vấn để thêm người dùng vào cơ sở dữ liệu
  const sql = `
      INSERT INTO users (login_id, password, email, last_name, first_name, birth_date, address, phone_number)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const values = [
    params.loginId,
    hashedPassword,
    params.email,
    params.lastName,
    params.firstName,
    params.birthDate,
    params.address,
    params.phoneNumber,
  ];

  await db.query(sql, values);
}

async function loginUser(params) {
  // Truy vấn để lấy mật khẩu đã mã hóa từ cơ sở dữ liệu dựa trên loginId
  const sql = "SELECT password FROM users WHERE login_id = ?";
  const [rows] = await db.query(sql, [params.loginId]);
  let message = "Logged in successfully";
  if (rows.length === 0) {
    message = "Login failed";
    return message;
  }

  const hashedPassword = rows[0].params.password;

  const isMatch = await bcrypt.compare(params.password, hashedPassword);

  if (!isMatch) {
    message = "Login failed";
  }
  return message;
}

module.exports = {
  registerUser,
  loginUser,
};
