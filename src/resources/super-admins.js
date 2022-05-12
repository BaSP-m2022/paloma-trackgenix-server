const express = require('express');
const fs = require('fs');
const path = require('path');
const superAdmin = require('../data/super-admins.json');
// bringing the json data
const router = express.Router();
// Get all the super admin
router.get('/', (req, res) => {
  res.send(superAdmin);
  // bringing the json data saved in the const superAdmin
});
// Obtain a super admin
router.get('/:superAdminID', (req, res) => {
  const findsuperAdmin = parseInt(req.params.superAdminID, 10);
  const superAdminFound = superAdmin.find((superAdminPara) => superAdminPara.ID === findsuperAdmin);
  if (superAdminFound) {
    res.send(superAdminFound);
  } else {
    res.send('Super Admin is not found');
  }
});
// Create a super admin
router.post('/', (req, res) => {
  const newSuperAdmin = {
    ID: superAdmin.length + 1,
    Name: req.body.Name,
    LastName: req.body.LastName,
    email: req.body.email,
    Password: req.body.Password,
  };
  if (req.body.Name !== '' && req.body.LastName !== '' && req.body.Password !== '' && req.body.email !== '') {
    const file = fs.readFileSync(path.resolve(__dirname, '../data/super-admins.json'));
    // fs allows me to edit the file, readFileSync allows me to read it,
    // and path.resolve helps the program to find the file
    const data = JSON.parse(file);
    // converts the JSON in an array
    data.push(newSuperAdmin);
    const newData = JSON.stringify(data);
    fs.writeFile(path.resolve(__dirname, '../data/super-admins.json'), newData, (err) => {
      if (err) {
        res.send(err);
      }
      // rewrites the file with the new array
    });
    res.send('New Super Admin was created successfully');
  } else {
    res.send('There is an error');
  }
});
// Delete superAdmin
router.delete('/:superAdminID', (req, res) => {
  const findSA = parseInt(req.params.superAdminID, 10);
  const filteredSA = superAdmin.filter((sa) => sa.ID !== findSA);
  if (superAdmin.length !== filteredSA.length) {
    fs.writeFile(path.resolve(__dirname, '../data/super-admins.json'), JSON.stringify(filteredSA), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Super Admin deleted');
      }
    });
  } else {
    res.send('Could not delete the super admin because it was not found');
  }
});
// Edit superAdmin

router.put('/:id', (req, res) => {
  let userID = parseInt(req.params.id, 10);
  const jsonData = fs.readFileSync(path.resolve(__dirname, '../data/super-admins.json'));
  const data = JSON.parse(jsonData);
  const filterID = superAdmin.find((sa) => sa.ID === userID);
  if (filterID) {
    userID -= 1;
    data[userID].Name = req.body.Name;
    data[userID].LastName = req.body.LastName;
    data[userID].email = req.body.email;
    data[userID].Password = req.body.Password;
    fs.writeFileSync(path.resolve(__dirname, '../data/super-admins.json'), JSON.stringify(data));
    // The path.resolve finds the json file
    res.json(data);
  } else {
    res.send('User not found');
  }
});

module.exports = router;
// exports the router const with express and methods
