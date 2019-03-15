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
    const numbers = val && val.split && val.split( ',' ).map( Number );
    const valid = check.array.of.number( numbers );
    return {
        valid,
        value: numbers,
        warning: `Argument ${key} must be a comma-separated list of numbers, is ${JSON.stringify( val )}`,
    }
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
