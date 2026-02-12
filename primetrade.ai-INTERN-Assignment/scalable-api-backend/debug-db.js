const db = require('./src/config/sqlite');

async function debugDatabase() {
  try {
    console.log('Testing database connection...');
    
    // Check if admin user exists
    const result = await db.query('SELECT * FROM users WHERE email = ?', ['admin@example.com']);
    console.log('Admin user query result:', result.rows);
    
    if (result.rows.length > 0) {
      console.log('Admin user found:', result.rows[0]);
    } else {
      console.log('Admin user not found');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Database error:', error);
    process.exit(1);
  }
}

debugDatabase();
