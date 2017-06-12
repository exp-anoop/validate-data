[![Build Status](https://travis-ci.org/exp-anoop/validate-data.svg?branch=master)](https://travis-ci.org/exp-anoop/validate-data) [![npm version](https://badge.fury.io/js/validate-data.svg)](https://badge.fury.io/js/validate-data) [![npm](https://img.shields.io/badge/node-%3E%3D0.12.x-brightgreen.svg)](https://github.com/exp-anoop/validate-data) [![license](https://img.shields.io/badge/license-MIT%20License-brightgreen.svg)](https://raw.githubusercontent.com/exp-anoop/validate-data/master/LICENCE)

# Validate Data
NodeJs backend library for validate data against the rules provided.

## Usage
Install the library with  ``` npm install validate-data ```

``` javascript
const express = require('express');
const validate = require('validate-data');

const app = express();

app.get('/', (req, res) => {
    const rules = {
        required: "email name age",
        email: "email",
        string: "email name",
        number: "age"
    }

    let error = validate(req.query, rules);
    
    res.send(error);

});

app.listen(3000, () => console.log("Up and running on 3000"));
   
```
Error will be null if all the validation rules passs, otherwise will get the following error

``` javascript
[{                                              
	"rule": "required",
	"errorOn": ["email"]
}, {
	"rule": "number",
	"errorOn": ["age"]
}]
```

## Validators
Module ensure that the given data will be validated against the following strategies.
  - Required
  - String
  - Number
  - Email
  
## Feature requests
Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and aims of the project. Please provide as much detail and context as possible.

## Change Log
- https://github.com/exp-anoop/validate-data/blob/master/CHANGELOG.md

## Tests
``` javascript
 yarn run test
```

## License
MIT
