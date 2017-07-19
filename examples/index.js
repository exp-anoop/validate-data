var validate = require('../lib/index');


var rules = {
    required: 'email options.age'
}

var input = { email: '12/12/1986', options: {age: 25} };


var error = validate(input, rules);

console.log(error);