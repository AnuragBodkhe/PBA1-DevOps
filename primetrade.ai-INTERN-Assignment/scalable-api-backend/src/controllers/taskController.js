const Task = require('../models/Task');

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.user.id;

    const newTask = await Task.create({
      title,
      description,
      user_id: userId,
      status: status || 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: {
        task: newTask
      }
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while creating task',
      error: 'CREATE_TASK_ERROR'
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.role === 'admin' ? null : req.user.id;
    const tasks = await Task.findAll(userId);

    res.json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: {
        tasks,
        count: tasks.length
      }
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching tasks',
      error: 'GET_TASKS_ERROR'
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.role === 'admin' ? null : req.user.id;

    const task = await Task.findById(id, userId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
        error: 'TASK_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      message: 'Task retrieved successfully',
      data: {
        task
      }
    });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching task',
      error: 'GET_TASK_ERROR'
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const userId = req.user.role === 'admin' ? null : req.user.id;

    const updatedTask = await Task.update(id, { title, description, status }, userId);

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
        error: 'TASK_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: {
        task: updatedTask
      }
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while updating task',
      error: 'UPDATE_TASK_ERROR'
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.role === 'admin' ? null : req.user.id;

    const deletedTask = await Task.delete(id, userId);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
        error: 'TASK_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      message: 'Task deleted successfully',
      data: {
        task: deletedTask
      }
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while deleting task',
      error: 'DELETE_TASK_ERROR'
    });
  }
};

const getTaskStats = async (req, res) => {
  try {
    const userId = req.user.role === 'admin' ? null : req.user.id;
    const stats = await Task.getTaskStats(userId);

    res.json({
      success: true,
      message: 'Task statistics retrieved successfully',
      data: {
        stats
      }
    });
  } catch (error) {
    console.error('Get task stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching task statistics',
      error: 'GET_TASK_STATS_ERROR'
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats
};
