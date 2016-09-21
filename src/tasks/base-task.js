import is from 'is';
import chalk from 'chalk';
import { exec } from 'child_process';

export default class BaseTask {
  shouldRun(task) {
    return task.type === this.name;
  }

  async checkAndRun(task) {
    if (!this.shouldRun(task)) return undefined;

    return await this.run(task);
  }

  log(message, type = this.name) {
    const messages = is.string(message) ? [message] : message;

    for (const msg of messages) {
      for (const line of String(msg).split('\n')) {
        const prefix = chalk.blue(`[ ${type} ]`);
        // eslint-disable-next-line no-console
        console.log(`${prefix} ${line}`);
      }
    }
  }

  pExec(command, options = {}) { // eslint-disable-line class-methods-use-this
    return new Promise((resolve, reject) => {
      exec(command, options, (error, stdout, stderr) => {
        if (error) return reject(error);
        return resolve({ command, stdout, stderr });
      });
    });
  }
}
