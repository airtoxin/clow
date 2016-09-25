# clow [![Build Status](https://travis-ci.org/airtoxin/clow.svg?branch=master)](https://travis-ci.org/airtoxin/clow)

The project generator🔯

![clow logo](clow.png)

## Install

`$ npm install -g clow`

## Quick start

Once `clow` installed, you can use `clow` command.

Then, let's try `$ clow github:airtoxin/clow-template-babel my-first-project`.
This command ask some settings, so answer it and wait a few minutes. When command finished, you got babel project template on `my-first-project` directory. Run `npm run watch`, `npm test` ... in created project directory. It works! wow!

## Documents

### CLI

`clow` takes 2 or more arguments: list of <src> and <dest>. Simple!

The last argument is path of project destination.
The other arguments are path or url (or github shorthand) of project template source.
(eg. `~/my-clow-templates/babel`, `https://github.com/airtoxin/clow/archive/master.zip`, `github:airtoxin/clow-template-babel`)
Template url only support compressed file url.

### Template project structure

Template project must contain `clow.js` file at root.

```
my-template
    └── clow.js
```

### clow file (`clow.js`)

see [examples](examples/babel-project/clow.js)

The clow file must export array of task definitions. (`module.exports = [...];`)

Task definition is object that contains `type` field. type field defines 'which task uses this'. Other fields are relied to task.

### Bundled tasks

#### template

Compile template files of `Hogan.js` and put them to dest.

```js
{ type: 'template', src: { cwd: 'templates', pattern: '**/*' }, dest: '.', args: {} }
```

+ __src.cwd__: relative path of source directory from root of project template directory. If above example's task runs in `pathtotemplate/babel-gen`, files matches `pathtotemplate/babel-gen/templates/**/*` ware processed. If got url source, project template directory was set to temporary directory.
+ __src.pattern__: glob pattern of input files.
+ __dest__: relative path of destination directory of compiled files.
+ __args__: `Hogan.js` variable mapping object. If  value is `null`, clow ask you 'what is this value?' at runtime.
+ __delimiters__: `Hogan.js` delimiters option. (optional)

#### shell

Runs shell command.

```js
{ type: "shell", commands: ["pwd", "ls -la"] }
```

+ __commands__: shell command list.

#### clow-template

Runs other clow task.

```js
{ type: 'clow-template', templates: ['path/to/my-templates', `https://url.to.my-template.s`] }
```

+ __templates__: file or url of project template sources.

#### npm-install

Install npm's package.

```js
{ type: 'npm-install': dependencies: ['babel-polyfill'], devDependencies: ['babel-cli', 'babel-preset-es2015'] }
```

## License

MIT
