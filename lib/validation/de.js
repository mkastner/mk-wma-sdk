'use strict';

// based on ajv-i18n german

function title(schema, property) {
  return schema.properties[property].title;
}

module.exports = function localize_de(errors, schema) {
  if (!(errors && errors.length)) return;
  for (var i = 0; i < errors.length; i++) {
    var
      e = errors[i],
      out,
      n,
      cond;
    switch (e.keyword) {
    case '$ref':
      out = 'kann die Referenz ' + (e.params.ref) + ' nicht auflösen';
      break;
    case 'additionalItems':
      out = '';
      n = e.params.limit;
      out += 'sollte nicht mehr als ' + (n) + ' Element';
      if (n != 1) {
        out += 'e';
      }
      out += ' enthalten';
      break;
    case 'additionalProperties':
      out = 'sollte keine zusätzlichen Attribute haben';
      break;
    case 'anyOf':
      out = 'sollte einem der Schemata in "anyOf" entsprechen';
      break;
    case 'const':
      out = 'sollte der Konstante entsprechen';
      break;
    case 'constant':
      out = 'sollte der Konstante entsprechen';
      break;
    case 'contains':
      out = 'sollte ein valides Element enthalten';
      break;
    case 'custom':
      out = 'sollte die Validierung "' + (e.keyword) + '" bestehen';
      break;
    case 'dependencies':
      out = '';
      n = e.params.depsCount;
      out += 'sollte Attribut';
      if (n != 1) {
        out += 'e';
      }
      out += ' ' + (e.params.deps) + ' aufweisen, wenn Attribut ' + (e.params.property) + ' gesetzt ist';
      break;
    case 'enum':
      out = 'sollte einem der vorgegebenen Werte entsprechen';
      break;
    case 'exclusiveMaximum':
      out = '';
      cond = e.params.comparison + ' ' + e.params.limit;
      out += 'sollte ' + (cond) + ' sein';
      break;
    case 'exclusiveMinimum':
      out = '';
      cond = e.params.comparison + ' ' + e.params.limit;
      out += 'sollte ' + (cond) + ' sein';
      break;
    case 'false schema':
      out = 'boolsches Schema ist falsch';
      break;
    case 'format':
      out = 'sollte diesem Format entsprechen: "' + (e.params.format) + '"';
      break;
    case 'formatExclusiveMaximum':
      out = 'formatExclusiveMaximum sollte ein boolscher Wert sein';
      break;
    case 'formatExclusiveMinimum':
      out = 'formatExclusiveMinimum sollte ein boolscher Wert sein';
      break;
    case 'formatMaximum':
      out = '';
      cond = e.params.comparison + ' ' + e.params.limit;
      out += 'sollte ' + (cond) + ' sein';
      break;
    case 'formatMinimum':
      out = '';
      cond = e.params.comparison + ' ' + e.params.limit;
      out += 'sollte ' + (cond) + ' sein';
      break;
    case 'maximum':
      out = '';
      cond = e.params.comparison + ' ' + e.params.limit;
      out += 'sollte ' + (cond) + ' sein';
      break;
    case 'maxItems':
      out = '';
      n = e.params.limit;
      out += 'sollte nicht mehr als ' + (n) + ' Element';
      if (n != 1) {
        out += 'e';
      }
      out += ' haben';
      break;
    case 'maxLength':
      out = '';
      n = e.params.limit;
      out += 'sollte nicht länger als ' + (n) + ' Zeichen sein';
      break;
    case 'maxProperties':
      out = '';
      n = e.params.limit;
      out += 'sollte nicht mehr als ' + (n) + ' Attribut';
      if (n != 1) {
        out += 'e';
      }
      out += ' haben';
      break;
    case 'minimum':
      out = '';
      cond = e.params.comparison + ' ' + e.params.limit;
      out += 'sollte ' + (cond) + ' sein';
      break;
    case 'minItems':
      out = '';
      n = e.params.limit;
      out += 'sollte nicht weniger als ' + (n) + ' Element';
      if (n != 1) {
        out += 'e';
      }
      out += ' haben';
      break;
    case 'minLength':
      out = '';
      n = e.params.limit;
      out += 'sollte nicht kürzer als ' + (n) + ' Zeichen sein';
      break;
    case 'minProperties':
      out = '';
      n = e.params.limit;
      out += 'sollte nicht weniger als ' + (n) + ' Attribut';
      if (n != 1) {
        out += 'e';
      }
      out += ' haben';
      break;
    case 'multipleOf':
      out = 'sollte ein Vielfaches von ' + (e.params.multipleOf) + ' sein';
      break;
    case 'not':
      out = 'sollte dem in "not" angegebenen Schema widersprechen';
      break;
    case 'oneOf':
      //out = 'sollte genau einem der Schemata in "oneOf" entsprechen';
      out = 'sollte ein Element ausgewählt sein';
      break;
    case 'pattern':
      out = 'sollte diesem Muster entsprechen: "' + (e.params.pattern) + '"';
      break;
    case 'patternGroups':
      out = '';
      n = e.params.limit;
      out += 'sollte ' + (e.params.reason) + ' ' + (n) + ' Attribut';
      if (n != 1) {
        out += 'e';
      }
      out += ' nach folgendem Muster haben "' + (e.params.pattern) + '"';
      break;
    case 'patternRequired':
      out = 'sollte ein Attribut nach folgendem Muster haben "' + (e.params.missingPattern) + '"';
      break;
    case 'propertyNames':
      out = 'Attributname \'' + (e.params.propertyName) + '\' ist ungültig';
      break;
    case 'required':
      out = (title(schema, e.params.missingProperty)) + ' muß angegeben werden';
      break;
    /*
    case 'required':
      out = 'sollte das erforderliche Attribut ' + (e.params.missingProperty) + ' enthalten';
      break;
    */
    case 'switch':
      out = 'sollte der "switch" Validierung entsprechen, der Fall ' + (e.params.caseIndex) + ' schlägt fehl';
      break;
    case 'type':
      out = 'sollte sein: ' + (e.params.type);
      break;
    case 'uniqueItems':
      out = 'sollte keine Duplikate enthalten (Elemente #' + (e.params.j) + ' und #' + (e.params.i) + ' sind gleich)';
      break;
    default:
      continue;
    }
    e.message = out;
  }
};
