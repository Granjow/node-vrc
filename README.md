# vrc

This is a configuration loader based on [rc](https://www.npmjs.com/package/rc),
extended by argument validation and `--help`.

```js
const vrc = require( 'vrc' );

const conf = vrc( 'test', [
    { name: 'name', dflt: 'Jack', desc: 'Name to print', type: 'string' },
] );

console.log( `Name: ${conf.name}` );
```

```bash
> node test.js --help
Usage: /usr/local/bin/node [OPTIONS]

name : string [Jack] → Jack
	Name to print
```

## Configuration

* `name`: Name of the variable/parameter
* `desc`: Description, shown in the help
* `dflt`: Default value
* `type`: Supported values: `'string'`, `'number'`, `'boolean'`
