var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/Controller');


router.route('/').
    get(ctrl.fetch);



module.exports = router;