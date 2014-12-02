var express = require('express'); //framework
var morgan = require('morgan'); //logger
var favicon = require('serve-favicon'); //favicon


var _topdir = "/home/dryvenn/Projects/bar-dev/Zephir/Frontend/build";


express()

.use(morgan('dev'))
.use(express.static(_topdir))
.use(favicon(_topdir + '/assets/zephir.ico'))
// see http://expressjs.com/resources/middleware.html for more tools
.use(function(req, res , next) {
  console.log("Yielding Zephir !");
  res.end();
})

.listen(8080);