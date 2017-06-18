[![Build Status](https://travis-ci.org/exp-anoop/validate-data.svg?branch=master)](https://travis-ci.org/exp-anoop/validate-data)  [![npm](https://img.shields.io/badge/node-%3E%3D0.10-brightgreen.svg)](https://github.com/exp-anoop/validate-data) [![license](https://img.shields.io/badge/license-MIT%20License-brightgreen.svg)](https://raw.githubusercontent.com/exp-anoop/validate-data/master/LICENCE)

[![NPM](https://nodei.co/npm/validate-data.png?compact=true)](https://nodei.co/npm/validate-data/)

# Validate Data
NodeJs backend library for validate data against the rules provided.

## Usage
Install the library with  ``` npm install validate-data ```

``` javascript
const validate = require('validate-data');

// Validation rules 
const rules = {
        required: "email name age",
        email: "email",
        string: "email name",
        number: "age",
        array: "options",
        boolean: "status"
    };

// Data to be validated
const data = {
    email: "example@sample.com",
    name: "John",
    age: 25,
    options: [1,2,3],
    status: true
};

// Using the package
let error = validate(data, rules);

console.log(error);   
```
Error will be null if all the validation rules passs, otherwise will get the following error

``` javascript
[
    {
        rule: 'required', // Failed rule
        errorOn: ['sample'] // Failed data fields
    },
    {
        rule: 'email',
        errorOn: ['email']
    },
    {
        rule: 'number',
        errorOn: ['age']
    },
    {
        rule: 'array',
        errorOn: ['options']
    },
    {
        rule: 'boolean',
        errorOn: ['status']
    }
]
```

## Validators
Module ensure that the given data will be validated against the following strategies.
  - Required
  - String
  - Number
  - Email
  - Array
  - Boolean
  
## Feature requests
Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and aims of the project. Please provide as much detail and context as possible. [Click here](https://github.com/exp-anoop/validate-data/issues) to add feature requests and issues.

## Change Log
[CHANGELOG.md](https://github.com/exp-anoop/validate-data/blob/master/CHANGELOG.md)

## Tests
``` javascript
 yarn run test
```

## License
MIT
