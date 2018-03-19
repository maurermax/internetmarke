/**
 * internetmarke
 * Copyright (c) 2018 Manuel Schächinger
 * MIT Lisenced
 */

'use strict';

const NodeCache = require('node-cache');

class Cachable {
  /**
   * Defines an abstract instanse of a cachable entity.
   * 
   * @constructor
   * @param {Object} config
   * @param {string} config.prefix
   * @param {*} config.id
   * @param {Object} config.data
   */
  constructor({ prefix, id, data }) {
    /** @type {string} */
    this._prefix = prefix;
    /** @type {*} */
    this._id = id;

    if (data.id) {
      delete data.id;
    }
    /** @type {Object} */
    this._data = data;

    /** @type {NodeCache} */
    this._cache = new NodeCache({ stdTTL: 86400 });
  }

  save() {
    this._cache.set(this.getId(), this._data);
  }

  getId() {
    return `${this._prefix}_${this._id}`;
  }
}

module.exports = Cachable;
