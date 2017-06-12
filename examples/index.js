var validate = require('../lib/index');


var rules = {
    required: 'email description sample',
    email: 'email',
    string: 'text email',
    number: 'age',
    array: 'options'
}

var input = { description: "dss", email: "sdf@dsa", age: '23.90', options: [{ss: 'ddd'}] };

var error = validate(input, rules);

console.log(error);