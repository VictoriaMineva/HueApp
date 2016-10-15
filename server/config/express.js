var cors = require('cors')
var bodyParser = require('body-parser');

module.exports = function(app) {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
};