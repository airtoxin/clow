import path from 'path';
import _BaseTask from './tasks/base-task';
import ShellTask from './tasks/shell';
import TemplateTask from './tasks/template';
import ClowTemplateTask from './tasks/clow-template';
import NpmInstallTask from './tasks/npm-install';

export default async function clow(srcDir, destDir) {
  const defaultTasks = [ShellTask, TemplateTask, ClowTemplateTask, NpmInstallTask];
  const taskrunners = defaultTasks.map(Task => new Task(srcDir, destDir));

  const clowFilePath = path.resolve(srcDir, 'clow');
  const tasks = require(clowFilePath); // eslint-disable-line global-require

  for (const task of tasks) {
    for (const runner of taskrunners) {
      await runner.checkAndRun(task);
    }
    // eslint-disable-next-line no-console
    console.log(); // spacing each task logs
  }
}

export const BaseTask = _BaseTask;
