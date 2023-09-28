const AuthService = require('../services/auth');

module.exports.postUser = async (req, res) => {
  try {
    const userInfo = {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name
    };

    const userExists = await AuthService.doesUserExist(userInfo.username);
    if (userExists) {
      return res.status(422).send({
        error: 'A user with the same username already exists.'
      });
    }

    await AuthService.createUser(userInfo);
  } catch (error) {
    res.status(500).send({
      error: error.message
    });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await AuthService.findAllUsers();
    return res.send({ users });
  } catch (err) {
    // this denotes a server error, therefore status code should be 500.
    res.status(500);
    return res.send({
      error: 'Mesh 3aref'

    });
  }
};

module.exports.getUserById = async (req, res) => {
  // notice how we extract the chaletId from the dynamic route that should be /chalets/:chaletId
  const userId = req.params.userId;
  try {
    const users = await AuthService.findUserById(userId);
    if (!users) {
      return res.status(404).send({
        error: 'users not found.'
      });
    }
    return res.send({
      users : users
    });
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
};

// module.exports.editUser = async (req, res) => {
//   const userInfo = {
//     userId: req.params.userId,
//     username: req.body.username,
//     password: req.body.password,
//     name: req.body.name
//   };

//   try {
//     const bgrb = await AuthService.updateUser(userInfo);
      
//     res.status(201).send({
//       msg: 'User updated successfully.',
//       //userId: bgrb._id
//     });
//       // return res.status(422).send({
//       //   error: 'Yl3n om el controller'
//       //});

//   } catch (error) {
//     res.status(500).send({
//       error: error.message
//     });
//   }
// };

module.exports.editUser = async (req, res) => {
  const userInfo = {
    userId: req.params.userId,
    username: req.body.username,
    password: req.body.password,
    name: req.body.name
  };
  // console.log(userInfo);
  try {
    const bgrb = await AuthService.updateUser(userInfo);
      
    res.status(201).send({
      msg: 'User updated successfully.',
      //userId: bgrb._id
    });
      // return res.status(422).send({
      //   error: 'Yl3n om el controller'
      //});

  } catch (error) {
    res.status(500).send({
      error: error.message
    });
  }
};

module.exports.postLogin = async (req, res) => {
  // extract the username and password from the request body.
  const { username, password } = req.body;
  try {
    const user = await AuthService.checkCredentials(username, password);

    if (!user) {
      return res.status(401).send({
        error:
          'Invalid credentials, please enter the correct username and password.'
      });
    }

    const jwt = await AuthService.generateJWT(user);
    res.send({
      userId: user._id,
      username: user.username,
      jwt: jwt,
      message: 'Logged in successfully.'
    });
  } catch (err) {
    res.status(500).send({
      error: error.message
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    await AuthService.removeUser(userId);
    return res.send({
      msg: 'User deleted successfully.'
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message
    });
  }
};
