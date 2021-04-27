var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/Controller');

//Etusivu
router.route('/').
    get(ctrl.fetch);

//Yhden tuotteen tietojen näyttäminen
router.route('/tiedot/:id').
    get(ctrl.tiedot);

//Lisäyssivu
router.route('/lisaa')
    .post(ctrl.add)
    .get(ctrl.lisaa);
    
    
router.route('/add')

router.route('/kirjaudu')
    .get(ctrl.kirjaudu);
   
//poistot
router.route('/poista/:id')
    .get(ctrl.del);

module.exports = router;