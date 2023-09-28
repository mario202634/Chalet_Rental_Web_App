const { model, Schema } = require('mongoose');

const FeedbackSchema = new Schema({
  name: {
    type: 'string',
    required: true
  },
  email: {
    type: 'string',
    required: true
  },
  chaletId: {
    type: Schema.Types.ObjectId,
    ref: 'chalet',
    required: true
  },
  feedback: {
    type: 'String',
    required: true
  }
});

const FeedbackModel = model('feedback', FeedbackSchema);

module.exports = FeedbackModel;