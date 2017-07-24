var
  schema = require('../lib/schema'),
  AJV = require('ajv'),
  ajv = AJV(),
  localize = {
    de: require('./validation/de')
  };

function Validator(schema) {

  var compiledSchema = ajv.compile(schema);

  ajv.errorsText(compiledSchema.errors, { separator: '\n'});

  var pub = {
    validate(model) {
      var valid = compiledSchema(model),
        error;

      localize.de(compiledSchema.errors, schema);

      if (compiledSchema.errors && compiledSchema.errors.length >= 1) {

        error = {
          message: 'Einige Angaben waren nicht gültig',
          errors: {}
        };

        for (var i = 0, l = compiledSchema.errors.length; i < l; i++) {
          var compiledError = compiledSchema.errors[i];
          var propertyName;
          if (compiledError.dataPath) {
            propertyName = compiledError.dataPath.replace(/^\./,'');
          } else if (
            compiledError.params &&
            compiledError.params.missingProperty) {
            propertyName = compiledError.params.missingProperty;
          }

          if (!propertyName) {
            var errorObj = JSON.stringify(compiledError, null, 4);
            console.error('errorObj', errorObj);
            throw new Error(
              'Could not find propertyName reference in error object ', errorObj
            );
          }

          error.errors[propertyName] = compiledError.message;

        }

      }

      return {
        valid: valid,
        error: error
      };
    }
  };

  return pub;

}

module.exports = Validator;
