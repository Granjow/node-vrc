import { ValidationResult, Verifier, verifiers, } from './verifiers/verifiers';
import { printHelp } from './help';

const chalk = require( 'chalk' );
const rc = require( 'rc' );

export interface VrcArgument {
    name : string;
    type : string;
    desc : string;
    dflt : any;
}

export interface VrcSettings {
    description? : string;
}

const allVerifiers : Map<string, ( key : string, val : string ) => ValidationResult> = new Map();

allVerifiers.set( 'number', verifiers.get( Verifier.number ) );
allVerifiers.set( 'number[]', verifiers.get( Verifier.numberArray ) );
allVerifiers.set( 'number[][]', verifiers.get( Verifier.numberArray2D ) );
allVerifiers.set( 'string', verifiers.get( Verifier.string ) );
allVerifiers.set( 'string[]', verifiers.get( Verifier.stringArray ) );
allVerifiers.set( 'boolean', verifiers.get( Verifier.boolean ) );
allVerifiers.set( 'bool', verifiers.get( Verifier.boolean ) );


function checkInvalidNames( conf : any, validArgs : VrcArgument[] ) : Set<string> {
    const invalidNames : Set<string> = new Set();

    for ( let el of validArgs ) {

        const [ key, val, type ] = [ el.name, conf[ el.name ], el.type ];

        const verifier = allVerifiers.get( el.type );
        if ( !verifier ) {
            throw new Error( `Unknown argument type ${type}, no verifier found.` );
        }

        const validationResult = verifier( key, val );

        if ( validationResult.valid ) {
            conf[ el.name ] = validationResult.value;
        } else {
            invalidNames.add( key );
        }
    }

    return invalidNames;
}

function replaceInvalidsByDefaults( conf : any, validArgs : VrcArgument[], invalidNames : Set<string> ) {
    validArgs.forEach( ( arg : VrcArgument ) => {
        if ( invalidNames.has( arg.name ) ) {
            conf[ arg.name ] = arg.dflt;
        }
    } );
}

const getDuplicateKeys = ( args : VrcArgument[] ) : string[] => {
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

/**
 *
 * @param {string} appName Name of the application to be used for configuration file names
 * @param {{
 *      name: string,
 *      type: string,
 *      desc: string,
 *      dflt,
 * }[]} validArgs List of arguments
 * @param settings Additional settings for vrc
 */
export function vrc( appName : string, validArgs : VrcArgument[], settings? : VrcSettings ) : { conf : any, invalidNames : string[] } {

    const rcObj : any = {};

    validArgs.forEach( ( el ) => rcObj[ el.name ] = el.dflt );

    const duplicates = getDuplicateKeys( validArgs );
    if ( duplicates.length > 0 ) throw new Error( `Duplicate definitions for: ${duplicates.join( ',' )}` );

    const conf : any = rc( appName, rcObj );

    const invalidNames : Set<string> = checkInvalidNames( conf, validArgs );
    const exitCode = invalidNames.size > 0 ? 1 : 0;

    if ( conf.h || conf.help ) {
        printHelp( appName, validArgs, invalidNames, conf, settings );
        process.exit( exitCode );
    }

    replaceInvalidsByDefaults( conf, validArgs, invalidNames );

    return { conf, invalidNames: Array.from( invalidNames ) };
}
