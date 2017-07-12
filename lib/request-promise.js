const request = require('request');

function promisifyRequest(options) {

  return new Promise(function(resolve, reject) {

    request(options, function(err, httpResponse, body) {

      if (err) {
        console.error(err);
        return reject(err);
      }

      resolve(body);

    });

  }).catch(function(err) {
    console.error(err);
  });

}


function RequestPromise(options) {

  return {
    post(url) {
      if (!url) {
        throw new Error('url missing for POST');
      }
      if (!options.body && !options.json) {
        throw new Error('missing json or body for POST');
      }
      options.method = 'POST';
      options.url = url;
      //options.json = body;
      return promisifyRequest(options);
    },
    get(url) {
      if (!url) {
        throw new Error('url missing for GET');
      }
      options.method = 'GET';
      options.url = url;
      return promisifyRequest(options);
    },
    options(url) {
      if (!url) {
        throw new Error('url missing for OPTIONS');
      }
      options.method = 'OPTIONS';
      options.url = url;
      return promisifyRequest(options);
    }
  };

}

module.exports = RequestPromise;
