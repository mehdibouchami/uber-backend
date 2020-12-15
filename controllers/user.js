const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.getAllUser = (req, res) => {
    var filter = (req.query.filter) ? req.query.filter : '' ;
    User.find({ nom: { $regex : filter, $options : 'i' }})
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
        nom: req.body.nom,
        tel: req.body.tel,
        email: req.body.email,
        type: req.body.type,
        mot_de_passe: req.body.mot_de_passe
    })
    user.save()
        .then(() => { res.json({ message: 'user created !' }) })
        .catch(error => res.json({ error }));
};

exports.updateUser = (req, res) => {
    User.updateOne({ _id: req.params.id }, {
        nom: req.body.nom,
        tel: req.body.tel,
        email: req.body.email,
        type: req.body.type,
        mot_de_passe: req.body.mot_de_passe
    })
        .then(() => res.json({ message: 'user updated !' }))
        .catch(error => res.json({ error }));
};

exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => res.json({ message: 'user deleted !' }))
        .catch(error => res.json({ error }));
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                res.status(401).json({ message: 'Not Authorized' });
            }
            else {
                if (req.body.mot_de_passe == user.mot_de_passe) {
                    res.json({
                        token: jwt.sign(
                            { id: user._id,
                            type: user.type},
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                }
                else {
                    res.json({ message: 'mot de passe incorrect' });
                }
            }
        })
        .catch(error => res.json({ error }));
};