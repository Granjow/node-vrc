import { BooleanVerifier } from '../src/verifiers/boolean-verifier';

describe( 'Boolean', () => {

    const booleanVerifier = new BooleanVerifier().verifyArgument;

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

    test.each( [
        [ 'abc' ], [ 'true ' ],
        [ '' ], [ undefined ],
        [ null ], [ 22 ],
        [ 1 ], [ 0 ],
        [ -1 ]
    ] )( 'does not allow %p', ( what ) => {
        expect( booleanVerifier( '', what ).valid ).toBe( false );
    } );

} );
