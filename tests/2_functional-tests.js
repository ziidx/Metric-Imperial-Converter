const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    suite('GET /api/convert', () => {
        test("Convert 10L (valid input)", function(done) {
            chai.request(server)
            .get("/api/convert")
            .query({ input: "10L" })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 10);
                assert.equal(res.body.initUnit, "L");
                assert.approximately(res.body.returnNum, 2.64172, 0.1);
                assert.equal(res.body.returnUnit, "gal");
                done();
            });
        });

        test('Convert invalid input 32g', done => {
            chai.request(server)
            .get('/api/convert')
            .query({input: '32g'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid unit');
                done();
            })
        });

        test('Convert invalid number 3/7.2/4kg', done => {
            chai.request(server)
            .get('/api/convert')
            .query({input: '3/7.2/4kg'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid number');
                done();
            })
        });

        test('Convert invalid number and unit 3/7.2/4kilomegagram', done => {
            chai.request(server)
            .get('/api/convert')
            .query({input: '3/7.2/4kilomegagram'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid number and unit');
                done();
            })
        });

        test('Convert valid unit with no number kg', done => {
            chai.request(server)
            .get('/api/convert')
            .query({input: 'kg'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 1);
                assert.equal(res.body.initUnit, 'kg');
                assert.approximately(res.body.returnNum, 2.20462, 0.1);
                assert.equal(res.body.returnUnit, 'lbs');
                done();
            })
        });
    });
});
