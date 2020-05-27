import { ValidationResult, VerifierFunction } from './verifiers';

const check = require( 'check-types' );

export const booleanVerifier : VerifierFunction = ( key : string, val : any ) : ValidationResult => {
    const isTrue = val === true || ( check.string( val ) && ( val as string ).toLowerCase() === 'true' );
    const isFalse = val === false || ( check.string( val ) && ( val as string ).toLowerCase() === 'false' );
    const isValid = isTrue || isFalse;
    return {
        valid: isValid,
        value: isTrue ? true : false,
        warning: !isValid ? `Argument ${key} must be a boolean, is ${JSON.stringify( val )}` : undefined,
        canUseDefaultFallback: val === undefined,
    }
};
