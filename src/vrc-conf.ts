import { createHelpText } from './help';
import { allVerifiers } from './verifiers/verifiers';
import { VrcArgument } from './vrc-argument';

const rc = require( 'rc' );

export interface KV {
    [ index : string ] : any;
}

export interface VrcSettings {
    description? : string;
}

export class VrcConf<T extends KV> {

    constructor( appName : string, validArgs : VrcArgument[], settings? : VrcSettings ) {

        this._appName = appName;
        this._validArgs = validArgs;
        this._settings = settings || {};

        const duplicates = this.getDuplicateKeys( validArgs );
        if ( duplicates.length > 0 ) throw new Error( `Duplicate definitions for: ${duplicates.join( ',' )}` );

        this._conf = rc( appName, {} );
        this.validateArguments();
        this.loadDefaultValues();
    }

    /**
     * This function shows the help and exits, if -h or --help was specified.
     */
    run() : VrcConf<T> {
        if ( this.showHelp ) {
            console.log( this.help );

            const exitCode = this.invalidKeys.length > 0 ? 1 : 0;
            process.exit( exitCode );
        }
        return this;
    }

    /**
     * @return Value of the given key. See #conf
     */
    get( key : string ) : any {
        return this._conf[ key ];
    }

    /**
     * @returns `true`, if the default value was used.
     */
    isDefaultValue( key : string ) : boolean {
        return this._defaultValues.includes( key );
    }

    isValid( key : string ) : boolean {
        return !this._invalidKeys.has( key );
    }

    get invalidKeys() : string[] {
        return Array.from( this._invalidKeys );
    }

    /**
     * @returns The help text which can be printed on the console.
     */
    get help() : string {
        return createHelpText( this._appName, this._validArgs, this._invalidKeys, this._conf, this._settings );
    }

    get showHelp() : boolean {
        return this._conf[ 'h' ] || this._conf[ 'help' ];
    }

    /**
     * @returns The configuration object with all keys and values.
     * Default values are used if no value was provided or if the provided value was invalid.
     */
    get conf() : T {
        return this._conf;
    }

    private loadDefaultValues() {
        for ( let el of this._validArgs ) {

            const noValueProvided = this._conf[ el.name ] === undefined && el.dflt !== undefined;
            const invalid = !this.isValid( el.name );

            if ( noValueProvided || invalid ) {
                (this._conf as any)[ el.name ] = el.dflt;
                this._defaultValues.push( el.name );
            }
        }
    }

    private validateArguments() {
        for ( let el of this._validArgs ) {

            const [ key, val, type ] = [ el.name, this._conf[ el.name ], el.type ];

            const verifier = allVerifiers.get( el.type );
            if ( !verifier ) {
                throw new Error( `Unknown argument type ${type}, no verifier found.` );
            }

            const validationResult = verifier( key, val );

            if ( validationResult.valid ) {
                (this._conf as any)[ el.name ] = validationResult.value;
            } else {
                this._invalidKeys.add( key );
            }
        }
    }

    private getDuplicateKeys( args : VrcArgument[] ) : string[] {
        const keys : Set<string> = new Set();
        const duplicates : string[] = [];

        args.forEach( ( entry ) => {
            if ( keys.has( entry.name ) ) {
                duplicates.push( entry.name );
            } else {
                keys.add( entry.name );
            }
        } );

        return duplicates;
    };

    private readonly _settings : VrcSettings;
    private readonly _appName : string;
    private readonly _defaultValues : string[] = [];
    private readonly _invalidKeys : Set<string> = new Set();
    private readonly _validArgs : VrcArgument[];
    private readonly _conf : T;
}