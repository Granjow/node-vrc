import { ValidationResult, VerifierFunction } from './verifiers';

const check = require( 'check-types' );

export const stringVerifier : VerifierFunction = ( key : string, val : any ) : ValidationResult => {
    const isValid = check.string( val );
    return {
        valid: isValid,
        value: val,
        warning: !isValid && `Argument ${key} must be a string, is ${JSON.stringify( val )}`,
    }
};
