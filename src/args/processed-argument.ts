import { VrcArgument } from './vrc-argument';
import { ValidationResult } from '../verifiers/verifiers';

export class ProcessedArgument {

    constructor( public readonly vrcArgument : VrcArgument ) {
    }

    get value() : any {
        return this._value;
    }

    get isValid() : boolean {
        return this.isUserDefined ? ( this.validationResult?.valid ?? false ) : this._isDefaultValue;
    }

    get isUserDefined() : boolean {
        return this._isUserDefined;
    }

    get validationResult() : ValidationResult | undefined {
        return this._validationResult;
    }

    set validationResult( result : ValidationResult | undefined ) {
        this._validationResult = result;
        this._value = result?.value;
        this._isUserDefined = true;
        this._isDefaultValue = false;
    }

    setDefaultValue( value : any ) : void {
        this._value = value;
        this._isDefaultValue = true;
        this._isUserDefined = false;
    }

    private _value : any;
    private _isUserDefined : boolean = false;
    private _isDefaultValue : boolean = false;
    private _validationResult : ValidationResult | undefined;

}
