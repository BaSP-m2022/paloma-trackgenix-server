import Projects from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Projects.find({});
    return res.status(200).json(allProjects);
  } catch (error) {
    return res.status(500).json({
      msg: 'Error',
    });
  }
};

const getProjectsById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing an ID parameter',
      });
    }
    const project = await Projects.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        message: 'The project was not found',
      });
    }
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({
      msg: 'Error',
    });
  }
};

const createProject = async (req, res) => {
  try {
    const project = new Projects({
      projectName: req.body.projectName,
      totalHours: req.body.totalHours,
      projectDescription: req.body.projectDescription,
      startDate: req.body.startDate,
      finishDate: req.body.finishDate,
      rate: req.body.rate,
      employeeID: req.body.employeeID,
      role: req.body.role,
      state: req.body.state,
    });
    const result = await project.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'There was an error saving the project' });
  }
};

const deleteProject = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'Missing id parameter',
      });
    }
    const result = await Projects.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'The project has not been found',
      });
    }
    return res.status(200).json({
      msg: 'Deleted!',
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'An error has ocurred',
    });
  }
};

const editProject = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing id parameter',
      });
    }
    const result = await Projects.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'The project has not been found',
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error: error.details[0].message,
    });
  }
};

export default {
  getAllProjects,
  getProjectsById,
  createProject,
  deleteProject,
  editProject,
};
