import * as fs from 'fs';
import { Vrc } from '../src';

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

        const conf = new Vrc( appName, [
            { name: 'name', dflt: 'Unset', desc: 'Name to print', type: 'string' },
        ] ).conf;

        expect( conf[ 'name' ] ).toBe( name );

    } );

    it( 'only allows numbers', () => {

        fs.writeFileSync( configPath, JSON.stringify( { value: 'noNumber', test: 'foo' } ) );

        const conf = new Vrc( appName, [
            { name: 'value', dflt: 1, desc: 'Foo', type: 'number' },
        ] ).conf;

        expect( conf[ 'value' ] ).toBe( 1 );

    } );

    it( 'supports and converts number arrays', () => {

        fs.writeFileSync( configPath, JSON.stringify( { value: '1,2,3,4,42' } ) );

        const conf = new Vrc( appName, [
            { name: 'value', dflt: [ 1, 9, 11 ], desc: 'Foo', type: 'number[]' },
        ] ).conf;

        expect( conf[ 'value' ] ).toEqual( [ 1, 2, 3, 4, 42 ] );

    } );

    it( 'supports 2D number arrays', () => {

        fs.writeFileSync( configPath, JSON.stringify( { value: '[[1,2],[3]]' } ) );

        const conf = new Vrc( appName, [
            { name: 'value', dflt: [ 1, 9, 11 ], desc: 'Foo', type: 'number[][]' },
        ] ).conf;

        expect( conf[ 'value' ] ).toEqual( [ [ 1, 2 ], [ 3 ] ] );

    } );

    it( 'throws an error when the same key is defined twice', () => {
        const f = () => new Vrc( appName, [
            { name: 'value', dflt: false, desc: 'Foo', type: 'boolean' },
            { name: 'value', dflt: false, desc: 'Foo', type: 'boolean' },
        ] );
        expect( f ).toThrow();
    } );

    describe( 'Default Arguments', () => {

        it( 'uses default string', () => {
            const conf = new Vrc( appName, [
                { name: 'value', type: 'string', dflt: 'foo123', desc: '' },
            ] ).conf;
            expect( conf[ 'value' ] ).toEqual( 'foo123' );
        } );

        it( 'uses default boolean', () => {
            const conf = new Vrc( appName, [
                { name: 'value', type: 'boolean', dflt: false, desc: '' },
            ] ).conf;
            expect( conf[ 'value' ] ).toBeFalse();
        } );

        it( 'uses default boolean (true)', () => {
            const conf = new Vrc( appName, [
                { name: 'value', type: 'boolean', dflt: true, desc: '' },
            ] ).conf;
            expect( conf[ 'value' ] ).toBeTrue();
        } );

        it( 'uses default number', () => {
            const conf = new Vrc( appName, [
                { name: 'value', type: 'number', dflt: 42.5, desc: '' },
            ] ).conf;
            expect( conf[ 'value' ] ).toBe( 42.5 );
        } );

        it( 'marks value as default value if no value was provided', () => {
            const conf = new Vrc( appName, [
                { name: 'value', type: 'string', dflt: 'foo123', desc: '' },
            ] );
            expect( conf.isDefaultValue( 'value' ) ).toBeTrue();
            expect( conf.get( 'value' ) ).toBe( 'foo123' );
        } );

        it( 'marks value as default value if invalid value was provided', () => {
            fs.writeFileSync( configPath, JSON.stringify( { value: 'foo' } ) );
            const conf = new Vrc( appName, [
                { name: 'value', type: 'number', dflt: 123, desc: '' },
            ] );
            expect( conf.isDefaultValue( 'value' ) ).toBeTrue();
            expect( conf.get( 'value' ) ).toBe( 123 );
        } );

        it( 'does not mark value as default value if user provided value was used', () => {
            fs.writeFileSync( configPath, JSON.stringify( { value: 789 } ) );
            const conf = new Vrc( appName, [
                { name: 'value', type: 'number', dflt: 123, desc: '' },
            ] );
            expect( conf.isDefaultValue( 'value' ) ).toBeFalse();
            expect( conf.get( 'value' ) ).toBe( 789 );
        } );

    } );

} );
