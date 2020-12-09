const User = require('../models/user');
const jwt = require('jsonwebtoken');

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
    User.updateOne({ _id: req.params.id }, { 
        nom : req.body.nom,
        tel : req.body.tel,
        email : req.body.email,
        type : req.body.type,
        mot_de_pass : req.body.mot_de_pass })
    .then(() => res.json({ message: 'user updated !'}))
    .catch(error => res.json({ error }));
};

exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
    .then(() => res.json({ message: 'user deleted !'}))
    .catch(error => res.json({ error }));
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if(!user){
            res.status(401).json({message: 'Not Authorized'});
        }
        if(req.body.mot_de_pass == user.mot_de_pass){
            res.json({
                token: jwt.sign(
                  { id: user._id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' }
                )
            });
        }
        else {
            res.json({message: 'mot de passe incorrect'});
        }
        res.json(user)})
    .catch(error => res.json({ error }));
};