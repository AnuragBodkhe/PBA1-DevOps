const db = require('../config/sqlite');

class User {
  static async create(userData) {
    const { email, password, role = 'user' } = userData;
    const result = await db.run(
      'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
      [email, password, role]
    );
    return await User.findById(result.rows[0].id);
  }

  static async findByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await db.query(
      'SELECT id, email, role, created_at FROM users WHERE id = ?',
      [id]
    );
    return result.rows[0];
  }

  static async updateRole(userId, role) {
    await db.run('UPDATE users SET role = ? WHERE id = ?', [role, userId]);
    const result = await db.query(
      'SELECT id, email, role FROM users WHERE id = ?',
      [userId]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.run('DELETE FROM users WHERE id = ?', [id]);
    return result.rows[0];
  }
}

module.exports = User;
