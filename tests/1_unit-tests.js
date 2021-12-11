const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Function convertHandler.getNum(input)', () => {
        test('Whole number input', (done) => {
            assert.equal(convertHandler.getNum('5L'), 5);
            done();
        });

        test('Decimal input', (done) =>{
            assert.equal(convertHandler.getNum('2.3mi'), 2.3);
            done();
        });

        test('Fractional input', (done) => {
            assert.equal(convertHandler.getNum('1/2km'), 0.5);
            done();
        });

        test('Fractional input with decimal', (done) => {
            assert.equal(convertHandler.getNum('3/1.5lbs'), 2);
            done();
        });

        test('Invalid input with double fraction', (done) => {
            assert.equal(convertHandler.getNum('4/2/1kg'), null);
            done();
        });

        test('Default to 1 when no number', (done) => {
            assert.equal(convertHandler.getNum('L'), 1);
            done();
        });
    });

    suite('Function convertHandler.getUnit(input)', () => {
        test('Read each valid input unit', (done) => {
            const inputs = ['gal', 'l', 'lbs', 'kg', 'mi', 'km', 'GAL', 'L', 'LBS', 'KG', 'MI', 'KM'];
            inputs.forEach(e => {
                if(e == 'l' || e == 'L'){
                    assert.equal(convertHandler.getUnit(e), 'L');
                }
                else{
                    assert.equal(convertHandler.getUnit(e), e.toLowerCase());
                }
            });
            done();
        });

        test('Invalid input unit', (done) => {
            assert.equal(convertHandler.getUnit('llmsge'), null);
            done();
        });
    });

    suite('Function convertHandler.getReturnUnit(input)', () => {
        test('Correct return unit for each valid input unit', (done) => {
            const inputs = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
            const outputs = ['L', 'gal', 'kg', 'lbs', 'km', 'mi'];
            inputs.forEach((e,i) => {
                assert.equal(convertHandler.getReturnUnit(e), outputs[i]);
            })
            done();
        })
    });

    suite('Function convertHandler.spellOutUnit(input)', () => {
        test('Correctly spell out units for each valid input', (done) => {
            const inputs = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
            const outputs = ['gallon(s)', 'L', 'pound(s)', 'kilogram(s)', 'mile(s)', 'kilometer(s)'];
            inputs.forEach((e,i) => {
                assert.equal(convertHandler.spellOutUnit(e), outputs[i]);
            });
            done();
        });
    });

    suite('Function convertHandler.convert(input)', () => {
        test('Convert gal to L', (done) => {
            assert.approximately(convertHandler.convert(3, 'gal'), 11.35623, 0.1);
            done();
        });

        test('Convert L to gal', (done) => {
            assert.approximately(convertHandler.convert(6, 'l'), 1.58502, 0.1);
            done();
        });

        test('Convert mi to km', (done) => {
            assert.approximately(convertHandler.convert(10, 'mi'), 16.0934, 0.1);
            done();
        });

        test('Convert km to mi', (done) => {
            assert.approximately(convertHandler.convert(7.2, 'km'), 4.47386, 0.1);
            done();
        });

        test('Convert lbs to kg', (done) => {
            assert.approximately(convertHandler.convert(4.5, 'lbs'), 2.04116, 0.1);
            done();
        });

        test('Convert kg to lbs', (done) => {
            assert.approximately(convertHandler.convert(12, 'kg'), 26.45544, 0.1);
            done();
        });
    });
});