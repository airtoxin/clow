import BaseTask from './base-task';
import { downloadTmp } from '../utils';
import clow from '../index';

export default class ClowTemplateTask extends BaseTask {
  constructor(srcDir, destDir) {
    super();

    this.name = 'clow-template';
    this.destDir = destDir;
  }

  async run(task) {
    for (const url of task.templates) {
      const templateDir = await downloadTmp(url);
      this.log(`temporary file saved: ${templateDir}`);

      this.log(`Start clow: ${url}`);
      await clow(templateDir, this.destDir);
      this.log(`Finish clow: ${url}`);
    }
  }
}
