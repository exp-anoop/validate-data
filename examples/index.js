var validate = require('../lib/index');


var rules = {
    required: 'email description sample',
    email: 'email',
    string: 'text email',
    number: 'age',
    array: 'options',
    boolean: 'status'
}

var input = { description: "dss", email: "sdf@dsa", age: '23.90', status: true };

var error = validate(input, rules);

console.log(error);