const
  tape = require('tape'),
  request = require('../request-promise'),
  wohnpreisURL =
    'https://www.wohnpreis.de/API/OBJEKTE/?objecttype=rentflat&filter[geo][latitude]=49.385219&filter[geo][longitude]=8.572245&filter[geo][radius]=50';

tape(async function() {

  let
    result = await request(wohnpreisURL),
    firstRealty = result.objects[0].properties;
    // move go position into realty object
    firstRealty.geometry = firstRealty[0].geometry;

});
