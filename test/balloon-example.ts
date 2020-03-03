import { Vrc } from '../src';

interface Conf {
    balloons : number;
    colour : string;
}

const conf = new Vrc<Conf>( 'balloon', [
    { name: 'balloons', type: 'number', dflt: 99, desc: 'Number of balloons' },
    { name: 'colour', type: 'string', dflt: 'red', desc: 'Balloon colour' },
] );

console.log( conf.conf.balloons ); // 99