/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

const msRest = require('ms-rest');
const msRestAzure = require('ms-rest-azure');
const WebResource = msRest.WebResource;

/**
 * Gets the price sheet for a scope by subscriptionId. Price sheet is available
 * via this API only for May 1, 2014 or later.
 *
 * @param {object} [options] Optional Parameters.
 *
 * @param {string} [options.expand] May be used to expand the
 * properties/meterDetails within a price sheet. By default, these fields are
 * not included when returning price sheet.
 *
 * @param {string} [options.skiptoken] Skiptoken is only used if a previous
 * operation returned a partial result. If a previous response contains a
 * nextLink element, the value of the nextLink element will include a skiptoken
 * parameter that specifies a starting point to use for subsequent calls.
 *
 * @param {object} [options.customHeaders] Headers that will be added to the
 * request
 *
 * @param {function} callback - The callback.
 *
 * @returns {function} callback(err, result, request, response)
 *
 *                      {Error}  err        - The Error object if an error occurred, null otherwise.
 *
 *                      {object} [result]   - The deserialized result object if an error did not occur.
 *                      See {@link PriceSheetResult} for more information.
 *
 *                      {object} [request]  - The HTTP Request object if an error did not occur.
 *
 *                      {stream} [response] - The HTTP Response stream if an error did not occur.
 */
