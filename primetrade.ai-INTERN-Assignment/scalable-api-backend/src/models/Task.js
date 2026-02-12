const db = require('../config/sqlite');

class Task {
  static async create(taskData) {
    const { title, description, user_id, status = 'pending' } = taskData;
    const result = await db.run(
      'INSERT INTO tasks (title, description, user_id, status) VALUES (?, ?, ?, ?)',
      [title, description, user_id, status]
    );
    return await Task.findById(result.rows[0].id);
  }

  static async findAll(userId = null) {
    let query = `
      SELECT t.*, u.email as user_email 
      FROM tasks t 
      LEFT JOIN users u ON t.user_id = u.id
    `;
    let params = [];

    if (userId) {
      query += ' WHERE t.user_id = ?';
      params.push(userId);
    }

    query += ' ORDER BY t.created_at DESC';
    const result = await db.query(query, params);
    return result.rows;
  }

  static async findById(id, userId = null) {
    let query = `
      SELECT t.*, u.email as user_email 
      FROM tasks t 
      LEFT JOIN users u ON t.user_id = u.id 
      WHERE t.id = ?
    `;
    let params = [id];

    if (userId) {
      query += ' AND t.user_id = ?';
      params.push(userId);
    }

    const result = await db.query(query, params);
    return result.rows[0];
  }

  static async update(id, updateData, userId = null) {
    const { title, description, status } = updateData;
    let query = `
      UPDATE tasks 
      SET title = ?, description = ?, status = ?, updated_at = CURRENT_TIMESTAMP
    `;
    let params = [title, description, status];

    if (userId) {
      query += ' WHERE id = ? AND user_id = ?';
      params.push(id, userId);
    } else {
      query += ' WHERE id = ?';
      params.push(id);
    }

    await db.run(query, params);
    return await Task.findById(id, userId);
  }

  static async delete(id, userId = null) {
    let query = 'DELETE FROM tasks WHERE id = ?';
    let params = [id];

    if (userId) {
      query += ' AND user_id = ?';
      params.push(userId);
    }

    const result = await db.run(query, params);
    return result.rows[0];
  }

  static async getTaskStats(userId = null) {
    let query = `
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed
      FROM tasks
    `;
    let params = [];

    if (userId) {
      query += ' WHERE user_id = ?';
      params.push(userId);
    }

    const result = await db.query(query, params);
    return result.rows[0];
  }
}

module.exports = Task;
