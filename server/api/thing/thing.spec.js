'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var _ = require('lodash');

describe('GET /api/things', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/things')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should have static active flag', function(done) {
    
    var tmpRequest = {
      name: 'A big thing',
      info: 'One of those larger things',
      active: false
    };

    request(app)
      .post('/api/things')
      .send(tmpRequest)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('resources should be active', function(done) {
    request(app)
      .get('/api/things')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        _.each(res.body, function(entry) {
          if (entry.name === 'A big thing') {
            entry.active.should.equal(true);  
          }
        });
        done();
      });
  });

});
