const check = require( 'check-types' );
const chalk = require( 'chalk' );
const rc = require( 'rc' );

export interface RcvConfig {
    name : string;
    type : string;
    desc : string;
    dflt : any;
}

function checkInvalidNames( conf : any, validArgs : RcvConfig[] ) : Set<string> {
    const invalidNames : Set<string> = new Set();

    for ( let el of validArgs ) {
        const [ key, val, type ] = [ el.name, conf[ el.name ], el.type ];
        if ( type === 'number' ) {
            if ( !check.number( val ) ) {
                console.error( `Argument ${key} must be a number, is ${JSON.stringify( val )}` );
                invalidNames.add( el.name );
            }
        } else if ( type === 'string' ) {
            if ( !check.string( val ) ) {
                console.error( `Argument ${key} must be a string, is ${JSON.stringify( val )}` )
            }
        } else {
            throw new Error( `Unknown argument type ${type}` );
        }
    }

    return invalidNames;
}

export function vrc( appName : string, validArgs : RcvConfig[] ) {

    const rcObj : any = {};
    let errorCount = 0;

    validArgs.forEach( ( el ) => rcObj[ el.name ] = el.dflt );

    const conf : any = rc( appName, rcObj );

    const invalidNames = checkInvalidNames( conf, validArgs );
    const exitCode = invalidNames.size > 0 ? 1 : 0;

    if ( conf.h || conf.help ) {
        console.log( `Usage: ${process.argv[ 0 ]} [OPTIONS]\n` );
        console.log( `Configuration files can be stored in .${appName}rc in this or a parent directory,\nor in another location checked by rc: https://www.npmjs.com/package/rc\n` );
        validArgs.forEach( ( el ) => {
            const valueColor = invalidNames.has( el.name ) ? chalk.bold.red : chalk.bold.blue;
            const val = valueColor( conf[ el.name ] );
            console.log( `${chalk.green( el.name )} : ${el.type} [${el.dflt}] → ${val}\n\t${el.desc}\n` );
        } );
        process.exit( exitCode );
    }

    if ( errorCount > 0 ) {
        process.exit( exitCode );
    }

    return conf;
}
