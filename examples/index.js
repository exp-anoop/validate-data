var validate = require('../lib/index');


var rules = {
    required: 'email description sample',
    email: 'email',
    string: 'text email',
    number: 'age',
    array: 'options',
    boolean: 'status'
}

var input = { email: '12/12/1986' };


var error = validate(input, rules);

console.log(error);