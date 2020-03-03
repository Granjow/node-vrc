import { numberArrayVerifier } from '../src/verifiers/number-array-verifier';

describe( 'Number array', () => {

    it( 'is parsed', () => {
        const result = numberArrayVerifier( 'foo', '1,2,3' );
        expect( result.valid ).toBe( true );
        expect( result.value ).toEqual( [ 1, 2, 3 ] );
    } );

    it( 'parses single string number', () => {
        const result = numberArrayVerifier( 'foo', '12' );
        expect( result.valid ).toBe( true );
        expect( result.value ).toEqual( [ 12 ] );
    } );

    it( 'parses single int number', () => {
        const result = numberArrayVerifier( 'foo', 12 );
        expect( result.valid ).toBe( true );
        expect( result.value ).toEqual( [ 12 ] );
    } );

    it( 'allows JS number arrays', () => {
        expect( numberArrayVerifier( 'foo', [ 1, 2, 3 ] ).valid ).toBe( true );
        expect( numberArrayVerifier( 'foo', [ 1, 2, 3 ] ).warning ).not.toBeTruthy();
    } );

    it( 'rejects invalid values', () => {
        expect( numberArrayVerifier( 'foo', '1,b,3' ).valid ).toBe( false );
        expect( numberArrayVerifier( 'foo', '1,b,3' ).warning ).toBeTruthy();
    } );

    it( 'does not fail on undefined values', () => {
        expect( () => numberArrayVerifier( 'foo', undefined ) ).not.toThrow();
        expect( () => numberArrayVerifier( 'foo', null ) ).not.toThrow();
        expect( () => numberArrayVerifier( 'foo', 4 ) ).not.toThrow();
    } );

} );
