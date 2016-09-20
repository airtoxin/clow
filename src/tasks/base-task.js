import is from "is";
import chalk from "chalk";

export default class BaseTask {
  shouldRun(task) {
    return task.type === this.name;
  }

  async checkAndRun(task) {
    if (!this.shouldRun(task)) return;

    return await this.run(task);
  }

  log(logs, type=this.name) {
    if (is.string(logs)) logs = [logs];
    for (const log of logs) {
      for (const line of ("" + log).split("\n")) {
        const prefix = chalk.blue(`[ ${type} ]`);
        console.log(`${prefix} ${line}`);
      }
    }
  }
}
