const schema = {
  title: 'task',
  description: 'Wohnmarktanalyse Auftrag',
  type: 'object',
  properties: {
    test: {
      title: '100: API-Test, 150: API-test ohne Fake-Ergebnis, 200: Normaler Ablauf mit Kennzeichnung als Testaufruf',
      enum: [ 100, 150, 200 ],
    },
    typ: {
      title: 'Wohnung-Miete: 1, Wohnung-Kauf: 1, Hauskauf: 3',
      oneOf: [
        { const: 1, title: 'Wohnung-Miete' },
        { const: 2, title: 'Wohnung-Kauf' },
        { const: 3, title: 'Hauskauf' }
      ]
    },
    objekt_neuerstandort: {
      type: 'string',
      title: 'JSON Point',
      description: 'GeoJSON Objekt Typ Point als String serialisiert'
    },
    eigentuemer_anrede: {
      type:'string'
    },
    eigentuemer_vorname: {
      type:'string'
    },
    objekt_strasse: {
      title: 'Strassename ohne Hausnummer',
      type:'string'
    },
    objekt_hausnummer: {
      title: 'Hausnummer',
      type:'string'
    },
    objekt_ort: {
      title: 'Ort',
      type:'string'
    },
    objekt_typ: {
      title: 'Objekttypen',
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
    objekt_baujahr: {
      title: 'Baujahr des Objekts',
      type: 'string'
    },
    objekt_plz: {
      title: 'Postleitzahl des Objekts',
      type: 'string'
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
    returnurl1: {
      type: 'string',
      title: 'Primäre URL, die per POST die Datei erhält'
    },
    returnurl2: {
      type: 'string',
      title: 'URL, die per POST die Datei erhält'
    },
    returnurl3: {
      type: 'string',
      title: 'URL, die per POST die Datei erhält'
    }
  },
  required: ['typ', 'objekt_neuerstandort', 'objekt_strasse',
    'objekt_hausnummer', 'objekt_plz', 'objekt_ort', 'objekt_typ',
    'objekt_wohnflaeche', 'objekt_baujahr',
    'returnurl1'],
  additionalProperties: false
};

module.exports = schema;
