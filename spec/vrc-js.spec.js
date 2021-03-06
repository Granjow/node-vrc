const fs = require( 'fs' );
const { Vrc } = require( '../dist/src/index' );

describe( 'vrc', () => {

    const appName = 'testapp';
    const configPath = `./.${appName}rc`;

    afterEach( () => {
        fs.unlinkSync( configPath );
    } );

    it( 'can be used with plain JS', () => {

        const name = 'MyTestName';

        fs.writeFileSync( configPath, JSON.stringify( { name: name, test: 'foo' } ) );

        const conf = new Vrc( appName, [
            { name: 'name', dflt: 'Unset', desc: 'Name to print', type: 'string' },
        ] ).conf;

        expect( conf[ 'name' ] ).toBe( name );
    } );
} );