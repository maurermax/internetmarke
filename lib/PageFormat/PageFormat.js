/**
 * internetmarke
 * Copyright (c) 2018 Manuel Schächinger
 * MIT Lisenced
 */

'use strict';

const Cachable = require('../helper/Cachable');

class PageFormat extends Cachable {
  /**
   * Defines a page format with the metadata and the id used in the api.
   * 
   * @constructor
   * @param {Obect} data
   */
  constructor(data) {
    super({ prefix: 'PAGE_FORMAT', id: data.id, data });
  }
}

module.exports = PageFormat;
