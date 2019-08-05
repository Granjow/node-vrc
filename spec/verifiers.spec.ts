import { verify2dNumberArray, verifyBoolean, verifyNumberArray } from '../src/verifiers';

describe( 'Verifiers', () => {

    describe( 'Boolean', () => {

        it( 'parses booleans (true)', () => {
            const result = verifyBoolean( '', true );
            expect( result.valid ).toBe( true );
            expect( result.value ).toBe( true );
        } );

        it( 'parses booleans (false)', () => {
            const result = verifyBoolean( '', false );
            expect( result.valid ).toBe( true );
            expect( result.value ).toBe( false );
        } );

        it( 'parses strings (true)', () => {
            const result = verifyBoolean( '', 'true' );
            expect( result.valid ).toBe( true );
            expect( result.value ).toBe( true );
        } );

        it( 'parses strings (false)', () => {
            const result = verifyBoolean( '', 'false' );
            expect( result.valid ).toBe( true );
            expect( result.value ).toBe( false );
        } );

        it( 'does not allow other values', () => {
            const tests = [ 'abc', 'true ', '', undefined, null, 22, 1, 0, -1 ];
            for ( let test in tests ) {
                expect( verifyBoolean( '', test ).valid ).toBe( false, `Not a boolean: ${test}` );
            }
        } );

    } );

    describe( 'Number array', () => {

        it( 'is parsed', () => {
            const result = verifyNumberArray( 'foo', '1,2,3' );
            expect( result.valid ).toBe( true );
            expect( result.value ).toEqual( [ 1, 2, 3 ] );
        } );

        it( 'parses single string number', () => {
            const result = verifyNumberArray( 'foo', '12' );
            expect( result.valid ).toBe( true );
            expect( result.value ).toEqual( [ 12 ] );
        } );

        it( 'parses single int number', () => {
            const result = verifyNumberArray( 'foo', 12 );
            expect( result.valid ).toBe( true );
            expect( result.value ).toEqual( [ 12 ] );
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