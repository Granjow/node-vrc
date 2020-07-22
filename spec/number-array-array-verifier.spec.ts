import { NumberArrayArrayVerifier } from '../src/verifiers/number-array-array-verifier';

describe( '2D Number array', () => {

    const verifier = new NumberArrayArrayVerifier();
    const numberArrayArrayVerifier = ( name : string, arg : any ) => verifier.verifyArgument( name, arg );

    it( 'supports JS arrays', () => {
        const arr = [ [ 1 ], [ 2, 3 ] ];
        const result = numberArrayArrayVerifier( 'foo', arr );
        expect( result.valid ).toBe( true );
        expect( result.value ).toEqual( arr );
        expect( result.warning ).not.toBeTruthy();
    } );

    it( 'rejects other arrays', () => {
        expect( numberArrayArrayVerifier( 'foo', [ [ 'a' ] ] ).valid ).toBe( false );
        expect( numberArrayArrayVerifier( 'foo', 'hi' ).valid ).toBe( false );
    } );

    it( 'parses JSON strings', () => {
        const arr = [ [ 1 ], [ 2, 3 ] ];
        const result = numberArrayArrayVerifier( 'foo', JSON.stringify( arr ) );
        expect( result.warning ).not.toBeTruthy();
        expect( result.valid ).toBe( true );
        expect( result.value ).toEqual( arr );
    } );

} );
