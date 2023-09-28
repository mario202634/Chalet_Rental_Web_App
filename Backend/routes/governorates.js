const { Router } = require('express');

const governoratesController = require('../controllers/governorates');

const governoratesRouter = Router();

governoratesRouter.get('/', governoratesController.getGovernorates);
//governoratesRouter.get('/:chaletId', governoratesController.getGovernoratesByChalet);
governoratesRouter.post('/', governoratesController.postGovernorate);
governoratesRouter.delete('/:governorateId', governoratesController.deleteGovernorate);

// chaletsRouter.post(
//   '/',
//   chaletsValidator.valdiatePostChalet(), // call our function that returns an array of middlewares for valdiation
//   chaletsController.postChalet
// );

module.exports = governoratesRouter;