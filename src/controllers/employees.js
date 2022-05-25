// eslint-disable-next-line import/no-import-module-exports
import Employees from '../models/Employees';

// const express = require('express');

const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await Employees.find({});
    return res.status(200).json({
      message: 'Showing the complete list of employees.',
      data: allEmployees,
      error: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'There was an error',
      error: true,
    });
  }
};
const getEmployeesById = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing an ID parameter',
        error: true,
      });
    }
    const employee = await Employees.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        message: 'The employee was not found',
        error: true,
      });
    }
    return res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json({
      msg: 'Error',
      error: true,
    });
  }
};

const createEmployees = async (req, res) => {
  try {
    const employee = new Employees({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      assignedRole: req.body.assignedRole,
      assignedTask: req.body.assignedTask,
    });

    const result = await employee.save();
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'There was an error saving the employee', error: true });
  }
};

const updateEmployee = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing id parameter',
      });
    }

    const result = await Employees.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'The employee has not been found',
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

const deleteEmployee = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'missing id parameter',
      });
    }
    const result = await Employees.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'The Employee has not been found',
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'Employee succesfully Deleted!',
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'An error has ocurred',
      error: true,
    });
  }
};

export default {
  getAllEmployees,
  getEmployeesById,
  createEmployees,
  updateEmployee,
  deleteEmployee,
};
