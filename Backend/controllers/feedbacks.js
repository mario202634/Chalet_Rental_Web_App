const feedbacksService = require('../services/feedbacks');

module.exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedbacksService.findAllFeedbacks();
    return res.send({ feedbacks });
  } catch (err) {
    // this denotes a server error, therefore status code should be 500.
    res.status(500);
    return res.send({
      error: 'Mesh 3aref'

    });
  }
};

module.exports.getFeedbackByChalet = async (req, res) => {
  // notice how we extract the chaletId from the dynamic route that should be /chalets/:chaletId
  const chaletId = req.params.chaletId;
  try {
    const feedbacks = await feedbacksService.findFeedbacksByChaletId(chaletId);
    if (!feedbacks) {
      return res.status(404).send({
        error: 'Feedbacks not found.'
      });
    }
    return res.send({
        feedbacks : feedbacks
    });
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
};

module.exports.postFeedback = async (req, res) => {
    // get validation errors in the form of an array.
    // const validationErrors = validationResult(req).array();
    // if (validationErrors.length > 0) {
    //   const firstError = validationErrors[0];
    //   return res.status(422).send({
    //     error: firstError.msg
    //   });
    // }
  
    const feedbackInfo = {
      name: req.body.name,
      email: req.body.email,
      chaletId: req.body.chaletId,
      feedback: req.body.feedback
    };
  
    try {
      const addedFeedback = await feedbacksService.addNewFeedback(
        feedbackInfo,
      );
  
      res.status(201).send({
        msg: 'Feedback added successfully.',
        feedbackId: addedFeedback._id
      });
    } catch (err) {
      res.status(500);
      res.send({
        error: err.message
      });
    }
  };

module.exports.deleteFeedback = async (req, res) => {
  const feedbackId = req.params.feedbackId;
  try {
    await feedbacksService.removeFeedback(feedbackId);
    return res.send({
      msg: 'Feedback deleted successfully.'
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message
    });
  }
};