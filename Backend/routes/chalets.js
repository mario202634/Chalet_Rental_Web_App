const { Router } = require('express');

// import the chalets validator
//const chaletsValidator = require('../validators/chalets');

const chaletsController = require('../controllers/chalets');

const chaletsRouter = Router();

chaletsRouter.get('/', chaletsController.getChalets);
chaletsRouter.get('/:chaletId', chaletsController.getChalet);
chaletsRouter.get('/user/:userId', chaletsController.getUserChalet);
chaletsRouter.post('/', chaletsController.postChalet);
chaletsRouter.delete('/:chaletId', chaletsController.deleteChalet);
chaletsRouter.put('/:chaletId',chaletsController.editChalet);

// chaletsRouter.post(
//   '/',
//   chaletsValidator.valdiatePostChalet(), // call our function that returns an array of middlewares for valdiation
//   chaletsController.postChalet
// );

module.exports = chaletsRouter;