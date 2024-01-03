'use strict';

module.exports = function(Author) {
  // create a new author
  Author.createAuthor = function(newAuthor, callback) {
    Author.create(newAuthor, function(err, author) {
      if (err) return callback(err);
      callback(null, author);
    });
  };

  // Get all authors
  Author.getAuthors = function(callback) {
    Author.find({}, function(err, authors) {
      if (err) return callback(err);
      callback(null, authors);
    });
  };

  // Get author by ID
  Author.getAuthorById = function(id, callback) {
    Author.findById(id, function(err, author) {
      if (err) return callback(err);
      callback(null, author);
    });
  };

  // Update author by ID
  Author.updateAuthor = function(id, updatedAuthor, callback) {
    Author.updateAll({id: id}, updatedAuthor, function(err, info) {
      if (err) return callback(err);
      callback(null, info);
    });
  };

  // Delete author by ID
  Author.deleteAuthor = function(id, callback) {
    Author.destroyById(id, function(err) {
      if (err) return callback(err);
      callback(null, {success: true});
    });
  };

  // Expose remote methods
  Author.remoteMethod('createAuthor', {
    accepts: [{arg: 'newAuthor', type: 'object', http: {source: 'body'}}],
    returns: {arg: 'author', type: 'object'},
    http: {verb: 'post', path: '/createAuthor'},
  });

  Author.remoteMethod('getAuthors', {
    returns: {arg: 'authors', type: 'array'},
    http: {verb: 'get', path: '/getAuthors'},
  });

  Author.remoteMethod('getAuthorById', {
    accepts: [{arg: 'id', type: 'string', required: true}],
    returns: {arg: 'author', type: 'object'},
    http: {verb: 'get', path: '/getAuthorById/:id'},
  });

  Author.remoteMethod('updateAuthor', {
    accepts: [
      {arg: 'id', type: 'string', required: true},
      {arg: 'updatedAuthor', type: 'object', http: {source: 'body'}},
    ],
    returns: {arg: 'info', type: 'object'},
    http: {verb: 'put', path: '/updateAuthor/:id'},
  });

  Author.remoteMethod('deleteAuthor', {
    accepts: [{arg: 'id', type: 'string', required: true}],
    returns: {arg: 'status', type: 'object'},
    http: {verb: 'delete', path: '/deleteAuthor/:id'},
  });
};
