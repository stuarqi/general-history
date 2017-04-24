/**
 * Created by zhangsq on 2017/4/24.
 */
'use strict';

let GeneralHistory;

let version = +process.versions.node.match(/^\w+?/)[0];

if (version > 5) {
  GeneralHistory = require('./src/general-history');
} else {
  GeneralHistory = require('./lib/general-history');
}


module.exports = GeneralHistory;