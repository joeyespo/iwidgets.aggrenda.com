var fs = require('fs');
var url = require('url');
var http = require('http');
var aws = require('aws-sdk');
var temp = require('temp');
var webshot = require('webshot');
var merge = require('./helpers').merge;
var settings = require('./settings');


// Constants
IMAGE_FILE_EXTENSION = '.png';
IMAGE_CONTENT_TYPE = 'image/png';


// Load local settings
try {
  var settingsLocal = require('./settings-local');
}
catch (e) {
  var settingsLocal = {};
}
settings = merge(settings, settingsLocal);
// Configure libraries
aws.config.region = settings.AWS_S3_REGION;
var s3 = new aws.S3({params: {Bucket: settings.AWS_S3_BUCKET}});


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

  // Get paths
  var calendarQualifiedName = username + '/' + calendar + '/' + view;
  var calendarFilename = calendarQualifiedName + IMAGE_FILE_EXTENSION;
  var embedPath = calendarQualifiedName + '/embed/';
  var renderFilename = temp.path({dir: 'tmp', suffix: IMAGE_FILE_EXTENSION});

  // Check cache for widget image
  var respondedFromCache = false;
  s3.getObject({
    Key: calendarFilename,
    ResponseContentType: IMAGE_CONTENT_TYPE,
  }, function(err, data) {
    if (err) {
      // Ignore cache errors
      return;
    }
    res.writeHead(200, {'Content-Type': IMAGE_CONTENT_TYPE});
    res.end(data.Body, 'binary');
    respondedFromCache = true;
    console.log('> Responded from cache:', calendarQualifiedName);
  });

  // Get widget image
  console.log('> Requested:', calendarQualifiedName);
  webshot('http://aggrenda.com/' + embedPath + search, renderFilename, {
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
      console.log('***ERROR*** Could not grab ' + calendarQualifiedName + ' calendar:', err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not Found');
      return;
    }

    // Read resulting file
    console.log('> Rendered:', calendarQualifiedName);
    fs.readFile(renderFilename, function(err, data) {
      if (err) {
        console.log('***ERROR*** Could not read file for ' + calendarQualifiedName + ' calendar:', err);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
        return;
      }

      // Respond with image, if not already done
      if (!respondedFromCache) {
        res.writeHead(200, {'Content-Type': IMAGE_CONTENT_TYPE});
        res.end(data, 'binary');
        console.log('> Responded:', calendarQualifiedName);
      }

      // Cache image
      s3.createBucket(function() {
        s3.putObject({
          ACL: 'public-read',
          Key: calendarFilename,
          Body: data,
          ContentType: IMAGE_CONTENT_TYPE,
        }, function(err, response) {
          if (err) {
            console.log('***ERROR*** Could not cache image for ' + calendarQualifiedName + ' calendar:', err);
            return;
          }
          console.log('> Cached:', calendarQualifiedName);
        });
      });
    });
  });
}).listen(settings.PORT);
console.log(' * Listening on http://localhost:' + settings.PORT + '/');
