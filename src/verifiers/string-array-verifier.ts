import { ValidationResult, VerifierFunction } from './verifiers';

const check = require( 'check-types' );

export const stringArrayVerifier : VerifierFunction = ( key : string, val : any ) : ValidationResult => {
    const isValid = check.string( val );
    return {
        valid: isValid,
        value: isValid ? val.split( ',' ) : val,
        warning: !isValid ? `Argument ${key} must be a string of comma-separated strings, is ${JSON.stringify( val )}` : undefined,
        canUseDefaultFallback: val === undefined,
    };
};
