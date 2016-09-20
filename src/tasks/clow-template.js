import path from 'path';
import BaseTask from './base-task';
import { downloadTmp } from '../utils';
import clow from '../index';

export default class ClowTemplateTask extends BaseTask {
  constructor(generatorDir, destDir) {
    super();

    this.name = 'clow-template';
    this.generatorDir = generatorDir;
    this.destDir = destDir;
  }

  async run(task) {
    for (const url of task.templates) {
      const templateDir = await downloadTmp(url);
      const clowFilePath = path.resolve(templateDir, 'clow');

      // eslint-disable-next-line global-require
      const tasks = require(clowFilePath);

      await clow(tasks, templateDir, this.destDir);
    }
  }
}
