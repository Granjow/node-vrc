import { ValidationResult, verifiers } from '../src/verifiers/verifiers';

describe( 'Verifiers', () => {

    const verifierList = Array.from( verifiers.verifiers.entries() );
    const verifierListWithoutOptions = verifierList.filter( ( el ) => el[ 0 ] !== 'string' && el[ 0 ] !== 'number' );

    test.each( verifierList )( 'support undefined arguments for type %s', ( k, v ) => {
        let result : ValidationResult | undefined = undefined;
        expect( () => result = v.verifyArgument( k, undefined ) ).not.toThrow();
        expect( result ).toBeDefined();
        // @ts-ignore
        expect( result.value === undefined || result.value === false ).toBe( true );
    } );

    test.each( verifierList )( 'support empty strings as arguments for type %s', ( k, v ) => {
        let result : ValidationResult | undefined = undefined;
        expect( () => result = v.verifyArgument( k, '' ) ).not.toThrow();
        expect( result ).toBeDefined();

        // @ts-ignore
        expect( result.value ).toBeDefined();
    } );

    test.each( verifierListWithoutOptions )( 'throws error when options are provided for type %s', ( k, v ) => {
        let result : ValidationResult | undefined = undefined;
        expect( () => v.verifyOptions( [] ) ).toThrow();
    } );

} );
