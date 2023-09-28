const GovernorateModel = require('../models/Governorate');

module.exports.addNewGovernorate = async (governorateInfo) => {
  const governorate = new GovernorateModel({
    name: governorateInfo.name
  });
  try {
    const addedGovernorate = await governorate.save();
    return addedGovernorate;
  } catch (error) {
    console.log(error);
    throw new Error('Could not add governorate.');
  }
};

module.exports.findAllGovernorates = async () => {
  try {
    const governorates = await GovernorateModel.find();
    return governorates;
  } catch (err) {
    throw new Error('Could not retrieve governorates.');
  }
};
