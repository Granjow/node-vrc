import { VrcArgument } from './vrc-argument';
import { ValidationResult } from '../verifiers/verifiers';

export class ProcessedArgument {

    constructor( public readonly vrcArgument : VrcArgument ) {
    }

    get value() : any {
        return this._value;
    }

    get isValid() : boolean {
        return this.validationResult && this.validationResult.valid;
    }

    get isUserDefined() : boolean {
        return this._isUserDefined;
    }

    get validationResult() : ValidationResult {
        return this._validationResult;
    }

    set validationResult( result : ValidationResult ) {
        this._validationResult = result;
        this._value = result.value;
        this._isUserDefined = true;
    }

    setDefaultValue( value : any ) : void {
        this._value = value;
        this._isUserDefined = false;
    }

    private _value : any;
    private _isUserDefined : boolean = true;
    private _validationResult : ValidationResult;

}
