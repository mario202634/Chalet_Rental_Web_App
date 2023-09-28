const { Router } = require('express');

// import the chalets validator
//const chaletsValidator = require('../validators/chalets');

const feedbacksController = require('../controllers/feedbacks');

const feedbacksRouter = Router();

feedbacksRouter.get('/', feedbacksController.getFeedbacks);
feedbacksRouter.get('/:chaletId', feedbacksController.getFeedbackByChalet);
feedbacksRouter.post('/', feedbacksController.postFeedback);
feedbacksRouter.delete('/:feedbackId', feedbacksController.deleteFeedback);

// chaletsRouter.post(
//   '/',
//   chaletsValidator.valdiatePostChalet(), // call our function that returns an array of middlewares for valdiation
//   chaletsController.postChalet
// );

module.exports = feedbacksRouter;