import { StringVerifier } from '../src/verifiers/string-verifier';
import { OptionsValidationResult } from '../src/verifiers/verifiers';

describe( 'String Verifier', () => {

    const stringVerifier = new StringVerifier().verifyArgument;

    it( 'converts numbers to string', () => {
        const result = stringVerifier( 'key', 1.23 );
        expect( result.valid ).toBe( true );
        expect( result.value ).toBe( '1.23' );
    } );

    it( 'does not modify strings', () => {
        const result = stringVerifier( 'key', '1.20' );
        expect( result.valid ).toBe( true );
        expect( result.value ).toBe( '1.20' );
    } );

    it( 'verifies a standard string', () => {
        const result = stringVerifier( 'key', 'foo' );
        expect( result.valid ).toBe( true );
    } );

    it( 'allows strings defined in options', () => {
        let result = stringVerifier( 'key', 'foo', [ 'foo', 'bar' ] );
        expect( result.valid ).toBe( true );

        result = stringVerifier( 'key', 'bar', [ 'foo', 'bar' ] );
        expect( result.valid ).toBe( true );
    } );

    it( 'does not allow strings not defined in options', () => {
        let result = stringVerifier( 'key', 'foo', [ 'foobar' ] );
        expect( result.valid ).toBe( false );
    } );

    it( 'accepts string options', () => {
        let result : OptionsValidationResult | undefined = undefined;
        expect( () => result = new StringVerifier().verifyOptions( [ 'a', 'b' ] ) ).not.toThrow();
        // @ts-ignore
        expect( result?.valid ).toBe( true );
    } );

    it( 'rejects number options', () => {
        let result : OptionsValidationResult | undefined = undefined;
        expect( () => result = new StringVerifier().verifyOptions( [ 'a', 9.4 ] ) ).not.toThrow();
        // @ts-ignore
        expect( result?.warnings ).toEqual( [] );
        // @ts-ignore
        expect( result?.valid ).toBe( true );
    } );

} );
