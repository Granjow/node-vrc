import { vrc } from './index';

const conf = vrc( 'test', [
    { name: 'name', dflt: 'Jack', desc: 'Name to print', type: 'string' },
] );

console.log( `Name: ${conf.name}` );
