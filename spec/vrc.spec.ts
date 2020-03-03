import * as fs from 'fs';
import { vrc } from '../src';

describe( 'vrc', () => {

    const appName = 'testapp';
    const configPath = `./.${appName}rc`;

    afterEach( () => {
        try {
            fs.unlinkSync( configPath );
        } catch ( e ) {
        }
    } );

    it( 'accepts configured arguments', () => {

        const name = 'MyTestName';

        fs.writeFileSync( configPath, JSON.stringify( { name: name, test: 'foo' } ) );

        const conf = vrc( appName, [
            { name: 'name', dflt: 'Unset', desc: 'Name to print', type: 'string' },
        ] ).conf;

        expect( conf[ 'name' ] ).toBe( name );

    } );

    it( 'only allows numbers', () => {

        fs.writeFileSync( configPath, JSON.stringify( { value: 'noNumber', test: 'foo' } ) );

        const conf = vrc( appName, [
            { name: 'value', dflt: 1, desc: 'Foo', type: 'number' },
        ] ).conf;

        expect( conf[ 'value' ] ).toBe( 1 );

    } );

    it( 'supports and converts number arrays', () => {

        fs.writeFileSync( configPath, JSON.stringify( { value: '1,2,3,4,42' } ) );

        const conf = vrc( appName, [
            { name: 'value', dflt: [ 1, 9, 11 ], desc: 'Foo', type: 'number[]' },
        ] ).conf;

        expect( conf[ 'value' ] ).toEqual( [ 1, 2, 3, 4, 42 ] );

    } );

    it( 'supports 2D number arrays', () => {

        fs.writeFileSync( configPath, JSON.stringify( { value: '[[1,2],[3]]' } ) );

        const conf = vrc( appName, [
            { name: 'value', dflt: [ 1, 9, 11 ], desc: 'Foo', type: 'number[][]' },
        ] ).conf;

        expect( conf[ 'value' ] ).toEqual( [ [ 1, 2 ], [ 3 ] ] );

    } );

    it( 'throws an error when the same key is defined twice', () => {
        const f = () => vrc( appName, [
            { name: 'value', dflt: false, desc: 'Foo', type: 'boolean' },
            { name: 'value', dflt: false, desc: 'Foo', type: 'boolean' },
        ] );
        expect( f ).toThrow();
    } );

    describe( 'Default Arguments', () => {

        it( 'uses default string', () => {
            const conf = vrc( appName, [
                { name: 'value', type: 'string', dflt: 'foo123', desc: '' },
            ] ).conf;
            expect( conf[ 'value' ] ).toEqual( 'foo123' );
        } );

        it( 'uses default boolean', () => {
            const conf = vrc( appName, [
                { name: 'value', type: 'boolean', dflt: false, desc: '' },
            ] ).conf;
            expect( conf[ 'value' ] ).toBeFalse();
        } );

        it( 'uses default boolean (true)', () => {
            const conf = vrc( appName, [
                { name: 'value', type: 'boolean', dflt: true, desc: '' },
            ] ).conf;
            expect( conf[ 'value' ] ).toBeTrue();
        } );

        it( 'uses default number', () => {
            const conf = vrc( appName, [
                { name: 'value', type: 'number', dflt: 42.5, desc: '' },
            ] ).conf;
            expect( conf[ 'value' ] ).toBe( 42.5 );
        } );

    } );

} );
