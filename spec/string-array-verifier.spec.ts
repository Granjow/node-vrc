import { StringArrayVerifier } from '../src/verifiers/string-array-verifier';

describe( 'string array', () => {

    const stringArrayVerifier = new StringArrayVerifier().verifyArgument;

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
