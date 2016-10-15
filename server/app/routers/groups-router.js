'use strict';

var express = require('express'),
  router = new express.Router(),
  controllers = require('../controllers');

router.put('/:id/action', controllers.groups.changeState);
router.get('/', controllers.groups.getInfo);

module.exports = function(app) {
  app.use('/groups', router);
};