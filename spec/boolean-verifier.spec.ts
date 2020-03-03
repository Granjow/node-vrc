import { booleanVerifier } from '../src/verifiers/boolean-verifier';

describe( 'Boolean', () => {

    it( 'parses booleans (true)', () => {
        const result = booleanVerifier( '', true );
        expect( result.valid ).toBe( true );
        expect( result.value ).toBe( true );
    } );

    it( 'parses booleans (false)', () => {
        const result = booleanVerifier( '', false );
        expect( result.valid ).toBe( true );
        expect( result.value ).toBe( false );
    } );

    it( 'parses strings (true)', () => {
        const result = booleanVerifier( '', 'true' );
        expect( result.valid ).toBe( true );
        expect( result.value ).toBe( true );
    } );

    it( 'parses strings (false)', () => {
        const result = booleanVerifier( '', 'false' );
        expect( result.valid ).toBe( true );
        expect( result.value ).toBe( false );
    } );

    it( 'does not allow other values', () => {
        const tests = [ 'abc', 'true ', '', undefined, null, 22, 1, 0, -1 ];
        for ( let test in tests ) {
            expect( booleanVerifier( '', test ).valid ).toBe( false, `Not a boolean: ${test}` );
        }
    } );

} );
