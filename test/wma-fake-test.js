const
  path = require('path'),
  tape = require('tape'),
  fs = require('fs'),
  Arg = require('../lib/arg'),
  apikey = Arg('apikey'),
  WMAAPI = require('../index.js'),
  http = require('http'),
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  port = 9631,
  httpShutdown = require('http-shutdown');

function saveResult(req) {

  return new Promise(function(resolve, reject) {

    var data = [];

    req.on('data', function(chunk) {
      data.push(chunk);
    }).on('end', function() {
      //at this point data is an array of Buffers
      //so Buffer.concat() can make us a new Buffer
      //of all of them together
      let
        buffer = Buffer.concat(data),
        resultPath = path.join(__dirname, '..', 'tmp', 'test.pdf');

      fs.writeFile(resultPath, buffer, function(err) {

        if (err) {
          console.error(err);
          reject(err);
        }

        return resolve(buffer);

      });

    });

  });

}

tape('create fake task test with callback request', async function(t) {

  try {

    t.plan(1);

    let
      wmaApi = WMAAPI(apikey),
      taskParams = {
        test: 100 ,
        typ: 3,
        objekt_neuerstandort: JSON.stringify({
          type: 'Point',
          coordinates: [
            8.578219413757324,
            49.38432842369698
          ]}),
        objekt_strasse: 'Die Strasse',
        objekt_hausnummer: '11',
        objekt_plz: '77777',
        objekt_ort: 'Irgendwo',
        objekt_typ: 57, // number
        objekt_wohnflaeche: 70, //number
        objekt_baujahr: '1950',
        returnurl1: `http://local.fmh.de:${port}`
      };

    let createTaskResult = await wmaApi.createTask(taskParams);

    console.log('createTaskResult', createTaskResult);

    console.log('createTaskResult', createTaskResult.id);

    let server = http.createServer(app);

    app.server = httpShutdown(server);

    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/', function(req, res) {
      console.log(req);
      res.send('I have received your request and it was awesome.');
      t.ok(req.connection.remoteAddress.match(/138\.201\.64\.199/));
      app.server.shutdown();
    });

    app.get('/', function(req, res) {
      console.log(req.body);
      t.ok(req.body);
      //res.writeHead(200, {'content-type': 'text/plain'});
      res.send(200, 'I have received your request and it was awesome.');
      app.server.shutdown();
    });



    app.server.listen(port, function() {
      console.info('server running on port', port);

    });

    //await wmaApi.createTask(taskParams);

    /*

    let server = http.createServer(async function(req, res) {



      try {

        console.log('req', req);

        await saveResult(req);

      } catch(err) {

        console.error(err);

      } finally {

        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('I have received your request and it was awesome.');

        t.ok(req.connection.remoteAddress.match(/138\.201\.64\.199/));
        try {
          server.shutdown(function() {
            console.info('server is shutdown');
          });
        } catch(err) {
          console.error(err);
          console.info('server is not shutdown');
        }

      }

    });

    // adding shutdown ability
    server = httpShutdown(server);



    server.listen(port, function() {
      console.info('server running on port', port);
    });

    */

  } catch (err) {
    console.error(err);
  }

});
