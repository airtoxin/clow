import { exec } from "child_process";
import BaseTask from "./base-task";

function pExec(command, options={}) {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) return reject(error);
      resolve({ command, stdout, stderr });
    });
  });
}

export default class ShellTask extends BaseTask {
  constructor(generatorDir, destDir) {
    super();

    this.name = "shell";
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
