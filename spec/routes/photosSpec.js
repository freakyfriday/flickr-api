const request = require('request');
const server = require('../../app');

const endpoint = 'http://localhost:3001/photos';

describe('public', function () {

    let uri = `${endpoint}/public`;

    it('should return 200 response code', function (done) {
        request.get(uri, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('should return 404 response code', function (done) {
        request.get(uri + 'bad-test', function (error, response) {
            expect(response.statusCode).toEqual(404);
            done();
        });
    });

    it('should fail on POST', function (done) {
        request.post(uri, {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(404);
            done();
        });
    });
});


describe('search', function () {

    let uri = `${endpoint}/search`;

    it('should return 200 response code', function (done) {
        request.post(uri, {json: true, body: {searchString:'cat'}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('should return 500 response code', function (done) {
        request.post(uri, {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(500);
            done();
        });
    });

    it('should return 404 response code', function (done) {
        request.get(uri + 'bad-test', function (error, response) {
            expect(response.statusCode).toEqual(404);
            done();
        });
    });


    it('should fail on GET', function (done) {
        request.get(uri, function (error, response) {
            expect(response.statusCode).toEqual(404);
            done();
        });
    });
});