import { stringArrayVerifier } from '../src/verifiers/string-array-verifier';

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
