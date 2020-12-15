const axios = require('axios');
const turf = require('@turf/turf')

exports.getDirection = async (req, res) => {
    let url = 'https://api.mapbox.com/directions/v5/mapbox/driving-traffic/';
    url += req.params.longdep+','+req.params.altdep+';'+req.params.longarr+','+req.params.altarr;
    url += '?geometries=geojson&access_token=pk.eyJ1IjoibWVoZGk3NyIsImEiOiJja2R4bWtpYmIzM3N1MnRwYWUxZjlldnNxIn0.0wiRF9B_wuv8hzM5uvAqow';
    

    try {
    const response = await axios.get(url);
    const data = response.data;
    res.json(data);
    }
    catch (error){
        console.log("error");
         res.json({error: error });
    }


};

exports.getNearest = (req, res) => {
    var targetPoint = turf.point([28.965797, 41.010086], {"marker-color": "#0F0"});
var points = turf.featureCollection([
    turf.point([28.973865, 41.011122]),
    turf.point([28.948459, 41.024204]),
    turf.point([28.938674, 41.013324])
]);

var nearest = turf.nearestPoint(targetPoint, points);
console.log(nearest);
res.json({ message : 'nearest' });
}
