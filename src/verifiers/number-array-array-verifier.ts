import { OptionsValidationResult, TypeVerifier, ValidationResult } from './verifiers';

const check = require( 'check-types' );

export class NumberArrayArrayVerifier implements TypeVerifier {
    verifyArgument( key : string, val : any ) : ValidationResult {

        let valid = false;

        if ( check.array( val ) ) {
            valid = val.every( ( el : any ) => check.array.of.number( el ) );
        } else {
            try {
                let parsed = JSON.parse( val );
                return this.verifyArgument( key, parsed );
            } catch ( e ) {

            }
        }

        return {
            valid,
            value: val,
            warning: !valid ? `Argument ${key} must be a 2D array in JSON format (e.g. [[1,2],[3]]), is ${JSON.stringify( val )}` : undefined,
            canUseDefaultFallback: val === undefined,
        };
    }

    verifyOptions( options : any[] | undefined ) : OptionsValidationResult {
        throw new Error('Cannot verify 2-dimensional number arrays yet');
    }

}
