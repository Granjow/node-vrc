# vrc

This is a configuration loader based on [rc](https://www.npmjs.com/package/rc),
extended by argument validation and `--help`.

```js
const { vrc } = require( 'vrc' );

const conf = vrc( 'myAppName', [
    { name: 'name', dflt: 'Jack', desc: 'Name to print', type: 'string' },
], { description: 'This tool solves any problem given' } ).conf;

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
* `type`: Supported values: `'string'`, `'number'`, `'boolean'`, `number[]`, `number[][]`
* `options`: Array holding valid options for the argument. Currently only for strings.

Number arrays are passed as comma-separated values and are converted; `1,3,42` results in `[1,3,42]`.


## Using vrc in TypeScript projects

```typescript
import { vrc } from 'vrc';

const conf = vrc( … ).conf;
```


## Changelog

### v1.10.0 – 2020-03-02

* Added `options` for string parameters to define possible values

### v1.9.0 – 2020-02-10

* Changed: Long description lines are now wrapped in the help output.

### v1.8.0 – 2020-01-08

* Added support for `string[]`
