const db = require('../config/db');

const initializeDatabase = async () => {
    try {
        await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        console.log('Database initialized');
    } catch (error) {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }
};

module.exports = {
    initializeDatabase
};