function _get(options, callback) {
   /* jshint validthis: true */
  let client = this.client;
  if(!callback && typeof options === 'function') {
    callback = options;
    options = null;
  }
  if (!callback) {
    throw new Error('callback cannot be null.');
  }
  let expand = (options && options.expand !== undefined) ? options.expand : undefined;
  let skiptoken = (options && options.skiptoken !== undefined) ? options.skiptoken : undefined;
  // Validate
  try {
    if (expand !== null && expand !== undefined && typeof expand.valueOf() !== 'string') {
      throw new Error('expand must be of type string.');
    }
    if (skiptoken !== null && skiptoken !== undefined && typeof skiptoken.valueOf() !== 'string') {
      throw new Error('skiptoken must be of type string.');
    }
    if (this.client.subscriptionId === null || this.client.subscriptionId === undefined || typeof this.client.subscriptionId.valueOf() !== 'string') {
      throw new Error('this.client.subscriptionId cannot be null or undefined and it must be of type string.');
    }
    if (this.client.apiVersion === null || this.client.apiVersion === undefined || typeof this.client.apiVersion.valueOf() !== 'string') {
      throw new Error('this.client.apiVersion cannot be null or undefined and it must be of type string.');
    }
    if (this.client.acceptLanguage !== null && this.client.acceptLanguage !== undefined && typeof this.client.acceptLanguage.valueOf() !== 'string') {
      throw new Error('this.client.acceptLanguage must be of type string.');
    }
  } catch (error) {
    return callback(error);
  }

  // Construct URL
  let baseUrl = this.client.baseUri;
  let requestUrl = baseUrl + (baseUrl.endsWith('/') ? '' : '/') + 'subscriptions/{subscriptionId}/providers/Microsoft.Consumption/pricesheets/default';
  requestUrl = requestUrl.replace('{subscriptionId}', encodeURIComponent(this.client.subscriptionId));
  let queryParameters = [];
  if (expand !== null && expand !== undefined) {
    queryParameters.push('$expand=' + encodeURIComponent(expand));
  }
  if (skiptoken !== null && skiptoken !== undefined) {
    queryParameters.push('$skiptoken=' + encodeURIComponent(skiptoken));
  }
  queryParameters.push('api-version=' + encodeURIComponent(this.client.apiVersion));
  if (queryParameters.length > 0) {
    requestUrl += '?' + queryParameters.join('&');
  }

  // Create HTTP transport objects
  let httpRequest = new WebResource();
  httpRequest.method = 'GET';
  httpRequest.url = requestUrl;
  httpRequest.headers = {};
  // Set Headers
  httpRequest.headers['Content-Type'] = 'application/json; charset=utf-8';
  if (this.client.generateClientRequestId) {
      httpRequest.headers['x-ms-client-request-id'] = msRestAzure.generateUuid();
  }
  if (this.client.acceptLanguage !== undefined && this.client.acceptLanguage !== null) {
    httpRequest.headers['accept-language'] = this.client.acceptLanguage;
  }
  if(options) {
    for(let headerName in options['customHeaders']) {
      if (options['customHeaders'].hasOwnProperty(headerName)) {
        httpRequest.headers[headerName] = options['customHeaders'][headerName];
      }
    }
  }
  httpRequest.body = null;
  // Send Request
  return client.pipeline(httpRequest, (err, response, responseBody) => {
    if (err) {
      return callback(err);
    }
    let statusCode = response.statusCode;
    if (statusCode !== 200) {
      let error = new Error(responseBody);
      error.statusCode = response.statusCode;
      error.request = msRest.stripRequest(httpRequest);
      error.response = msRest.stripResponse(response);
      if (responseBody === '') responseBody = null;
      let parsedErrorResponse;
      try {
        parsedErrorResponse = JSON.parse(responseBody);
        if (parsedErrorResponse) {
          let internalError = null;
          if (parsedErrorResponse.error) internalError = parsedErrorResponse.error;
          error.code = internalError ? internalError.code : parsedErrorResponse.code;
          error.message = internalError ? internalError.message : parsedErrorResponse.message;
        }
        if (parsedErrorResponse !== null && parsedErrorResponse !== undefined) {
          let resultMapper = new client.models['ErrorResponse']().mapper();
          error.body = client.deserialize(resultMapper, parsedErrorResponse, 'error.body');
        }
      } catch (defaultError) {
        error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody ` +
                         `- "${responseBody}" for the default response.`;
        return callback(error);
      }
      return callback(error);
    }
    // Create Result
    let result = null;
    if (responseBody === '') responseBody = null;
    // Deserialize Response
    if (statusCode === 200) {
      let parsedResponse = null;
      try {
        parsedResponse = JSON.parse(responseBody);
        result = JSON.parse(responseBody);
        if (parsedResponse !== null && parsedResponse !== undefined) {
          let resultMapper = new client.models['PriceSheetResult']().mapper();
          result = client.deserialize(resultMapper, parsedResponse, 'result');
        }
      } catch (error) {
        let deserializationError = new Error(`Error ${error} occurred in deserializing the responseBody - ${responseBody}`);
        deserializationError.request = msRest.stripRequest(httpRequest);
        deserializationError.response = msRest.stripResponse(response);
        return callback(deserializationError);
      }
    }

    return callback(null, result, httpRequest, response);
  });
}

/**
 * Get the price sheet for a scope by subscriptionId and billing period. Price
 * sheet is available via this API only for May 1, 2014 or later.
 *
 * @param {string} billingPeriodName Billing Period Name.
 *
 * @param {object} [options] Optional Parameters.
 *
 * @param {string} [options.expand] May be used to expand the
 * properties/meterDetails within a price sheet. By default, these fields are
 * not included when returning price sheet.
 *
 * @param {string} [options.skiptoken] Skiptoken is only used if a previous
 * operation returned a partial result. If a previous response contains a
 * nextLink element, the value of the nextLink element will include a skiptoken
 * parameter that specifies a starting point to use for subsequent calls.
 *
 * @param {object} [options.customHeaders] Headers that will be added to the
 * request
 *
 * @param {function} callback - The callback.
 *
 * @returns {function} callback(err, result, request, response)
 *
 *                      {Error}  err        - The Error object if an error occurred, null otherwise.
 *
 *                      {object} [result]   - The deserialized result object if an error did not occur.
 *                      See {@link PriceSheetResult} for more information.
 *
 *                      {object} [request]  - The HTTP Request object if an error did not occur.
 *
 *                      {stream} [response] - The HTTP Response stream if an error did not occur.
 */
function _getByBillingPeriod(billingPeriodName, options, callback) {
   /* jshint validthis: true */
  let client = this.client;
  if(!callback && typeof options === 'function') {
    callback = options;
    options = null;
  }
  if (!callback) {
    throw new Error('callback cannot be null.');
  }
  let expand = (options && options.expand !== undefined) ? options.expand : undefined;
  let skiptoken = (options && options.skiptoken !== undefined) ? options.skiptoken : undefined;
  // Validate
  try {
    if (expand !== null && expand !== undefined && typeof expand.valueOf() !== 'string') {
      throw new Error('expand must be of type string.');
    }
    if (skiptoken !== null && skiptoken !== undefined && typeof skiptoken.valueOf() !== 'string') {
      throw new Error('skiptoken must be of type string.');
    }
    if (this.client.subscriptionId === null || this.client.subscriptionId === undefined || typeof this.client.subscriptionId.valueOf() !== 'string') {
      throw new Error('this.client.subscriptionId cannot be null or undefined and it must be of type string.');
    }
    if (this.client.apiVersion === null || this.client.apiVersion === undefined || typeof this.client.apiVersion.valueOf() !== 'string') {
      throw new Error('this.client.apiVersion cannot be null or undefined and it must be of type string.');
    }
    if (billingPeriodName === null || billingPeriodName === undefined || typeof billingPeriodName.valueOf() !== 'string') {
      throw new Error('billingPeriodName cannot be null or undefined and it must be of type string.');
    }
    if (this.client.acceptLanguage !== null && this.client.acceptLanguage !== undefined && typeof this.client.acceptLanguage.valueOf() !== 'string') {
      throw new Error('this.client.acceptLanguage must be of type string.');
    }
  } catch (error) {
    return callback(error);
  }

  // Construct URL
  let baseUrl = this.client.baseUri;
  let requestUrl = baseUrl + (baseUrl.endsWith('/') ? '' : '/') + 'subscriptions/{subscriptionId}/providers/Microsoft.Billing/billingPeriods/{billingPeriodName}/providers/Microsoft.Consumption/pricesheets/default';
  requestUrl = requestUrl.replace('{subscriptionId}', encodeURIComponent(this.client.subscriptionId));
  requestUrl = requestUrl.replace('{billingPeriodName}', encodeURIComponent(billingPeriodName));
  let queryParameters = [];
  if (expand !== null && expand !== undefined) {
    queryParameters.push('$expand=' + encodeURIComponent(expand));
  }
  if (skiptoken !== null && skiptoken !== undefined) {
    queryParameters.push('$skiptoken=' + encodeURIComponent(skiptoken));
  }
  queryParameters.push('api-version=' + encodeURIComponent(this.client.apiVersion));
  if (queryParameters.length > 0) {
    requestUrl += '?' + queryParameters.join('&');
  }

  // Create HTTP transport objects
  let httpRequest = new WebResource();
  httpRequest.method = 'GET';
  httpRequest.url = requestUrl;
  httpRequest.headers = {};
  // Set Headers
  httpRequest.headers['Content-Type'] = 'application/json; charset=utf-8';
  if (this.client.generateClientRequestId) {
      httpRequest.headers['x-ms-client-request-id'] = msRestAzure.generateUuid();
  }
  if (this.client.acceptLanguage !== undefined && this.client.acceptLanguage !== null) {
    httpRequest.headers['accept-language'] = this.client.acceptLanguage;
  }
  if(options) {
    for(let headerName in options['customHeaders']) {
      if (options['customHeaders'].hasOwnProperty(headerName)) {
        httpRequest.headers[headerName] = options['customHeaders'][headerName];
      }
    }
  }
  httpRequest.body = null;
  // Send Request
  return client.pipeline(httpRequest, (err, response, responseBody) => {
    if (err) {
      return callback(err);
    }
    let statusCode = response.statusCode;
    if (statusCode !== 200) {
      let error = new Error(responseBody);
      error.statusCode = response.statusCode;
      error.request = msRest.stripRequest(httpRequest);
      error.response = msRest.stripResponse(response);
      if (responseBody === '') responseBody = null;
      let parsedErrorResponse;
      try {
        parsedErrorResponse = JSON.parse(responseBody);
        if (parsedErrorResponse) {
          let internalError = null;
          if (parsedErrorResponse.error) internalError = parsedErrorResponse.error;
          error.code = internalError ? internalError.code : parsedErrorResponse.code;
          error.message = internalError ? internalError.message : parsedErrorResponse.message;
        }
        if (parsedErrorResponse !== null && parsedErrorResponse !== undefined) {
          let resultMapper = new client.models['ErrorResponse']().mapper();
          error.body = client.deserialize(resultMapper, parsedErrorResponse, 'error.body');
        }
      } catch (defaultError) {
        error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody ` +
                         `- "${responseBody}" for the default response.`;
        return callback(error);
      }
      return callback(error);
    }
    // Create Result
    let result = null;
    if (responseBody === '') responseBody = null;
    // Deserialize Response
    if (statusCode === 200) {
      let parsedResponse = null;
      try {
        parsedResponse = JSON.parse(responseBody);
        result = JSON.parse(responseBody);
        if (parsedResponse !== null && parsedResponse !== undefined) {
          let resultMapper = new client.models['PriceSheetResult']().mapper();
          result = client.deserialize(resultMapper, parsedResponse, 'result');
        }
      } catch (error) {
        let deserializationError = new Error(`Error ${error} occurred in deserializing the responseBody - ${responseBody}`);
        deserializationError.request = msRest.stripRequest(httpRequest);
        deserializationError.response = msRest.stripResponse(response);
        return callback(deserializationError);
      }
    }

    return callback(null, result, httpRequest, response);
  });
}

