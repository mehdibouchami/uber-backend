const Taxi = require('../models/taxi');


exports.getNearest = (req, res) => {
    Taxi.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [req.query.longitude, req.query.latitude]
                },
                $maxDistance: 1000
            }
        }
    })
        .then(taxis => res.json(taxis))
        .catch(error => res.json({ error }));
};


exports.createTaxi = (req, res) => {
    var taxi = new Taxi({
        nom: req.body.nom,
        tel: req.body.tel,
        email: req.body.email,
        type: req.body.type,
        mot_de_passe: req.body.mot_de_passe,
        location: {
            type: "Point",
            coordinates: [Number(req.body.longitude), Number(req.body.latitude)]
        }
    })
    taxi.save()
        .then(() => { res.json({ message: 'Taxi created !' }) })
        .catch(error => res.json({ error }));
};
