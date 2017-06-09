var validate = require('../lib/index');


var rules = {
    required: 'email description sample',
    email: 'email',
    string: 'text email',
    number: 'age'
}

var input = { description: "dss", email: "sdf@dsa", age: '23.90' };

var error = validate(input, rules);

console.log(error);