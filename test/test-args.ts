import * as util from 'util';
import { vrc } from '../src';

const conf = vrc( 'test', [
    { name: 'name', dflt: 'Jack', desc: 'Name to print', type: 'string' },
    { name: 'daylight', dflt: false, desc: 'Enable daylight', type: 'boolean' },
    { name: 'main.sub', dflt: 'subprop', desc: 'Subproperty', type: 'string' },
], { description: 'This is only a test script which merely tests vrc functionality for testing purposes.' } ).conf;

console.log( util.inspect( conf, false, null, true ) );
console.log( `Name: ${conf.name}. Daylight: ${conf.daylight}.` );
