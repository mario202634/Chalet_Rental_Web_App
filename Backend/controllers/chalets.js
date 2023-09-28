const chaletsService = require('../services/chalets');
const azMapsService = require('../services/azMaps');

module.exports.getChalets = async (req, res) => {
  try {
    const chalets = await chaletsService.findAllChalets();
    return res.send({ chalets });
  } catch (err) {
    // this denotes a server error, therefore status code should be 500.
    res.status(500);
    return res.send({
      error: 'Mesh 3aref'

    });
  }
};

module.exports.getChalet = async (req, res) => {
  // notice how we extract the chaletId from the dynamic route that should be /chalets/:chaletId
  const chaletId = req.params.chaletId;
  try {
    const chalet = await chaletsService.findChaletById(chaletId);
    if (!chalet) {
      return res.status(404).send({
        error: 'Chalet not found.'
      });
    }
    return res.send({
        chalet : chalet
    });
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
};

module.exports.getUserChalet = async (req, res) => {
  // notice how we extract the chaletId from the dynamic route that should be /chalets/:chaletId
  const userId = req.params.userId;
  try {
    const chalet = await chaletsService.findUserChalet(userId);
    // if (!rentals) {
    //   return res.status(404).send({
    //     error: 'Rentals not found.'
    //   });
    // }
    return res.send({
      chalet : chalet
    });
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
};

module.exports.postChalet = async (req, res) => {
    // get validation errors in the form of an array.
    // const validationErrors = validationResult(req).array();
    // if (validationErrors.length > 0) {
    //   const firstError = validationErrors[0];
    //   return res.status(422).send({
    //     error: firstError.msg
    //   });
    // }
  
    const chaletInfo = {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      imgURL: req.body.imgURL,
      price: req.body.price,
      is_rented: req.body.is_rented,
      govId: req.body.govId,
      userId: req.body.userId
    };
  
    try {
      const chaletCoords = await azMapsService.geocodeAddress(req.body.address);
      // if chaletCoords is null, which means that no location is found using the given address
      if (!chaletCoords) {
        return res.status(422).send({
          error: 'Could not find a valid location using the given address.'
        });
      }
  
      const addedChalet = await chaletsService.addNewChalet(
        chaletInfo,
        chaletCoords
      );
  
      res.status(201).send({
        msg: 'Chalet added successfully.',
        chaletId: addedChalet._id
      });
    } catch (err) {
      res.status(500);
      res.send({
        error: err.message
      });
    }
  };

  module.exports.editChalet = async (req, res) => {
    const chaletInfo = {
      chaletId: req.params.chaletId,
      name: req.body.name,
      email:req.body.email,
      address: req.body.address,
      price: req.body.price,
      is_rented: req.body.is_rented,
      govId: req.body.govId,
      userId: req.body.userId
    };
    const bgrb = await chaletsService.editChalet(chaletInfo);
      try{
    res.status(201).send({
      msg: 'Chalet updated successfully.',
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

module.exports.deleteChalet = async (req, res) => {
  const chaletId = req.params.chaletId;
  try {
    await chaletsService.removeChalet(chaletId);
    return res.send({
      msg: 'Chalet deleted successfully.'
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message
    });
  }
};