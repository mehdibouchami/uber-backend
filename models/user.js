const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  nom: { type: String },
  tel: { type: Number },
  email: { type: String,unique : true },
  type: { type: String},
  mot_de_passe: { type: String },
});

module.exports = mongoose.model('User', userSchema);