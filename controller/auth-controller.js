const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1235',
  database: 'mydatabase'
}).promise(); 

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 'your_jwt_secret';

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]); 
    if (user.length > 0) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]); z
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]); // ✅
    if (user.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    const validPass = await bcrypt.compare(password, user[0].password);
    if (!validPass) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user[0].id, email: user[0].email }, secret, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
