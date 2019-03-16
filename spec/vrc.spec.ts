import * as fs from 'fs';
import { vrc } from '../src';

describe( 'vrc', () => {

    const appName = 'testapp';
    const configPath = `./.${appName}rc`;

    afterEach( () => {
        fs.unlinkSync( configPath );
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

} );
