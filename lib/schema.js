const schema = {
  title: 'task',
  description: 'Wohnmarktanalyse Auftrag',
  type: 'object',
  properties: {
    test: {
      title: 'Testtypen',
      oneOf: [
        { const: 100, title: 'API-Test mit Fake-Ergebnis' },
        { const: 150, title: 'API-test ohne Fake-Ergebnis' },
        { const: 200, title: 'Normaler Ablauf mit Kennzeichnung als Testaufruf' }
      ]
    },
    typ: {
      title: 'Immobilien-Typ',
      oneOf: [
        //{ const: 1, title: 'Wohnung-Miete' },
        { const: 2, title: 'Wohnung-Kauf' },
        { const: 3, title: 'Hauskauf' }
      ]
    },
    eigentuemer_anrede: {
      type:'string'
    },
    eigentuemer_vorname: {
      type:'string'
    },
    eigentuemer_nachname: {
      type:'string'
    },
    eigentuemer_email: {
      title: 'E-Mail',
      type:'string'
    },
    eigentuemer_telefon: {
      title: 'Telefon',
      type:'string'
    },
    eigentuemer_fax: {
      title: 'Telefax',
      type:'string'
    },
    objekt_angebotspreis: {
      title: 'Angebotspreis',
      type:'number'
    },
    objekt_baujahr: {
      title: 'Baujahr des Objekts',
      type: 'string',
      maxLength: 4,
      minLength: 4
    },
    objekt_hausnummer: {
      minLength: 1,
      title: 'Hausnummer',
      type:'string',
    },
    objekt_neuerstandort: {
      type: 'string',
      title: 'JSON Point',
      description: 'GeoJSON Objekt Typ Point als String serialisiert'
    },
    objekt_ort: {
      minLength: 1,
      title: 'Ort',
      type:'string'
    },
    objekt_plz: {
      title: 'Postleitzahl des Objekts',
      type: 'string',
      maxLength: 5,
      minLength: 5
    },
    objekt_strasse: {
      minLength: 1,
      title: 'Strassename ohne Hausnummer',
      type: 'string'
    },
    // TODO if house
    objekt_grundstuecksflaeche: {
      title: 'Grundsücksfläche',
      type: 'number'
    },
    // TODO if appartment
    objekt_zimmer: {
      type: 'string',
      title: 'Anzahl Zimmer'
    },
    returnurl1: {
      type: 'string',
      title: 'Primäre URL, die per POST die Datei erhält'
    },
    returnurl2: {
      type: 'string',
      title: 'Sekundäre URL, die per POST die Datei erhält'
    },
    returnurl3: {
      type: 'string',
      title: 'Tertiäre URL, die per POST die Datei erhält'
    },
    objekt_typ: {
      title: 'Objekttyp',
      oneOf: [
        { const: 101, title: 'Erdgeschosswohnung' },
        { const: 82, title: 'Souterrainwohnung' },
        { const: 19, title: 'Etagenwohnung' },
        { const: 41, title: 'Maisonettewohnung' },
        { const: 93, title: 'Dachgeschosswohnung' },
        { const: 56, title: 'Penthouse' },
        { const: 62, title: 'Mehrfamilienhaus' },
        { const: 57, title: 'Einfamilienhaus' },
        { const: 74, title: 'Bungalow' },
        { const: 86, title: 'Villa' },
        { const: 96, title: 'Doppelhaushälfte' },
        { const: 84, title: 'Reihenendhaus' },
        { const: 81, title: 'Reihenmittelhaus' },
        { const: 21, title: 'Zweifamilienhaus' }
      ]
    },
    objekt_wohnflaeche: {
      title: 'Wohnfläche des Objekts',
      type: 'number'
    },
    objekt_zustand: {
      title: 'Zustand der Immobilie',
      oneOf: [
        { const: 1, title: 'sanierungsbedürftig' },
        { const: 2, title: 'Renovierungsbedürftig' },
        { const: 3, title: 'Gepflegt' },
        { const: 4, title: 'Neuwertig' },
        { const: 5, title: 'Renoviert' },
        { const: 6, title: 'Saniert' },
        { const: 7, title: 'Kernsaniert' }
      ]
    }
  },
  required: ['typ', 'objekt_neuerstandort', 'objekt_strasse',
    'objekt_hausnummer', 'objekt_plz', 'objekt_ort',
    'objekt_typ', 'objekt_wohnflaeche', 'objekt_baujahr',
    'returnurl1'],
  additionalProperties: false
};

module.exports = schema;
