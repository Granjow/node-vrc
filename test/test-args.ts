import * as util from 'util';
import { vrc } from '../src';

const conf = vrc( 'test', [
    { name: 'name', type: 'string', dflt: 'Jack', desc: 'Name to print' },
    { name: 'daylight', type: 'boolean', dflt: false, desc: 'Enable daylight' },
    { name: 'main.sub', type: 'string', dflt: 'subprop', desc: 'Subproperty' },
    { name: 'strArr', type: 'string[]', dflt: 'foo,bar', desc: 'String array' },
    {
        name: 'count',
        type: 'number',
        dflt: 42,
        desc: 'This is quite a long description which should be wrapped nicely. Otherwise, the line is very hard to read and does not look nice anymore.\n\nThis is a new paragraph.',
    },
], { description: 'Smart World instead of Smart Home – controls daylight!' } ).conf;

console.log( util.inspect( conf, false, null, true ) );
console.log( `Name: ${conf.name}. Daylight: ${conf.daylight}.` );
