import is from 'is';
import chalk from 'chalk';

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
}
