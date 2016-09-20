import { exec } from "child_process";
import BaseTask from "./base-task";
import is from "is";

function pExec(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) return reject(error);
      resolve({ command, stdout, stderr });
    });
  });
}


export default class ShellTask extends BaseTask {
  constructor() {
    super();
    this.name = "shell";
  }

  run(task) {
    return new Promise((resolve, reject) => {
      if (!this.shouldRun(task)) return resolve();

      task.runs
        .map(command => () => {
          this.log(`command: ${command}`);
          return pExec(command).then(result => this.log(result.stdout));
        })
        .reduce((p, f) => p.then(f), Promise.resolve())
        .then(resolve)
        .catch(reject);
    });
  }
}
