const mongoose = require('mongoose');

const taxiSchema = mongoose.Schema({
  nom: { type: String },
  tel: { type: Number },
  email: { type: String,unique : true },
  type: { type: String},
  mot_de_passe: { type: String },
  location: {
      type: {
        type:"String"
      }, 
      coordinates : {
        type: [Number]}
  }
});
taxiSchema.index({ location : "2dsphere"});

module.exports = mongoose.model('Taxi', taxiSchema);