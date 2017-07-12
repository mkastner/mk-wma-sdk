const request = require('./lib/request-promise'),
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
      console.error(err);
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
      console.info('result', result);
      return result;
    } catch (err) {
      console.error(err);
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
      console.error(err);
    }
  }

  return {
    getOne,
    getList,
    createTask
  };

}

module.exports = WMAAPI;
