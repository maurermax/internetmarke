/**
 * internetmarke
 * Copyright (c) 2018 Manuel Schächinger
 * MIT Lisenced
 */

'use strict';

const NodeCache = require('node-cache');

const PageFormat = require('./PageFormat'),
  OneClickForAppService = require('../Service/Soap/OneClickForApp');

class PageFormatList {
  constructor() {
    /** @type {NodeCache} */
    this._nodeCache = new NodeCache({ stdTTL: 3600 * 24 });

    this._pageFormats = {};
  }

  /**
   * Loads the list of available page formats if not cached.
   * 
   * @param {OneClickForAppService} oneClickForAppService - The 1C4A service to
   *   load the latest list of page formats if necessary.
   * @returns {Promise.<Object>}
   */
  loadList(oneClickForAppService) {
    let promise = null;

    console.log(this._nodeCache.getStats());

    if (!this._nodeCache.getStats().keys) {
      promise = oneClickForAppService.retrievePageFormats()
        .then(pages => {
          page.pageFormat.forEach(data => {
            const pageFormat = new PageFormat(data);
            pagFormat.save();
            this._pageFormats[pageFormat.getId] = pageFormat;
          });

          return this._pageFormats;
        });
    }
    else {
      promise = Promise.resolve(this._pageFormats);
    }

    return promise;
  }
}

module.exports = PageFormatList;
