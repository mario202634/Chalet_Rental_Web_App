const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const UserModel = require('../models/User');

module.exports.createUser = async (userInfo) => {
  try {
    // hash the password
    let hashedPassword = await bcrypt.hash(userInfo.password, 12);

    // create and save the new user with the hashed password
    const newUser = new UserModel({
      username: userInfo.username,
      password: hashedPassword,
      name: userInfo.name
    });

    await newUser.save();
  } catch (err) 
  {
    throw new Error('Error creating new user, please try again later.');
    //error: error.message
  }
};

module.exports.findAllUsers = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (err) {
    throw new Error('Could not retrieve users.');
  }
};

module.exports.findUserById = async (userId) => {
  try {
    // const feedback = await FeedbackModel.findById(chaletId).populate(
    //   'chaletId'
    // );
    const user = await UserModel.findById(userId);
    return user;
  } catch (err) {
    throw new Error('Could not find user.');
  }
};

module.exports.removeUser = async (userId) => {
  try {
    await UserModel.deleteOne({ _id: userId });
  } catch (err) {
    throw new Error('Could not remove user.');
  }
};

// module.exports.updateUser = async (userInfo) => {
//   try {
//     let hashedPassword = await bcrypt.hash(userInfo.password, 12);
//     const newUser = {
//       userId: userInfo.userId,
//       username: userInfo.username,
//       password: hashedPassword,
//       name: userInfo.name
//     };
    

//     //const updated = await UserModel.updateOne({ _id: newUser.userId }, { $set: { username: newUser.username, password: newUser.password, name: newUser.name } });
//     const updated = await UserModel.findByIdAndUpdate(userInfo._id, newUser);
//     const updatedUser = await newUser.save();
//     return updatedUser;
//   } catch (err) {
//     error: err
//     //throw new Error('Error updating, please try again later.');
//   }
// };

module.exports.updateUser = async (userInfo) => {

  console.log(userInfo);
  
  try {
   
   if(userInfo.password)
   {
    const newUser = {
       userId: userInfo.userId,
       username: userInfo.username,
       password:userInfo.password,
      name: userInfo.name
    };
    let hashedPassword = await bcrypt.hash(newUser.password, 12);
    const updated = await UserModel.updateOne({ _id: newUser.userId },
      { $set: {username: newUser.username,
        password: hashedPassword,
         name: newUser.name} });
  }
  else
  {
    const newUser = {
      userId: userInfo.userId,
      username: userInfo.username,
     name: userInfo.name
   };
   const updated = await UserModel.updateOne({ _id: newUser.userId },
     { $set: {username: newUser.username,
        name: newUser.name} });
 }

     console.log({newUser})
     

    console.log(` aaaaaaaaaa ${updated}`)

    return updated;

  } catch (err) {
    error: err
    //throw new Error('Error updating, please try again later.');
  }
};

module.exports.doesUserExist = async (username) => {
  const existingUser = await UserModel.findOne({
    username: username
  });

  if (existingUser) {
    return true;
  } else {
    return false;
  }
};

module.exports.checkCredentials = async (username, password) => {
  try {
    // find user that has the same username
    const user = await UserModel.findOne({
      username: username
    });

    // compare the plaintext password with the user's hashed password in the db.
    let isCorrectPassword = await bcrypt.compare(password, user.password);

    if (isCorrectPassword) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error('Error logging in, please try again later.');
  }
};

module.exports.generateJWT = (user) => {
  const jwtPayload = {
    userId: user._id,
    username: user.username
    // if different users have different roles, you could put the role here too.
  };

  const jwtSecret = process.env.JWT_SECRET;

  try {
    let token = JWT.sign(jwtPayload, jwtSecret, { expiresIn: '1h' });
    return token;
  } catch (error) {
    throw new Error('Failure to sign in, please try again later.');
  }
};

module.exports.auth = async (token) => {
  try {
    // verify the integrity of the token and extract its payload
    // it will throw an error by default if the token is invalid or had expired
    const tokenPayload = await JWT.verify(token, process.env.JWT_SECRET);
    // return the token payload as we might need it later in the controller
    return tokenPayload;
  } catch (error) {
    throw new Error('Unauthrozied.');
  }
};
