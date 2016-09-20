import 'babel-polyfill';
import path from 'path';
import _BaseTask from './tasks/base-task';
import ShellTask from './tasks/shell';
import NpmInstallTask from './tasks/npm-install';
import TemplateTask from './tasks/template';
import ClowTemplateTask from './tasks/clow-template';

export default async function clow(generatorDir, destDir) {
  const shellTask = new ShellTask(generatorDir, destDir);
  const npmInstallTask = new NpmInstallTask(generatorDir, destDir);
  const templateTask = new TemplateTask(generatorDir, destDir);
  const clowTemplateTask = new ClowTemplateTask(generatorDir, destDir);

  const clowFilePath = path.resolve(generatorDir, 'clow');
  // eslint-disable-next-line global-require
  const tasks = require(clowFilePath);

  for (const task of tasks) {
    await shellTask.checkAndRun(task);
    await npmInstallTask.checkAndRun(task);
    await templateTask.checkAndRun(task);
    await clowTemplateTask.checkAndRun(task);

    // eslint-disable-next-line no-console
    console.log(); // spacing each taks logs
  }
}

export const BaseTask = _BaseTask;
