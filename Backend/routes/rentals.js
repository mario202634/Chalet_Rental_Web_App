const { Router } = require('express');

// import the chalets validator
//const chaletsValidator = require('../validators/chalets');

const rentalsController = require('../controllers/rentals');

const rentalsRouter = Router();

rentalsRouter.get('/', rentalsController.getRentals);
rentalsRouter.get('/:rentalId', rentalsController.getRentalById);
rentalsRouter.get('/user/:userId', rentalsController.getUserRentals);
rentalsRouter.post('/', rentalsController.createRental);
rentalsRouter.delete('/:rentalId/:chaletId', rentalsController.cancelRental);
rentalsRouter.put('/:rentalId',rentalsController.extedStaying);

// chaletsRouter.post(
//   '/',
//   chaletsValidator.valdiatePostChalet(), // call our function that returns an array of middlewares for valdiation
//   chaletsController.postChalet
// );

module.exports = rentalsRouter;