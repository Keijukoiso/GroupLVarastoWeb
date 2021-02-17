var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/yritysController');

router.route('/Yritys/get').
    get(ctrl.fetch);

router.route('/Yritys/delete').
    delete(ctrl.del);
    
    
// Julkaistaan ao. funktiot tämän js-filun ulkopuolelle
module.exports = router;