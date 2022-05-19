import Timesheets from '../models/Timesheets';

const getAllTimeSheets = async (req, res) => {
  try {
    const allTimeSheets = await Timesheets.find({});
    return res.status(200).json(allTimeSheets);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Error',
    });
  }
};

const getTimeSheetsById = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing id parameter',
      });
    }
    const timeSheet = await Timesheets.findById(req.params.id);
    if (!timeSheet) {
      return res.status(404).json({
        message: 'The timesheet has not been found',
      });
    }
    return res.status(200).json(timeSheet);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'An error occurred',
      error: error.details[0].message,
    });
  }
};

const createTimesheet = async (req, res) => {
  try {
    const newTimeSheet = new Timesheets({
      name: req.body.name,
      surName: req.body.surName,
      role: req.body.role,
      startDate: req.body.startDate,
      finishDate: req.body.finishDate,
      regularHours: req.body.regularHours,
      overtimeHours: req.body.overtimeHours,
      rate: req.body.rate,
      project: req.body.project,
      task: req.body.task,
    });
    const result = await newTimeSheet.save();
    return res.status(201).json({ data: result, error: false });
  } catch (err) {
    return res.status(500).json({ message: 'There was an error saving the TimeSheet', err, error: true });
  }
};

const editTimesheet = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing id parameter',
      });
    }
    const result = await Timesheets.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'The timesheet has not been found',
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'An error occurred',
      error: error.details[0].message,
    });
  }
};

const deleteTimeSheet = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'missing id parameter',
      });
    }
    const result = await Timesheets.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'The timesheet has not been found',
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

export default {
  getAllTimeSheets,
  getTimeSheetsById,
  createTimesheet,
  editTimesheet,
  deleteTimeSheet,
};
