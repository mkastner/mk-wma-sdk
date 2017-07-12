const
  tape = require('tape'),
  schema = require('../lib/schema'),
  AJV = require('ajv'),
  ajv = AJV();

tape('schema required fields', async function(t) {

  try {

    let
      validate = await ajv.compile(schema);

    let taskModel = {
      typ: 3,
      objekt_typ: 57,
      objekt_neuerstandort: JSON.stringify({
        type: 'Point',
        coordinates: [
          8.578219413757324,
          49.38432842369698
        ]}),
      objekt_plz: '77777',
      objekt_wohnflaeche: 70,
      objekt_baujahr: '1997',
      objekt_strasse: 'Alleestrasse',
      objekt_hausnummer: '12',
      objekt_ort: 'Meine Stadt',
      returnurl1: 'http://local.domain.com'
    };


    // testing on equality and propertyName
    // thus
    t.plan(Object.keys(taskModel).length + 1);

    //let  valid = await validate(taskModel);

    let testModel = {};

    for (let key in taskModel) {

      let valid = await validate(testModel);
      t.equal('required', validate.errors[0].keyword);
      testModel[key] = taskModel[key];

    }

    let  valid = await validate(testModel);

    if (!valid) console.log(validate.errors);

    t.ok(valid);

  } catch (err) {
    console.error(err);
  }

});
