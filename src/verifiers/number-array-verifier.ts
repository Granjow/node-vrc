import { ValidationResult, VerifierFunction } from './verifiers';

const check = require( 'check-types' );

export const numberArrayVerifier : VerifierFunction = ( key : string, val : any ) : ValidationResult => {

    let numbers : number[];
    let valid = true;

    if ( check.array.of.number( val ) ) {
        numbers = val;
    } else if ( check.number( val ) ) {
        numbers = [ val ];
    } else {
        numbers = val && val.split && val.split( ',' ).map( Number );
        valid = check.array.of.number( numbers );
    }
    return {
        valid,
        value: numbers,
        warning: !valid && `Argument ${key} must be a comma-separated list of numbers, is ${JSON.stringify( val )}`,
        canUseDefaultFallback: val === undefined,
    };
};
