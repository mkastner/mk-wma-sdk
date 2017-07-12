const
  tape = require('tape'),
  Arg = require('../lib/arg'),
  apikey = Arg('apikey'),
  WMAAPI = require('../index.js'),
  http = require('http'),
  port = 9631,
  httpShutdown = require('http-shutdown');

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
        returnurl1: 'http://local.fmh.de:9631'
      };

    await wmaApi.createTask(taskParams);

    let server = http.createServer(function(req, res) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.end('I have received your request and it was awesome.');
      t.ok(req.connection.remoteAddress.match(/138\.201\.64\.199/));
      try {
        server.shutdown(function() {
          console.info('server is shutdown');
        });
      } catch(err) {
        console.error(err);
        console.info('server is shutdown');
      }
    });

      // adding shutdown ability
    server = httpShutdown(server);

    server.listen(port, function() {
      console.info('server running on port', port);
    });

  } catch (err) {
    console.error(err);
  }

});
