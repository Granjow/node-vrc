import * as util from 'util';
import { vrc } from '../src';

const conf = vrc( 'test', [
    { name: 'name', dflt: 'Jack', desc: 'Name to print', type: 'string' },
    { name: 'daylight', dflt: false, desc: 'Enable daylight', type: 'boolean' },
    { name: 'main.sub', dflt: 'subprop', desc: 'Subproperty', type: 'string' },
    { name: 'strArr', dflt: 'foo,bar', desc: 'String array', type: 'string[]' },
], { description: 'Smart World instead of Smart Home – controls daylight!' } ).conf;

console.log( util.inspect( conf, false, null, true ) );
console.log( `Name: ${conf.name}. Daylight: ${conf.daylight}.` );
