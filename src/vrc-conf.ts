import { createHelpText, printArgs } from './help';
import { allVerifiers } from './verifiers/verifiers';
import { VrcArgument } from './args/vrc-argument';
import { ProcessedArgument } from './args/processed-argument';

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

        for ( let arg of this._validArgs ) {
            // Check if options for this argument are valid
            if ( arg.options !== undefined ) {
                const verifier = allVerifiers.get( arg.type );
                if ( verifier ) {
                    const valid = verifier.verifyOptions( arg.options );
                    if ( !valid ) {
                        throw new Error( `Invalid default options for ${arg.name}` );
                    }
                    if ( arg.dflt !== undefined ) {
                        const defaultVerified = verifier.verifyArgument( arg.name, arg.dflt, arg.options );
                        if ( !defaultVerified.valid ) {
                            throw new Error( `Default value for ${arg.name} is not valid` );
                        }
                    }
                }
            }
            this._processedArgs.set( arg.name, new ProcessedArgument( arg ) );
        }

        this._rawConf = rc( appName, {} );
        this._unnamedArgs = this._rawConf._ as any[];

        this.validateArguments();
        this.loadDefaultValues();

        this._assembledConf = {} as T;
        for ( let [ k, v ] of this._processedArgs ) {
            if ( v.isValid ) {
                ( this._assembledConf as any )[ k ] = v.value;
            }
        }
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
        return this._assembledConf[ key ];
    }

    /**
     * @returns `true`, if the default value was used.
     */
    isDefaultValue( key : string ) : boolean {
        return !this._processedArgs.get( key )?.isUserDefined ?? false;
    }

    isValid( key : string ) : boolean {
        return this._processedArgs.get( key )?.isValid ?? false;
    }

    get unnamedArgs() : any[] {
        return this._unnamedArgs;
    }

    get invalidKeys() : string[] {
        return Array.from( this._processedArgs.values() )
            .filter( ( el ) => !el.isValid )
            .map( ( el ) => el.vrcArgument.name );
    }

    /**
     * @returns The help text which can be printed on the console.
     */
    get help() : string {
        return createHelpText( this._appName, Array.from( this._processedArgs.values() ), this._settings );
    }

    get showHelp() : boolean {
        return ( this._rawConf as any )[ 'h' ] || ( this._rawConf as any )[ 'help' ];
    }

    /**
     * @returns The configuration object with all keys and values.
     * Default values are used if no value was provided or if the provided value was invalid.
     */
    get conf() : T {
        return this._assembledConf;
    }

    printArgs() : void {
        console.log( printArgs( Array.from( this._processedArgs.values() ) ) );
    }

    private loadDefaultValues() {
        for ( let arg of this._processedArgs.values() ) {

            const el = arg.vrcArgument;
            const defaultValueAvailable = el.dflt !== undefined;
            const noValueProvided = arg.value === undefined;
            const canUseDefaultFallback = arg.validationResult?.canUseDefaultFallback ?? false;

            if ( ( noValueProvided && defaultValueAvailable ) || ( canUseDefaultFallback && defaultValueAvailable ) ) {
                arg.setDefaultValue( el.dflt );
            }
        }
    }

    private validateArguments() {
        for ( let el of this._processedArgs.values() ) {

            const [ key, type ] = [ el.vrcArgument.name, el.vrcArgument.type ];
            const val = this._rawConf[ key ];

            const verifier = allVerifiers.get( type );
            if ( !verifier ) {
                throw new Error( `Unknown argument type ${type}, no verifier found.` );
            }

            el.validationResult = verifier.verifyArgument( key, val as any, el.vrcArgument.options );
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
    private readonly _validArgs : VrcArgument[];
    private readonly _unnamedArgs : any[] = [];
    private readonly _processedArgs : Map<string, ProcessedArgument> = new Map();
    private readonly _rawConf : any;

    private readonly _assembledConf : T;
}