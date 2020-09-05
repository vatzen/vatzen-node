require('es6-promise').polyfill();
require('isomorphic-fetch');

import config from '../config';

class ApiClient {
  apiKey: string;

  private objectToQuery(initialObject: {
    [key: string]: string | number | boolean | undefined;
  }) {
    const result = [];
    for (let propertyName in initialObject) {
      if (initialObject.hasOwnProperty(propertyName)) {
        const propertyValue = initialObject[propertyName];

        if (propertyValue) {
          result.push(
            // @ts-ignore
            propertyValue !== null && typeof propertyValue === 'object'
              ? this.objectToQuery(propertyValue)
              : encodeURIComponent(propertyName) +
                  '=' +
                  encodeURIComponent(propertyValue),
          );
        }
      }
    }
    return result.length > 0 ? `?${result.join('&')}` : '';
  }

  init(apiKey: string) {
    this.apiKey = apiKey;
  }

  get(
    path: string,
    queryParams?: { [key: string]: string | number | boolean | undefined },
  ) {
    return fetch(
      `${config.apiEndpoint}/${path}${
        queryParams ? this.objectToQuery(queryParams) : ''
      }`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-api-key': this.apiKey,
        },
      },
    );
  }

  post(
    path: string,
    queryParams?: { [key: string]: string | number | boolean | undefined },
    body?: { [key: string]: string | number | boolean | undefined },
  ) {
    return fetch(
      `${config.apiEndpoint}/${path}${
        queryParams ? this.objectToQuery(queryParams) : ''
      }`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'x-api-key': this.apiKey,
        },
      },
    );
  }
}

export default ApiClient;
