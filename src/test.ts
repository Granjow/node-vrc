import { vrc } from './vrc';
import * as util from 'util';

const conf = vrc( 'test', [
    { name: 'name', dflt: 'Jack', desc: 'Name to print', type: 'string' },
    { name: 'daylight', dflt: false, desc: 'Enable daylight', type: 'boolean' },
] );

console.log( util.inspect( conf, false, null, true ) );
console.log( `Name: ${conf.name}. Daylight: ${conf.daylight}.` );
