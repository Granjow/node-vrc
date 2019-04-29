const check = require( 'check-types' );

export interface ValidationResult {
    valid : boolean,
    value : any,
    warning : string,
}

export const verifyNumber = ( key : string, val : any ) : ValidationResult => {
    const isValid = check.number( val );
    return {
        valid: isValid,
        value: val,
        warning: !isValid && `Argument ${key} must be a number, is ${JSON.stringify( val )}`,
    }
};

export const verifyNumberArray = ( key : string, val : any ) : ValidationResult => {

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
    };
};

export const verify2dNumberArray = ( key : string, val : any ) : ValidationResult => {

    let numbers : number[][] = [];
    let valid = false;

    if ( check.array( val ) ) {
        valid = val.every( ( el : any ) => check.array.of.number( el ) );
    } else {
        try {
            let parsed = JSON.parse( val );
            return verify2dNumberArray( key, parsed );
        } catch ( e ) {

        }
    }

    return {
        valid,
        value: val,
        warning: !valid && `Argument ${key} must be a 2D array in JSON format (e.g. [[1,2],[3]]), is ${JSON.stringify( val )}`,
    };
};

export const verifyString = ( key : string, val : any ) : ValidationResult => {
    const isValid = check.string( val );
    return {
        valid: isValid,
        value: val,
        warning: !isValid && `Argument ${key} must be a string, is ${JSON.stringify( val )}`,
    }
};

export const verifyBoolean = ( key : string, val : any ) : ValidationResult => {
    const isValid = check.boolean( val );
    return {
        valid: isValid,
        value: val,
        warning: !isValid && `Argument ${key} must be a boolean, is ${JSON.stringify( val )}`,
    }
};
