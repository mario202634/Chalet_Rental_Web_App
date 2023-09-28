const FeedbackModel = require('../models/Feedback');

module.exports.addNewFeedback = async (FeedbackInfo) => {
  const feedback = new FeedbackModel({
    name: FeedbackInfo.name,
    email: FeedbackInfo.email,
    chaletId: FeedbackInfo.chaletId,
    feedback: FeedbackInfo.feedback,

  });
  try {
    const addedFeedback = await feedback.save();
    return addedFeedback;
  } catch (error) {
    console.log(error);
    throw new Error('Could not add feedback.');
  }
};

module.exports.findAllFeedbacks = async () => {
    try {
      const feedbacks = await FeedbackModel.find();
      return feedbacks;
    } catch (err) {
      throw new Error('Could not retrieve Feedbacks.');
    }
  };

module.exports.findFeedbacksByChaletId = async (chaletId) => {
    try {
      // const feedback = await FeedbackModel.findById(chaletId).populate(
      //   'chaletId'
      // );
      const feedback = await FeedbackModel.find({chaletId : chaletId});
      return feedback;
    } catch (err) {
      throw new Error('Could not find feedbacks.');
    }
  };

module.exports.removeFeedback = async (feedbackId) => {
    try {
      await FeedbackModel.deleteOne({ _id: feedbackId });
    } catch (err) {
      throw new Error('Could not remove feedback.');
    }
  };