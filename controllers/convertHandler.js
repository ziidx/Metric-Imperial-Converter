function ConvertHandler() {
  const units = {
    gal: {name: 'gallon(s)', rUnit: 'L', ratio: 3.78541},
    l: {name: 'L', rUnit: 'gal', ratio: 0.26417},
    lbs: {name: 'pound(s)', rUnit: 'kg', ratio: 0.45359},
    kg: {name: 'kilogram(s)', rUnit: 'lbs', ratio: 2.20462},
    mi: {name: 'mile(s)', rUnit: 'km', ratio: 1.60934},
    km: {name: 'kilometer(s)', rUnit: 'mi', ratio: 0.62137}
  }

  this.getNum = function(input) {
    
    const num = input.toLowerCase().split(/[a-z]/gi)[0];
    console.log(num);

    //if no number supplied return 1
    if(num.length < 1){
      return 1;
    }

    //invalid if number contains double fractions, starts with a /, or does not end in a number
    if(num.split('/').length > 2 || num.charAt(0) == '/' || !num.match(/^.*\d$/)){
      return null;
    }

    //if no / is found in the num string, cast as a number
    if(!num.match(/\//)){
      return Number(num);
    }

    //number is a fraction
    let result = num.split('/').reduce((acc, val) => acc / val);
    
    return result;
  };
  
  this.getUnit = function(input) {
    const inputUnit = input.toLowerCase().split(/[0-9/.]/).slice(-1)[0];
    
    return Object.keys(units).includes(inputUnit) ? (inputUnit == 'l' ? 'L' : inputUnit) : null;
  };
  
  //Following functions use toLowerCase() in the event that the input  is 'L', but the key for units is 'l'
  this.getReturnUnit = function(initUnit) {
    
    return units[initUnit.toLowerCase()].rUnit;
  };

  this.spellOutUnit = function(unit) {
    
    return units[unit.toLowerCase()].name;
  };
  
  this.convert = function(initNum, initUnit) {
    let result = units[initUnit.toLowerCase()].ratio * initNum;
    
    return result.toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    };
    
    return result;
  };
  
}

module.exports = ConvertHandler;
