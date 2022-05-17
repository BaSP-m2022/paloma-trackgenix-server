import SuperAdmin from '../models/Superadmin';

// Get all the super admin
const getAllSuperAdmins = async (req, res) => {
  try {
    const allSuperAdms = await SuperAdmin.find({});
    return res.status(200).json({ data: allSuperAdms, error: false });
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: error,
    });
  }
};
// Obtain a super admin
const getSuperAdmById = async (req, res) => {
  try {
    if (req.params.id) {
      const superAdmin = await SuperAdmin.findById(req.params.id);
      if (superAdmin) {
        return res.status(200).json({ data: superAdmin, error: false });
      }
      return res.status(404).json({
        data: undefined,
        error: true,
        msg: 'User id not found',
      });
    }
    return res.status(400).json({
      data: undefined,
      error: true,
      msg: 'missing id parameter',
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      msg: err,
    });
  }
};
// Create a super admin
const createSuperAdmin = async (req, res) => {
  try {
    const superAdm = new SuperAdmin({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await superAdm.save();
    return res.status(201).json({ data: result, error: false });
  } catch (err) {
    return res.status(500).json({ message: 'There was an error saving the super admin', err, error: true });
  }
};
// Edit a super admin
const editSuperAdmin = async (req, res) => {
  try {
    const result = await SuperAdmin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'The super admin has not been found',
        error: true,
        data: undefined,
      });
    }
    return res.status(200).json({ data: result, error: false });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error: error.details[0].message,
    });
  }
};
// Delete a super admin
const deleteSuperAdm = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        data: undefined,
        msg: 'missing id parameter',
        error: true,
      });
    }
    const result = await SuperAdmin.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'The super admin has not been found',
        error: true,
        data: undefined,
      });
    }
    return res.status(200).json({
      error: false,
      msg: 'Deleted!',
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'an error has ocurred',
      error: true,
    });
  }
};
export default {
  createSuperAdmin, getAllSuperAdmins, getSuperAdmById, deleteSuperAdm, editSuperAdmin,
};
