const bcrypt = require('bcryptjs');
const db = require('../src/config/database');

async function updateAdminUser() {
  try {
    const email = 'admin@example.com';
    const password = 'admin123';
    const role = 'admin';
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Check if user exists
    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (existingUser.rows.length > 0) {
      // Update existing user
      await db.query(
        'UPDATE users SET password = $1, role = $2 WHERE email = $3',
        [hashedPassword, role, email]
      );
      console.log('✅ Admin user updated successfully');
    } else {
      // Create new user
      await db.query(
        'INSERT INTO users (email, password, role) VALUES ($1, $2, $3)',
        [email, hashedPassword, role]
      );
      console.log('✅ Admin user created successfully');
    }
    
    console.log('📧 Email: admin@example.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Role: admin');
    
  } catch (error) {
    console.error('❌ Error updating admin user:', error);
  } finally {
    process.exit(0);
  }
}

updateAdminUser();
