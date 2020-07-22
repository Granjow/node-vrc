import { VrcConf } from '../src/vrc-conf';

describe( 'VRC conf', () => {
    describe( 'Options', () => {
        it( 'allows to use string options for number parameters', () => {
            const run = () => new VrcConf( '', [
                { name: 'a', type: 'string', dflt: 4, desc: '', options: [ 9, 7 ] },
            ] );
            expect( run ).not.toThrow();
        } );
    } );
} );
