import { OptionsValidationResult, TypeVerifier, ValidationResult, VerifierFunction } from './verifiers';

export abstract class AbstractTypeVerifier implements TypeVerifier {
    verifyOptions( options : any[] | undefined ) : OptionsValidationResult {
        let isValid = true;
        const warnings : string[] = [];
        const validOptions : string[] = [];

        ( options ?? [] ).forEach( ( option, index ) => {
            const validated = this.verifyArgument( `Option ${index}`, option );
            if ( !validated.valid ) {
                isValid = false;
                if ( validated.warning ) warnings.push( validated.warning );
            } else {
                validOptions.push( validated.value );
            }
        } );

        return {
            valid: isValid,
            value: validOptions,
            warnings: warnings,
        };
    }

    abstract verifyArgument( key : string, val : any, options? : any[] ) : ValidationResult;

}