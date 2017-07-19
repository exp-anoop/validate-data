const should = require('should');
const _ = require('lodash');
const validate = require('../lib/index');
const FIELDS = ['required', 'email', 'string', 'number', 'array', 'boolean'];


describe('Validate Data', function() {
    describe('Error Handling', function() {
        it('should throw error #1 - without any argument', function() {
            should(function() { validate(); }).throw('Input data not found');
        });

        it('should throw error #2 - with empty data', function() {
            should(function() { validate({}); }).throw('Input data not found');
        });

        it('should throw error #3 - with without rules', function() {
            should(function() { validate({ name: "john" }); }).throw('Validation rules not found');
        });

        it('should throw error #4 - with empty rules', function() {
            should(function() { validate({ name: "john" }, {}); }).throw('Validation rules not found');
        });

        it('should throw error #5 - with invalid rule type string', function() {
            should(function() { validate({ name: "john" }, "String"); }).throw('Validation rules not found');
        });

        it('should throw error #6 - with invalid rule type array', function() {
            should(function() { validate({ name: "john" }, ["required"]); }).throw('No valid rules found. Available rules are ' + _.toString(FIELDS));
        });

        it('should throw error #7 - with invalid rules', function() {
            should(function() { validate({ name: "john" }, { max: 'sample' }); }).throw('No valid rules found. Available rules are ' + _.toString(FIELDS));
        });

        it('should throw error #8 - with invalid data type string', function() {
            should(function() { validate("string", { required: "name" }); }).throw('Input data not found');
        });
    });

    describe('Required', function() {
        
        it('should return null when fields present - success case', function() {
            var error = validate({ name: "john" }, { required: 'name' });
            should.equal(error, null);
        });
        
        it('should return array of error when requrired field is empty string', function() {
            var error = validate({ firstname: "" }, { required: 'firstname' });
            error.should.with.lengthOf(1);
            error[0].should.have.property('rule', 'required');
            error[0].should.have.property('errorOn');
            error[0]['errorOn'].should.with.lengthOf(1);
            error[0]['errorOn'][0].should.be.equal('firstname');
        });

        it('should return array of error when requrired field has null value', function() {
            var error = validate({ firstname: null }, { required: 'firstname' });
            error.should.with.lengthOf(1);
            error[0].should.have.property('rule', 'required');
            error[0].should.have.property('errorOn');
            error[0]['errorOn'].should.with.lengthOf(1);
            error[0]['errorOn'][0].should.be.equal('firstname');
        });

        it('should return array of error when field not present', function() {
            var error = validate({ firstname: "john" }, { required: 'name' });
            error.should.with.lengthOf(1);
            error[0].should.have.property('rule', 'required');
            error[0].should.have.property('errorOn');
            error[0]['errorOn'].should.with.lengthOf(1);
            error[0]['errorOn'][0].should.be.equal('name');
        });
    });

    describe('Email', function() {
        it('should return null when valid email - success case', function() {
            var error = validate({ email: "test@example.com" }, { email: 'email' });
            should.equal(error, null);
        });

        it('should return null when data without email field', function() {
            var error = validate({ name: "John" }, { email: 'email' });
            should.equal(error, null);
        });

        it('should return array of error when invalid email', function() {
            var error = validate({ email: "john" }, { email: 'email' });
            error.should.with.lengthOf(1);
            error[0].should.have.property('rule', 'email');
            error[0].should.have.property('errorOn');
            error[0]['errorOn'].should.with.lengthOf(1);
            error[0]['errorOn'][0].should.be.equal('email');
        });
    });

    describe('String', function() {
        it('should return null when valid string - success case', function() {
            var error = validate({ email: "test@example.com" }, { string: 'email' });
            should.equal(error, null);
        });

        it('should return null when data without string field', function() {
            var error = validate({ name: "John" }, { string: 'text' });
            should.equal(error, null);
        });

        it('should return array of error when invalid string', function() {
            var error = validate({ age: 19 }, { string: 'age' });
            error.should.with.lengthOf(1);
            error[0].should.have.property('rule', 'string');
            error[0].should.have.property('errorOn');
            error[0]['errorOn'].should.with.lengthOf(1);
            error[0]['errorOn'][0].should.be.equal('age');
        });
    });

    describe('Number', function() {
        it('should return null when valid number - success case', function() {
            var error = validate({ age: 30 }, { number: 'age' });
            should.equal(error, null);
        });

        it('should return null when data with invalid number field', function() {
            var error = validate({ name: "John" }, { number: 'age' });
            should.equal(error, null);
        });

        it('should return array of error when invalid number', function() {
            var error = validate({ email: 'test@example.com' }, { number: 'email' });
            error.should.with.lengthOf(1);
            error[0].should.have.property('rule', 'number');
            error[0].should.have.property('errorOn');
            error[0]['errorOn'].should.with.lengthOf(1);
            error[0]['errorOn'][0].should.be.equal('email');
        });
    });

    describe('Array', function() {
        it('should return null when valid array - success case', function() {
            var error = validate({ options: [1, 2, 3] }, { array: 'options' });
            should.equal(error, null);
        });

        it('should return null when data with invalid array field', function() {
            var error = validate({ options: [1, 2, 3] }, { array: 'age' });
            should.equal(error, null);
        });

        it('should return array of error when invalid array', function() {
            var error = validate({ email: 'test@example.com' }, { array: 'email' });
            error.should.with.lengthOf(1);
            error[0].should.have.property('rule', 'array');
            error[0].should.have.property('errorOn');
            error[0]['errorOn'].should.with.lengthOf(1);
            error[0]['errorOn'][0].should.be.equal('email');
        });
    });

    describe('Boolean', function() {
        it('should return null when boolean value - success case #1', function() {
            var error = validate({ status: true }, { boolean: 'status' });
            should.equal(error, null);
        });

        it('should return null when boolean value - success case #2', function() {
            var error = validate({ status: false }, { boolean: 'status' });
            should.equal(error, null);
        });

        it('should return null when data with invalid boolean field', function() {
            var error = validate({ status: true }, { boolean: 'age' });
            should.equal(error, null);
        });

        it('should return array of error when invalid boolean', function() {
            var error = validate({ status: 3 }, { boolean: 'status' });
            error.should.with.lengthOf(1);
            error[0].should.have.property('rule', 'boolean');
            error[0].should.have.property('errorOn');
            error[0]['errorOn'].should.with.lengthOf(1);
            error[0]['errorOn'][0].should.be.equal('status');
        });
    });
});