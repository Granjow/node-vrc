const fs = require( 'fs' );
const { vrc } = require( '../dist/src/index' );

describe( 'vrc', () => {

    const appName = 'testapp';
    const configPath = `./.${appName}rc`;

    afterEach( () => {
        fs.unlinkSync( configPath );
    } );

    it( 'can be used with plain JS', () => {

        const name = 'MyTestName';

        fs.writeFileSync( configPath, JSON.stringify( { name: name, test: 'foo' } ) );

        const conf = vrc( appName, [
            { name: 'name', dflt: 'Unset', desc: 'Name to print', type: 'string' },
        ] );

        expect( conf[ 'name' ] ).toBe( name );
    } );
} );