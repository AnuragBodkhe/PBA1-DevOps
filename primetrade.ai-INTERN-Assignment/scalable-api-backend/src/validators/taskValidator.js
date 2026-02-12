const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(255).required().messages({
    'string.empty': 'Title cannot be empty',
    'string.max': 'Title cannot exceed 255 characters',
    'any.required': 'Title is required'
  }),
  description: Joi.string().max(1000).optional().allow('').messages({
    'string.max': 'Description cannot exceed 1000 characters'
  }),
  status: Joi.string().valid('pending', 'in_progress', 'completed').optional().default('pending').messages({
    'any.only': 'Status must be pending, in_progress, or completed'
  })
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(255).optional().messages({
    'string.empty': 'Title cannot be empty',
    'string.max': 'Title cannot exceed 255 characters'
  }),
  description: Joi.string().max(1000).optional().allow('').messages({
    'string.max': 'Description cannot exceed 1000 characters'
  }),
  status: Joi.string().valid('pending', 'in_progress', 'completed').optional().messages({
    'any.only': 'Status must be pending, in_progress, or completed'
  })
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

const validateCreateTask = (req, res, next) => {
  const { error } = createTaskSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }))
    });
  }
  
  next();
};

const validateUpdateTask = (req, res, next) => {
  const { error } = updateTaskSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }))
    });
  }
  
  next();
};

module.exports = {
  validateCreateTask,
  validateUpdateTask,
  createTaskSchema,
  updateTaskSchema
};
