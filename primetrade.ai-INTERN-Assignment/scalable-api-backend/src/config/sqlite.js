const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, '../../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    initializeDatabase();
  }
});

function initializeDatabase() {
  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create tasks table
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
      user_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Create admin user
  createAdminUser();
}

async function createAdminUser() {
  const email = 'admin@example.com';
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 12);

  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
      if (err) {
        console.error('Error checking admin user:', err);
        reject(err);
        return;
      }

      if (!row) {
        db.run(
          'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
          [email, hashedPassword, 'admin'],
          function(err) {
            if (err) {
              console.error('Error creating admin user:', err);
              reject(err);
            } else {
              console.log('✅ Admin user created successfully');
              console.log('📧 Email: admin@example.com');
              console.log('🔑 Password: admin123');
              console.log('👤 Role: admin');
              resolve();
            }
          }
        );
      } else {
        // Update existing admin user password
        db.run(
          'UPDATE users SET password = ?, role = ? WHERE email = ?',
          [hashedPassword, 'admin', email],
          function(err) {
            if (err) {
              console.error('Error updating admin user:', err);
              reject(err);
            } else {
              console.log('✅ Admin user updated successfully');
              console.log('📧 Email: admin@example.com');
              console.log('🔑 Password: admin123');
              console.log('👤 Role: admin');
              resolve();
            }
          }
        );
      }
    });
  });
}

// Promisify database methods for easier use
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve({ rows });
      }
    });
  });
};

const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ 
          rows: [{ id: this.lastID }] 
        });
      }
    });
  });
};

module.exports = {
  query,
  run,
  db
};
