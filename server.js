const app = require('./app');
const db = require('./src/config/db');   // ← Added for DB connection
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Test MySQL connection (XAMPP)
    const connection = await db.getConnection();
    console.log('✅ MySQL Database Connected Successfully (XAMPP)');
    connection.release();

    // Start Express server only if DB is connected
    app.listen(PORT, () => {
      console.log(`🚀 Backend running on http://localhost:${PORT}`);
      console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
    });

  } catch (error) {
    console.error('❌ Database Connection Failed:', error.message);
    console.error('Make sure XAMPP MySQL is running and credentials in .env are correct!');
    process.exit(1);   // Stop the app if DB is not connected
  }
}

// Start everything
startServer();