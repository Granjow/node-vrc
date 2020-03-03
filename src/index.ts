import { VrcConf } from './vrc-conf';


export interface VrcArgument {
    name : string;
    type : string;
    desc : string;
    dflt : any;
    options? : string[];
}

export interface VrcSettings {
    description? : string;
}


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
export function vrc( appName : string, validArgs : VrcArgument[], settings? : VrcSettings ) : VrcConf {

    const conf = new VrcConf( appName, validArgs, );

    if ( conf.showHelp ) {
        console.log( conf.help );

        const exitCode = conf.invalidKeys.length > 0 ? 1 : 0;
        process.exit( exitCode );
    }

    return conf;
}
