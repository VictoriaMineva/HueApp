'use strict';

var express = require('express'),
  router = new express.Router(),
  controllers = require('../controllers');

router.put('/:id/state', controllers.lights.changeState);
router.get('/', controllers.lights.getInfo);

module.exports = function(app) {
  app.use('/lights', router);
};