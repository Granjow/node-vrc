import { ValidationResult } from './verifiers';
import { AbstractTypeVerifier } from './abstract-type-verifier';

const check = require( 'check-types' );

export class NumberVerifier extends AbstractTypeVerifier {
    verifyArgument( key : string, val : any, options? : any[] ) : ValidationResult {

        let isValid = true;
        let warning : string | undefined = undefined;
        let numberValue : number | undefined = undefined;

        if ( !check.number( val ) ) {
            isValid = false;
            warning = `Argument ${key} must be a number, is ${JSON.stringify( val )}`;
        } else {

            numberValue = Number( val );

            if ( options !== undefined && !options.includes( numberValue ) ) {
                isValid = false;
                warning = `Argument ${key} is not a valid option`;
            }

        }

        return {
            valid: isValid,
            value: val,
            warning: warning,
            canUseDefaultFallback: val === undefined,
        }
    }

}
