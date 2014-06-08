var fs = require('fs');
var url = require('url');
var http = require('http');
var temp = require('temp');
var webshot = require('webshot');
var merge = require('./helpers').merge;
var settings = require('./settings');


// Load local settings
try {
  var settingsLocal = require('./settings-local');
}
catch (e) {
  var settingsLocal = {};
}
settings = merge(settings, settingsLocal);


// Run server
http.createServer(function(req, res) {
  var urlParts = url.parse(req.url, true);
  var search = urlParts.search;
  var query = urlParts.query;
  var urlPath = urlParts.pathname;

  if (urlParts.pathname == '/') {
    res.writeHead(302, {
      'Location': 'http://aggrenda.com'
    });
    res.end();
    return;
  }

  // Validate path and split into parts
  var urlPathParts = urlPath.split('/').filter(function(s) { return s; });
  if (urlPathParts.length != 4 || urlPathParts[3] != 'embed') {
    console.log('***REQUEST ERROR*** Invalid path:', urlPath);
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
    return;
  }
  // Get path variables
  var username = urlPathParts[0];
  var calendar = urlPathParts[1];
  var view = urlPathParts[2];
  // Validate view
  if (view != 'monthly' && view != 'list' && view != 'next-event') {
    console.log('***REQUEST ERROR*** View not supported:', view);
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
    return;
  }

  var path = '/' + username + '/' + calendar + '/' + view + '/embed/';
  var filename = temp.path({dir: 'tmp', suffix: '.png'});
  console.log(filename);

  // TODO: Check cache for widget image

  // Get widget image
  console.log('Requested:', path);
  webshot('http://aggrenda.com' + path + search, filename, {
    screenSize: {
     width: query.width || settings.DEFAULT_SHOT_WIDTH,
     height: query['min-height'] || settings.DEFAULT_SHOT_MIN_HEIGHT,
    },
    shotSize: {
      width: query.width || settings.DEFAULT_SHOT_WIDTH,
      height: 'all',
    },
    quality: settings.WEBSHOTS_QUALITY,
  }, function(err) {
    if(err) {
      console.log('Could not grab ' + path + ':', err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not Found');
      return;
    }

    // Respond with file
    console.log('Rendered:', path);
    fs.readFile(filename, function(err, data) {
      if (err) {
        console.log('Error reading file for ' + path + ':', err);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, {'Content-Type': 'image/png'});
      res.end(data, 'binary');
      console.log('Responded:', path);
    });

    // TODO: Cache the image
  });
}).listen(settings.PORT);
console.log(' * Listening on http://localhost:' + settings.PORT + '/');
