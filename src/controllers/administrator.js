import Admin from '../models/Admin';

// eslint-disable-next-line consistent-return
const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admin.find({});
    return res.status(200).json(allAdmins);
  } catch (error) {
    res.json({
      message: 'There was an error getting all admins',
      data: {},
      error: true,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    if (req.params.id) {
      const admin = await Admin.findById(req.params.id);
      return res.status(200).json(admin);
    }
    return res.status(400).json({
      message: 'Missing Id parameter',
      data: {},
      error: true,
    });
  } catch (error) {
    return res.json({
      message: 'There was an error getting an admin by id',
      data: {},
      error: true,
    });
  }
};

// eslint-disable-next-line consistent-return
const createAdmin = async (req, res) => {
  try {
    const admin = new Admin({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender,
      active: req.body.active,
    });
    const result = await admin.save((error, adm) => {
      if (error) {
        return res.status(400).json({
          message: 'There was an error. Check the data.',
          data: adm,
          error: true,
        });
      }
      return res.status(201).json({
        message: 'Admin created',
        data: result,
        error: false,
      });
    });
  } catch (error) {
    return res.json({
      message: 'There was an error creating admin',
      data: undefined,
      error: true,
    });
  }
};

const editAdmin = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'The admin was not found',
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.json({
      message: 'There was an error editing the admin',
      error: error.details[0].message,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const result = await Admin.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'The admin was not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(204).json({
      msg: 'Deleted admin!',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      msg: 'There was an error deleting the admin',
      error: true,
    });
  }
};

export default {
  getAllAdmins,
  getAdminById,
  createAdmin,
  editAdmin,
  deleteAdmin,
};
