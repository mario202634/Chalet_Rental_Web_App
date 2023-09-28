const { Result } = require('express-validator');
const rentalsService = require('../services/rentals');
const { editChalet } = require('./chalets');

module.exports.getRentals = async (req, res) => {
  try {
    const rentals = await rentalsService.findAllRentals();
    return res.send({ rentals });
  } catch (err) {
    // this denotes a server error, therefore status code should be 500.
    res.status(500);
    return res.send({
      error: 'Could not retrieve chalets'

    });
  }
};

module.exports.getRentalById = async (req, res) => {
  // notice how we extract the chaletId from the dynamic route that should be /chalets/:chaletId
  const rentalId = req.body.rentalId;
  try {
    const rentals = await rentalsService.findRentalById(rentalId);
    // if (!rentals) {
    //   return res.status(404).send({
    //     error: 'Rentals not found.'
    //   });
    // }
    return res.send({
      rental : rentals
    });
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
};


module.exports.getUserRentals = async (req, res) => {
  // notice how we extract the chaletId from the dynamic route that should be /chalets/:chaletId
  const userId = req.params.userId;
  try {
    const rentals = await rentalsService.findUserRentals(userId);
    // if (!rentals) {
    //   return res.status(404).send({
    //     error: 'Rentals not found.'
    //   });
    // }
    return res.send({
      rental : rentals
    });
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
};

module.exports.createRental = async (req, res) => {
    // get validation errors in the form of an array.
    // const validationErrors = validationResult(req).array();
    // if (validationErrors.length > 0) {
    //   const firstError = validationErrors[0];
    //   return res.status(422).send({
    //     error: firstError.msg
    //   });
    // }
  
    const rentalInfo = {
      userId: req.body.userId,
      chaletId: req.body.chaletId,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    };
    console.log({rentalInfo});
  
    try {
      const addedRental = await rentalsService.addNewRental(
        rentalInfo
      );
  
      res.status(201).send({
        msg: 'Rental created successfully.',
        rentalId: addedRental._id
      });
    } catch (err) {
      res.status(500);
      res.send({
        error: err.message
      });
    }
  };

module.exports.cancelRental = async (req, res) => {
  const rentalId = req.params.rentalId;
  const chaletId = req.params.chaletId;
  try {
    
    await rentalsService.removeRental(rentalId,chaletId);
    
    return res.send({
      msg: 'Rental cancelled successfully.'
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message
    });
  }
};


// module.exports.extedStaying = async (req, res) => {
//   const rentalInfo= {
//    rentalId : req.params.rentalId,
//    endDate : req.body.endDate

//   };
//   console.log(endDate);
//   try {
//     const extendRental= await rentalsService.extendRental(rentalInfo);
//     return res.status(201).send({
//       msg: "Rental extended"
//       // rentalId:extendRental._id

//     })
//   } catch(err){
//     return res.status(500).send({
//       error:err.message
//       });
//   }
// };

module.exports.extedStaying = async (req, res) => {
  const rentalInfo= {
    rentalId: req.params.rentalId, 
    endDate: req.body.endDate
  };
  try {
    
    // console.log(endDate);
    const extendRental = await rentalsService.extendRental(rentalInfo);
    return res.status(201).send({
      msg: "Rental extended",
      rentalId:extendRental._id
    })
    
  } catch(err){
    return res.status(500).send({
      error:err.message
      });
  }
};

