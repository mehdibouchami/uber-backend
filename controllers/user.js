const User = require('../models/user');

exports.getAllUser = (req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(error => res.json({ error }));
};

exports.getUser = (req, res) => {
    User.findOne({ _id: req.params.id })
    .then(user => res.json(user))
    .catch(error => res.json({ error }));
};

exports.createUser = (req, res) => {
    var user = new User({
        nom : req.body.nom,
        tel : req.body.tel,
        email : req.body.email,
        type : req.body.type,
        mot_de_pass : req.body.mot_de_pass
    })
    user.save()
    .then(() => {res.json({ message: 'user created !'})})
    .catch(error => res.json({ error }));
};

exports.updateUser = (req, res) => {
    User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.json({ message: 'user updated !'}))
    .catch(error => res.json({ error }));
};

exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
    .then(() => res.json({ message: 'user deleted !'}))
    .catch(error => res.json({ error }));
};