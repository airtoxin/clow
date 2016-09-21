# clow [![Build Status](https://travis-ci.org/airtoxin/clow.svg?branch=master)](https://travis-ci.org/airtoxin/clow)

The project generator🔯

![clow logo](clow.png)

## Install

`$ npm install -g clow`

## Quick start

Once `clow` installed, you can use `clow` command.

Additional plugin install needed: `$ npm install -g clow-plugin-task-npm-install`.

Then, let's try `$ clow https://github.com/airtoxin/clow-template-babel/archive/master.zip my-first-project`.
This command ask some settings, so answer it and wait a few minutes. When command finished, you got babel project template on `my-first-project` directory. Run `npm run watch`, `npm test` ... in created project directory. It works! wow!

## Documents

### CLI

`clow` cli tool takes 2 or more arguments. Simple!

The last argument is path of project destination.
The other arguments are path or url of project template source.
(eg. `~/my-clow-templates/babel`, `https://github.com/airtoxin/clow/archive/master.zip`)
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

### Write plugin

clow exports `clow(srcDir, destDir)` as default and class `BaseTask` as named.
Task plugin implemented as a class extending BaseTask.

```js
import clow, { BaseTask } from 'clow';

export default class HelloTask extends BaseTask {
  constructor(srcDir, destDir) {
    super();

    this.name = 'hello';
  }

  run(task) {
    this.log(`hello ${task.name}!`);
  }
}
```



## License

MIT
