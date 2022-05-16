import SuperAdmin from '../models/Superadmin';

// bringing the json data

// Get all the super admin
const getAllSuperAdmins = async (req, res) => {
  try {
    const allSuperAdms = await SuperAdmin.find({});
    return res.status(200).json(allSuperAdms);
  } catch (error) {
    return res.status(500).json({
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
        return res.status(200).json(superAdmin);
      }
      return res.status(404).json('User id not found');
    }
    return res.status(400).json({
      msg: 'missing id parameter',
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
const createSuperAdmin = async (req, res) => {
  try {
    const superAdm = new SuperAdmin({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await superAdm.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'There was an error saving the super admin', error });
  }
};
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
const deleteSuperAdm = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'missing id parameter',
      });
    }
    const result = await SuperAdmin.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'The super admin has not been found',
      });
    }
    return res.status(200).json({
      msg: 'Deleted!',
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'an error has ocurred',
    });
  }
};
export default {
  createSuperAdmin, getAllSuperAdmins, getSuperAdmById, deleteSuperAdm, editSuperAdmin,
};
// Create a super admin
// router.post('/', (req, res) => {
//   const newSuperAdmin = {
//     ID: superAdmin.length + 1,
//     Name: req.body.Name,
//     LastName: req.body.LastName,
//     email: req.body.email,
//     Password: req.body.Password,
//   };

//   if (req.body.Name !== '' && req.body.LastName !== '' && req.body.Password
//! == '' && req.body.email !== '') {

//     const file = fs.readFileSync(path.resolve(__dirname, '../data/super-admins.json'));
//     // fs allows me to edit the file, readFileSync allows me to read it,
//     // and path.resolve helps the program to find the file
//     const data = JSON.parse(file);
//     // converts the JSON in an array
//     data.push(newSuperAdmin);
//     const newData = JSON.stringify(data);
//     fs.writeFile(path.resolve(__dirname, '../data/super-admins.json'), newData, (err) => {
//       if (err) {
//         res.send(err);
//       }
//       // rewrites the file with the new array
//     });
//     res.send('New Super Admin was created successfully');
//   } else {
//     res.send('There is an error');
//   }
// });
// // Delete superAdmin
// router.delete('/:superAdminID', (req, res) => {
//   const findSA = parseInt(req.params.superAdminID, 10);
//   const filteredSA = superAdmin.filter((sa) => sa.ID !== findSA);
//   if (superAdmin.length !== filteredSA.length) {

//     fs.writeFile(path.resolve(__dirname, '../data/super-admins.json'),
// JSON.stringify(filteredSA), (err) => {

//       if (err) {
//         res.send(err);
//       } else {
//         res.send('Super Admin deleted');
//       }
//     });
//   } else {
//     res.send('Could not delete the super admin because it was not found');
//   }
// });
// // Edit superAdmin

// router.put('/:id', (req, res) => {
//   let userID = parseInt(req.params.id, 10);
//   const jsonData = fs.readFileSync(path.resolve(__dirname, '../data/super-admins.json'));
//   const data = JSON.parse(jsonData);
//   const filterID = superAdmin.find((sa) => sa.ID === userID);
//   if (filterID) {
//     userID -= 1;
//     data[userID].Name = req.body.Name;
//     data[userID].LastName = req.body.LastName;
//     data[userID].email = req.body.email;
//     data[userID].Password = req.body.Password;
//     fs.writeFileSync(path.resolve(__dirname, '../data/super-admins.json'), JSON.stringify(data));
//     // The path.resolve finds the json file
//     res.json(data);
//   } else {
//     res.send('User not found');
//   }
// });

// module.exports = router;
// exports the router const with express and methods