/** Class representing a PriceSheet. */
class PriceSheet {
  /**
   * Create a PriceSheet.
   * @param {ConsumptionManagementClient} client Reference to the service client.
   */
  constructor(client) {
    this.client = client;
    this._get = _get;
    this._getByBillingPeriod = _getByBillingPeriod;
  }

  /**
   * Gets the price sheet for a scope by subscriptionId. Price sheet is available
   * via this API only for May 1, 2014 or later.
   *
   * @param {object} [options] Optional Parameters.
   *
   * @param {string} [options.expand] May be used to expand the
   * properties/meterDetails within a price sheet. By default, these fields are
   * not included when returning price sheet.
   *
   * @param {string} [options.skiptoken] Skiptoken is only used if a previous
   * operation returned a partial result. If a previous response contains a
   * nextLink element, the value of the nextLink element will include a skiptoken
   * parameter that specifies a starting point to use for subsequent calls.
   *
   * @param {object} [options.customHeaders] Headers that will be added to the
   * request
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse<PriceSheetResult>} - The deserialized result object.
   *
   * @reject {Error} - The error object.
   */
  getWithHttpOperationResponse(options) {
    let client = this.client;
    let self = this;
    return new Promise((resolve, reject) => {
      self._get(options, (err, result, request, response) => {
        let httpOperationResponse = new msRest.HttpOperationResponse(request, response);
        httpOperationResponse.body = result;
        if (err) { reject(err); }
        else { resolve(httpOperationResponse); }
        return;
      });
    });
  }

