import { OptionsValidationResult, TypeVerifier, ValidationResult } from './verifiers';

const check = require( 'check-types' );

export class BooleanVerifier implements TypeVerifier {
    verifyArgument( key : string, val : any ) : ValidationResult {
        const isTrue = val === true || ( check.string( val ) && ( val as string ).toLowerCase() === 'true' );
        const isFalse = val === false || ( check.string( val ) && ( val as string ).toLowerCase() === 'false' );
        const isValid = isTrue || isFalse;
        return {
            valid: isValid,
            value: !!isTrue,
            warning: !isValid ? `Argument ${key} must be a boolean, is ${JSON.stringify( val )}` : undefined,
            canUseDefaultFallback: val === undefined,
        }
    }

    verifyOptions( options : any[] | undefined ) : OptionsValidationResult {
        throw new Error( 'Boolean options are not supported' );
    }

}
