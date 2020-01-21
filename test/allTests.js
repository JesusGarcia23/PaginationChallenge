// process.env.NODE_ENV = 'test';

let expect = require('chai').expect;
let request = require('request');

describe('Automated tests', function() {
    describe ('/apps endpoint tests', function() {
        it('status', function(done) {
            request('https://secure-hollows-01712.herokuapp.com/apps', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });

    it('get all apps', function(done) {
        request('https://secure-hollows-01712.herokuapp.com/apps', function(error, response, body) {
            const obj = JSON.parse(response.body);
            expect(obj).to.have.lengthOf(50);
            done();
        });
});

    it('get apps by id starting from 5 with end of 10 (start = 5, end = 10)', function(done) {
        request('https://secure-hollows-01712.herokuapp.com/apps?by=id&start=5&end=10', function(error, response, body) {
            const obj = JSON.parse(response.body);
            expect(obj.findIndex(theObj => theObj.id === 5)).to.equal(0);
            expect(obj.findIndex(theObj => theObj.id === 6)).to.equal(1);
            expect(obj.findIndex(theObj => theObj.id === 7)).to.equal(2);
            expect(obj.findIndex(theObj => theObj.id === 8)).to.equal(3);
            expect(obj.findIndex(theObj => theObj.id === 9)).to.equal(4);
            expect(obj.findIndex(theObj => theObj.id === 10)).to.equal(5);
            done();
        });
    });

    it('get apps by id from 15 to 19 (max) (start = 15, end = 35, max = 5)', function(done) {
        request('https://secure-hollows-01712.herokuapp.com/apps?by=id&start=15&end=35&max=5', function(error, response, body) {
            const obj = JSON.parse(response.body);
            expect(obj.findIndex(theObj => theObj.id === 15)).to.equal(0);
            expect(obj.findIndex(theObj => theObj.id === 16)).to.equal(1);
            expect(obj.findIndex(theObj => theObj.id === 17)).to.equal(2);
            expect(obj.findIndex(theObj => theObj.id === 18)).to.equal(3);
            expect(obj.findIndex(theObj => theObj.id === 19)).to.equal(4);
            done();
        });
    });

    it('get apps by id from 45 to 50 in desc order (start = 45, order= desc)', function(done) {
        request('https://secure-hollows-01712.herokuapp.com/apps?by=id&start=45&order=desc', function(error, response, body) {
            const obj = JSON.parse(response.body);
            expect(obj.findIndex(theObj => theObj.id === 50)).to.equal(0);
            expect(obj.findIndex(theObj => theObj.id === 49)).to.equal(1);
            expect(obj.findIndex(theObj => theObj.id === 48)).to.equal(2);
            expect(obj.findIndex(theObj => theObj.id === 47)).to.equal(3);
            expect(obj.findIndex(theObj => theObj.id === 46)).to.equal(4);
            expect(obj.findIndex(theObj => theObj.id === 45)).to.equal(5);
            done();
        });
    });

    it('get apps by name from 25 to 40 (start = 25, end = 40)', function(done) {
        request('https://secure-hollows-01712.herokuapp.com/apps?by=name&start=my-app-025&end=my-app-040', function(error, response, body) {
            const obj = JSON.parse(response.body);
            expect(obj).to.have.lengthOf(16);
            expect(obj.findIndex(theObj => theObj.name === 'my-app-025')).to.equal(0);
            expect(obj.findIndex(theObj => theObj.name === 'my-app-040')).to.equal(obj.length - 1);
            done();
        });
    });

    it('get apps by name from 35 to 50 in desc order (start = 35, end = 50, order = desc)', function(done) {
        request('https://secure-hollows-01712.herokuapp.com/apps?by=name&start=my-app-035&end=my-app-050&order=desc', function(error, response, body) {
            const obj = JSON.parse(response.body);
            expect(obj).to.have.lengthOf(16);
            expect(obj.findIndex(theObj => theObj.name === 'my-app-050')).to.equal(0);
            expect(obj.findIndex(theObj => theObj.name === 'my-app-035')).to.equal(obj.length - 1);
            done();
        });
    });

    it('get apps by name from 10 to 17 (max) in desc order (start = 10, end = 50, max = 8, order = desc)', function(done) {
        request('https://secure-hollows-01712.herokuapp.com/apps?by=name&start=my-app-010&end=my-app-050&max=8&order=desc', function(error, response, body) {
            const obj = JSON.parse(response.body);
            expect(obj).to.have.lengthOf(8);
            expect(obj.findIndex(theObj => theObj.name === 'my-app-017')).to.equal(0);
            expect(obj.findIndex(theObj => theObj.name === 'my-app-010')).to.equal(obj.length - 1);
            done();
        });
    });



});

})
