const path = require('path'),
  log = require('mk-log'),
  request = require('./lib/request-promise'),
  fields = {
    test: {
      '100': 'API-Test',
      '150': 'API-Test ohne Fake Ergebnis',
      '200': 'Normaler Ablauf Kennzeichnung als Testaufruf'
    }
  },
  baseURL = 'https://api.geo-real.it/API/wohnmarktanalyse'; // no trailing slash for list

function WMAAPI(apikey) {

  async function getOne(id) {
    try {
      if (!id) {
        throw new Error('take id not provided');
      }
      let options = {
        headers: {
          apikey: apikey
        },
        json: true
      };
      let url = `${baseURL}/${id}`;
      return await request(options).get(url);
    } catch (err) {
      log.error(err);
    }
  }

  async function getList() {
    try {
      let options = {
        headers: {
          apikey: apikey
        },
        json: true
      };
      let result = await request(options).get(baseURL);
      log.info('result', result);
      return result;
    } catch (err) {
      log.error(err);
    }
  }

  async function createTask(json) {
    try {
      let options = {
        headers: {
          apikey: apikey
        },
        json: json
      };
      let result = await request(options).post(baseURL);
      return result;
    } catch (err) {
      log.error(err);
    }
  }

  return {
    getOne,
    getList,
    createTask
  };

}

module.exports = WMAAPI;
