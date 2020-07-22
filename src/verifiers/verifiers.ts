import { NumberVerifier } from './number-verifier';
import { StringVerifier } from './string-verifier';
import { StringArrayVerifier } from './string-array-verifier';
import { BooleanVerifier } from './boolean-verifier';
import { NumberArrayVerifier } from './number-array-verifier';
import { NumberArrayArrayVerifier } from './number-array-array-verifier';

export interface ValidationResult {
    valid : boolean;
    value : any;
    warning : string | undefined;
    canUseDefaultFallback : boolean;
}

export interface OptionsValidationResult {
    valid : boolean;
    value : any[];
    warnings: string[];
}

export interface VerifierFunction {
    ( key : string, value : any, options? : any[] ) : ValidationResult;
}

export interface TypeVerifier {
    verifyArgument : VerifierFunction;
    verifyOptions : ( options? : any[] ) => OptionsValidationResult;
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

    registerVerifier( name : Verifier, verifier : TypeVerifier ) {
        if ( this._verifiers.has( name ) ) throw new Error( `Verifier ${name} is already registered.` );
        this._verifiers.set( name, verifier );
    }

    get( name : Verifier ) : TypeVerifier {
        const verifier = this._verifiers.get( name );
        if ( !verifier ) throw new Error( `Verifier ${name} not found.` );
        return verifier;
    }

    get verifiers() : Map<string, TypeVerifier> {
        return this._verifiers;
    }

    private _verifiers : Map<Verifier, TypeVerifier> = new Map();

}

export const verifiers = new Verifiers();
verifiers.registerVerifier( Verifier.number, new NumberVerifier() );
verifiers.registerVerifier( Verifier.numberArray, new NumberArrayVerifier() );
verifiers.registerVerifier( Verifier.numberArray2D, new NumberArrayArrayVerifier() );
verifiers.registerVerifier( Verifier.string, new StringVerifier() );
verifiers.registerVerifier( Verifier.stringArray, new StringArrayVerifier() );
verifiers.registerVerifier( Verifier.boolean, new BooleanVerifier() );

export const allVerifiers : Map<string, TypeVerifier> = new Map();
allVerifiers.set( 'number', verifiers.get( Verifier.number ) );
allVerifiers.set( 'number[]', verifiers.get( Verifier.numberArray ) );
allVerifiers.set( 'number[][]', verifiers.get( Verifier.numberArray2D ) );
allVerifiers.set( 'string', verifiers.get( Verifier.string ) );
allVerifiers.set( 'string[]', verifiers.get( Verifier.stringArray ) );
allVerifiers.set( 'boolean', verifiers.get( Verifier.boolean ) );
allVerifiers.set( 'bool', verifiers.get( Verifier.boolean ) );
