import { VrcArgument, VrcSettings } from './index';
import chalk from 'chalk';

const wrapAnsi = require( 'wrap-ansi' );

export const printHelp = ( appName : string, validArgs : VrcArgument[], invalidNames : Set<string>, conf : any, settings? : VrcSettings ) => {
    console.log( `Usage: ${process.argv[ 0 ]} [OPTIONS]\n` );
    if ( settings && settings.description ) {
        console.log( settings.description + '\n' );
    }
    validArgs.forEach( ( el ) => {
        const valueColor = invalidNames.has( el.name ) ? chalk.bold.red : chalk.bold.blue;
        const val = valueColor( conf[ el.name ] );
        const desc = wrapAnsi( el.desc, 78 )
            .replace( /^/gm, '    ' );
        console.log( `${chalk.green( el.name )} : ${el.type} [${el.dflt}] → ${val}\n${desc}\n` );
    } );
    console.log( `Configuration files can be stored in .${appName}rc in this or a parent directory,\nor in another location checked by rc: https://www.npmjs.com/package/rc\n` );
};
