import "babel-polyfill";
import util from "util";
import ShellTask from "./tasks/shell";

const shellTask = new ShellTask();

export default async function clow(tasks) {
  for (const task of tasks) {
    await shellTask.run(task);
    console.log();
  }
}
