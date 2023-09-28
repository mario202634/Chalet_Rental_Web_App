const { model, Schema } = require('mongoose');

const GovernoratesSchema = new Schema({
  name: {
    type: 'String',
    required: true
  }
});

const GovernoratesModel = model('governorates', GovernoratesSchema);

module.exports = GovernoratesModel;
