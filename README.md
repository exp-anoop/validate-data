[![Build Status](https://travis-ci.org/exp-anoop/validate-data.svg?branch=master)](https://travis-ci.org/exp-anoop/validate-data)
# Validate Data
NodeJs backend library for validate data against the rules provided.

## Usage
Install the library with  ``` npm install validate-data```

```
var validate = require('validate-data');

// Specify the rules
var rules = {
    required: 'firstname email password',
    email: 'email',
    string: 'firstname lastname email password',
    number: 'age rank'
}

var sampleData = { firstname: "James", lastname: "Bond", email: "james.bond@example.com", age: 40}

var error = validate(sampleData, rules);
// Output
// error will be null if all the tests passed
// else
/*
[
    {
        rule: 'required',
        errorOn: ['lastname']
    },
    {
        rule: 'email',
        errorOn: ['email']
    },
    {
        rule: 'number',
        errorOn: ['age']
    }
]
/*
````

## Validators
Module ensure that the given data will be validated against the following strategies.
  - Required
  - String
  - Number
  - Email

## Tests
``` yarn run test```

## License
MIT