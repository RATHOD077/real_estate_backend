exports.login = (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@gmail.com' && password === '1234') {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
};