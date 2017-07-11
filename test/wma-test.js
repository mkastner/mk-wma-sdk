const
  log = require('mk-log'),
  tape = require('tape'),
  Arg = require('../lib/arg'),
  apikey = Arg('apikey'),
  WMAAPI = require('../index.js');

  //request = require('request');

/*
tape('get options test', async function(t) {

  try {

    t.plan(1);

    let
      apiKey = apikey,
      wmaApi = WMAAPI(apiKey),
      optionsResult = await wmaApi.options();

    t.ok(optionsResult);

  } catch (err) {
    log.error(err);
  }

});
*/

tape('get list test', async function(t) {

  try {

    t.plan(1);

    let
      wmaApi = WMAAPI(apikey),
      listResult = await wmaApi.getList();
    t.ok(listResult);

  } catch (err) {
    log.error(err);
  }

});

tape('create task test', async function(t) {

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
        objekt_baujahr: '1950'
      },

      taskResult = await wmaApi.createTask(taskParams);

    log.info('result', JSON.stringify(taskResult, null, 4));

    t.ok(taskResult);


  } catch (err) {
    log.error(err);
  }

});
