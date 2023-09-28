const { model, Schema } = require('mongoose');

const RentalSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  chaletId: {
    type: Schema.Types.ObjectId,
    ref: 'chalet',
    required: true
  },
  startDate: {
    type: 'Date',
    required: true
  },
  endDate: {
    type: 'Date',
    required: true
  }
});

const RentalModel = model('rental', RentalSchema);

module.exports = RentalModel;