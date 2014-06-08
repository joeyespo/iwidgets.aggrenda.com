var http = require('http');
var fs = require('fs');
var webshot = require('webshot');
var merge = require('./helpers').merge;
var settings = require('./settings');


// Load local settings
try {
  var settingsLocal = require('./settings-local');
}
catch(e) {
  var settingsLocal = {};
}
settings = merge(settings, settingsLocal);


// Configure libraries
var options = {
  screenSize: {
   width: settings.DEFAULT_SHOT_WIDTH,          // TODO: Grab from URL parameter
   height: settings.DEFAULT_SHOT_MIN_HEIGHT,    // TODO: Grab 'min-height' from URL parameter
  },
  shotSize: {
    width: settings.DEFAULT_SHOT_WIDTH,
   height: settings.DEFAULT_SHOT_MIN_HEIGHT,
  },
  errorIfStatusIsNot200: true,
};


// TODO: Grab from URL parameter
// TODO: urlencode
var username = 'joeyespo';
var calendar = 'startupdigest';


// Run server
http.createServer(function(req, res) {
    // TODO: Check cache for widget image

  console.log('Requested:', username + '/' + calendar);
  webshot('http://aggrenda.com/' + username + '/' + calendar + '/monthly/embed/', options, function(err, renderStream) {
    if(err) {
      // TODO: HTTP error
      console.log('Error:', err);
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Error rendering widget.');
    }

    // TODO: Cache widget image to disk and return that all at once after it finishes

    // Write image
    console.log('Rendering:', username + '/' + calendar);
    res.writeHead(200, {'Content-Type': 'image/png'});
    renderStream.on('data', function(data) {
      res.write(data.toString('binary'), 'binary');
    });
    renderStream.on('end', function(data) {
      console.log('Finished:', username + '/' + calendar);
      res.end();
    });
  });
}).listen(settings.PORT);
console.log(' * Listening on http://localhost:' + settings.PORT + '/');
