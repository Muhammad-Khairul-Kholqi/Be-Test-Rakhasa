const bcrypt = require('bcryptjs');
const db = require('./config/db');
const {
    ROLES
} = require('./config/roles');

const createAdminUser = async () => {
    try {
        const adminUser = {
            username: 'admin',
            password: await bcrypt.hash('admin123', 10),
            role: ROLES.ADMIN
        };

        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [adminUser.username]);

        if (users.length === 0) {
            await db.query(
                'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                [adminUser.username, adminUser.password, adminUser.role]
            );
            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        process.exit();
    }
};

createAdminUser();