import { VrcArgument, VrcSettings } from './index';
import chalk from 'chalk';

const wrapAnsi = require( 'wrap-ansi' );

export const createHelpText = ( appName : string, validArgs : VrcArgument[], invalidNames : Set<string>, conf : any, settings? : VrcSettings ) : string => {

    console.log( `Usage: ${process.argv[ 0 ]} [OPTIONS]\n` );

    if ( settings && settings.description ) {
        console.log( settings.description + '\n' );
    }

    const colInvalid = chalk.bold.red;
    const colValid = chalk.bold.blue;

    const indent : string = '    ';
    const lines : string[] = [];

    validArgs.forEach( ( el ) => {
        const valueColor = invalidNames.has( el.name ) ? colInvalid : colValid;
        const val = valueColor( conf[ el.name ] );

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
        'or in another location checked by rc: https://www.npmjs.com/package/rc', 78 ) );

    return lines.join( '\n' );
};
