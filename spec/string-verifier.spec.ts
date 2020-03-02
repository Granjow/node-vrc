import { stringVerifier } from '../src/verifiers/string-verifier';

describe( 'String Verifier', () => {

    it( 'verifies a standard string', () => {
        const result = stringVerifier( 'key', 'foo' );
        expect( result.valid ).toBeTrue();
    } );

    it( 'allows strings defined in options', () => {
        let result = stringVerifier( 'key', 'foo', [ 'foo', 'bar' ] );
        expect( result.valid ).toBeTrue();

        result = stringVerifier( 'key', 'bar', [ 'foo', 'bar' ] );
        expect( result.valid ).toBeTrue();
    } );

    it( 'does not allow strings not defined in options', () => {
        let result = stringVerifier( 'key', 'foo', [ 'foobar' ] );
        expect( result.valid ).toBeFalse();
    } );

} );
