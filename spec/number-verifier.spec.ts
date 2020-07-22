import { NumberVerifier } from '../src/verifiers/number-verifier';

describe('Number Verifier', ()=>{


    it( 'does not allow strings not defined in options', () => {
        let result = new NumberVerifier().verifyArgument( 'key', 9, [ 8 ] );
        expect( result.valid ).toBe( false );
    } );
});