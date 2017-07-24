const
  tape = require('tape'),
  schema = require('../lib/schema'),
  AJV = require('ajv'),
  ajv = AJV({i18n: true}),
  taskModel = {
    typ: 3,
    objekt_typ: 57,
    objekt_neuerstandort: JSON.stringify({
      type: 'Point',
      coordinates: [
        8.578219413757324,
        49.38432842369698
      ]}),
    objekt_wohnflaeche: 70,
    objekt_baujahr: '1997',
    objekt_strasse: 'Alleestrasse',
    objekt_hausnummer: '12',
    objekt_ort: 'Meine Stadt',
    objekt_plz: '77777',
    returnurl1: 'http://local.domain.com'
  },
  Validator = require('../lib/validator');

/*

tape('schema required fields exist', function(t) {

  let
    validate = ajv.compile(schema);
  // testing on equality and propertyName
  // thus
  t.plan(Object.keys(taskModel).length + 1);

  let testModel = {};

  for (let key in taskModel) {

    let valid = validate(testModel);
    t.equal('required', validate.errors[0].keyword);

    console.log(ajv.errorsText(validate.errors, { separator: '\n'}));
    testModel[key] = taskModel[key];

  }

  let  valid = validate(testModel);

  if (!valid) console.log(validate.errors);

  t.ok(valid);

});
*/


tape('schema localize errors to german', function(t) {

  let testModel = {},
    validator = Validator(schema);

  // adding 4 because of two extra tests after loop
  // min plz length & result valid & error

  t.plan((Object.keys(taskModel).length * 2) + 4);

  let result;

  for (let key in taskModel) {

    result = validator.validate(testModel);

    //console.log('result', result);

    //t.equal('required', validate.errors[0].keyword);

    //console.log(ajv.errorsText(validate.errors, { separator: '\n'}));

    t.notOk(result.valid, 'valid object must not exist');
    t.ok(result.error, 'error object must exist');

    testModel[key] = taskModel[key];

  }

  taskModel.objekt_plz = '77';

  t.notOk(result.valid, 'valid object must not exist');
  t.ok(result.error, 'error object must exist');

  result = validator.validate(testModel);

  taskModel.objekt_plz = '77777';

  // validate on complete model

  result = validator.validate(testModel);

  t.ok(result.valid, 'valid object must exist');
  t.notOk(result.error, 'error object must not exist');



  //if (!valid) console.log(validate.errors);

  //t.ok(valid);

  //t.end();

  /*

  try {

    let
      validate = await ajv.compile(schema);
    // testing on equality and propertyName
    // thus
    t.plan(Object.keys(taskModel).length + 1);

    let testModel = {};

    for (let key in taskModel) {

      let valid = await validate(testModel);

      localize.de(validate.errors);

      t.equal('required', validate.errors[0].keyword);

      console.log(ajv.errorsText(validate.errors, { separator: '\n'}));
      testModel[key] = taskModel[key];

    }

    let  valid = await validate(testModel);

    if (!valid) console.log(validate.errors);

    t.ok(valid);

  } catch (err) {
    console.error(err);
  }
  */

});
