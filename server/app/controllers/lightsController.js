'use strict'

var http = require('http');
var request = require('request');
var constants = require('../common/constants');
var rootUrl = constants.host + constants.path;

module.exports = {
  changeState: function(req, res, next) {
    request({
        url:  rootUrl + '/lights/' + req.params.id + '/state',
        method: 'PUT',
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: req.body
      },
      function(error, response, body) {}
    );
    res.end();
  },
  getInfo: function(req, res, next) {
    request({
        url: rootUrl + '/lights/',
        method: 'GET'
      },
      function(error, response, body) {
        res.send(body);
      }
    );
  }
};
