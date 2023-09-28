const governoratesService = require('../services/governorates');

module.exports.getGovernorates = async (req, res) => {
  try {
    const governorates = await governoratesService.findAllGovernorates();
    return res.send({ governorates });
  } catch (err) {
    // this denotes a server error, therefore status code should be 500.
    res.status(500);
    return res.send({
      error: err.message
    });
  }
};

module.exports.postGovernorate = async (req, res) => {
  const governorateInfo = {
    name: req.body.name
  };

  try {
    const addedGovernorate = await governoratesService.addNewGovernorate(
      governorateInfo
    );

    res.status(201).send({
      msg: 'Governorate added successfully.',
      governorateId: addedGovernorate._id
    });
  } catch (err) {
    res.status(500);
    res.send({
      error: err.message
    });
  }
};


module.exports.deleteGovernorate = async (req, res) => {
  const suppid = req.params.rentalId;
  try {
    await governoratesService.deleteGovernorate(suppid);
    return res.send({
      msg: 'Governorate deleted successfully.'
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message
    });
  }
};