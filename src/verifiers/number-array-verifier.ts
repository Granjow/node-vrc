import { OptionsValidationResult, TypeVerifier, ValidationResult } from './verifiers';

const check = require( 'check-types' );

export class NumberArrayVerifier implements TypeVerifier {
    verifyArgument( key : string, val : any ) : ValidationResult {

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
            warning: !valid ? `Argument ${key} must be a comma-separated list of numbers, is ${JSON.stringify( val )}` : undefined,
            canUseDefaultFallback: val === undefined,
        };
    }

    verifyOptions( options : any[] | undefined ) : OptionsValidationResult {
        throw new Error( 'Options for number arrays are not supported yet.' );
    }

}
