import { ValidationResult } from './verifiers';
import { AbstractTypeVerifier } from './abstract-type-verifier';

const check = require( 'check-types' );

export class StringVerifier extends AbstractTypeVerifier {
    verifyArgument( key : string, val : any, options? : string[] ) : ValidationResult {

        let isValid = true;
        let warning = undefined;

        if ( check.number( val ) ) {
            // Convert number to string
            val = val.toString();
        }
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
    }

}
