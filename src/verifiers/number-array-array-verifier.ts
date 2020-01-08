import { ValidationResult } from './verifiers';

const check = require( 'check-types' );

export const numberArrayArrayVerifier = ( key : string, val : any ) : ValidationResult => {

    let valid = false;

    if ( check.array( val ) ) {
        valid = val.every( ( el : any ) => check.array.of.number( el ) );
    } else {
        try {
            let parsed = JSON.parse( val );
            return numberArrayArrayVerifier( key, parsed );
        } catch ( e ) {

        }
    }

    return {
        valid,
        value: val,
        warning: !valid && `Argument ${key} must be a 2D array in JSON format (e.g. [[1,2],[3]]), is ${JSON.stringify( val )}`,
    };
};
