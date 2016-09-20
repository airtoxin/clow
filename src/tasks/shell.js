import BaseTask from './base-task';
import { pExec } from '../utils';

export default class ShellTask extends BaseTask {
  constructor(generatorDir, destDir) {
    super();

    this.name = 'shell';
    this.destDir = destDir;
  }

  run(task) {
    return new Promise((resolve, reject) => {
      task.commands
        .map(command => () => {
          this.log(`command: ${command}`);
          return pExec(command, { cwd: this.destDir }).then(result => this.log(result.stdout));
        })
        .reduce((p, f) => p.then(f), Promise.resolve())
        .then(resolve)
        .catch(reject);
    });
  }
}
