import { OptionsValidationResult, TypeVerifier, ValidationResult } from './verifiers';

const check = require( 'check-types' );

export class StringArrayVerifier implements TypeVerifier {
    verifyArgument( key : string, val : any ) : ValidationResult {
        const isValid = check.string( val );
        return {
            valid: isValid,
            value: isValid ? val.split( ',' ) : val,
            warning: !isValid ? `Argument ${key} must be a string of comma-separated strings, is ${JSON.stringify( val )}` : undefined,
            canUseDefaultFallback: val === undefined,
        };
    }

    verifyOptions( options : any[] | undefined ) : OptionsValidationResult {
        throw new Error( 'String array options are not supported yet.' );
    }

}
