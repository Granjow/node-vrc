# vrc

This is a configuration loader based on [rc](https://www.npmjs.com/package/rc),
extended by argument validation and `--help`.

```js
const { vrc } = require( 'vrc' );

const conf = vrc( 'myAppName', [
    { name: 'name', dflt: 'Jack', desc: 'Name to print', type: 'string' },
] ).conf;

console.log( `Name: ${conf.name}` );
```

**Automatic help** shows default values and actually used values.

![Help demo](help-demo.png)


## Configuration

`vrc( appName, conf ) : { conf, invalidNames }`

Returns the conf object from `rc` and a list of invalid names where the user supplied wrong parameters
(e.g. string instead of number). Invalid values will be replaced by their defaults. 

A configuration entry takes the following arguments:

* `name`: Name of the variable/parameter
* `desc`: Description, shown in the help
* `dflt`: Default value
* `type`: Supported values: `'string'`, `'number'`, `'boolean'`


## Using vrc in TypeScript projects

```typescript
import { vrc } from 'vrc';

const conf = vrc( … ).conf;
```
