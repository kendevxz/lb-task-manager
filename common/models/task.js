'use strict';

module.exports = function(Task) {
  // create a new task
  Task.createTask = function(newTask, callback) {
    Task.create(newTask, function(err, task) {
      if (err) return callback(err);
      callback(null, task);
    });
  };

  // Get all tasks
  Task.getTasks = function(callback) {
    Task.find({}, function(err, tasks) {
      if (err) return callback(err);
      callback(null, tasks);
    });
  };

  // Get task by ID
  Task.getTaskById = function(id, callback) {
    Task.findById(id, function(err, task) {
      if (err) return callback(err);
      callback(null, task);
    });
  };

  // Update task by ID
  Task.updateTask = function(id, updatedTask, callback) {
    Task.updateAll({id: id}, updatedTask, function(err, info) {
      if (err) return callback(err);
      callback(null, info);
    });
  };

  // Delete task by ID
  Task.deleteTask = function(id, callback) {
    Task.destroyById(id, function(err) {
      if (err) return callback(err);
      callback(null, {success: true});
    });
  };

  // Expose remote methods
  Task.remoteMethod('createTask', {
    accepts: [{arg: 'newTask', type: 'object', http: {source: 'body'}}],
    returns: {arg: 'task', type: 'object'},
    http: {verb: 'post', path: '/createTask'},
  });

  Task.remoteMethod('getTasks', {
    returns: {arg: 'tasks', type: 'array'},
    http: {verb: 'get', path: '/getTasks'},
  });

  Task.remoteMethod('getTaskById', {
    accepts: [{arg: 'id', type: 'string', required: true}],
    returns: {arg: 'task', type: 'object'},
    http: {verb: 'get', path: '/getTaskById/:id'},
  });

  Task.remoteMethod('updateTask', {
    accepts: [
      {arg: 'id', type: 'string', required: true},
      {arg: 'updatedTask', type: 'object', http: {source: 'body'}},
    ],
    returns: {arg: 'info', type: 'object'},
    http: {verb: 'put', path: '/updateTask/:id'},
  });

  Task.remoteMethod('deleteTask', {
    accepts: [{arg: 'id', type: 'string', required: true}],
    returns: {arg: 'status', type: 'object'},
    http: {verb: 'delete', path: '/deleteTask/:id'},
  });
};
