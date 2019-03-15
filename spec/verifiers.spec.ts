import { verifyNumberArray } from '../src/verifiers';

describe( 'Verifiers', () => {

    describe( 'Number array', () => {

        it( 'is parsed', () => {
            const result = verifyNumberArray( 'foo', '1,2,3' );
            expect( result.valid ).toBe( true );
            expect( result.value ).toEqual( [ 1, 2, 3 ] );
        } );

        it( 'rejects invalid values', () => {
            expect( verifyNumberArray( 'foo', '1,b,3' ).valid ).toBe( false );
        } );

        it( 'does not fail on undefined values', () => {
            expect( () => verifyNumberArray( 'foo', undefined ) ).not.toThrow();
            expect( () => verifyNumberArray( 'foo', null ) ).not.toThrow();
            expect( () => verifyNumberArray( 'foo', 4 ) ).not.toThrow();
        } );

    } );

} );