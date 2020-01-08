import { ValidationResult, verifiers } from '../src/verifiers/verifiers';
import { numberArrayVerifier } from '../src/verifiers/number-array-verifier';
import { numberArrayArrayVerifier } from '../src/verifiers/number-array-array-verifier';
import { stringArrayVerifier } from '../src/verifiers/string-array-verifier';
import { booleanVerifier } from '../src/verifiers/boolean-verifier';

describe( 'Verifiers', () => {

    describe( 'All verifiers', () => {

        it( 'support undefined arguments', () => {
            for ( let [ k, v ] of verifiers.verifiers ) {
                let result : ValidationResult = undefined;
                expect( () => result = v( k, undefined ) ).not.toThrow();
                expect( result ).withContext( `${k} = undefined was not parsed` ).toBeDefined();
                expect( result.value ).withContext( `${k} = undefined was not parsed` ).not.toBeDefined();
            }
        } );

        it( 'support empty strings as arguments', () => {
            for ( let [ k, v ] of verifiers.verifiers ) {
                let result : ValidationResult = undefined;
                expect( () => result = v( k, '' ) ).not.toThrow();
                expect( result ).withContext( `${k} = '' was not parsed` ).toBeDefined();
                expect( result.value ).withContext( `${k} = '' was not parsed` ).toBeDefined();
            }
        } );

    } );

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

    describe( '2D Number array', () => {

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
            expect( result.valid ).toBe( true );
            expect( result.value ).toEqual( arr );
            expect( result.warning ).not.toBeTruthy();
        } );

    } );

    describe( 'string array', () => {

        it( 'allows single string', () => {
            const result = stringArrayVerifier( 'foo', 'bar' );
            expect( result.valid ).toBe( true );
            expect( result.value ).toEqual( [ 'bar' ] );
        } );

        it( 'splits strings at commas', () => {
            const result = stringArrayVerifier( 'foo', 'bar,42,baz' );
            expect( result.valid ).toBe( true );
            expect( result.value ).toEqual( [ 'bar', '42', 'baz' ] );
        } );

    } );

} );