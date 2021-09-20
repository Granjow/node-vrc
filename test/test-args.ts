import { Vrc } from '../src';

interface Conf {
    name : string;
    daylight : boolean;
}

const conf = new Vrc<Conf>( 'test', [
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
    { name: 'type', type: 'string', dflt: undefined, desc: 'With options', options: [ 'a', 'b' ] },
    { name: 'level', type: 'number', dflt: undefined, desc: 'With options', options: [ 1, 2, 3 ] },
    { name: 'secret', type: 'string', dflt: 'No secrets in code', desc: 'With options', secr: true },
], { description: 'Smart World instead of Smart Home – controls daylight! Describing that requires much more than a single line, so the many lines should be wrapped.' } ).run();

conf.printArgs();

//console.log( util.inspect( conf, false, null, true ) );
console.log( `Name: ${conf.conf.name}. Daylight: ${conf.conf.daylight}.` );
