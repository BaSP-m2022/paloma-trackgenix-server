/* const express = require('express');
const res = require('express/lib/response');
const  = require('../data/admins.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(admins);
});

router.get('/getById/:id', (req, res) => {
  const userID = req.params.id;
  const user = admins.find((admins) => admins.id === userID);

  if (user) {
    res.send(user);
  } else {
    res.send('User not found');
  }
});

router.get('/getByName/:name', (req, res) => {
  const userName = req.params.name;
  const user = admins.find((admins) => admins.name === userName);

  if (user) {
    res.send(user);
  } else {
    res.send('User not found');
  }
}); */
