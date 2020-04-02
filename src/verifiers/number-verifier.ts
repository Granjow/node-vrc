import { ValidationResult, VerifierFunction } from './verifiers';

const check = require( 'check-types' );

export const numberVerifier : VerifierFunction = ( key : string, val : any ) : ValidationResult => {
    const isValid = check.number( val );
    return {
        valid: isValid,
        value: val,
        warning: !isValid && `Argument ${key} must be a number, is ${JSON.stringify( val )}`,
        canUseDefaultFallback: val === undefined,
    }
};
