import BaseTask from './base-task';

export default class NpmInstallTask extends BaseTask {
  constructor(srcDir, destDir) {
    super();

    this.name = 'npm-install';
    this.destDir = destDir;
  }

  run(task) {
    const { dependencies = [], devDependencies = [] } = task;

    const depPromise = () => dependencies
      .map(name => () => {
        this.log(`install ${name}`);
        return this.pExec(`npm install -SE ${name}`, { cwd: this.destDir })
          .then(result => this.log(result.stdout));
      })
      .reduce((p, f) => p.then(f), Promise.resolve());

    const devPromise = () => devDependencies
      .map(name => () => {
        this.log(`install ${name}`);
        return this.pExec(`npm install -DE ${name}`, { cwd: this.destDir })
          .then(result => this.log(result.stdout));
      })
      .reduce((p, f) => p.then(f), Promise.resolve());

    return Promise.resolve()
      .then(depPromise)
      .then(devPromise);
  }
}
