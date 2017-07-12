const
  tape = require('tape'),
  Arg = require('../lib/arg'),
  apikey = Arg('apikey'),
  WMAAPI = require('../index.js');

/*
//http OPTIONS is not implemented

tape('get options test', async function(t) {

  try {

    t.plan(1);

    let
      apiKey = apikey,
      wmaApi = WMAAPI(apiKey),
      optionsResult = await wmaApi.options();

    t.ok(optionsResult);

  } catch (err) {
    console.error(err);
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
    console.error(err);
  }

});
