var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/Controller');


router.route('/').
    get(ctrl.fetch);

router.route('/tiedot/:id').
    get(ctrl.tiedot);

module.exports = router;