const _ = require('lodash');

const FIELDS = ['required', 'email', 'string', 'number'];
const SEPERATOR = ' ';


let split = (string) => {
    if(!_.isString(string)) return null;

    return _.without(_.split(string, SEPERATOR), '');
}

let isRequired = (data, keys) => {    
    let output = _.filter(keys, (x) => !data.hasOwnProperty(x));
    return output.length > 0 ? {required : output} : null;
}

let isEmail = (data, keys) => {
    let output = _.filter(keys, (x) => {
        if(data.hasOwnProperty(x)) {
            return !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data[x]));
        }
        return false;
    });
    return output.length > 0 ? {email : output} : null;
}

let isString = (data, keys) => {
    let output = _.filter(keys, (x) => {
        if(data.hasOwnProperty(x)) {
            return !_.isString(data[x]);
        }
        return false;
    });
    return output.length > 0 ? {string : output} : null;
}

let isNumber = (data, keys) => {
    let output = _.filter(keys, (x) => {
        if(data.hasOwnProperty(x)) {
            return !_.isNumber(data[x]) || data[x] < Number.MIN_VALUE || data[x] > Number.MAX_VALUE;
        }
        return false;
    });
    return output.length > 0 ? {number : output} : null;
}

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
}


let validate = (input, rules) => {
    return new Promise((resolve, reject) => {
        if(!input) reject(new Error('Input data not found'));
        if(_.isEmpty(rules) || !_.isObject(rules)) reject(new Error('Validation rules not found'));

        const sRules = _.pick(rules, FIELDS);
        if(_.isEmpty(sRules)) reject(new Error(`No valid rules found. Available rules are ${_.toString(FIELDS)}`));
        var output = [];
        _.forEach(sRules, (fields, rule) => {            
            let temp = check(fields, rule, input);            
            if(temp) output.push(temp);
        });

        resolve(output);
    });
}

module.exports = { validate };