import { numberVerifier } from './number-verifier';
import { numberArrayVerifier } from './number-array-verifier';
import { numberArrayArrayVerifier } from './number-array-array-verifier';
import { stringVerifier } from './string-verifier';
import { stringArrayVerifier } from './string-array-verifier';
import { booleanVerifier } from './boolean-verifier';

const check = require( 'check-types' );

export interface ValidationResult {
    valid : boolean,
    value : any,
    warning : string,
}

export interface VerifierFunction {
    ( key : string, value : any ) : ValidationResult;
}

export enum Verifier {
    number = 'number',
    numberArray = 'number[]',
    numberArray2D = 'number[][]',
    string = 'string',
    stringArray = 'string[]',
    boolean = 'boolean',
}

class Verifiers {

    constructor() {
    }

    registerVerifier( name : Verifier, verifier : VerifierFunction ) {
        if ( this._verifiers.has( name ) ) throw new Error( `Verifier ${name} is already registered.` );
        this._verifiers.set( name, verifier );
    }

    get( name : Verifier ) : VerifierFunction {
        if ( !this._verifiers.has( name ) ) throw new Error( `Verifier ${name} not found.` );
        return this._verifiers.get( name );
    }

    get verifiers() : Map<string, VerifierFunction> {
        return this._verifiers;
    }

    private _verifiers : Map<Verifier, VerifierFunction> = new Map();

}

export const verifiers = new Verifiers();

verifiers.registerVerifier( Verifier.number, numberVerifier );

verifiers.registerVerifier( Verifier.numberArray, numberArrayVerifier );

verifiers.registerVerifier( Verifier.numberArray2D, numberArrayArrayVerifier );

verifiers.registerVerifier( Verifier.string, stringVerifier );

verifiers.registerVerifier( Verifier.stringArray, stringArrayVerifier );

verifiers.registerVerifier( Verifier.boolean, booleanVerifier );
