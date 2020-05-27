import { ValidationResult, verifiers } from '../src/verifiers/verifiers';
import { numberArrayVerifier } from '../src/verifiers/number-array-verifier';
import { numberArrayArrayVerifier } from '../src/verifiers/number-array-array-verifier';
import { stringArrayVerifier } from '../src/verifiers/string-array-verifier';
import { booleanVerifier } from '../src/verifiers/boolean-verifier';

describe( 'Verifiers', () => {

    it( 'support undefined arguments', () => {
        for ( let [ k, v ] of verifiers.verifiers ) {
            let result : ValidationResult | undefined = undefined;
            expect( () => result = v( k, undefined ) ).not.toThrow();
            expect( result ).withContext( `${k} = undefined was not parsed` ).toBeDefined();
            // @ts-ignore
            expect( result.value === undefined || result.value === false ).withContext( `${k} = undefined was not parsed` ).toBeTrue();
        }
    } );

    it( 'support empty strings as arguments', () => {
        for ( let [ k, v ] of verifiers.verifiers ) {
            let result : ValidationResult | undefined = undefined;
            expect( () => result = v( k, '' ) ).not.toThrow();
            expect( result ).withContext( `${k} = '' was not parsed` ).toBeDefined();
            // @ts-ignore
            expect( result.value ).withContext( `${k} = '' was not parsed` ).toBeDefined();
        }
    } );

} );
