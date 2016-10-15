'use strict'

var http = require('http');
var request = require('request');
var constants = require('../common/constants');
var rootUrl = constants.host + constants.path;

module.exports = {
  changeState: function(req, res, next) {
    request({
        url: rootUrl + '/groups/' + req.params.id + '/action',
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
        url: rootUrl + '/groups/',
        method: 'GET'
      },
      function(error, response, body) {
        res.send(body);
      }
    );
  }
};
