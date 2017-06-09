const _ = require('lodash');

const FIELDS = ['required', 'email', 'string', 'number'];
const SEPERATOR = ' ';

/**
 * Convert list of fields to array
 * @param {String} string - Fields list as a string
 */
let split = (string) => {
    if(!_.isString(string)) return null;

    return _.without(_.split(string, SEPERATOR), '');
}

/**
 * Check the data exists
 * @param {Object} data - Selected data for validation
 * @param {Array} keys - List of fields to be validated
 */
let isRequired = (data, keys) => {    
    let output = _.filter(keys, (x) => !data.hasOwnProperty(x));
    return format('required', output);
}

/**
 * Email validation
 * @param {Object} data - Selected data for string validation
 * @param {Array} keys - List of fields to be validated
 */
let isEmail = (data, keys) => {
    let output = _.filter(keys, (x) => {
        if(data.hasOwnProperty(x)) {
            return !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data[x]));
        }
        return false;
    });
    return format('email', output);
}
/**
 * String validation
 * @param {Object} data - Selected data for string validation
 * @param {Array} keys - List of fields to be validated
 */
let isString = (data, keys) => {
    let output = _.filter(keys, (x) => {
        if(data.hasOwnProperty(x)) {
            return !_.isString(data[x]);
        }
        return false;
    });
    return format('string', output);
}

/**
 * Number validation
 * @param {Object} data - Selected data for number validation
 * @param {Array} keys - List of fields to be validated
 */
let isNumber = (data, keys) => {
    let output = _.filter(keys, (x) => {
        if(data.hasOwnProperty(x)) {
            return !_.isNumber(data[x]) || data[x] < Number.MIN_VALUE || data[x] > Number.MAX_VALUE;
        }
        return false;
    });
    return format('number', output);
}

/**
 * Process data and apply validation
 * @param {String} fields - Fields to be validated with the rule provided
 * @param {String} rule - Must be one of the validation rule 
 * @param {Object} input - Input data 
 */
let check = (fields, rule, input) => {
    let keys = split(fields);
    let data = _.pick(input, keys);
    if(!_.isArray(keys) || _.isEmpty(keys)) return null;

    switch (rule) {
        case 'required': return isRequired(data, keys);
        case 'email': return isEmail(data, keys);
        case 'string': return isString(data, keys);
        case 'number': return isNumber(data, keys);
    }
    return null;
}

/**
 * Format output data
 * @param {String} rule - Must be one of the validation rule
 * @param {Array} errorOn - Array of fields that fails validation
 */
let format = (rule, errorOn) => {
    return (errorOn.length > 0) ? { rule, errorOn } : null;
}

/**
 * Core validation function
 * @param {Object} input - data to be validated
 * @param {Object} rules - Validation rules
 */
let validate = (input, rules) => {
    if(!input) throw new Error('Input data not found');
    if(_.isEmpty(rules) || !_.isObject(rules)) throw new Error('Validation rules not found');

    const sRules = _.pick(rules, FIELDS);
    if(_.isEmpty(sRules)) throw new Error(`No valid rules found. Available rules are ${_.toString(FIELDS)}`);

    var error = [];
    _.forEach(sRules, (fields, rule) => {            
        let output = check(fields, rule, input);            
        if(output) error.push(output);
    });

    if(error.length > 0) return error;
    return null;
}

module.exports = validate;