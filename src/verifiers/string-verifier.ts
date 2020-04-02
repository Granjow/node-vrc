import { ValidationResult, VerifierFunction } from './verifiers';

const check = require( 'check-types' );

export const stringVerifier : VerifierFunction = ( key : string, val : any, options? : string[] ) : ValidationResult => {

    let isValid = true;
    let warning = undefined;

    if ( !check.string( val ) ) {
        isValid = false;
        warning = `Argument ${key} must be a string, is ${JSON.stringify( val )}`;
    } else if ( options && !options.includes( val ) ) {
        isValid = false;
        warning = `Invalid option for ${key}: ${val}. Valid options are: [${options.join( ',' )}]`
    }

    return {
        valid: isValid,
        value: val,
        warning: warning,
        canUseDefaultFallback: val === undefined,
    }
};
