import { verify2dNumberArray, verifyNumberArray } from '../src/verifiers';

describe( 'Verifiers', () => {

    describe( 'Number array', () => {

        it( 'is parsed', () => {
            const result = verifyNumberArray( 'foo', '1,2,3' );
            expect( result.valid ).toBe( true );
            expect( result.value ).toEqual( [ 1, 2, 3 ] );
        } );

        it( 'allows JS number arrays', () => {
            expect( verifyNumberArray( 'foo', [ 1, 2, 3 ] ).valid ).toBe( true );
            expect( verifyNumberArray( 'foo', [ 1, 2, 3 ] ).warning ).not.toBeTruthy();
        } );

        it( 'rejects invalid values', () => {
            expect( verifyNumberArray( 'foo', '1,b,3' ).valid ).toBe( false );
            expect( verifyNumberArray( 'foo', '1,b,3' ).warning ).toBeTruthy();
        } );

        it( 'does not fail on undefined values', () => {
            expect( () => verifyNumberArray( 'foo', undefined ) ).not.toThrow();
            expect( () => verifyNumberArray( 'foo', null ) ).not.toThrow();
            expect( () => verifyNumberArray( 'foo', 4 ) ).not.toThrow();
        } );

    } );

    describe( '2D Number array', () => {

        it( 'supports JS arrays', () => {
            const arr = [ [ 1 ], [ 2, 3 ] ];
            const result = verify2dNumberArray( 'foo', arr );
            expect( result.valid ).toBe( true );
            expect( result.value ).toEqual( arr );
            expect( result.warning ).not.toBeTruthy();
        } );

        it( 'rejects other arrays', () => {
            expect( verify2dNumberArray( 'foo', [ [ 'a' ] ] ).valid ).toBe( false );
            expect( verify2dNumberArray( 'foo', 'hi' ).valid ).toBe( false );
        } );

        it( 'parses JSON strings', () => {
            const arr = [ [ 1 ], [ 2, 3 ] ];
            const result = verify2dNumberArray( 'foo', JSON.stringify( arr ) );
            expect( result.valid ).toBe( true );
            expect( result.value ).toEqual( arr );
            expect( result.warning ).not.toBeTruthy();
        } );

    } );

} );