// map single wohnpreis object to WMA request
// IMPORTANT: in wohnpreis geometry object must be moved into properties
let wmaSchema = require('mk-wma-sdk/lib/schema.js');

function wmaObjecttype(objecttype) {

  let map = {
    'wohnung-mieten': 1,
    'wohnung-kaufen': 2,
    'haus-kaufen': 3
  };

  return map[objecttype];

}

function wmaObjekttyp(objekttyp) {

  let objekt_typen = wmaSchema.properties.objekt_typ.oneOf;

  for (let i = 0, l = objekt_typen.length; i < l; i ++) {
    let objekt_typ = objekt_typen[i];
    let regExp = new RegExp(`^${objekttyp}$`, 'i');
    if (objekt_typ.title.match(regExp)) {
      return objekt_typ.const;
    }
  }

  return null;

}

function wmaObjektzustand(objektzustand) {

  let map = {
    'sanierungsbedürftig': 1,
    'Renovierungsbedürftig': 2,
    'Gepflegt': 3,
    'Neuwertig': 4,
    'Renoviert': 5,
    'Saniert': 6,
    'Kernsaniert': 7
  };

  return map[objektzustand.toLowerCase()];

}


function wmaGeometry(geometry) {
  return JSON.stringify(geometry);
}

function MapRealtyToWMA(realty) {

  if (!realty.geometry) {
    throw new Error('geometry is missing');
  }

  console.log('window.location:', window.location);

  let WMA = {
    typ: wmaObjecttype(realty.objecttype),
    objekt_angebotspreis: realty.price,
    objekt_wohnflaeche: parseFloat(realty.wfl),
    objekt_baujahr: realty.baujahr,
    objekt_zimmer: realty.rooms,
    objekt_typ: wmaObjekttyp(realty.objekttyp),
    objekt_zustand: wmaObjektzustand(realty.objektzustand),
    objekt_strasse: '',
    objekt_hausnummer: '',
    objekt_plz: '',
    objekt_ort: '',
    objekt_neuerstandort: wmaGeometry(realty.geometry),
    // protocol includes ":"
    returnurl1: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/admin/wma`
  };

  return WMA;

}

module.exports = MapRealtyToWMA;
