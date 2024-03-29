'use strict';

var server = require('./server');
var ds = server.dataSources.tmdemo;
var lbTables = ['Author', 'Task'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});
