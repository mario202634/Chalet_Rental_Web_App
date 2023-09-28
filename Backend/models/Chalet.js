const { model, Schema } = require('mongoose');

const ChaletSchema = new Schema({
  name: {
    type: 'String',
    required: true
  },
  email: {
    type: 'String',
    required: true
  },
  address: {
    type: 'String',
    required: true
  },
  price: {
    type: 'Number',
    required: true
  },
  location: {
    lat: {
      type: 'Number',
      required: true
    },
    lng: {
      type: 'Number',
      required: true
    }
  },
  imgURL: {
    type: 'String'
  },
  is_rented: {
    type: 'Boolean',
    default: false
  },
  govId: {
    type: Schema.Types.ObjectId,
    ref: 'governorates',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
});

const ChaletModel = model('chalet', ChaletSchema);

module.exports = ChaletModel;