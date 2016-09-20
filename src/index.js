import "babel-polyfill";
import util from "util";
import ShellTask from "./tasks/shell";
import NpmInstallTask from "./tasks/npm-install";
import TemplateTask from "./tasks/template";

export default async function clow(tasks, generatorDir, destDir) {

  const shellTask = new ShellTask(generatorDir, destDir);
  const npmInstallTask = new NpmInstallTask(generatorDir, destDir);
  const templateTask = new TemplateTask(generatorDir, destDir);

  for (const task of tasks) {
    await shellTask.checkAndRun(task);
    await npmInstallTask.checkAndRun(task);
    await templateTask.checkAndRun(task);
    console.log();
  }
}
