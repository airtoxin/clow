import path from 'path';
import npm from 'npm';
import glob from 'glob';
import _BaseTask from './tasks/base-task';
import ShellTask from './tasks/shell';
import TemplateTask from './tasks/template';
import ClowTemplateTask from './tasks/clow-template';

function getClowTaskPlugins() {
  return new Promise((resolve) => {
    npm.load(() => {
      const searchGlob = path.resolve(npm.globalDir, 'clow-plugin-task-*');
      const taskPlugins = glob.sync(searchGlob)
        .map(fp => require(fp).default); // eslint-disable-line global-require
      resolve(taskPlugins);
    });
  });
}

export default async function clow(srcDir, destDir) {
  const defaultTasks = [ShellTask, TemplateTask, ClowTemplateTask];
  const installedTasks = await getClowTaskPlugins();
  const taskrunners = []
    .concat(defaultTasks, installedTasks)
    .map(Task => new Task(srcDir, destDir));

  const clowFilePath = path.resolve(srcDir, 'clow');
  // eslint-disable-next-line global-require
  const tasks = require(clowFilePath);

  for (const task of tasks) {
    for (const runner of taskrunners) {
      await runner.checkAndRun(task);
    }
    // eslint-disable-next-line no-console
    console.log(); // spacing each taks logs
  }
}

export const BaseTask = _BaseTask;