  /**
   * Gets the price sheet for a scope by subscriptionId. Price sheet is available
   * via this API only for May 1, 2014 or later.
   *
   * @param {object} [options] Optional Parameters.
   *
   * @param {string} [options.expand] May be used to expand the
   * properties/meterDetails within a price sheet. By default, these fields are
   * not included when returning price sheet.
   *
   * @param {string} [options.skiptoken] Skiptoken is only used if a previous
   * operation returned a partial result. If a previous response contains a
   * nextLink element, the value of the nextLink element will include a skiptoken
   * parameter that specifies a starting point to use for subsequent calls.
   *
   * @param {object} [options.customHeaders] Headers that will be added to the
   * request
   *
   * @param {function} [optionalCallback] - The optional callback.
   *
   * @returns {function|Promise} If a callback was passed as the last parameter
   * then it returns the callback else returns a Promise.
   *
   * {Promise} A promise is returned
   *
   *                      @resolve {PriceSheetResult} - The deserialized result object.
   *
   *                      @reject {Error} - The error object.
   *
   * {function} optionalCallback(err, result, request, response)
   *
   *                      {Error}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {object} [result]   - The deserialized result object if an error did not occur.
   *                      See {@link PriceSheetResult} for more information.
   *
   *                      {object} [request]  - The HTTP Request object if an error did not occur.
   *
   *                      {stream} [response] - The HTTP Response stream if an error did not occur.
   */
  get(options, optionalCallback) {
    let client = this.client;
    let self = this;
    if (!optionalCallback && typeof options === 'function') {
      optionalCallback = options;
      options = null;
    }
    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self._get(options, (err, result, request, response) => {
          if (err) { reject(err); }
          else { resolve(result); }
          return;
        });
      });
    } else {
      return self._get(options, optionalCallback);
    }
  }

  /**
   * Get the price sheet for a scope by subscriptionId and billing period. Price
   * sheet is available via this API only for May 1, 2014 or later.
   *
   * @param {string} billingPeriodName Billing Period Name.
   *
   * @param {object} [options] Optional Parameters.
   *
   * @param {string} [options.expand] May be used to expand the
   * properties/meterDetails within a price sheet. By default, these fields are
   * not included when returning price sheet.
   *
   * @param {string} [options.skiptoken] Skiptoken is only used if a previous
   * operation returned a partial result. If a previous response contains a
   * nextLink element, the value of the nextLink element will include a skiptoken
   * parameter that specifies a starting point to use for subsequent calls.
   *
   * @param {object} [options.customHeaders] Headers that will be added to the
   * request
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse<PriceSheetResult>} - The deserialized result object.
   *
   * @reject {Error} - The error object.
   */
  getByBillingPeriodWithHttpOperationResponse(billingPeriodName, options) {
    let client = this.client;
    let self = this;
    return new Promise((resolve, reject) => {
      self._getByBillingPeriod(billingPeriodName, options, (err, result, request, response) => {
        let httpOperationResponse = new msRest.HttpOperationResponse(request, response);
        httpOperationResponse.body = result;
        if (err) { reject(err); }
        else { resolve(httpOperationResponse); }
        return;
      });
    });
  }

  /**
   * Get the price sheet for a scope by subscriptionId and billing period. Price
   * sheet is available via this API only for May 1, 2014 or later.
   *
   * @param {string} billingPeriodName Billing Period Name.
   *
   * @param {object} [options] Optional Parameters.
   *
   * @param {string} [options.expand] May be used to expand the
   * properties/meterDetails within a price sheet. By default, these fields are
   * not included when returning price sheet.
   *
   * @param {string} [options.skiptoken] Skiptoken is only used if a previous
   * operation returned a partial result. If a previous response contains a
   * nextLink element, the value of the nextLink element will include a skiptoken
   * parameter that specifies a starting point to use for subsequent calls.
   *
   * @param {object} [options.customHeaders] Headers that will be added to the
   * request
   *
   * @param {function} [optionalCallback] - The optional callback.
   *
   * @returns {function|Promise} If a callback was passed as the last parameter
   * then it returns the callback else returns a Promise.
   *
   * {Promise} A promise is returned
   *
   *                      @resolve {PriceSheetResult} - The deserialized result object.
   *
   *                      @reject {Error} - The error object.
   *
   * {function} optionalCallback(err, result, request, response)
   *
   *                      {Error}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {object} [result]   - The deserialized result object if an error did not occur.
   *                      See {@link PriceSheetResult} for more information.
   *
   *                      {object} [request]  - The HTTP Request object if an error did not occur.
   *
   *                      {stream} [response] - The HTTP Response stream if an error did not occur.
   */
  getByBillingPeriod(billingPeriodName, options, optionalCallback) {
    let client = this.client;
    let self = this;
    if (!optionalCallback && typeof options === 'function') {
      optionalCallback = options;
      options = null;
    }
    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self._getByBillingPeriod(billingPeriodName, options, (err, result, request, response) => {
          if (err) { reject(err); }
          else { resolve(result); }
          return;
        });
      });
    } else {
      return self._getByBillingPeriod(billingPeriodName, options, optionalCallback);
    }
  }

}

module.exports = PriceSheet;