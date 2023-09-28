const ChaletModel = require('../models/Chalet');

module.exports.addNewChalet = async (chaletInfo, chaletCoords) => {
  const chalet = new ChaletModel({
    name: chaletInfo.name,
    email: chaletInfo.email,
    address: chaletInfo.address,
    price: chaletInfo.price,
    imgURL: chaletInfo.imgURL,
    location: {
      lat: chaletCoords.lat,
      lng: chaletCoords.lon
    },
    is_rented: chaletInfo.is_rented,
    govId: chaletInfo.govId,
    userId: chaletInfo.userId
  });
  try {
    const addedChalet = await chalet.save();
    return addedChalet;
  } catch (error) {
    console.log(error);
    throw new Error('Could not add chalet.');
  }
};

module.exports.findAllChalets = async () => {
  try {
    const chalets = await ChaletModel.find();
    return chalets;
  } catch (err) {
    throw new Error('Could not retrieve Chalets.');
  }
};

module.exports.findAvailableChalets = async () => {
    try {
      const chalets = await ChaletModel.find({ is_rented : false });
      return chalets;
    } catch (err) {
      throw new Error('Could not retrieve Chalets.');
    }
  };

  module.exports.findUserChalet = async (userId) => {
    try {
      const chalets = await ChaletModel.find({ userId: userId }).sort({_id:-1}).limit(1);
      return chalets;
    } catch (err) {
      throw new Error('Could not retrieve Chalet.');
    }
  };


module.exports.findChaletById = async (chaletId) => {
    try {
      const chalet = await ChaletModel.findById(chaletId).populate(
        'govId'
      );
      return chalet;
    } catch (err) {
      throw new Error('Could not find chalet.');
    }
  };

  module.exports.editChalet = async (chaletInfo) => {

    console.log(chaletInfo);
  
    try {
  
      const newChalet = {
        chaletId: chaletInfo.chaletId,
        name: chaletInfo.name,
        email: chaletInfo.email,
        address: chaletInfo.address,
        price: chaletInfo.price,
        is_rented: chaletInfo.is_rented,
        govId: chaletInfo.govId
      };
  
  
      console.log({ newChalet })
  
      const updated = await ChaletModel.updateOne({ _id: newChalet.chaletId },
        {
          $set: {
            name: newChalet.name,
            email: newChalet.email,
            address: newChalet.address,
            price: newChalet.price,
            is_rented: newChalet.is_rented,
            govId: newChalet.govId
          }
        });
      console.log({updated})
  
      return updated;
    } catch (err) {
      error: err
      throw new Error('Error updating, please try again later.');
    }
  };

module.exports.removeChalet = async (chaletId) => {
    try {
      await ChaletModel.deleteOne({ _id: chaletId });
    } catch (err) {
      throw new Error('Could not remove chalet.');
    }
  };