import chalk from 'chalk';
import { VrcSettings } from './vrc-conf';
import { ProcessedArgument } from './args/processed-argument';

const wrapAnsi = require( 'wrap-ansi' );

export const createHelpText = ( appName : string, processedArgs : ProcessedArgument[], settings? : VrcSettings ) : string => {

    console.log( `Usage: ${process.argv[ 0 ]} [OPTIONS]\n` );

    if ( settings && settings.description ) {
        console.log( wrapAnsi( settings.description, 78 ) + '\n' );
    }

    const colInvalid = chalk.bold.red;
    const colValid = chalk.bold.blue;

    const indent : string = '    ';
    const lines : string[] = [];

    processedArgs.forEach( ( arg ) => {
        const el = arg.vrcArgument;
        const valueColor = arg.isValid ? colValid : colInvalid;
        const isUserProvidedSecret = el.secr && arg.isUserDefined;
        const val = valueColor( isUserProvidedSecret ? '[********]' : arg.value );

        lines.push( `${chalk.green( el.name )} : ${el.type} (default: ${el.dflt}) → ${val}` );

        if ( el.options ) {
            lines.push( `${indent}${chalk.green( 'Options:' )} ${el.options.join( '  ' )}` );
        }

        const desc = wrapAnsi( el.desc, 78 )
            .replace( /^/gm, indent );
        lines.push( desc );

    } );

    lines.push( '' );
    lines.push( `${colValid( 'Valid' )} and ${colInvalid( 'invalid' )} arguments are highlighted.` );

    lines.push( '' );
    lines.push( wrapAnsi( `Configuration files can be stored in .${appName}rc in this or a parent directory, ` +
        'or in another location checked by rc: https://www.npmjs.com/package/rc ' +
        'Alternatively, define arguments in environment variables, for example an argument “foo” ' +
        `is set by the environment variable ”${appName}_foo“.`, 78 ) );

    return lines.join( '\n' );
};

export const printArgs = ( args : ProcessedArgument[] ) : string => {
    const strings = [];

    const fmt = ( arg : ProcessedArgument ) => {
        const base = arg.vrcArgument.secr ? chalk.italic : chalk;
        if ( !arg.isValid ) return base.red;
        if ( arg.isUserDefined ) return base.green;
        return base.white;
    };

    for ( let arg of args ) {
        const f = fmt( arg );
        const v = arg.vrcArgument.secr ? '[********]' : arg.value;
        strings.push( `${arg.vrcArgument.name} = ${f( v )}` );
    }

    return strings.join( '\n' );
};
