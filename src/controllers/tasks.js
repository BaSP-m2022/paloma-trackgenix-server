import Tasks from '../models/Tasks';

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Tasks.find({});
    return res.status(200).json(allTasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Error',
      error: true,
    });
  }
};

const getTaskByID = async (req, res) => {
  if (req.params.id) {
    try {
      const task = await Tasks.findById(req.params.id);
      return res.status(200).json(task);
    } catch (error) {
      return res.status(404).json({
        msg: 'The task has not been found',
        error: true,
      });
    }
  }
  return res.status(400).json({
    msg: 'Missing id parameter',
    error: true,
  });
};

const createTask = async (req, res) => {
  try {
    const task = new Tasks({
      taskName: req.body.taskName,
      taskDescription: req.body.taskDescription,
      status: req.body.status,
      employeeID: req.body.employeeID,
    });
    const result = await task.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error creating the task',
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'missing id parameter',
        error: true,
      });
    }
    const result = await Tasks.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'The task has not been found',
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'Task Deleted!',
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'An error has ocurred',
      error: true,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing id parameter',
        error: true,
      });
    }
    const result = await Tasks.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'The task has not been found',
        error: true,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error: true,
    });
  }
};

export default {
  getAllTasks,
  getTaskByID,
  createTask,
  deleteTask,
  updateTask,
};
